export const BRAND = {
  name: '프리체크인',
  domain: 'precheckin.pages.dev',
  email: 'samwoose@gmail.com',
  phone: '010-7574-9857',
  phoneHref: 'tel:010-7574-9857',
  kakaoChannelUrl: 'http://pf.kakao.com/_YYpMX',
  kakaoChatUrl: 'http://pf.kakao.com/_YYpMX/chat',
};

const clinicQuestions = [
  {
    id: 'interest',
    label: '어떤 상담에 가장 가깝나요?',
    help: '의학적 추천이 아니라, 상담 전에 우선순위를 정리하기 위한 질문입니다.',
    options: [
      { value: 'laser-hair-removal', title: '제모', description: '레이저 제모 중심으로 문의하려고 해요.' },
      { value: 'pigment-toning', title: '색소·토닝', description: '잡티, 톤, 색소 개선 관련 상담이 궁금해요.' },
      { value: 'acne-pore', title: '여드름·모공', description: '트러블, 흉터, 모공 개선을 먼저 알고 싶어요.' },
      { value: 'other-laser', title: '그 외 피부레이저', description: '리프팅 제외, 다른 피부레이저 범위를 보고 싶어요.' },
    ],
  },
  {
    id: 'area',
    label: '가장 먼저 이야기하고 싶은 부위는 어디인가요?',
    help: '상담실에서 먼저 확인해야 하는 부위를 좁히는 단계예요.',
    options: [
      { value: 'face', title: '얼굴', description: '얼굴 전반이나 얼굴 부위를 먼저 상담하고 싶어요.' },
      { value: 'underarm', title: '겨드랑이', description: '제모나 자극 민감도를 같이 보고 싶어요.' },
      { value: 'arms-legs', title: '팔·다리', description: '범위가 넓은 부위 상담이 우선이에요.' },
      { value: 'multiple', title: '여러 부위', description: '여러 부위를 한 번에 정리하고 싶어요.' },
    ],
  },
  {
    id: 'experience',
    label: '비슷한 시술 또는 상담 경험이 있나요?',
    help: '완전 처음인지, 이전 경험이 있는지에 따라 설명 깊이가 달라져요.',
    options: [
      { value: 'first-time', title: '완전 처음', description: '상담 흐름과 기본 설명부터 차근차근 알고 싶어요.' },
      { value: 'some-experience', title: '조금 해봤어요', description: '비슷한 상담이나 시술 경험이 있어요.' },
      { value: 'repeat-visitor', title: '반복 경험 있음', description: '비교와 차이를 빠르게 확인하고 싶어요.' },
      { value: 'not-sure', title: '잘 모르겠어요', description: '기억이 모호하거나 정리가 필요해요.' },
    ],
  },
  {
    id: 'budget',
    label: '이번 상담에서 생각하는 예산 범위가 있나요?',
    help: '정확한 견적이 아니라 상담 범위를 잡기 위한 기준입니다.',
    options: [
      { value: 'under-100k', title: '10만원 이하', description: '가볍게 시작할 수 있는 범위를 먼저 보고 싶어요.' },
      { value: '100k-300k', title: '10만~30만원', description: '현실적인 첫 상담 범위를 생각하고 있어요.' },
      { value: '300k-500k', title: '30만~50만원', description: '효과와 범위를 같이 보고 싶어요.' },
      { value: 'flexible', title: '상담 후 결정', description: '예산보다 적합한 방식 설명이 먼저 필요해요.' },
    ],
  },
  {
    id: 'sensitivity',
    label: '통증·자극에는 어느 정도 민감한가요?',
    help: '상담 포인트를 미리 맞추기 위한 기준입니다.',
    options: [
      { value: 'very-sensitive', title: '많이 민감함', description: '자극, 통증, 회복 설명을 자세히 듣고 싶어요.' },
      { value: 'average', title: '보통', description: '일반적인 설명이면 충분할 것 같아요.' },
      { value: 'not-sensitive', title: '크게 상관없음', description: '효율과 결과 설명이 더 중요해요.' },
      { value: 'not-sure', title: '아직 모르겠음', description: '비교 설명을 듣고 판단하고 싶어요.' },
    ],
  },
  {
    id: 'downtime',
    label: '붉어짐이나 일상 불편은 얼마나 허용 가능한가요?',
    help: '일정과 회복 기준을 미리 맞추기 위한 질문입니다.',
    options: [
      { value: 'none', title: '거의 없음', description: '일상 방해가 거의 없는 흐름을 먼저 보고 싶어요.' },
      { value: 'short', title: '1~2일 가능', description: '짧은 회복은 감수할 수 있어요.' },
      { value: 'flexible', title: '며칠 가능', description: '효과 설명이 좋다면 일정 조정이 가능해요.' },
      { value: 'not-sure', title: '잘 모르겠음', description: '상담받고 결정하고 싶어요.' },
    ],
  },
  {
    id: 'availability',
    label: '상담 또는 방문은 언제가 가장 편한가요?',
    help: '상담실에서 가능한 시간대를 미리 맞추기 위한 질문입니다.',
    options: [
      { value: 'weekday-day', title: '평일 낮', description: '낮 시간 상담이 가장 편해요.' },
      { value: 'weekday-evening', title: '평일 저녁', description: '퇴근 후나 저녁 시간이 더 좋아요.' },
      { value: 'weekend', title: '주말', description: '주말 중심으로 움직이는 편이에요.' },
      { value: 'flexible', title: '유동적', description: '가능 시간대를 조율하면 됩니다.' },
    ],
  },
];

