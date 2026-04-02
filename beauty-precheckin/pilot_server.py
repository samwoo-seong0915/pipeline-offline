#!/usr/bin/env python3
from __future__ import annotations

import csv
import io
import json
import os
import posixpath
import sqlite3
import sys
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

APP_ROOT = Path(__file__).resolve().parent
SITE_ROOT = APP_ROOT / 'site'
DB_PATH = APP_ROOT / 'pilot.db'
DEFAULT_HOST = os.environ.get('PRECHECKIN_HOST', '127.0.0.1')
DEFAULT_PORT = int(os.environ.get('PRECHECKIN_PORT', '8788'))


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with db() as conn:
        conn.executescript(
            '''
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                business_slug TEXT NOT NULL,
                business_name TEXT NOT NULL,
                vertical TEXT NOT NULL,
                status TEXT NOT NULL,
                started_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                completed_at TEXT,
                cta_clicked_at TEXT,
                source TEXT,
                answers_json TEXT NOT NULL DEFAULT '{}',
                customer_summary_json TEXT,
                business_summary_json TEXT
            );

            CREATE TABLE IF NOT EXISTS session_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                business_slug TEXT NOT NULL,
                vertical TEXT NOT NULL,
                event_type TEXT NOT NULL,
                occurred_at TEXT NOT NULL,
                payload_json TEXT NOT NULL DEFAULT '{}'
            );
            '''
        )


def as_json(handler: 'PilotHandler', payload: dict | list, status: HTTPStatus = HTTPStatus.OK) -> None:
    body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', 'application/json; charset=utf-8')
    handler.send_header('Content-Length', str(len(body)))
    handler.send_header('Cache-Control', 'no-store')
    handler.end_headers()
    handler.wfile.write(body)


def as_text(handler: 'PilotHandler', text: str, content_type: str = 'text/plain; charset=utf-8', status: HTTPStatus = HTTPStatus.OK) -> None:
    body = text.encode('utf-8')
    handler.send_response(status)
    handler.send_header('Content-Type', content_type)
    handler.send_header('Content-Length', str(len(body)))
    handler.send_header('Cache-Control', 'no-store')
    handler.end_headers()
    handler.wfile.write(body)


def parse_body(handler: 'PilotHandler') -> dict:
    content_length = int(handler.headers.get('Content-Length', '0') or '0')
    raw = handler.rfile.read(content_length) if content_length else b'{}'
    if not raw:
        return {}
    return json.loads(raw.decode('utf-8'))


def normalize_payload(payload: dict) -> dict:
    customer_summary = payload.get('customerSummary') if 'customerSummary' in payload else payload.get('customer_summary')
    business_summary = payload.get('businessSummary') if 'businessSummary' in payload else payload.get('business_summary')
    normalized = {
        'session_id': payload.get('sessionId') or payload.get('session_id'),
        'business_slug': payload.get('businessSlug') or payload.get('business_slug') or 'unknown-business',
        'business_name': payload.get('businessName') or payload.get('business_name') or 'Unknown business',
        'vertical': payload.get('vertical') or 'clinic',
        'status': payload.get('status') or 'started',
        'started_at': payload.get('startedAt') or payload.get('started_at') or utc_now(),
        'updated_at': payload.get('updatedAt') or payload.get('updated_at') or utc_now(),
        'completed_at': payload.get('completedAt') or payload.get('completed_at'),
        'cta_clicked_at': payload.get('ctaClickedAt') or payload.get('cta_clicked_at'),
        'source': payload.get('source'),
        'answers_json': json.dumps(payload.get('answers') or {}, ensure_ascii=False),
        'customer_summary_json': json.dumps(customer_summary, ensure_ascii=False) if customer_summary is not None else None,
        'business_summary_json': json.dumps(business_summary, ensure_ascii=False) if business_summary is not None else None,
    }
    if not normalized['session_id']:
        raise ValueError('sessionId is required')
    return normalized


