import { BRAND, VERTICALS, BUSINESSES } from './config.js';
import { buildAdminLink, buildIntakeLink } from './shared.js';

const app = document.getElementById('app');

const verticalCards = Object.values(VERTICALS).map((vertical) => {
  const businessSlug = vertical.slug === 'beauty' ? 'beauty-demo' : 'clinic-demo';
  const business = BUSINESSES[businessSlug];

  return `
    <article class="vertical-card" data-vertical="${vertical.slug}">
      <div class="pill">${vertical.label}</div>
      <div>
        <h3>${vertical.heroTitle}</h3>
        <p class="muted">${vertical.heroDescription}</p>
      </div>
      <div class="highlight-box">
        <div class="kicker">돈 내는 사람</div>
        <p style="margin:6px 0 0;">${vertical.businessBuyer}</p>
      </div>
      <div class="two-col">
        <div>
          <div class="kicker">Pain hypothesis</div>
          <ul class="check-list" style="margin-top:10px;">
            ${vertical.pains.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="kicker">우리가 보는 성공 신호</div>
          <ul class="check-list" style="margin-top:10px;">
            ${vertical.successMetrics.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="notice-banner">${vertical.honesty}</div>
      <div class="button-row">
        <a class="btn btn-primary" href="${buildIntakeLink(vertical.slug, business.slug)}">${vertical.shortLabel} 고객 흐름 체험</a>
        <a class="btn btn-secondary" href="${buildAdminLink(vertical.slug, business.slug)}">${vertical.shortLabel} 운영 대시보드</a>
      </div>
      <div class="mini-link">데모 business: <span class="inline-code">${business.slug}</span></div>
    </article>
  `;
}).join('');

app.innerHTML = `
  <div class="page-shell">
    <section class="hero">
      <div class="container hero-grid">
        <article class="card hero-copy">
          <span class="badge">프리체크인 파일럿 런치팩</span>
          <h1>병원과 뷰티샵 모두를 위한<br />사전 체크인 링크를 구현했습니다.</h1>
          <p>
            이 앱은 고객이 사업자 링크 앞단에서 먼저 정보를 정리하고,
            사업자가 요약 카드로 받아 상담 전 반복 설명과 리드 mismatch를 줄일 수 있는지 테스트합니다.
          </p>
          <ul class="hero-list">
            <li>클리닉 트랙: 의료 추천 없이 상담 전 정보정리만 다룹니다.</li>
            <li>뷰티 트랙: 예약 전 기대치, 예산, 시간대 정리 가설을 검증합니다.</li>
            <li>공통 코어: 고객용 요약 + 운영자용 카드 + 제출/완료/CTA 계측.</li>
          </ul>
          <div class="button-row">
            <a class="btn btn-primary" href="${buildIntakeLink('clinic', 'clinic-demo')}">클리닉 데모 시작</a>
            <a class="btn btn-accent" href="${buildIntakeLink('beauty', 'beauty-demo')}">뷰티 데모 시작</a>
            <a class="btn btn-secondary" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오 채널 열기</a>
          </div>
          <div class="notice-banner">
            현재 pain 가설은 내부 문서 기반으로 강하지만, 실제 willingness-to-pay는 아직 미검증입니다.
            그래서 이 앱은 “예쁜 랜딩”보다 파일럿 실험 구조를 먼저 제공합니다.
          </div>
        </article>

        <aside class="card hero-side">
          <div class="metric-grid">
            <div class="metric-card">
              <div class="kicker">공통 코어</div>
              <h3>사업자 링크 앞단 pre-checkin</h3>
              <p>카톡채널·예약 링크·홈페이지 앞단에 같은 구조로 붙일 수 있습니다.</p>
            </div>
            <div class="metric-card">
              <div class="kicker">계측 포인트</div>
              <h3>시작 / 완료 / CTA 클릭</h3>
              <p>실험에서 완료율과 관심 신호를 최소한으로 볼 수 있게 했습니다.</p>
            </div>
            <div class="metric-card">
              <div class="kicker">클리닉 buyers</div>
              <h3>${VERTICALS.clinic.businessBuyer}</h3>
              <p>${VERTICALS.clinic.disclaimer}</p>
            </div>
            <div class="metric-card">
              <div class="kicker">뷰티 buyers</div>
              <h3>${VERTICALS.beauty.businessBuyer}</h3>
              <p>${VERTICALS.beauty.disclaimer}</p>
            </div>
          </div>
          <div class="summary-card">
            <div class="kicker">현재 연락 채널</div>
            <h3>${BRAND.name}</h3>
            <p>${BRAND.phone} · ${BRAND.email}<br /><a href="${BRAND.kakaoChannelUrl}" target="_blank" rel="noreferrer">${BRAND.kakaoChannelUrl}</a></p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-heading">비교 가능한 두 개의 수요 시나리오</h2>
        <p class="section-sub">
          같은 제품 코어를 유지하되, 병원과 뷰티 사업자 각각의 pain, buyer, 성공 신호를 나눠서 테스트할 수 있게 구성했습니다.
        </p>
        <div class="vertical-grid">${verticalCards}</div>
      </div>
    </section>

    <section class="section">
      <div class="container panel-grid">
        <article class="surface">
          <div class="kicker">Full scenario</div>
          <h3>고객과 사업자가 보는 흐름</h3>
          <div class="scenario-grid" style="margin-top:16px;">
            <div class="timeline-card">
              <h3>고객 측</h3>
              <ul class="timeline">
                <li>사업자가 보낸 링크 또는 홈페이지 CTA로 진입</li>
                <li>7개 질문으로 목표, 예산, 민감도, 시간대를 먼저 정리</li>
                <li>상담 전에 무엇을 말해야 하는지 요약을 보고 준비</li>
                <li>원하면 바로 카카오로 이어져 문의를 남김</li>
              </ul>
            </div>
            <div class="timeline-card">
              <h3>사업자 측</h3>
              <ul class="timeline">
                <li>운영 대시보드에서 시작/완료/CTA 지표 확인</li>
                <li>요약 카드로 고객 기준을 먼저 읽고 응대 우선순위 판단</li>
                <li>상담 후 실제 반복 설명 감소 여부를 비교</li>
                <li>7일 테스트 후 유료화 가능성을 평가</li>
              </ul>
            </div>
          </div>
        </article>

        <article class="surface">
          <div class="kicker">What changed</div>
          <h3>이번 구현 범위</h3>
          <ul class="check-list" style="margin-top:12px;">
            <li>단일 클리닉 프로토타입 → 클리닉/뷰티 듀얼 vertical 구조</li>
            <li>문진 결과 화면만 있던 상태 → 운영 대시보드와 제출 계측 추가</li>
            <li>정적 데모만 있던 상태 → Python 서버 기반 API/SQLite persistence 추가</li>
            <li>서버가 없을 때도 동작하도록 브라우저 fallback 저장 추가</li>
          </ul>
        </article>
      </div>
    </section>
  </div>

  <footer>
    <div class="container footer-row">
      <div>
        ${BRAND.name} · ${BRAND.email} · ${BRAND.phone}<br />
        이 앱은 의료 추천·병원 비교·송객을 하지 않고, 사업자 링크 앞단의 정보정리 실험만 다룹니다.
      </div>
      <div>
        권장 시작 링크<br />
        <a href="${buildIntakeLink('clinic', 'clinic-demo')}">clinic-demo</a> ·
        <a href="${buildIntakeLink('beauty', 'beauty-demo')}">beauty-demo</a>
      </div>
    </div>
  </footer>
`;
