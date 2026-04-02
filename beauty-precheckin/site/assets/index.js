import { BRAND, WEDGE } from "./config.js";
import { buildIntakeLink } from "./shared.js";

const app = document.getElementById("app");

app.innerHTML = `
  <div class="page-shell">
    <section class="hero">
      <div class="container hero-grid">
        <article class="card hero-copy">
          <span class="badge">문제성 피부·페이셜 관리실용</span>
          <h1>카카오 상담 전에<br />고객 피부 고민부터 먼저 정리받으세요.</h1>
          <p>${WEDGE.subheadline}</p>
          <ul class="hero-list">
            ${WEDGE.operatorValue.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="button-row">
            <a class="btn btn-primary" href="${buildIntakeLink()}">고객 문진 체험하기</a>
            <a class="btn btn-kakao" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오로 이야기하기</a>
          </div>
          <div class="notice-banner">
            추천기나 자동판정 도구가 아닙니다. 상담 전에 피부 고민·예산·시간대를 먼저 정리해서
            <strong>운영자가 첫 응대를 더 빠르게 할 수 있게 돕는 도구</strong>입니다.
          </div>
        </article>

        <aside class="card hero-side">
          <div class="metric-card">
            <div class="kicker">이런 문의가 반복되나요?</div>
            <h3>“트러블 관리 받고 싶은데 얼마예요?”</h3>
            <p>고객이 피부 고민, 예산, 가능한 시간대를 정리하지 않은 채 문의하면 카카오 첫 응대가 길어집니다.</p>
          </div>
          <div class="metric-card">
            <div class="kicker">누구를 위한 도구인가요?</div>
            <h3>${WEDGE.buyer}</h3>
            <p>소형~중형 관리실에서 문제성 피부 상담과 첫 방문 응대가 잦은 곳을 먼저 겨냥합니다.</p>
          </div>
          <div class="metric-card">
            <div class="kicker">고객은 무엇을 하나요?</div>
            <h3>5개 질문만 먼저 답합니다</h3>
            <p>피부 고민, 원하는 방향, 예산, 시간대, 민감도만 먼저 정리합니다.</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="container panel-grid">
        <article class="surface">
          <div class="kicker">고객 입력</div>
          <h3>상담 전에 먼저 적는 5가지</h3>
          <ul class="check-list" style="margin-top:14px;">
            <li>가장 중요한 피부 고민</li>
            <li>이번 방문에서 원하는 방향</li>
            <li>예산 범위</li>
            <li>가능한 시간대</li>
            <li>민감도 / 자극 걱정</li>
          </ul>
        </article>

        <article class="surface">
          <div class="kicker">관리실이 받는 것</div>
          <h3>첫 응대 판단에 필요한 요약 카드</h3>
          <ul class="check-list" style="margin-top:14px;">
            <li>무엇부터 답해야 하는지</li>
            <li>예약 적합도가 높은지</li>
            <li>예산과 시간대가 맞는지</li>
            <li>안심 메시지를 먼저 줘야 하는지</li>
          </ul>
        </article>
      </div>
    </section>
  </div>

  <footer>
    <div class="container footer-row">
      <div>
        ${BRAND.name} · ${BRAND.email} · ${BRAND.phone}<br />
        문제성 피부·페이셜 관리실용 예약 전 리드 정리 프로토타입
      </div>
      <div>
        <a href="${BRAND.kakaoChannelUrl}" target="_blank" rel="noreferrer">카카오 채널</a>
      </div>
    </div>
  </footer>
`;