def write_event(payload: dict, event_type: str) -> None:
    with db() as conn:
        conn.execute(
            '''
            INSERT INTO session_events (
                session_id, business_slug, vertical, event_type, occurred_at, payload_json
            ) VALUES (?, ?, ?, ?, ?, ?)
            ''',
            (
                payload['session_id'],
                payload['business_slug'],
                payload['vertical'],
                event_type,
                utc_now(),
                json.dumps(payload, ensure_ascii=False),
            ),
        )


def upsert_session(payload: dict) -> None:
    with db() as conn:
        conn.execute(
            '''
            INSERT INTO sessions (
                session_id, business_slug, business_name, vertical, status,
                started_at, updated_at, completed_at, cta_clicked_at, source,
                answers_json, customer_summary_json, business_summary_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(session_id) DO UPDATE SET
                business_slug = excluded.business_slug,
                business_name = excluded.business_name,
                vertical = excluded.vertical,
                status = CASE
                    WHEN sessions.status = 'completed' AND excluded.status = 'started' THEN sessions.status
                    ELSE excluded.status
                END,
                updated_at = excluded.updated_at,
                completed_at = COALESCE(excluded.completed_at, sessions.completed_at),
                cta_clicked_at = COALESCE(excluded.cta_clicked_at, sessions.cta_clicked_at),
                source = COALESCE(excluded.source, sessions.source),
                answers_json = excluded.answers_json,
                customer_summary_json = COALESCE(excluded.customer_summary_json, sessions.customer_summary_json),
                business_summary_json = COALESCE(excluded.business_summary_json, sessions.business_summary_json)
            ''',
            (
                payload['session_id'],
                payload['business_slug'],
                payload['business_name'],
                payload['vertical'],
                payload['status'],
                payload['started_at'],
                payload['updated_at'],
                payload['completed_at'],
                payload['cta_clicked_at'],
                payload['source'],
                payload['answers_json'],
                payload['customer_summary_json'],
                payload['business_summary_json'],
            ),
        )


def query_filters(handler: 'PilotHandler') -> tuple[str | None, str | None]:
    parsed = urlparse(handler.path)
    params = parse_qs(parsed.query)
    vertical = params.get('vertical', [None])[0]
    business = params.get('business', [None])[0]
    return vertical, business


def get_summary(vertical: str | None, business: str | None) -> dict:
    clauses = []
    args: list[str] = []
    if vertical:
        clauses.append('vertical = ?')
        args.append(vertical)
    if business:
        clauses.append('business_slug = ?')
        args.append(business)
    where = f"WHERE {' AND '.join(clauses)}" if clauses else ''

    with db() as conn:
        started = conn.execute(f'SELECT COUNT(*) AS count FROM sessions {where}', args).fetchone()['count']
        completed = conn.execute(
            f"SELECT COUNT(*) AS count FROM sessions {where + (' AND ' if where else ' WHERE ')}status = ?",
            [*args, 'completed'],
        ).fetchone()['count']
        cta_clicks = conn.execute(
            f"SELECT COUNT(*) AS count FROM sessions {where + (' AND ' if where else ' WHERE ')}cta_clicked_at IS NOT NULL",
            args,
        ).fetchone()['count']

    completion_rate = round((completed / started) * 100) if started else 0
    return {
        'started': started,
        'completed': completed,
        'completionRate': completion_rate,
        'ctaClicks': cta_clicks,
    }


def get_submissions(vertical: str | None, business: str | None) -> list[dict]:
    clauses = []
    args: list[str] = []
    if vertical:
        clauses.append('vertical = ?')
        args.append(vertical)
    if business:
        clauses.append('business_slug = ?')
        args.append(business)
    where = f"WHERE {' AND '.join(clauses)}" if clauses else ''

    with db() as conn:
        rows = conn.execute(
            f'''
            SELECT session_id, business_slug, business_name, vertical, status,
                   started_at, updated_at, completed_at, cta_clicked_at, answers_json,
                   customer_summary_json, business_summary_json
            FROM sessions
            {where}
            ORDER BY started_at DESC
            LIMIT 200
            ''',
            args,
        ).fetchall()

    items = []
    for row in rows:
        items.append({
            'sessionId': row['session_id'],
            'businessSlug': row['business_slug'],
            'businessName': row['business_name'],
            'vertical': row['vertical'],
            'status': row['status'],
            'startedAt': row['started_at'],
            'updatedAt': row['updated_at'],
            'completedAt': row['completed_at'],
            'ctaClickedAt': row['cta_clicked_at'],
            'answers': json.loads(row['answers_json'] or '{}'),
            'customerSummary': json.loads(row['customer_summary_json']) if row['customer_summary_json'] else None,
            'businessSummary': json.loads(row['business_summary_json']) if row['business_summary_json'] else None,
        })
    return items


