// Advertisers and creatives. All businesses here are fictional.
// Every ad is labeled "Sponsored" in the UI and matched to context
// (the remittance app on the exchange-rate page, a bank on the Fed market).

export const advertisers = {
  bora: {
    name: 'Bora Remit', mark: 'BR', color: '#6B4BD8', kind: { en: 'Money transfer to Korea', kr: '한국 송금' },
    headline: { en: 'Send to Korea at ₩1,399. $0 fee on your first transfer.', kr: '₩1,399로 한국 송금. 첫 송금 수수료 $0.' },
    body: { en: 'Lock today’s rate for 24 hours. Arrives in Korean bank accounts in minutes. Korean-speaking support 7 days a week.', kr: '오늘 환율을 24시간 고정. 한국 계좌로 몇 분 만에 입금. 주 7일 한국어 상담.' },
    cta: { en: 'Get the rate', kr: '환율 확인' }, code: 'HANPAN0',
  },
  pacific: {
    name: 'Pacific Han Bank', mark: 'PH', color: '#0C5A8C', kind: { en: 'Korean-American community bank', kr: '한인 커뮤니티 은행' },
    headline: { en: 'Rates may fall. Lock 4.35% APY on a 12-month CD.', kr: '금리가 내려가기 전에. 12개월 CD 연 4.35% 확정.' },
    body: { en: 'Bilingual bankers in Koreatown, Fort Lee, Annandale and Duluth. FDIC insured. $1,000 minimum.', kr: '코리아타운, 포트리, 애넌데일, 둘루스 지점 이중언어 상담. FDIC 보호. 최소 $1,000.' },
    cta: { en: 'See CD rates', kr: 'CD 금리 보기' }, code: null,
  },
  gogi: {
    name: 'Gogi House KBBQ', mark: 'GH', color: '#C2410C', kind: { en: 'Korean BBQ · Koreatown LA', kr: '한식 바베큐 · LA 코리아타운' },
    headline: { en: 'Dodgers win = free gyeran-jjim for the table.', kr: '다저스 승리 = 테이블당 계란찜 무료.' },
    body: { en: 'Every game on 9 screens. Show your Hanpan app on game nights for 15% off. Reservations recommended for playoff games.', kr: '9개 스크린으로 모든 경기 중계. 경기 날 한판 앱을 보여주시면 15% 할인. 플레이오프 예약 권장.' },
    cta: { en: 'Reserve a table', kr: '예약하기' }, code: 'GAMENIGHT15',
  },
  hanbit: {
    name: 'Hanbit Mart', mark: '한빛', color: '#15803D', kind: { en: 'Korean grocery · 14 US stores', kr: '한인 마트 · 미국 14개 매장' },
    headline: { en: 'Gimjang season: napa cabbage 99¢/lb from Nov 20.', kr: '김장 시즌: 11월 20일부터 배추 파운드당 99¢.' },
    body: { en: 'Pre-order a gimjang kit with salted cabbage, gochugaru and jeotgal. Pepero Day bundles in store now.', kr: '절임배추, 고춧가루, 젓갈 김장 키트 사전 주문. 빼빼로데이 묶음 판매 중.' },
    cta: { en: 'See weekly deals', kr: '주간 특가 보기' }, code: null,
  },
  arirang: {
    name: 'Arirang Air', mark: 'AA', color: '#B91C1C', kind: { en: 'Airline · LAX, JFK, ATL → ICN', kr: '항공사 · LAX, JFK, ATL → 인천' },
    headline: { en: 'Home for Seollal? LAX → ICN from $689 round trip.', kr: '설날 귀국? LAX → 인천 왕복 $689부터.' },
    body: { en: 'Book by Nov 15 for Lunar New Year dates. Two free checked bags, Korean meals on every flight.', kr: '11월 15일까지 설 연휴 항공권 예약. 위탁 수하물 2개 무료, 전 노선 한식 기내식.' },
    cta: { en: 'Check fares', kr: '운임 확인' }, code: null,
  },
  dalbit: {
    name: 'Dalbit Skin', mark: '달빛', color: '#BE185D', kind: { en: 'K-beauty skincare', kr: 'K-뷰티 스킨케어' },
    headline: { en: 'The 3-step routine Seoul swears by. 20% off your first set.', kr: '서울이 사랑하는 3단계 루틴. 첫 세트 20% 할인.' },
    body: { en: 'Made in Korea, ships from LA in two days. Free samples with every order.', kr: '한국 제조, LA에서 2일 배송. 모든 주문에 샘플 증정.' },
    cta: { en: 'Shop the set', kr: '세트 보기' }, code: 'HANPAN20',
  },
  mira: {
    name: 'Mira Realty', mark: 'MR', color: '#0F766E', kind: { en: 'Real estate · Irvine & Fullerton', kr: '부동산 · 어바인 & 풀러턴' },
    headline: { en: 'If the Fed cuts, buyers come back. Get your home value in 60 seconds.', kr: '연준이 인하하면 매수자가 돌아옵니다. 60초 만에 집값 확인.' },
    body: { en: 'Korean-speaking agents. 312 homes sold in Orange County last year.', kr: '한국어 상담 에이전트. 작년 오렌지카운티 312채 거래.' },
    cta: { en: 'Get my estimate', kr: '시세 확인' }, code: null,
  },
  hans: {
    name: 'Han’s Tax & Accounting', mark: 'HT', color: '#374151', kind: { en: 'CPA · Fort Lee, NJ', kr: '회계사 · 뉴저지 포트리' },
    headline: { en: 'Sending money to parents in Korea? Know the gift-tax rules.', kr: '한국 부모님께 송금하시나요? 증여세 규정을 알아두세요.' },
    body: { en: 'Free 20-minute consult in Korean or English. FBAR and Korea–US tax treaty specialists.', kr: '한/영 20분 무료 상담. FBAR 및 한미 조세조약 전문.' },
    cta: { en: 'Book a free consult', kr: '무료 상담 예약' }, code: null,
  },
};

