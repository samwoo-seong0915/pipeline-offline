import { buildOperatorFlags, buildPatientInsights, getDisplayValue } from './config.js';
import {
  BRAND,
} from './config.js';
import {
  buildAdminLink,
  copyText,
  createSessionSeed,
  resolveExperience,
  saveSessionProgress,
  completeSession,
  startSession,
  trackCtaClick,
} from './shared.js';

const app = document.getElementById('app');
const { vertical, business } = resolveExperience();
const session = createSessionSeed(vertical.slug, business.slug);
const state = {
  stepIndex: 0,
  answers: {},
  completed: false,
};

function renderQuestion() {
  const question = vertical.questions[state.stepIndex];
  const currentValue = state.answers[question.id];
  const progressValue = ((state.stepIndex + 1) / vertical.questions.length) * 100;

  app.innerHTML = `
    <div class="page-shell">
      <div class="container intake-shell">
        <div class="surface">
          <div class="kicker">${business.name}</div>
          <h1 class="section-heading" style="margin-top:8px;">${vertical.heroTitle}</h1>
          <p class="section-sub">${business.intro}</p>
          <div class="notice-banner">${vertical.disclaimer}</div>
        </div>

        <div class="question-card">
          <div class="progress-wrap">
            <div class="progress-track"><div class="progress-fill" style="width:${progressValue}%;"></div></div>
            <div class="progress-label">${state.stepIndex + 1} / ${vertical.questions.length} 단계</div>
          </div>

          <div class="question-top">
            <div>
              <div class="pill">${vertical.label}</div>
            </div>
            <a class="mini-link" href="${buildAdminLink(vertical.slug, business.slug)}">운영 대시보드 보기</a>
          </div>

          <h2 class="question-title">${question.label}</h2>
          <p class="question-help">${question.help}</p>

          <div class="options-grid">
            ${question.options.map((option) => `
              <button
                class="option-button ${currentValue === option.value ? 'selected' : ''}"
                type="button"
                data-question-id="${question.id}"
                data-value="${option.value}"
              >
                <div class="option-title">${option.title}</div>
                <div class="option-description">${option.description}</div>
              </button>
            `).join('')}
          </div>

          <div class="nav-actions">
            <button class="btn btn-secondary" type="button" id="backButton" ${state.stepIndex === 0 ? 'disabled' : ''}>이전 질문</button>
            <div class="mini-link">${vertical.businessBuyer}이 먼저 보고 싶은 기준을 고객이 정리하는 단계입니다.</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.option-button').forEach((button) => {
    button.addEventListener('click', async () => {
      state.answers[button.dataset.questionId] = button.dataset.value;
      await saveSessionProgress({
        sessionId: session.sessionId,
        businessSlug: business.slug,
        businessName: business.name,
        vertical: vertical.slug,
        answers: state.answers,
      });

      if (state.stepIndex < vertical.questions.length - 1) {
        state.stepIndex += 1;
        renderQuestion();
      } else {
        await finishIntake();
      }
    });
  });

  const backButton = document.getElementById('backButton');
  if (backButton) {
    backButton.addEventListener('click', () => {
      if (state.stepIndex > 0) {
        state.stepIndex -= 1;
        renderQuestion();
      }
    });
  }
}

function buildSummaryRows() {
  return vertical.questions.map((question) => `
    <div class="summary-row">
      <div class="summary-label">${question.label}</div>
      <div class="summary-value">${getDisplayValue(vertical.slug, question.id, state.answers[question.id])}</div>
    </div>
  `).join('');
}

function buildBusinessSummaryText(flags) {
  const lines = [
    `[${business.name} 상담 카드]`,
    `vertical: ${vertical.slug}`,
    `session_id: ${session.sessionId}`,
    `작성 시각: ${new Date().toLocaleString('ko-KR')}`,
    '',
    ...flags,
    '',
    ...vertical.questions.map((question) => `${question.label}: ${getDisplayValue(vertical.slug, question.id, state.answers[question.id])}`),
  ];
  return lines.join('\n');
}

async function finishIntake() {
  const patientInsight = buildPatientInsights(vertical.slug, state.answers);
  const operatorFlags = buildOperatorFlags(vertical.slug, state.answers);
  const businessSummaryText = buildBusinessSummaryText(operatorFlags);

  state.completed = true;

  await completeSession({
    sessionId: session.sessionId,
    businessSlug: business.slug,
    businessName: business.name,
    vertical: vertical.slug,
    answers: state.answers,
    customerSummary: patientInsight,
    businessSummary: {
      flags: operatorFlags,
      text: businessSummaryText,
    },
  });

  renderResults(patientInsight, operatorFlags, businessSummaryText);
}

function renderResults(patientInsight, operatorFlags, businessSummaryText) {
  app.innerHTML = `
    <div class="page-shell">
      <div class="container intake-shell">
        <div class="surface">
          <div class="badge">${vertical.patientSummaryLabel}</div>
          <h1 class="section-heading" style="margin-top:14px;">정리가 끝났어요. 이제 상담 전에 핵심만 확인하면 됩니다.</h1>
          <p class="section-sub">${vertical.disclaimer}</p>
        </div>

        <div class="tab-row">
          <button class="tab-button active" type="button" data-tab="patient">고객이 보는 요약</button>
          <button class="tab-button" type="button" data-tab="operator">사업자가 보는 카드</button>
        </div>

        <div class="summary-pair">
          <section class="result-card" id="patientTab">
            <h3>${patientInsight.headline}</h3>
            <ul class="summary-list" style="margin-top:14px;">
              ${patientInsight.bullets.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <div class="highlight-box" style="margin-top:16px;">
              <div class="kicker">상담 전에 꼭 물어볼 질문</div>
              <ul class="check-list" style="margin-top:10px;">
                ${patientInsight.prepQuestions.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="surface" style="margin-top:16px; box-shadow:none;">
              <div class="kicker">입력한 내용</div>
              ${buildSummaryRows()}
            </div>
          </section>

          <section class="result-card" id="operatorTab" style="display:none;">
            <h3>${vertical.operatorSummaryLabel}</h3>
            <ul class="summary-list" style="margin-top:14px;">
              ${operatorFlags.map((item) => `<li>${item}</li>`).join('')}
            </ul>
            <div class="surface" style="margin-top:16px; box-shadow:none;">
              <div class="kicker">전체 카드</div>
              ${buildSummaryRows()}
            </div>
          </section>
        </div>

        <div class="surface">
          <div class="button-row">
            <a class="btn btn-kakao" id="kakaoButton" href="${BRAND.kakaoChatUrl}" target="_blank" rel="noreferrer">${business.ctaLabel}</a>
            <button class="btn btn-secondary" type="button" id="copyButton">상담 카드 복사</button>
            <a class="btn btn-secondary" href="${buildAdminLink(vertical.slug, business.slug)}">운영 대시보드 열기</a>
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
      document.getElementById('patientTab').style.display = tab === 'patient' ? 'block' : 'none';
      document.getElementById('operatorTab').style.display = tab === 'operator' ? 'block' : 'none';
    });
  });

  document.getElementById('copyButton').addEventListener('click', async () => {
    await copyText(businessSummaryText);
    const button = document.getElementById('copyButton');
    const previous = button.textContent;
    button.textContent = '복사 완료';
    setTimeout(() => {
      button.textContent = previous;
    }, 1600);
  });

  document.getElementById('kakaoButton').addEventListener('click', () => {
    trackCtaClick({
      sessionId: session.sessionId,
      businessSlug: business.slug,
      businessName: business.name,
      vertical: vertical.slug,
      answers: state.answers,
    });
  });
}

async function init() {
  app.innerHTML = `
    <div class="page-shell">
      <div class="container intake-shell">
        <div class="surface">
          <div class="badge">${business.headline}</div>
          <h1 class="section-heading" style="margin-top:14px;">${vertical.heroTitle}</h1>
          <p class="section-sub">${business.intro}</p>
        </div>
      </div>
    </div>
  `;

  await startSession({
    ...session,
    businessName: business.name,
  });

  renderQuestion();
}

init();