def build_csv(vertical: str | None, business: str | None) -> str:
    items = get_submissions(vertical, business)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        'session_id', 'business_slug', 'business_name', 'vertical', 'status',
        'started_at', 'completed_at', 'cta_clicked_at', 'answers_json'
    ])
    for item in items:
        writer.writerow([
            item['sessionId'], item['businessSlug'], item['businessName'], item['vertical'], item['status'],
            item['startedAt'], item['completedAt'] or '', item['ctaClickedAt'] or '', json.dumps(item['answers'], ensure_ascii=False)
        ])
    return output.getvalue()


class PilotHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SITE_ROOT), **kwargs)

    def log_message(self, format: str, *args) -> None:
        sys.stdout.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format % args))

    def do_OPTIONS(self) -> None:
        self.send_response(HTTPStatus.NO_CONTENT)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith('/api/'):
            return self.handle_api_get(parsed.path)
        if parsed.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if not parsed.path.startswith('/api/'):
            as_text(self, 'Not found', status=HTTPStatus.NOT_FOUND)
            return
        return self.handle_api_post(parsed.path)

    def end_headers(self) -> None:
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def translate_path(self, path: str) -> str:
        path = urlparse(path).path
        path = posixpath.normpath(unquote(path))
        parts = [part for part in path.split('/') if part]
        candidate = SITE_ROOT
        for part in parts:
            if part in ('.', '..'):
                continue
            candidate = candidate / part
        return str(candidate)

    def handle_api_get(self, path: str) -> None:
        if path == '/api/health':
            as_json(self, {'ok': True, 'timestamp': utc_now()})
            return

        vertical, business = query_filters(self)

        if path == '/api/admin/summary':
            as_json(self, get_summary(vertical, business))
            return
        if path == '/api/admin/submissions':
            as_json(self, {'items': get_submissions(vertical, business)})
            return
        if path == '/api/admin/export.csv':
            csv_text = build_csv(vertical, business)
            as_text(self, csv_text, content_type='text/csv; charset=utf-8')
            return

        as_text(self, 'Not found', status=HTTPStatus.NOT_FOUND)

    def handle_api_post(self, path: str) -> None:
        try:
            payload = normalize_payload(parse_body(self))
        except (ValueError, json.JSONDecodeError) as exc:
            as_json(self, {'error': str(exc)}, status=HTTPStatus.BAD_REQUEST)
            return

        if path == '/api/session/start':
            upsert_session(payload)
            write_event(payload, 'session_started')
            as_json(self, {'ok': True, 'storage': 'sqlite'})
            return

        if path == '/api/session/progress':
            upsert_session(payload)
            as_json(self, {'ok': True, 'storage': 'sqlite'})
            return

        if path == '/api/session/complete':
            payload['status'] = 'completed'
            payload['completed_at'] = payload['completed_at'] or utc_now()
            upsert_session(payload)
            write_event(payload, 'session_completed')
            as_json(self, {'ok': True, 'storage': 'sqlite'})
            return

        if path == '/api/session/cta':
            payload['cta_clicked_at'] = payload['cta_clicked_at'] or utc_now()
            upsert_session(payload)
            write_event(payload, 'cta_clicked')
            as_json(self, {'ok': True, 'storage': 'sqlite'})
            return

        as_text(self, 'Not found', status=HTTPStatus.NOT_FOUND)


def main() -> None:
    init_db()
    server = ThreadingHTTPServer((DEFAULT_HOST, DEFAULT_PORT), PilotHandler)
    print(f'Precheckin pilot server running on http://{DEFAULT_HOST}:{DEFAULT_PORT}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopping server...')
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