// Where each ad appears. The app picks the contextual advertiser when one fits.
export const placements = {
  briefSponsor: 'pacific',
  todayNative: 'arirang',
  wonSponsor: 'bora',
  wonSecondary: 'hans',
  feedEvery: 4,
  feedRotation: ['hanbit', 'mira', 'dalbit', 'arirang', 'hans'],
  leagueSponsor: 'arirang',
  resultsSponsor: 'gogi',
  athletesSponsor: 'dalbit',
};

// Perks: advertiser-funded rewards. Points have no cash value; perks are
// promotional offers paid for by the advertiser.
export const perks = [
  { id: 'pk1', ad: 'gogi', cost: 1500, title: { en: 'Free gyeran-jjim with any order', kr: '주문 시 계란찜 무료' }, left: 42 },
  { id: 'pk2', ad: 'bora', cost: 800, title: { en: '$0 fee on your next transfer', kr: '다음 송금 수수료 $0' }, left: 300 },
  { id: 'pk3', ad: 'hanbit', cost: 2500, title: { en: '$10 off a $50 Hanbit Mart order', kr: '한빛마트 $50 이상 구매 시 $10 할인' }, left: 120 },
  { id: 'pk4', ad: 'dalbit', cost: 1200, title: { en: 'Free travel-size toner', kr: '여행용 토너 무료' }, left: 75 },
  { id: 'pk5', ad: 'arirang', cost: 6000, title: { en: '5,000 bonus miles', kr: '보너스 마일 5,000' }, left: 25 },
  { id: 'pk6', ad: 'hans', cost: 500, title: { en: 'Free 20-minute tax consult', kr: '20분 무료 세무 상담' }, left: 60 },
];

export const contests = [
  { id: 'k1', ad: 'gogi', title: { en: 'KBO Postseason Challenge', kr: 'KBO 포스트시즌 챌린지' }, prize: { en: 'Top 10: dinner for 4 at Gogi House', kr: '상위 10명: 고기하우스 4인 식사' }, players: 3812, ends: '2026-10-31', tone: 'jade' },
  { id: 'k2', ad: 'mira', title: { en: 'World Series Bracket', kr: '월드시리즈 브래킷' }, prize: { en: 'Winner: 100K points + Legend badge', kr: '우승: 10만 포인트 + 전설 배지' }, players: 6240, ends: '2026-11-04', tone: 'persimmon' },
  { id: 'k3', ad: null, title: { en: 'Midterms Pick’em', kr: '중간선거 예측왕' }, prize: { en: 'Title: 예측왕 on your profile', kr: '프로필 칭호: 예측왕' }, players: 2105, ends: '2026-11-03', tone: 'ink' },
];
