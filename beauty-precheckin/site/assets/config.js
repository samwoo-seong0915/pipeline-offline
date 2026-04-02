export const BRAND = {
  name: "프리체크인",
  domain: "precheckin.pages.dev",
  email: "samwoose@gmail.com",
  phone: "010-7574-9857",
  phoneHref: "tel:010-7574-9857",
  kakaoChannelUrl: "http://pf.kakao.com/_YYpMX",
  kakaoChatUrl: "http://pf.kakao.com/_YYpMX/chat",
};

export const WEDGE = {
  vertical: "beauty",
  businessSlug: "esthetic-demo",
  businessName: "프리체크인 페이셜 에스테틱 데모",
  buyer: "문제성 피부·페이셜 관리실 운영자",
  headline: "문제성 피부·페이셜 관리실용 예약 전 리드 정리 도구",
  subheadline: "카카오 상담 전에 고객 피부 고민, 예산, 시간대, 민감도를 먼저 정리하면 첫 응대가 훨씬 빨라집니다.",
  operatorValue: [
    "카카오 첫 응대에서 같은 질문을 덜 반복한다",
    "예산·시간대가 안 맞는 문의를 더 빨리 구분한다",
    "첫 방문 고객에게 보낼 안내 메시지를 더 쉽게 정리한다",
  ],
};

export const QUESTIONS = [
  {
    id: "concern",
    label: "가장 먼저 이야기하고 싶은 피부 고민은 무엇인가요?",
    help: "상담 전에 가장 중요한 고민 한 가지를 먼저 정리하는 단계예요.",
    options: [
      { value: "acne", title: "트러블·여드름", description: "반복되는 트러블이나 진정 관리가 가장 급해요." },
      { value: "sensitivity", title: "민감성·붉어짐", description: "자극에 예민해서 조심스럽게 관리받고 싶어요." },
      { value: "dryness", title: "건조·피부결", description: "거칠고 푸석한 느낌을 먼저 개선하고 싶어요." },
      { value: "tone", title: "톤·칙칙함·자국", description: "톤과 자국, 맑은 인상이 중요해요." },
    ],
  },
  {
    id: "goal",
    label: "이번 방문에서 가장 원하는 방향은 무엇인가요?",
    help: "무슨 시술이 맞는지 추천받기보다, 이번 상담의 우선순위를 정리하는 질문입니다.",
    options: [
      { value: "calming", title: "민감 진정이 먼저예요", description: "자극을 줄이고 피부를 안정시키는 게 우선이에요." },
      { value: "basic-care", title: "기본 피부 컨디션을 끌어올리고 싶어요", description: "수분, 피부결, 전반적인 컨디션 관리가 중요해요." },
      { value: "brightening", title: "톤과 인상을 맑게 하고 싶어요", description: "칙칙함이나 자국이 가장 신경 쓰여요." },
      { value: "first-visit", title: "처음이라 전체 흐름부터 알고 싶어요", description: "샵 상담 방식과 관리 방향부터 확인하고 싶어요." },
    ],
  },
  {
    id: "budget",
    label: "이번 방문에서 생각하는 예산 범위가 있나요?",
    help: "정확한 견적이 아니라, 첫 응대 우선순위를 잡는 기준입니다.",
    options: [
      { value: "under-50k", title: "5만원 이하", description: "가볍게 시작할 수 있는 범위를 먼저 보고 싶어요." },
      { value: "50k-100k", title: "5만~10만원", description: "현실적인 첫 방문 범위를 생각하고 있어요." },
      { value: "100k-200k", title: "10만~20만원", description: "효과가 맞으면 조금 더 넓게 볼 수 있어요." },
      { value: "flexible", title: "상담 후 결정할게요", description: "예산보다 적합한 방향 설명이 더 중요해요." },
    ],
  },
  {
    id: "schedule",
    label: "방문하기 편한 시간대는 언제인가요?",
    help: "예약 적합도를 미리 판단하기 위한 질문입니다.",
    options: [
      { value: "weekday-day", title: "평일 낮", description: "낮 시간이 가장 여유로워요." },
      { value: "weekday-evening", title: "평일 저녁", description: "퇴근 후나 저녁 시간이 좋아요." },
      { value: "weekend", title: "주말", description: "주말 위주로 움직여요." },
      { value: "flexible", title: "조율 가능해요", description: "가능 시간대를 같이 맞추면 돼요." },
    ],
  },
  {
    id: "sensitivity",
    label: "민감도나 자극 걱정은 어느 정도 있나요?",
    help: "후관리 설명과 첫 응대 포인트를 미리 맞추는 단계입니다.",
    options: [
      { value: "very-sensitive", title: "많이 민감해요", description: "자극과 후관리 설명이 가장 중요해요." },
      { value: "average", title: "보통이에요", description: "일반적인 설명이면 충분해요." },
      { value: "not-sensitive", title: "크게 민감하지 않아요", description: "효과나 루틴 설명이 더 중요해요." },
      { value: "not-sure", title: "아직 잘 모르겠어요", description: "설명을 듣고 기준을 잡고 싶어요." },
    ],
  },
];

export function getDisplayValue(questionId, value) {
  const question = QUESTIONS.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.value === value);
  return option ? option.title : value || "-";
}

export function buildCustomerSummary(answers) {
  return {
    headline: `이번 문의는 ${getDisplayValue("concern", answers.concern)} / ${getDisplayValue("budget", answers.budget)} / ${getDisplayValue("schedule", answers.schedule)} 중심으로 정리됐어요.`,
    bullets: [
      `가장 기대하는 방향: ${getDisplayValue("goal", answers.goal)}`,
      `예산 기준: ${getDisplayValue("budget", answers.budget)}`,
      `민감도: ${getDisplayValue("sensitivity", answers.sensitivity)}`,
    ],
    questions: [
      "내 피부 고민 기준으로 가장 현실적인 첫 관리 방향이 무엇인지 물어보세요.",
      "예산 범위 안에서 어떤 차이가 나는지 물어보세요.",
      "민감도와 후관리에서 주의할 점을 먼저 확인하세요.",
    ],
  };
}

export function buildOperatorSummary(answers) {
  const fitSignals = [];
  if (answers.schedule === "flexible" || answers.schedule === "weekday-day") fitSignals.push("예약 조율이 비교적 쉬운 편");
  else fitSignals.push("피크 시간대 응대 가능성 있음");

  if (answers.budget === "flexible" || answers.budget === "100k-200k") fitSignals.push("가격 설명 확장 여지 있음");
  else fitSignals.push("예산 범위를 먼저 맞춰야 함");

  if (answers.sensitivity === "very-sensitive") fitSignals.push("안심 메시지와 후관리 설명 우선");

  return {
    priority: [
      `첫 응대 포인트: ${getDisplayValue("concern", answers.concern)}`,
      `원하는 방향: ${getDisplayValue("goal", answers.goal)}`,
      `예약 적합도 힌트: ${fitSignals.join(" / ")}`,
    ],
    followup: [
      `예산 기준: ${getDisplayValue("budget", answers.budget)}`,
      `가능 시간대: ${getDisplayValue("schedule", answers.schedule)}`,
      `민감도: ${getDisplayValue("sensitivity", answers.sensitivity)}`,
    ],
  };
}
