import { BRAND, WEDGE } from './config.js';
import { buildAdminLink, buildIntakeLink } from './shared.js';

const app = document.getElementById('app');

app.innerHTML = `
  <div class="page-shell">
    <section class="hero">
      <div class="container hero-grid">
        <article class="card hero-copy">
          <span class="badge">뷰티샵용 예약 전 리드 정리 도구</span>
          <h1>“이 고객을 지금 어떻게 응대해야 하지?”<br />그 판단을 예약 전에 먼저 정리합니다.</h1>
          <p>${WEDGE.subheadline}</p>
          <ul class="hero-list">
            ${WEDGE.operatorValue.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="button-row">
            <a class="btn btn-primary" href="${buildIntakeLink()}">고객 흐름 체험하기</a>
            <a class="btn btn-secondary" href="${buildAdminLink()}">운영 대시보드 보기</a>
            <a class="btn btn-kakao" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오 채널 열기</a>
          </div>
          <div class="notice-banner">
            이 제품은 “무슨 시술이 맞나요?”를 답하는 추천기가 아닙니다.
            <strong>예약 전에 고객 기대치와 적합도를 정리해서 응대 시간과 예약 mismatch를 줄이는 도구</strong>입니다.
          </div>
        </article>

        <aside class="card hero-side">
          <div class="metric-card">
            <div class="kicker">우리가 먼저 검증할 것</div>
            <h3>진짜 pain은 예약 전 리드 정리인가?</h3>
            <p>뷰티샵 운영자가 “이건 바로 써보고 싶다”고 느끼는지부터 본다.</p>
          </div>
          <div class="metric-card">
            <div class="kicker">돈 내는 사람</div>
            <h3>${WEDGE.buyer}</h3>
            <p>첫 대상은 소형~중형 샵의 운영자/실장. 긴 설명보다 빠른 응대 개선에 민감한 곳을 본다.</p>
          </div>
          <div class="metric-card">
            <div class="kicker">측정 지표</div>
            <h3>시작 / 완료 / CTA 클릭</h3>
            <p>예쁜 UX보다 “실제로 끝까지 쓰는지, 바로 문의로 이어지는지”를 먼저 본다.</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container panel-grid">
        <article class="surface">
          <div class="kicker">고객 입력</div>
          <h3>예약 전에 먼저 적는 정보</h3>
          <ul class="check-list" style="margin-top:14px;">
            <li>원하는 부위 또는 목표</li>
            <li>예산 범위</li>
            <li>가능한 시간대</li>
            <li>민감도 / 걱정</li>
            <li>첫 방문인지 여부</li>
          </ul>
        </article>

        <article class="surface">
          <div class="kicker">사업자 출력</div>
          <h3>운영자가 바로 받는 것</h3>
          <ul class="check-list" style="margin-top:14px;">
            <li>첫 응대 포인트</li>
            <li>예약 적합도 힌트</li>
            <li>후속 메시지에 넣을 핵심 요약</li>
            <li>완료율 / CTA 클릭 데이터</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <article class="vertical-card">
          <div class="pill">현재 wedge</div>
          <h3>${WEDGE.headline}</h3>
          <p class="muted">시장은 의료보다 작을 수 있어도, 지금 당장 pain과 지불 의사를 검증하기엔 더 빠르고 덜 복잡합니다.</p>
          <div class="button-row">
            <a class="btn btn-primary" href="${buildIntakeLink()}">지금 테스트하기</a>
          </div>
        </article>

        <article class="vertical-card">
          <div class="pill">현재 상태</div>
          <h3>이전 의료/듀얼트랙 탐색은 정리했고, 이제 뷰티 한 방향으로 좁혔습니다.</h3>
          <p class="muted">다음 판단 기준은 하나입니다. “이 도구가 뷰티샵 운영자의 응대 시간을 실제로 줄여주고, 파일럿 문의까지 이어지나?”</p>
          <div class="button-row">
            <a class="btn btn-secondary" href="${buildAdminLink()}">데이터 보기</a>
          </div>
        </article>
      </div>
    </section>
  </div>

  <footer>
    <div class="container footer-row">
      <div>
        ${BRAND.name} · ${BRAND.email} · ${BRAND.phone}<br />
        뷰티샵 예약 전 리드 정리 실험용 프로토타입
      </div>
      <div>
        <a href="${BRAND.kakaoChannelUrl}" target="_blank" rel="noreferrer">카카오 채널</a>
      </div>
    </div>
  </footer>
`;
