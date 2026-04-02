export const BRAND = {
  name: '프리체크인',
  domain: 'precheckin.pages.dev',
  email: 'samwoose@gmail.com',
  phone: '010-7574-9857',
  phoneHref: 'tel:010-7574-9857',
  kakaoChannelUrl: 'http://pf.kakao.com/_YYpMX',
  kakaoChatUrl: 'http://pf.kakao.com/_YYpMX/chat',
};

export const WEDGE = {
  vertical: 'beauty',
  businessSlug: 'beauty-demo',
  businessName: '프리체크인 뷰티 데모',
  buyer: '뷰티샵 운영자 / 실장 / 원장',
  headline: '예약 전에 고객 기대치와 적합도를 먼저 정리하는 뷰티샵용 리드 정리 도구',
  subheadline: '고객은 예약 전 목표·예산·시간대·민감도를 먼저 정리하고, 사업자는 요약 카드로 받아 응대 우선순위와 예약 적합도를 더 빨리 판단합니다.',
  operatorValue: [
    '카카오/DM 첫 응대 시간을 줄인다',
    '예산·시간대가 안 맞는 리드를 더 빨리 구분한다',
    '예약 전에 어떤 후속 메시지를 보낼지 정리할 수 있다',
  ],
  customerValue: [
    '상담 전에 무엇을 원하는지 스스로 정리한다',
    '예산과 시간대 기준으로 대화가 빨라진다',
    '처음 방문 고객의 기대치 mismatch를 줄인다',
  ],
  metrics: [
    'start',
    'completed',
    'completionRate',
    'ctaClicks',
  ],
};

export const QUESTIONS = [
  {
    id: 'goal',
    label: '이번 예약 전에 가장 먼저 정리하고 싶은 건 무엇인가요?',
    help: '무엇을 받고 싶은지보다, 이번 문의의 우선순위를 정리하는 질문입니다.',
    options: [
      { value: 'program-advice', title: '어떤 관리가 맞는지 방향을 잡고 싶어요', description: '처음이라 전체 옵션 설명이 필요해요.' },
      { value: 'price-fit', title: '예산 안에서 가능한 범위를 알고 싶어요', description: '금액 기준으로 현실적인 선택지를 보고 싶어요.' },
      { value: 'time-fit', title: '시간 맞는 프로그램을 찾고 싶어요', description: '소요시간과 방문 가능한 시간대가 중요해요.' },
      { value: 'first-visit', title: '처음 방문이라 흐름부터 알고 싶어요', description: '샵 분위기와 상담 흐름을 먼저 확인하고 싶어요.' },
    ],
  },
  {
    id: 'area',
    label: '가장 우선순위가 높은 부위 또는 고민은 무엇인가요?',
    help: '샵에서 첫 응대 때 가장 먼저 파악하면 좋은 기준입니다.',
    options: [
      { value: 'face-care', title: '얼굴 관리', description: '피부결, 진정, 수분, 톤 정리 쪽이 우선이에요.' },
      { value: 'body-care', title: '바디·라인', description: '바디 케어나 라인 관리 상담이 먼저 필요해요.' },
      { value: 'waxing', title: '왁싱·제모', description: '부위와 민감도, 시간대 조율이 중요해요.' },
      { value: 'multiple', title: '여러 고민이 겹쳐 있어요', description: '무엇부터 해야 할지 같이 정리받고 싶어요.' },
    ],
  },
  {
    id: 'visitHistory',
    label: '비슷한 관리나 상담을 받아본 적이 있나요?',
    help: '첫 방문 고객인지, 비교 상담인지에 따라 응대 톤이 달라집니다.',
    options: [
      { value: 'first-ever', title: '완전 처음이에요', description: '기초 설명부터 듣고 싶어요.' },
      { value: 'some-experience', title: '비슷한 경험은 있어요', description: '이번엔 차이점 위주로 듣고 싶어요.' },
      { value: 'regular', title: '주기적으로 받아요', description: '유지 관리 기준으로 빠르게 상담하고 싶어요.' },
      { value: 'not-sure', title: '잘 모르겠어요', description: '내 상황을 먼저 정리해보고 싶어요.' },
    ],
  },
  {
    id: 'budget',
    label: '이번 방문에서 생각하는 예산 범위가 있나요?',
    help: '정확한 견적이 아니라 응대 우선순위를 잡는 기준입니다.',
    options: [
      { value: 'under-50k', title: '5만원 이하', description: '가볍게 시작 가능한 범위를 먼저 보고 싶어요.' },
      { value: '50k-100k', title: '5만~10만원', description: '현실적인 첫 방문 범위를 생각하고 있어요.' },
      { value: '100k-200k', title: '10만~20만원', description: '조금 더 넓은 옵션도 고려할 수 있어요.' },
      { value: 'flexible', title: '상담 후 결정할게요', description: '예산보다 설명을 먼저 듣고 싶어요.' },
    ],
  },
  {
    id: 'schedule',
    label: '방문하거나 관리받기 편한 시간대는 언제인가요?',
    help: '예약 적합도를 미리 판단하기 위한 질문입니다.',
    options: [
      { value: 'weekday-day', title: '평일 낮', description: '낮 시간이 가장 여유로워요.' },
      { value: 'weekday-evening', title: '평일 저녁', description: '퇴근 후나 저녁이 좋아요.' },
      { value: 'weekend', title: '주말', description: '주말 위주로 움직여요.' },
      { value: 'flexible', title: '조율 가능해요', description: '가능 시간대를 같이 맞추면 돼요.' },
    ],
  },
  {
    id: 'sensitivity',
    label: '민감도나 불편 요소는 어느 정도 신경 쓰이나요?',
    help: '후관리 설명과 응대 우선순위를 미리 맞추는 단계입니다.',
    options: [
      { value: 'very-sensitive', title: '많이 민감해요', description: '자극, 통증, 후관리 설명이 중요해요.' },
      { value: 'average', title: '보통이에요', description: '일반적인 설명이면 충분해요.' },
      { value: 'not-sensitive', title: '크게 민감하지 않아요', description: '효과나 속도가 더 중요해요.' },
      { value: 'not-sure', title: '아직 잘 모르겠어요', description: '설명을 듣고 기준을 잡고 싶어요.' },
    ],
  },
  {
    id: 'concern',
    label: '상담 전에 꼭 전달하고 싶은 걱정은 무엇인가요?',
    help: '후속 메시지와 응대 우선순위를 정하는 데 필요합니다.',
    options: [
      { value: 'pain-concern', title: '아프거나 불편할까 걱정돼요', description: '민감도와 후관리 설명이 더 필요해요.' },
      { value: 'results-concern', title: '효과 차이가 걱정돼요', description: '어떤 차이가 있는지 비교 설명이 중요해요.' },
      { value: 'time-concern', title: '시간이 맞을지 걱정돼요', description: '소요시간과 예약 가능 시간이 중요해요.' },
      { value: 'need-guidance', title: '무엇을 물어봐야 할지 모르겠어요', description: '상담 질문 자체를 정리받고 싶어요.' },
    ],
  },
];