const beautyQuestions = [
  {
    id: 'goal',
    label: '이번 예약 전에 가장 먼저 정리하고 싶은 건 무엇인가요?',
    help: '뷰티샵 상담 전에 고객 기대치를 정리하기 위한 질문입니다.',
    options: [
      { value: 'program-advice', title: '프로그램 방향', description: '어떤 관리가 맞는지 범위를 먼저 알고 싶어요.' },
      { value: 'pricing-fit', title: '예산 맞춤', description: '예산 안에서 가능한 옵션을 먼저 확인하고 싶어요.' },
      { value: 'time-fit', title: '시간 맞춤', description: '소요시간과 방문 가능 시간을 맞추는 게 중요해요.' },
      { value: 'first-visit-help', title: '처음 방문 도움', description: '처음이라 어떤 흐름인지 안내가 필요해요.' },
    ],
  },
  {
    id: 'area',
    label: '가장 우선순위가 높은 부위 또는 고민은 무엇인가요?',
    help: '상담 메시지를 더 빠르게 맞추기 위한 기준이에요.',
    options: [
      { value: 'face-care', title: '얼굴 관리', description: '피부결, 수분, 진정 등 얼굴 중심 고민이에요.' },
      { value: 'body-care', title: '바디·라인', description: '바디 케어나 라인 중심 상담이 필요해요.' },
      { value: 'waxing-hair', title: '왁싱·제모', description: '부위와 민감도를 먼저 상의하고 싶어요.' },
      { value: 'multiple', title: '여러 고민', description: '한 가지보다 복합적으로 정리하고 싶어요.' },
    ],
  },
  {
    id: 'visitHistory',
    label: '비슷한 관리나 상담을 받아본 적이 있나요?',
    help: '첫 방문인지, 비교 상담인지에 따라 톤이 달라집니다.',
    options: [
      { value: 'first-visit', title: '처음 방문', description: '처음이라 전체 흐름부터 알고 싶어요.' },
      { value: 'same-category', title: '비슷한 경험 있음', description: '이전 경험과 비교해보고 싶어요.' },
      { value: 'regular', title: '주기적으로 받음', description: '유지 관리 차원에서 상담하려고 해요.' },
      { value: 'not-sure', title: '잘 모르겠음', description: '정리가 필요해요.' },
    ],
  },
  {
    id: 'budget',
    label: '이번 방문에서 생각하는 예산 범위가 있나요?',
    help: '상품 추천이 아니라 상담 범위 정리를 위한 질문입니다.',
    options: [
      { value: 'under-50k', title: '5만원 이하', description: '가볍게 테스트할 수 있는 범위를 원해요.' },
      { value: '50k-100k', title: '5만~10만원', description: '현실적인 첫 방문 범위를 생각하고 있어요.' },
      { value: '100k-200k', title: '10만~20만원', description: '조금 더 넓은 옵션도 고려할 수 있어요.' },
      { value: 'flexible', title: '상담 후 결정', description: '예산보다 설명을 듣고 결정하고 싶어요.' },
    ],
  },
  {
    id: 'sensitivity',
    label: '피부 민감도나 불편 요소는 어떤 편인가요?',
    help: '민감도와 후관리 설명 필요도를 미리 파악합니다.',
    options: [
      { value: 'very-sensitive', title: '많이 민감함', description: '자극과 후관리 설명이 중요해요.' },
      { value: 'average', title: '보통', description: '일반적인 설명이면 충분해요.' },
      { value: 'not-sensitive', title: '크게 민감하지 않음', description: '효율과 결과 설명이 더 중요해요.' },
      { value: 'not-sure', title: '잘 모르겠음', description: '상담하며 기준을 잡고 싶어요.' },
    ],
  },
  {
    id: 'schedule',
    label: '관리받기 편한 시간대는 언제인가요?',
    help: '예약 전 가용 시간대를 맞추는 단계예요.',
    options: [
      { value: 'weekday-day', title: '평일 낮', description: '낮 시간이 가장 유연해요.' },
      { value: 'weekday-evening', title: '평일 저녁', description: '퇴근 후 시간이 좋아요.' },
      { value: 'weekend', title: '주말', description: '주말 중심으로 예약을 잡아요.' },
      { value: 'flexible', title: '유동적', description: '조율 가능해요.' },
    ],
  },
  {
    id: 'concern',
    label: '상담 전에 꼭 전달하고 싶은 걱정이 있나요?',
    help: '기대치 mismatch를 줄이기 위한 마지막 체크입니다.',
    options: [
      { value: 'pain-concern', title: '아프거나 불편할까 걱정', description: '시술/관리 중 불편감 설명이 중요해요.' },
      { value: 'results-concern', title: '효과 차이가 걱정', description: '어느 정도 기대할 수 있는지 궁금해요.' },
      { value: 'time-concern', title: '시간 맞추기가 걱정', description: '예약과 소요시간이 가장 중요해요.' },
      { value: 'need-guidance', title: '무엇을 물어봐야 할지 모르겠음', description: '상담 질문 자체를 정리하고 싶어요.' },
    ],
  },
];

