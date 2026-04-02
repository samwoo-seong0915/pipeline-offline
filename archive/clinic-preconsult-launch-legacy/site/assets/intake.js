import { BRAND, QUESTIONS, WEDGE, buildCustomerSummary, buildOperatorSummary, getDisplayValue } from './config.js';
import { buildAdminLink, copyText, createSessionSeed, completeSession, resolveExperience, saveSessionProgress, startSession, trackCtaClick } from './shared.js';

const app = document.getElementById('app');
const { businessName } = resolveExperience();
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
          <div class="kicker">${businessName}</div>
          <h1 class="section-heading" style="margin-top:8px;">예약 전에 기대치와 적합도를 먼저 정리합니다.</h1>
          <p class="section-sub">샵에 문의하기 전에 지금 무엇이 중요한지 먼저 정리해두면 대화가 빨라집니다.</p>
          <div class="notice-banner">추천이나 자동판정이 아니라, 예약 전 응대 포인트를 정리하는 단계입니다.</div>
        </div>

        <div class="question-card">
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill" style="width:${progressValue}%;"></div></div>
            <div class="progress-label">${state.stepIndex + 1} / ${QUESTIONS.length} 단계</div>
          </div>

          <div class="question-top">
            <div class="pill">뷰티샵용 wedge</div>
            <a class="mini-link" href="${buildAdminLink()}">운영 대시보드 보기</a>
          </div>

          <h2 class="question-title">${question.label}</h2>
          <p class="question-help">${question.help}</p>

          <div class="options-grid">
            ${question.options.map((option) => `
              <button class="option-button ${currentValue === option.value ? 'selected' : ''}" type="button" data-q="${question.id}" data-v="${option.value}">
                <div class="option-title">${option.title}</div>
                <div class="option-description">${option.description}</div>
              </button>
            `).join('')}
          </div>

          <div class="nav-actions">
            <button class="btn btn-secondary" type="button" id="backButton" ${state.stepIndex === 0 ? 'disabled' : ''}>이전 질문</button>
            <div class="mini-link">지금 목표는 “이 고객을 어떻게 응대해야 하나?”를 더 빨리 판단하는 것입니다.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.option-button').forEach((button) => {
    button.addEventListener('click', async () => {
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

  document.getElementById('backButton')?.addEventListener('click', () => {
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
  `).join('');
}

function buildOperatorCardText(operatorSummary) {
  return [
    `[${WEDGE.businessName} 응대 카드]`,
    `session_id: ${session.sessionId}`,
    `작성 시각: ${new Date().toLocaleString('ko-KR')}`,
    '',
    ...operatorSummary.priority,
    ...operatorSummary.followup,
    '',
    ...QUESTIONS.map((question) => `${question.label}: ${getDisplayValue(question.id, state.answers[question.id])}`),
  ].join('\n');
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
          <h1 class="section-heading" style="margin-top:14px;">이제 샵과 더 빠르게 대화할 준비가 됐어요.</h1>
          <p class="section-sub">고객은 무엇을 먼저 말해야 하는지, 사업자는 무엇을 먼저 답해야 하는지 한 화면에 정리됩니다.</p>
        </div>

        <div class="tab-row">
          <button class="tab-button active" type="button" data-tab="customer">고객이 보는 요약</button>
          <button class="tab-button" type="button" data-tab="operator">사업자가 보는 카드</button>
        </div>

        <section class="result-card" id="customerTab">
          <h3>${customerSummary.headline}</h3>
          <ul class="summary-list" style="margin-top:14px;">
            ${customerSummary.bullets.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="highlight-box" style="margin-top:16px;">
            <div class="kicker">상담 전에 먼저 물어볼 것</div>
            <ul class="check-list" style="margin-top:10px;">
              ${customerSummary.questions.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <div class="surface" style="margin-top:16px; box-shadow:none;">
            <div class="kicker">내가 정리한 기준</div>
            ${buildSummaryRows()}
          </div>
        </section>

        <section class="result-card" id="operatorTab" style="display:none;">
          <h3>샵 운영자가 바로 볼 응대 카드</h3>
          <div class="two-col" style="margin-top:14px;">
            <div class="surface" style="box-shadow:none;">
              <div class="kicker">우선순위</div>
              <ul class="check-list" style="margin-top:10px;">
                ${operatorSummary.priority.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="surface" style="box-shadow:none;">
              <div class="kicker">후속 메시지용 포인트</div>
              <ul class="check-list" style="margin-top:10px;">
                ${operatorSummary.followup.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="surface" style="margin-top:16px; box-shadow:none;">
            <div class="kicker">전체 입력</div>
            ${buildSummaryRows()}
          </div>
        </section>

        <div class="surface">
          <div class="button-row">
            <a class="btn btn-kakao" id="kakaoButton" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">샵에 바로 문의하기</a>
            <button class="btn btn-secondary" id="copyButton" type="button">응대 카드 복사</button>
            <a class="btn btn-secondary" href="${buildAdminLink()}">운영 대시보드 열기</a>
          </div>
          <div class="mini-link" style="margin-top:12px;">session_id: <span class="inline-code">${session.sessionId}</span></div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      document.getElementById('customerTab').style.display = tab === 'customer' ? 'block' : 'none';
      document.getElementById('operatorTab').style.display = tab === 'operator' ? 'block' : 'none';
    });
  });

  document.getElementById('copyButton').addEventListener('click', async () => {
    await copyText(operatorCardText);
    const button = document.getElementById('copyButton');
    const original = button.textContent;
    button.textContent = '복사 완료';
    setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });

  document.getElementById('kakaoButton').addEventListener('click', () => {
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
