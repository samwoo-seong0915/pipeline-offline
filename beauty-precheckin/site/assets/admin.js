import { BRAND, WEDGE, getDisplayValue } from './config.js';
import { buildFallbackCsv, buildIntakeLink, downloadTextFile, fetchAdminData, formatTimestamp } from './shared.js';

const app = document.getElementById('app');
let storageMode = 'local-fallback';

function renderRows(items) {
  if (!items.length) {
    return `<tr><td colspan="6"><div class="empty-state">아직 저장된 제출이 없습니다. 고객 흐름을 한 번 완료해보세요.</div></td></tr>`;
  }

  return items.map((item) => `
    <tr>
      <td>${formatTimestamp(item.startedAt)}</td>
      <td>${getDisplayValue('goal', item.answers?.goal)}</td>
      <td>${getDisplayValue('budget', item.answers?.budget)}</td>
      <td>${getDisplayValue('schedule', item.answers?.schedule)}</td>
      <td>${item.status === 'completed' ? '<span class="status-pill status-completed">완료</span>' : '<span class="status-pill status-started">진행 중</span>'}</td>
      <td>${item.ctaClickedAt ? '예' : '아니오'}</td>
    </tr>
  `).join('');
}

function renderStats(summary) {
  return [
    { label: '시작 수', value: summary.started, hint: '링크를 열고 문진을 시작한 수' },
    { label: '완료 수', value: summary.completed, hint: '문진을 끝까지 완료한 수' },
    { label: '완료율', value: `${summary.completionRate}%`, hint: '시작 대비 완료 비율' },
    { label: 'CTA 클릭', value: summary.ctaClicks, hint: '카카오 문의까지 이어진 수' },
  ].map((item) => `
    <article class="stat-card">
      <div class="kicker">${item.label}</div>
      <h3 style="font-size:34px; margin-top:8px;">${item.value}</h3>
      <p>${item.hint}</p>
    </article>
  `).join('');
}

function renderShell() {
  app.innerHTML = `
    <div class="page-shell">
      <div class="container">
        <section class="hero" style="padding-top:0;">
          <div class="card hero-copy">
            <span class="badge">운영 대시보드</span>
            <h1>뷰티샵 예약 전 리드 정리 실험 데이터</h1>
            <p>지금은 병원/뷰티 비교가 아니라, 뷰티샵 wedge 하나만 검증합니다. 가장 먼저 볼 건 완료율과 CTA 클릭입니다.</p>
            <div class="notice-banner">
              “고객 기대치와 적합도를 예약 전에 정리하면 응대 시간이 줄어드는가?”를 보는 최소 계측판입니다.
            </div>
            <div class="button-row" style="margin-top:20px;">
              <a class="btn btn-primary" href="${buildIntakeLink()}">고객 흐름 다시 체험</a>
              <button class="btn btn-secondary" id="exportButton" type="button">CSV 내보내기</button>
              <a class="btn btn-kakao" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오 채널</a>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="stats-grid" id="statsGrid"></div>
        </section>

        <section class="section">
          <div class="table-card">
            <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:12px;">
              <div>
                <div class="kicker">최근 제출</div>
                <h3 style="margin:8px 0 0;">응대 판단에 필요한 핵심 입력만 본다</h3>
              </div>
              <div class="mini-link" id="storageMode"></div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>시작 시각</th>
                    <th>우선 목표</th>
                    <th>예산</th>
                    <th>시간대</th>
                    <th>상태</th>
                    <th>CTA</th>
                  </tr>
                </thead>
                <tbody id="rows"></tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

async function loadDashboard() {
  const data = await fetchAdminData();
  storageMode = data.storage;
  document.getElementById('statsGrid').innerHTML = renderStats(data.summary);
  document.getElementById('rows').innerHTML = renderRows(data.submissions);
  document.getElementById('storageMode').textContent = storageMode === 'server' ? 'Storage: SQLite API' : 'Storage: browser fallback';
}

function attachEvents() {
  document.getElementById('exportButton').addEventListener('click', async () => {
    if (storageMode === 'server') {
      const response = await fetch(`/api/admin/export.csv?vertical=${encodeURIComponent(WEDGE.vertical)}&business=${encodeURIComponent(WEDGE.businessSlug)}`);
      const csv = await response.text();
      downloadTextFile('precheckin-beauty.csv', csv, 'text/csv;charset=utf-8');
      return;
    }

    downloadTextFile('precheckin-beauty.csv', buildFallbackCsv(), 'text/csv;charset=utf-8');
  });
}

renderShell();
attachEvents();
loadDashboard();