export const VERTICALS = {
  clinic: {
    slug: 'clinic',
    label: '의원 피부과',
    shortLabel: '클리닉',
    heroTitle: '의원 피부과 문의를 상담 전에 정리하는 파일럿',
    heroDescription: '환자가 예약 전 핵심 정보를 먼저 정리하면 상담실장은 반복 설명을 줄이고, 상담 품질을 높일 수 있는지 검증합니다.',
    businessBuyer: '상담실장 / 운영팀 / 원장',
    honesty: '현재 pain 가설은 내부 문서로 강하지만, 실제 지불 의사는 아직 파일럿으로 검증해야 합니다.',
    pains: [
      '예약 전 문의에서 같은 설명이 반복된다.',
      '예산·부위·민감도 기준이 정리되지 않은 리드가 많다.',
      '상담까지 왔는데 니즈가 안 맞는 경우가 섞인다.',
    ],
    customerJourney: [
      '카톡채널 또는 예약 링크 앞단에서 사전 체크인 진입',
      '관심 시술군, 부위, 예산, 민감도, 방문 가능 시간 입력',
      '고객용 준비 요약을 확인하고 상담 질문을 정리',
    ],
    operatorJourney: [
      '상담실은 요약 카드로 핵심 정보를 먼저 본다.',
      '첫 3~5분 반복 설명 감소 여부를 체감 지표로 확인한다.',
      '상담 후 파일럿 유지 의향을 결정한다.',
    ],
    successMetrics: [
      '상담 시작 전 고객 정보 파악 시간이 줄었는가',
      '부적합 문의를 더 빨리 구분했는가',
      '상담실이 “계속 써볼 수 있다”고 말했는가',
    ],
    patientSummaryLabel: '상담 준비 요약',
    operatorSummaryLabel: '상담실장 요약 카드',
    disclaimer: '이 흐름은 의학적 추천이나 병원 비교가 아니라 상담 전 정보 정리만 다룹니다.',
    adminIntro: '클리닉 트랙은 상담 효율화와 리드 정리 가설을 검증합니다.',
    questions: clinicQuestions,
  },
  beauty: {
    slug: 'beauty',
    label: '뷰티 사업자',
    shortLabel: '뷰티',
    heroTitle: '뷰티샵 예약 전 기대치 정리를 검증하는 파일럿',
    heroDescription: '상담 전에 목표·예산·시간·민감도를 정리해서 DM/카톡 반복 응대를 줄이고 예약 적합도를 높일 수 있는지 테스트합니다.',
    businessBuyer: '샵 운영자 / 실장 / 원장',
    honesty: '뷰티 트랙은 의료 리스크는 적지만, 현재 문서와 프로토타입이 적어 실제 반응을 새로 검증해야 합니다.',
    pains: [
      '고객이 원하는 결과와 예산을 정리하지 않은 채 문의한다.',
      '카톡·DM 응대가 길어지고 예약 적합도 판단이 늦어진다.',
      '첫 방문 고객의 기대치 mismatch가 생기기 쉽다.',
    ],
    customerJourney: [
      '샵의 카톡/예약 링크 앞단에서 사전 체크인 시작',
      '목표, 부위, 예산, 민감도, 시간대를 먼저 정리',
      '상담 전에 무엇을 물어볼지와 준비 포인트 확인',
    ],
    operatorJourney: [
      '운영자는 고객의 목적과 예산을 요약 카드로 먼저 확인한다.',
      '예약 적합도와 후속 응대 우선순위를 더 빠르게 판단한다.',
      '반복 DM 감소와 예약 전환 개선 가능성을 점검한다.',
    ],
    successMetrics: [
      '상담 DM/카톡 길이가 줄었는가',
      '예약 적합도가 좋아졌는가',
      '운영자가 계속 테스트해볼 의향이 있는가',
    ],
    patientSummaryLabel: '예약 전 준비 요약',
    operatorSummaryLabel: '운영자 상담 카드',
    disclaimer: '이 흐름은 의료 추천이 아니라 예약 전 기대치와 상담 포인트 정리용입니다.',
    adminIntro: '뷰티 트랙은 예약 전 기대치 정리와 응대 효율 가설을 검증합니다.',
    questions: beautyQuestions,
  },
};

