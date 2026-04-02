import { BRAND, getDisplayValue } from './config.js';
import {
  buildFallbackCsv,
  buildIntakeLink,
  downloadTextFile,
  fetchAdminData,
  formatTimestamp,
  getQueryParams,
  resolveExperience,
} from './shared.js';

const app = document.getElementById('app');
const { vertical, business } = resolveExperience();
let currentStorageMode = 'local-fallback';

function getFiltersFromForm() {
  const query = getQueryParams();
  return {
    vertical: document.getElementById('verticalFilter')?.value || query.get('vertical') || vertical.slug,
    businessSlug: document.getElementById('businessFilter')?.value || query.get('business') || business.slug,
  };
}

function renderRows(items) {
  if (!items.length) {
    return `<tr><td colspan="7"><div class="empty-state">아직 저장된 제출이 없습니다. 먼저 데모를 완료해보세요.</div></td></tr>`;
  }

  return items.map((item) => {
    const rowVertical = item.vertical || vertical.slug;
    const leadKey = rowVertical === 'beauty' ? 'goal' : 'interest';
    const leadValue = getDisplayValue(rowVertical, leadKey, item.answers?.[leadKey]);
    const budgetValue = getDisplayValue(rowVertical, 'budget', item.answers?.budget);
    const scheduleKey = rowVertical === 'beauty' ? 'schedule' : 'availability';
    const scheduleValue = getDisplayValue(rowVertical, scheduleKey, item.answers?.[scheduleKey]);

    return `
      <tr>
        <td>${formatTimestamp(item.startedAt)}</td>
        <td><span class="pill">${rowVertical}</span><br /><span class="mini-link">${item.businessSlug}</span></td>
        <td><span class="status-pill status-${item.status === 'completed' ? 'completed' : 'started'}">${item.status === 'completed' ? '완료' : '시작'}</span></td>
        <td>${leadValue}</td>
        <td>${budgetValue}</td>
        <td>${scheduleValue}</td>
        <td>${item.ctaClickedAt ? '예' : '아니오'}</td>
      </tr>
    `;
  }).join('');
}

function renderShell() {
  app.innerHTML = `
    <div class="page-shell">
      <div class="container">
        <section class="hero" style="padding-top:0;">
          <div class="card hero-copy">
            <span class="badge">운영 대시보드</span>
            <h1>${business.name} 제출 지표</h1>
            <p>${vertical.adminIntro}</p>
            <div class="notice-banner">
              API 서버가 연결되면 SQLite 기준으로 집계하고, 그렇지 않으면 이 브라우저의 local fallback 데이터를 보여줍니다.
            </div>
            <div class="button-row" style="margin-top:20px;">
              <a class="btn btn-primary" href="${buildIntakeLink(vertical.slug, business.slug)}">이 트랙 다시 체험</a>
              <a class="btn btn-secondary" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오 채널 열기</a>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="filters-grid">
            <div class="filter-card">
              <h3>Vertical</h3>
              <select id="verticalFilter" style="width:100%; padding:12px; border-radius:12px; border:1px solid var(--border);">
                <option value="clinic" ${vertical.slug === 'clinic' ? 'selected' : ''}>clinic</option>
                <option value="beauty" ${vertical.slug === 'beauty' ? 'selected' : ''}>beauty</option>
              </select>
            </div>
            <div class="filter-card">
              <h3>Business</h3>
              <select id="businessFilter" style="width:100%; padding:12px; border-radius:12px; border:1px solid var(--border);">
                <option value="clinic-demo" ${business.slug === 'clinic-demo' ? 'selected' : ''}>clinic-demo</option>
                <option value="beauty-demo" ${business.slug === 'beauty-demo' ? 'selected' : ''}>beauty-demo</option>
              </select>
            </div>
            <div class="filter-card">
              <h3>Actions</h3>
              <div class="button-row">
                <button class="btn btn-secondary" type="button" id="refreshButton">새로고침</button>
                <button class="btn btn-secondary" type="button" id="exportButton">CSV 내보내기</button>
              </div>
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
                <h3 style="margin:8px 0 0;">실험 중인 고객 흐름 기록</h3>
              </div>
              <div class="mini-link" id="storageMode"></div>
            </div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>시작 시각</th>
                    <th>트랙</th>
                    <th>상태</th>
                    <th>핵심 목적</th>
                    <th>예산</th>
                    <th>시간대</th>
                    <th>CTA</th>
                  </tr>
                </thead>
                <tbody id="submissionsTable"></tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderStats(summary) {
  const statsGrid = document.getElementById('statsGrid');
  statsGrid.innerHTML = [
    { label: '시작 수', value: summary.started, hint: '링크를 열고 흐름을 시작한 수' },
    { label: '완료 수', value: summary.completed, hint: '7문항을 끝까지 완료한 수' },
    { label: '완료율', value: `${summary.completionRate}%`, hint: 'started 대비 completed 비율' },
    { label: 'CTA 클릭', value: summary.ctaClicks, hint: '카카오 CTA까지 이동한 수' },
  ].map((item) => `
    <article class="stat-card">
      <div class="kicker">${item.label}</div>
      <h3 style="font-size:34px; margin-top:8px;">${item.value}</h3>
      <p>${item.hint}</p>
    </article>
  `).join('');
}

async function loadDashboard() {
  const filters = getFiltersFromForm();
  const data = await fetchAdminData(filters);

  currentStorageMode = data.storage;
  renderStats(data.summary);
  document.getElementById('storageMode').textContent = data.storage === 'server' ? 'Storage: SQLite API' : 'Storage: local fallback';
  document.getElementById('submissionsTable').innerHTML = renderRows(data.submissions);
}

function attachEvents() {
  document.getElementById('refreshButton').addEventListener('click', loadDashboard);
  document.getElementById('verticalFilter').addEventListener('change', loadDashboard);
  document.getElementById('businessFilter').addEventListener('change', loadDashboard);
  document.getElementById('exportButton').addEventListener('click', async () => {
    const filters = getFiltersFromForm();
    if (currentStorageMode === 'server') {
      const query = new URLSearchParams({
        vertical: filters.vertical,
        business: filters.businessSlug,
      });
      const response = await fetch(`/api/admin/export.csv?${query.toString()}`);
      const csv = await response.text();
      downloadTextFile(`precheckin-${filters.vertical}-${filters.businessSlug}.csv`, csv, 'text/csv;charset=utf-8');
      return;
    }

    const csv = buildFallbackCsv(filters);
    downloadTextFile(`precheckin-${filters.vertical}-${filters.businessSlug}.csv`, csv, 'text/csv;charset=utf-8');
  });
}

renderShell();
attachEvents();
loadDashboard();
