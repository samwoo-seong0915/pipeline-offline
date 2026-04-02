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
  buyer: "문제성 피부·페이셜 관리실 운영자 / 실장 / 원장",
  headline: "문제성 피부·페이셜 에스테틱용 예약 전 리드 정리 도구",
  subheadline: "고객은 예약 전 피부 고민, 예산, 가능 시간대, 민감도를 먼저 정리하고, 샵은 요약 카드로 받아 첫 응대 포인트와 예약 적합도를 더 빨리 판단합니다.",
  operatorValue: [
    "카카오/DM 첫 응대 시간을 줄인다",
    "예산·피부 고민이 안 맞는 리드를 더 빨리 구분한다",
    "첫 방문 고객에게 어떤 안내를 먼저 보낼지 정리할 수 있다",
  ],
  customerValue: [
    "피부 고민과 기대치를 먼저 정리한다",
    "예산과 시간대 기준으로 상담이 빨라진다",
    "민감성/트러블 걱정을 먼저 전달할 수 있다",
  ],
};

export const QUESTIONS = [
  {
    id: "goal",
    label: "이번 예약 전에 가장 먼저 정리하고 싶은 건 무엇인가요?",
    help: "무슨 시술이 맞는지 추천받기보다, 이번 상담의 우선순위를 먼저 정리하는 단계예요.",
    options: [
      { value: "trouble-calming", title: "트러블·민감 진정이 먼저예요", description: "예민함, 트러블, 붉어짐 쪽이 가장 신경 쓰여요." },
      { value: "texture-hydration", title: "피부결·수분 관리를 먼저 보고 싶어요", description: "전체 컨디션을 안정적으로 끌어올리고 싶어요." },
      { value: "tone-brightening", title: "톤·칙칙함·자국 고민이 커요", description: "얼굴 톤과 인상이 맑아 보이는 관리가 궁금해요." },
      { value: "first-visit", title: "처음이라 어떤 흐름인지부터 알고 싶어요", description: "샵 분위기와 상담 방식부터 확인하고 싶어요." },
    ],
  },
  {
    id: "concern",
    label: "가장 먼저 이야기하고 싶은 피부 고민은 무엇인가요?",
    help: "샵이 첫 응대에서 바로 파악해야 하는 핵심 고민입니다.",
    options: [
      { value: "acne", title: "트러블·여드름", description: "반복되는 트러블이나 진정 관리가 급해요." },
      { value: "sensitivity", title: "민감성·붉어짐", description: "자극에 예민해서 조심스럽게 관리받고 싶어요." },
      { value: "dryness", title: "건조·피부결", description: "거칠고 푸석한 느낌을 먼저 개선하고 싶어요." },
      { value: "tone", title: "톤·칙칙함·자국", description: "균일한 톤과 맑은 인상이 중요해요." },
    ],
  },
  {
    id: "visitHistory",
    label: "비슷한 피부관리나 상담을 받아본 적이 있나요?",
    help: "첫 방문인지, 비교 상담인지에 따라 샵의 응대 톤이 달라집니다.",
    options: [
      { value: "first-ever", title: "완전 처음이에요", description: "기초 설명부터 차근차근 듣고 싶어요." },
      { value: "some-experience", title: "비슷한 관리는 받아봤어요", description: "이번엔 차이점과 적합도를 비교하고 싶어요." },
      { value: "regular", title: "주기적으로 관리받아요", description: "유지 관리 기준으로 빠르게 상담하고 싶어요." },
      { value: "not-sure", title: "잘 모르겠어요", description: "기억이 모호하거나 정리가 먼저 필요해요." },
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
    label: "방문하거나 관리받기 편한 시간대는 언제인가요?",
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
  {
    id: "urgency",
    label: "언제까지 개선 체감을 원하시나요?",
    help: "급한 일정이 있는지에 따라 응대와 제안이 달라집니다.",
    options: [
      { value: "this-week", title: "이번 주 안에요", description: "가까운 일정이 있어서 빠른 관리가 필요해요." },
      { value: "this-month", title: "이번 달 안이면 돼요", description: "조금은 여유 있게 보고 싶어요." },
      { value: "ongoing", title: "꾸준히 관리하고 싶어요", description: "한 번보다 루틴 관리에 관심이 있어요." },
      { value: "not-sure", title: "상담하면서 정할게요", description: "우선 방향부터 알고 싶어요." },
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
    headline: `이번 문의는 ${getDisplayValue("goal", answers.goal)} / ${getDisplayValue("budget", answers.budget)} / ${getDisplayValue("schedule", answers.schedule)} 중심으로 정리됐어요.`,
    bullets: [
      `가장 먼저 말할 피부 고민: ${getDisplayValue("concern", answers.concern)}`,
      `방문 경험 기준: ${getDisplayValue("visitHistory", answers.visitHistory)}`,
      `민감도 / 시급성: ${getDisplayValue("sensitivity", answers.sensitivity)} / ${getDisplayValue("urgency", answers.urgency)}`,
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

  if (answers.visitHistory === "first-ever" || answers.sensitivity === "very-sensitive") fitSignals.push("기초 설명과 안심 메시지 우선");

  return {
    priority: [
      `첫 응대 포인트: ${getDisplayValue("goal", answers.goal)}`,
      `핵심 피부 고민: ${getDisplayValue("concern", answers.concern)}`,
      `예약 적합도 힌트: ${fitSignals.join(" / ")}`,
    ],
    followup: [
      `예산 기준: ${getDisplayValue("budget", answers.budget)}`,
      `가능 시간대: ${getDisplayValue("schedule", answers.schedule)}`,
      `민감도/시급성: ${getDisplayValue("sensitivity", answers.sensitivity)} / ${getDisplayValue("urgency", answers.urgency)}`,
    ],
  };
}