export const BUSINESSES = {
  'clinic-demo': {
    slug: 'clinic-demo',
    vertical: 'clinic',
    name: '프리체크인 클리닉 데모',
    headline: '의원 피부과용 사전 체크인 링크',
    intro: '카톡채널·예약 링크 앞단에 붙여 상담 전에 고객 기준을 먼저 정리하는 데모입니다.',
    ctaLabel: '카카오톡으로 파일럿 문의',
  },
  'beauty-demo': {
    slug: 'beauty-demo',
    vertical: 'beauty',
    name: '프리체크인 뷰티 데모',
    headline: '뷰티샵용 사전 체크인 링크',
    intro: '샵 상담 전에 목표와 예산, 시간대를 먼저 정리하는 데모입니다.',
    ctaLabel: '카카오톡으로 테스트 문의',
  },
};

export function getVertical(slug) {
  return VERTICALS[slug] || VERTICALS.clinic;
}

export function getBusiness(slug, fallbackVertical = 'clinic') {
  if (slug && BUSINESSES[slug]) return BUSINESSES[slug];
  return fallbackVertical === 'beauty' ? BUSINESSES['beauty-demo'] : BUSINESSES['clinic-demo'];
}

export function getDisplayValue(verticalSlug, questionId, value) {
  const vertical = getVertical(verticalSlug);
  const question = vertical.questions.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.value === value);
  return option ? option.title : value || '-';
}

