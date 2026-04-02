import { BRAND, QUESTIONS, WEDGE, buildCustomerSummary, buildOperatorSummary, getDisplayValue } from "./config.js";
import { copyText, createSessionSeed, completeSession, saveSessionProgress, startSession, trackCtaClick } from "./shared.js";

const app = document.getElementById("app");
const session = createSessionSeed();
const state = { stepIndex: 0, answers: {} };

function renderQuestion() {
  const question = QUESTIONS[state.stepIndex];
  const progressValue = ((state.stepIndex + 1) / QUESTIONS.length) * 100;
  const currentValue = state.answers[question.id];

  app.innerHTML = `
    <div class="page-shell">
      <div class="container intake-shell">
        <div class="surface">
          <div class="kicker">${WEDGE.businessName}</div>
          <h1 class="section-heading" style="margin-top:8px;">상담 전에 지금 중요한 기준만 먼저 정리해볼게요.</h1>
          <p class="section-sub">답변은 관리실이 첫 응대를 빠르게 하는 데만 쓰이고, 추천이나 자동판정 용도는 아닙니다.</p>
        </div>

        <div class="question-card">
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill" style="width:${progressValue}%;"></div></div>
            <div class="progress-label">${state.stepIndex + 1} / ${QUESTIONS.length} 단계</div>
          </div>

          <h2 class="question-title">${question.label}</h2>
          <p class="question-help">${question.help}</p>

          <div class="options-grid">
            ${question.options.map((option) => `
              <button class="option-button ${currentValue === option.value ? "selected" : ""}" type="button" data-q="${question.id}" data-v="${option.value}">
                <div class="option-title">${option.title}</div>
                <div class="option-description">${option.description}</div>
              </button>
            `).join("")}
          </div>

          <div class="nav-actions">
            <button class="btn btn-secondary" type="button" id="backButton" ${state.stepIndex === 0 ? "disabled" : ""}>이전 질문</button>
            <div class="mini-link">5개 질문만 답하면 관리실이 첫 응대를 더 빨리 할 수 있어요.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", async () => {
      state.answers[button.dataset.q] = button.dataset.v;
      await saveSessionProgress({
        sessionId: session.sessionId,
        businessSlug: WEDGE.businessSlug,
        businessName: WEDGE.businessName,
        vertical: WEDGE.vertical,
        answers: state.answers,
      });

      if (state.stepIndex < QUESTIONS.length - 1) {
        state.stepIndex += 1;
        renderQuestion();
      } else {
        await renderResult();
      }
    });
  });

  document.getElementById("backButton")?.addEventListener("click", () => {
    if (state.stepIndex > 0) {
      state.stepIndex -= 1;
      renderQuestion();
    }
  });
}

function buildSummaryRows() {
  return QUESTIONS.map((question) => `
    <div class="summary-row">
      <div class="summary-label">${question.label}</div>
      <div class="summary-value">${getDisplayValue(question.id, state.answers[question.id])}</div>
    </div>
  `).join("");
}

function buildOperatorCardText(operatorSummary) {
  return [
    `[${WEDGE.businessName} 응대 카드]`,
    `session_id: ${session.sessionId}`,
    `작성 시각: ${new Date().toLocaleString("ko-KR")}`,
    "",
    ...operatorSummary.priority,
    ...operatorSummary.followup,
    "",
    ...QUESTIONS.map((question) => `${question.label}: ${getDisplayValue(question.id, state.answers[question.id])}`),
  ].join("\n");
}

async function renderResult() {
  const customerSummary = buildCustomerSummary(state.answers);
  const operatorSummary = buildOperatorSummary(state.answers);
  const operatorCardText = buildOperatorCardText(operatorSummary);

  await completeSession({
    sessionId: session.sessionId,
    businessSlug: WEDGE.businessSlug,
    businessName: WEDGE.businessName,
    vertical: WEDGE.vertical,
    answers: state.answers,
    customerSummary,
    businessSummary: {
      priority: operatorSummary.priority,
      followup: operatorSummary.followup,
      text: operatorCardText,
    },
  });

  app.innerHTML = `
    <div class="page-shell">
      <div class="container intake-shell">
        <div class="surface">
          <div class="badge">정리 완료</div>
          <h1 class="section-heading" style="margin-top:14px;">이제 관리실과 더 빠르게 이야기할 수 있어요.</h1>
          <p class="section-sub">내 고민과 예산, 시간대가 먼저 정리돼서 상담이 훨씬 짧아질 수 있어요.</p>
        </div>

        <section class="result-card">
          <h3>${customerSummary.headline}</h3>
          <ul class="summary-list" style="margin-top:14px;">
            ${customerSummary.bullets.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <div class="highlight-box" style="margin-top:16px;">
            <div class="kicker">상담 전에 먼저 물어볼 것</div>
            <ul class="check-list" style="margin-top:10px;">
              ${customerSummary.questions.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div class="surface" style="margin-top:16px; box-shadow:none;">
            <div class="kicker">내가 정리한 기준</div>
            ${buildSummaryRows()}
          </div>
        </section>

        <div class="surface">
          <div class="button-row">
            <a class="btn btn-kakao" id="kakaoButton" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">카카오로 문의하기</a>
            <button class="btn btn-secondary" id="copyButton" type="button">관리실용 카드 복사</button>
          </div>
          <div class="mini-link" style="margin-top:12px;">session_id: <span class="inline-code">${session.sessionId}</span></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("copyButton").addEventListener("click", async () => {
    await copyText(operatorCardText);
    const button = document.getElementById("copyButton");
    const original = button.textContent;
    button.textContent = "복사 완료";
    setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });

  document.getElementById("kakaoButton").addEventListener("click", () => {
    trackCtaClick({
      sessionId: session.sessionId,
      businessSlug: WEDGE.businessSlug,
      businessName: WEDGE.businessName,
      vertical: WEDGE.vertical,
      answers: state.answers,
    });
  });
}

async function init() {
  await startSession(session);
  renderQuestion();
}

init();