export function getDisplayValue(questionId, value) {
  const question = QUESTIONS.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.value === value);
  return option ? option.title : value || '-';
}

export function buildCustomerSummary(answers) {
  return {
    headline: `이번 문의는 ${getDisplayValue('goal', answers.goal)} / ${getDisplayValue('budget', answers.budget)} / ${getDisplayValue('schedule', answers.schedule)} 중심으로 정리됐어요.`,
    bullets: [
      `가장 먼저 말할 고민: ${getDisplayValue('area', answers.area)}`,
      `방문 경험 기준: ${getDisplayValue('visitHistory', answers.visitHistory)}`,
      `민감도 / 걱정: ${getDisplayValue('sensitivity', answers.sensitivity)} / ${getDisplayValue('concern', answers.concern)}`,
    ],
    questions: [
      '내 예산 안에서 가장 현실적인 옵션이 무엇인지 물어보세요.',
      '가능한 시간대와 소요시간을 같이 확인하세요.',
      '민감도와 후관리에서 주의할 점을 먼저 물어보세요.',
    ],
  };
}

export function buildOperatorSummary(answers) {
  const fitSignals = [];

  if (answers.schedule === 'flexible' || answers.schedule === 'weekday-day') {
    fitSignals.push('예약 조율이 비교적 쉬운 편');
  } else {
    fitSignals.push('피크 시간대 응대 가능성 있음');
  }

  if (answers.budget === 'flexible' || answers.budget === '100k-200k') {
    fitSignals.push('가격 설명 확장 여지 있음');
  } else {
    fitSignals.push('예산 범위가 먼저 맞아야 함');
  }

  if (answers.concern === 'need-guidance' || answers.visitHistory === 'first-ever') {
    fitSignals.push('기초 설명과 흐름 안내 우선');
  }

  return {
    priority: [
      `첫 응대 포인트: ${getDisplayValue('goal', answers.goal)}`,
      `핵심 부위/고민: ${getDisplayValue('area', answers.area)}`,
      `예약 적합도 힌트: ${fitSignals.join(' / ')}`,
    ],
    followup: [
      `예산 기준: ${getDisplayValue('budget', answers.budget)}`,
      `가능 시간대: ${getDisplayValue('schedule', answers.schedule)}`,
      `민감도/걱정: ${getDisplayValue('sensitivity', answers.sensitivity)} / ${getDisplayValue('concern', answers.concern)}`,
    ],
  };
}