export function buildPatientInsights(verticalSlug, answers) {
  const vertical = getVertical(verticalSlug);

  if (verticalSlug === 'beauty') {
    return {
      headline: `이번 상담은 ${getDisplayValue(verticalSlug, 'goal', answers.goal)} / ${getDisplayValue(verticalSlug, 'budget', answers.budget)} / ${getDisplayValue(verticalSlug, 'schedule', answers.schedule)} 중심으로 준비하면 좋아요.`,
      bullets: [
        `가장 먼저 말할 고민: ${getDisplayValue(verticalSlug, 'area', answers.area)}`,
        `민감도와 주의 포인트: ${getDisplayValue(verticalSlug, 'sensitivity', answers.sensitivity)}`,
        `미리 이야기할 걱정: ${getDisplayValue(verticalSlug, 'concern', answers.concern)}`,
      ],
      prepQuestions: [
        '이번 관리에서 가장 기대하는 변화는 무엇인가요?',
        '예산 안에서 어떤 옵션 차이가 있는지 물어보세요.',
        '예약 시간과 후관리 주의사항을 같이 확인하세요.',
      ],
    };
  }

  return {
    headline: `이번 상담은 ${getDisplayValue(verticalSlug, 'interest', answers.interest)} / ${getDisplayValue(verticalSlug, 'budget', answers.budget)} / ${getDisplayValue(verticalSlug, 'downtime', answers.downtime)} 기준으로 준비하면 좋아요.`,
    bullets: [
      `가장 먼저 이야기할 부위: ${getDisplayValue(verticalSlug, 'area', answers.area)}`,
      `민감도와 설명 깊이: ${getDisplayValue(verticalSlug, 'sensitivity', answers.sensitivity)}`,
      `방문 가능 시간: ${getDisplayValue(verticalSlug, 'availability', answers.availability)}`,
    ],
    prepQuestions: [
      '예상 횟수와 간격은 어느 정도인지 물어보세요.',
      '통증이나 자극 관리 방법을 확인하세요.',
      '회복 시 주의사항과 일정 조정 가능성을 물어보세요.',
    ],
  };
}

export function buildOperatorFlags(verticalSlug, answers) {
  if (verticalSlug === 'beauty') {
    return [
      `우선 목적: ${getDisplayValue(verticalSlug, 'goal', answers.goal)}`,
      `핵심 부위/고민: ${getDisplayValue(verticalSlug, 'area', answers.area)}`,
      `예산 감도: ${getDisplayValue(verticalSlug, 'budget', answers.budget)}`,
      `상담 시 주의: ${getDisplayValue(verticalSlug, 'concern', answers.concern)}`,
    ];
  }

  return [
    `관심 시술군: ${getDisplayValue(verticalSlug, 'interest', answers.interest)}`,
    `부위 우선순위: ${getDisplayValue(verticalSlug, 'area', answers.area)}`,
    `예산 감도: ${getDisplayValue(verticalSlug, 'budget', answers.budget)}`,
    `회복 기준: ${getDisplayValue(verticalSlug, 'downtime', answers.downtime)}`,
  ];
}
