import { BRAND, WEDGE } from './config.js';

const API_BASE = '/api';
const FALLBACK_KEY = 'precheckin.beauty.local.v2';

function nowIso() {
  return new Date().toISOString();
}

function randomId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `pc-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function safeJsonParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readFallbackStore() {
  return safeJsonParse(localStorage.getItem(FALLBACK_KEY), {
    sessions: {},
    events: [],
  });
}

function writeFallbackStore(store) {
  localStorage.setItem(FALLBACK_KEY, JSON.stringify(store));
}

function upsertFallbackSession(payload) {
  const store = readFallbackStore();
  const current = store.sessions[payload.sessionId] || {};

  store.sessions[payload.sessionId] = {
    sessionId: payload.sessionId,
    businessSlug: payload.businessSlug,
    businessName: payload.businessName,
    vertical: payload.vertical,
    status: payload.status || current.status || 'started',
    startedAt: current.startedAt || payload.startedAt || nowIso(),
    updatedAt: payload.updatedAt || nowIso(),
    completedAt: payload.completedAt || current.completedAt || null,
    ctaClickedAt: payload.ctaClickedAt || current.ctaClickedAt || null,
    source: payload.source || current.source || null,
    answers: payload.answers || current.answers || {},
    customerSummary: payload.customerSummary || current.customerSummary || null,
    businessSummary: payload.businessSummary || current.businessSummary || null,
  };

  writeFallbackStore(store);
}

function pushFallbackEvent(eventType, payload) {
  const store = readFallbackStore();
  store.events.push({
    id: `${eventType}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    eventType,
    occurredAt: nowIso(),
    ...payload,
  });
  writeFallbackStore(store);
}

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return response.json();
  return response.text();
}

export function buildIntakeLink() {
  return `./intake.html?vertical=${encodeURIComponent(WEDGE.vertical)}&business=${encodeURIComponent(WEDGE.businessSlug)}`;
}

export function buildAdminLink() {
  return `./admin.html?vertical=${encodeURIComponent(WEDGE.vertical)}&business=${encodeURIComponent(WEDGE.businessSlug)}`;
}

export function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

export function resolveExperience() {
  const params = getQueryParams();
  return {
    vertical: params.get('vertical') || WEDGE.vertical,
    businessSlug: params.get('business') || WEDGE.businessSlug,
    businessName: WEDGE.businessName,
    brand: BRAND,
  };
}

export function createSessionSeed() {
  return {
    sessionId: randomId(),
    vertical: WEDGE.vertical,
    businessSlug: WEDGE.businessSlug,
    businessName: WEDGE.businessName,
    startedAt: nowIso(),
    source: document.referrer || 'direct',
  };
}

export async function startSession(payload) {
  const body = { ...payload, status: 'started' };
  try {
    return await apiFetch('/session/start', { method: 'POST', body: JSON.stringify(body) });
  } catch {
    upsertFallbackSession(body);
    pushFallbackEvent('session_started', body);
    return { storage: 'local-fallback', ok: true };
  }
}

export async function saveSessionProgress(payload) {
  const body = { ...payload, updatedAt: nowIso() };
  try {
    return await apiFetch('/session/progress', { method: 'POST', body: JSON.stringify(body) });
  } catch {
    upsertFallbackSession(body);
    return { storage: 'local-fallback', ok: true };
  }
}

export async function completeSession(payload) {
  const body = { ...payload, status: 'completed', completedAt: nowIso() };
  try {
    return await apiFetch('/session/complete', { method: 'POST', body: JSON.stringify(body) });
  } catch {
    upsertFallbackSession(body);
    pushFallbackEvent('session_completed', body);
    return { storage: 'local-fallback', ok: true };
  }
}

export async function trackCtaClick(payload) {
  const body = { ...payload, ctaClickedAt: nowIso() };
  try {
    return await apiFetch('/session/cta', { method: 'POST', body: JSON.stringify(body) });
  } catch {
    upsertFallbackSession(body);
    pushFallbackEvent('cta_clicked', body);
    return { storage: 'local-fallback', ok: true };
  }
}

function getLocalSummary() {
  const store = readFallbackStore();
  const sessions = Object.values(store.sessions).filter((item) => item.businessSlug === WEDGE.businessSlug);
  const started = sessions.length;
  const completed = sessions.filter((item) => item.status === 'completed').length;
  const ctaClicks = sessions.filter((item) => item.ctaClickedAt).length;
  return {
    storage: 'local-fallback',
    summary: {
      started,
      completed,
      completionRate: started ? Math.round((completed / started) * 100) : 0,
      ctaClicks,
    },
    submissions: sessions.sort((a, b) => (b.startedAt || '').localeCompare(a.startedAt || '')).slice(0, 100),
  };
}

export async function fetchAdminData() {
  const query = new URLSearchParams({ vertical: WEDGE.vertical, business: WEDGE.businessSlug });
  try {
    const [summary, submissions] = await Promise.all([
      apiFetch(`/admin/summary?${query.toString()}`),
      apiFetch(`/admin/submissions?${query.toString()}`),
    ]);
    return { storage: 'server', summary, submissions: submissions.items || [] };
  } catch {
    return getLocalSummary();
  }
}

export function buildFallbackCsv() {
  const local = getLocalSummary();
  const lines = [[
    'session_id', 'status', 'started_at', 'completed_at', 'cta_clicked_at', 'answers_json',
  ].join(',')];

  local.submissions.forEach((item) => {
    lines.push([
      csvEscape(item.sessionId),
      csvEscape(item.status),
      csvEscape(item.startedAt),
      csvEscape(item.completedAt || ''),
      csvEscape(item.ctaClickedAt || ''),
      csvEscape(JSON.stringify(item.answers || {})),
    ].join(','));
  });

  return lines.join('\n');
}

export function csvEscape(value) {
  const text = value == null ? '' : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function formatTimestamp(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).format(date);
}

export function downloadTextFile(filename, content, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function copyText(text) {
  return navigator.clipboard.writeText(text);
}
