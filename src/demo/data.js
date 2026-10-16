// Sample data for the Hanpan demo. Nothing here is live; Kalshi markets are
// illustrative stand-ins for what the public market-data API would return.

export const me = {
  name: 'Daniel Park',
  handle: 'dpark_la',
  city: { en: 'Los Angeles / OC', kr: 'LA / 오렌지카운티' },
  points: 12480,
  streak: 6,
  bestStreak: 11,
  rank: 37,
  accuracy: 64,
  picks: 212,
  followers: 318,
  following: 142,
  badges: [
    { id: 'b1', icon: 'flame', en: '6-day streak', kr: '6일 연속' },
    { id: 'b2', icon: 'trophy', en: 'Top 50 · LA', kr: 'LA 상위 50' },
    { id: 'b3', icon: 'book', en: 'Academy grad', kr: '아카데미 수료' },
    { id: 'b4', icon: 'star', en: 'Early member', kr: '초기 멤버' },
  ],
};

export const collections = [
  { id: 'all', en: 'All', kr: '전체' },
  { id: 'kplayers', en: 'Korean athletes', kr: '한국 선수' },
  { id: 'la', en: 'LA sports', kr: 'LA 스포츠' },
  { id: 'kbo', en: 'KBO', kr: 'KBO' },
  { id: 'econ', en: 'Fed & economy', kr: '연준·경제' },
  { id: 'elections', en: 'Midterms', kr: '중간선거' },
  { id: 'kcos', en: 'Korean companies', kr: '한국 기업' },
  { id: 'kculture', en: 'K-culture', kr: 'K-컬처' },
];

// src: 'kalshi' = real-money market on Kalshi (trade there via referral link)
//      'community' = Hanpan-only market, free points, no cash value
export const markets = [
  {
    id: 'm1', src: 'kalshi', coll: ['elections'],
    cat: { en: 'Politics', kr: '정치' },
    title: { en: 'Will Democrats win the House in the 2026 midterms?', kr: '2026 중간선거에서 민주당이 하원을 차지할까?' },
    yes: 58, chg: 2, vol: '$14.2M', comments: 486, closes: { en: 'Nov 3', kr: '11월 3일' }, crowd: 61,
    explain: {
      en: 'Traders put the chance of a Democratic House majority at about 58%. A YES contract costs 58¢ and pays $1 if Democrats win 218+ seats.',
      kr: '트레이더들은 민주당이 하원 과반을 차지할 확률을 약 58%로 보고 있습니다. YES 계약은 58¢이며, 민주당이 218석 이상을 얻으면 $1를 받습니다.',
    },
    rules: { en: 'Resolves YES if Democrats hold 218 or more seats when the new House is seated, per official results.', kr: '새 하원 개원 시 공식 결과 기준 민주당이 218석 이상이면 YES로 정산됩니다.' },
  },
  {
    id: 'm2', src: 'kalshi', coll: ['econ'],
    cat: { en: 'Economy', kr: '경제' },
    title: { en: 'Will the Fed cut rates at its October meeting?', kr: '연준이 10월 회의에서 금리를 인하할까?' },
    yes: 71, chg: -4, vol: '$9.8M', comments: 212, closes: { en: 'Oct 28', kr: '10월 28일' }, crowd: 66,
    explain: {
      en: 'The market sees a 71% chance of a cut, down 4 points after a strong jobs report. Mortgage and car-loan rates usually follow.',
      kr: '시장은 인하 확률을 71%로 보며, 강한 고용 지표 이후 4%p 하락했습니다. 주택담보·자동차 대출 금리도 대체로 따라 움직입니다.',
    },
    rules: { en: 'Resolves YES if the FOMC lowers the federal funds target range at the meeting ending Oct 28.', kr: '10월 28일 종료되는 FOMC 회의에서 기준금리 목표 범위를 인하하면 YES로 정산됩니다.' },
  },
  {
    id: 'm3', src: 'kalshi', coll: ['kplayers', 'la'],
    cat: { en: 'Soccer', kr: '축구' },
    title: { en: 'Will Son Heung-min score in LAFC’s next playoff match?', kr: '손흥민이 LAFC 다음 플레이오프 경기에서 골을 넣을까?' },
    yes: 38, chg: 6, vol: '$1.1M', comments: 934, closes: { en: 'Sat 7:30 PM', kr: '토 오후 7:30' }, crowd: 72,
    explain: {
      en: 'The market gives Sonny a 38% chance to score. Our community is far more bullish at 72%. Somebody is wrong.',
      kr: '시장은 손흥민의 득점 확률을 38%로 봅니다. 우리 커뮤니티는 72%로 훨씬 낙관적이네요. 누군가는 틀렸습니다.',
    },
    rules: { en: 'Resolves YES if Son Heung-min is credited with a goal in regulation or extra time. Penalty shootouts do not count.', kr: '정규시간 또는 연장전에 손흥민의 득점이 공식 기록되면 YES. 승부차기는 제외됩니다.' },
  },
  {
    id: 'm4', src: 'kalshi', coll: ['la'],
    cat: { en: 'Baseball', kr: '야구' },
    title: { en: 'Will the Dodgers win the 2026 World Series?', kr: '다저스가 2026 월드시리즈에서 우승할까?' },
    yes: 24, chg: 3, vol: '$22.6M', comments: 1288, closes: { en: 'Nov 4', kr: '11월 4일' }, crowd: 39,
    explain: {
      en: 'About a 1-in-4 chance by the market’s math. A 24¢ YES pays $1 if the Dodgers take the title.',
      kr: '시장 계산으로는 약 4분의 1 확률입니다. 24¢ YES 계약은 다저스가 우승하면 $1를 받습니다.',
    },
    rules: { en: 'Resolves YES if the Los Angeles Dodgers win the 2026 World Series.', kr: 'LA 다저스가 2026 월드시리즈에서 우승하면 YES로 정산됩니다.' },
  },
  {
    id: 'm5', src: 'kalshi', coll: ['kplayers'],
    cat: { en: 'Golf', kr: '골프' },
    title: { en: 'Will a Korean golfer win the BMW Ladies Championship?', kr: 'BMW 레이디스 챔피언십에서 한국 선수가 우승할까?' },
    yes: 46, chg: 1, vol: '$640K', comments: 158, closes: { en: 'Sun', kr: '일요일' }, crowd: 58,
    explain: {
      en: 'Home soil, deep field. Traders say slightly less than a coin flip that a Korean player lifts the trophy.',
      kr: '홈 코스, 강한 출전진. 트레이더들은 한국 선수 우승 가능성을 동전 던지기보다 조금 낮게 봅니다.',
    },
    rules: { en: 'Resolves YES if the winner represents the Republic of Korea on the LPGA Tour.', kr: '우승자가 LPGA 투어에서 대한민국 국적으로 등록된 선수이면 YES.' },
  },
  {
    id: 'm6', src: 'kalshi', coll: ['econ', 'kcos'],
    cat: { en: 'Currency', kr: '환율' },
    title: { en: 'Will USD/KRW close above ₩1,400 on Oct 30?', kr: '10월 30일 원/달러 환율이 ₩1,400 위에서 마감할까?' },
    yes: 63, chg: -2, vol: '$410K', comments: 97, closes: { en: 'Oct 30', kr: '10월 30일' }, crowd: 55,
    explain: {
      en: 'Matters if you send money home. 63% says the dollar stays strong against the won through month-end.',
      kr: '한국에 송금한다면 중요합니다. 63% 확률로 월말까지 달러 강세가 이어진다고 봅니다.',
    },
    rules: { en: 'Resolves YES if the official closing rate is above 1,400 KRW per USD on Oct 30.', kr: '10월 30일 공식 종가가 달러당 1,400원을 넘으면 YES.' },
  },
  {
    id: 'm7', src: 'kalshi', coll: ['kcos'],
    cat: { en: 'Companies', kr: '기업' },
    title: { en: 'Will Samsung beat Q3 operating profit estimates?', kr: '삼성전자가 3분기 영업이익 전망치를 넘어설까?' },
    yes: 67, chg: 5, vol: '$520K', comments: 143, closes: { en: 'Oct 30', kr: '10월 30일' }, crowd: 70,
    explain: {
      en: 'Memory prices are up and traders are leaning yes, up 5 points this week.',
      kr: '메모리 가격 상승으로 트레이더들이 YES 쪽으로 기울고 있습니다. 이번 주 5%p 상승.',
    },
    rules: { en: 'Resolves YES if reported Q3 operating profit exceeds the consensus estimate published before the report.', kr: '발표된 3분기 영업이익이 사전 컨센서스를 넘으면 YES.' },
  },
  {
    id: 'm8', src: 'kalshi', coll: ['la', 'econ'],
    cat: { en: 'Economy', kr: '경제' },
    title: { en: 'Will California gas average above $5 on Nov 1?', kr: '11월 1일 캘리포니아 휘발유 평균가가 $5를 넘을까?' },
    yes: 41, chg: -3, vol: '$380K', comments: 76, closes: { en: 'Nov 1', kr: '11월 1일' }, crowd: 48,
    explain: {
      en: 'Prices have eased since summer. The market sees a 41% chance the state average is back over $5.',
      kr: '여름 이후 가격이 내려왔습니다. 주 평균가가 다시 $5를 넘을 확률은 41%입니다.',
    },
    rules: { en: 'Resolves YES if the AAA California regular average exceeds $5.000 on Nov 1.', kr: '11월 1일 AAA 캘리포니아 일반 휘발유 평균가가 $5.000를 넘으면 YES.' },
  },
  {
    id: 'm9', src: 'kalshi', coll: ['la'],
    cat: { en: 'Basketball', kr: '농구' },
    title: { en: 'Will the Lakers start the season 5-0?', kr: '레이커스가 시즌 개막 5연승을 할까?' },
    yes: 14, chg: -1, vol: '$290K', comments: 201, closes: { en: 'Oct 31', kr: '10월 31일' }, crowd: 27,
    explain: { en: 'A long shot. 14¢ pays $1 if they win their first five.', kr: '가능성 낮음. 첫 5경기를 모두 이기면 14¢가 $1가 됩니다.' },
    rules: { en: 'Resolves YES if the Lakers win each of their first five regular-season games.', kr: '레이커스가 정규시즌 첫 5경기를 모두 이기면 YES.' },
  },
  {
    id: 'c1', src: 'community', coll: ['kbo'],
    cat: { en: 'KBO', kr: 'KBO' },
    title: { en: 'Will the LG Twins win the 2026 Korean Series?', kr: 'LG 트윈스가 2026 한국시리즈에서 우승할까?' },
    yes: 34, chg: 4, vol: '18.2K picks', comments: 742, closes: { en: 'Oct 31', kr: '10월 31일' }, crowd: 34,
    explain: {
      en: 'A Hanpan community market. Kalshi doesn’t list KBO, so we run it for points. 34% of members back the Twins.',
      kr: '한판 커뮤니티 마켓입니다. 칼시에는 KBO가 없어 포인트로 운영합니다. 회원 34%가 트윈스를 선택했습니다.',
    },
    rules: { en: 'Points only, no cash value. Resolves on the official KBO result.', kr: '포인트 전용이며 현금 가치가 없습니다. KBO 공식 결과로 정산됩니다.' },
  },
  {
    id: 'c2', src: 'community', coll: ['kbo', 'kplayers'],
    cat: { en: 'KBO', kr: 'KBO' },
    title: { en: 'Will Hanwha’s starter record 8+ strikeouts in Game 3?', kr: '한화 선발투수가 3차전에서 삼진 8개 이상을 기록할까?' },
    yes: 47, chg: 9, vol: '6.4K picks', comments: 318, closes: { en: 'Tonight', kr: '오늘 밤' }, crowd: 47,
    explain: { en: 'First pitch is 2:30 AM PT. Night owls only.', kr: '플레이볼은 태평양시간 새벽 2:30. 올빼미 전용.' },
    rules: { en: 'Points only. Resolves on the official KBO box score.', kr: '포인트 전용. KBO 공식 기록 기준 정산.' },
  },
  {
    id: 'c3', src: 'community', coll: ['kculture'],
    cat: { en: 'K-culture', kr: 'K-컬처' },
    title: { en: 'Will a K-drama win at the International Emmys?', kr: 'K-드라마가 국제 에미상을 수상할까?' },
    yes: 29, chg: 2, vol: '9.1K picks', comments: 265, closes: { en: 'Nov 23', kr: '11월 23일' }, crowd: 29,
    explain: { en: 'Two Korean nominees this year. Members give it 29%.', kr: '올해 한국 후보작 2편. 회원들은 29%로 봅니다.' },
    rules: { en: 'Points only. Resolves YES if a Korean-produced series wins any category.', kr: '포인트 전용. 한국 제작 시리즈가 어떤 부문이든 수상하면 YES.' },
  },
  {
    id: 'c4', src: 'community', coll: ['kculture', 'la'],
    cat: { en: 'K-culture', kr: 'K-컬처' },
    title: { en: 'Will BTS add a third SoFi Stadium date?', kr: 'BTS가 소파이 스타디움 3회차 공연을 추가할까?' },
    yes: 52, chg: -6, vol: '22.7K picks', comments: 1904, closes: { en: 'Dec 31', kr: '12월 31일' }, crowd: 52,
    explain: { en: 'ARMY says coin flip. Two LA shows sold out in minutes.', kr: '아미들은 반반으로 봅니다. LA 2회 공연은 몇 분 만에 매진.' },
    rules: { en: 'Points only. Resolves YES on an official announcement before Dec 31.', kr: '포인트 전용. 12월 31일 전 공식 발표 시 YES.' },
  },
];

export const games = [
  { id: 'g1', league: 'MLB · NLCS G5', home: 'LAD', away: 'MIL', homeName: { en: 'Dodgers', kr: '다저스' }, awayName: { en: 'Brewers', kr: '브루어스' }, status: 'live', score: [3, 2], inning: { en: 'Top 7th', kr: '7회초' }, room: 4120, market: 'm4' },
  { id: 'g2', league: 'KBO · PO G3', home: 'LG', away: 'HAN', homeName: { en: 'LG Twins', kr: 'LG 트윈스' }, awayName: { en: 'Hanwha', kr: '한화 이글스' }, status: 'soon', time: { en: '2:30 AM PT', kr: '새벽 2:30 PT' }, room: 1860, market: 'c2' },
  { id: 'g3', league: 'MLS · Playoffs', home: 'LAFC', away: 'SEA', homeName: { en: 'LAFC', kr: 'LAFC' }, awayName: { en: 'Sounders', kr: '사운더스' }, status: 'soon', time: { en: 'Sat 7:30 PM', kr: '토 오후 7:30' }, room: 2290, market: 'm3' },
  { id: 'g4', league: 'LPGA · R2', home: 'BMW', away: '', homeName: { en: 'BMW Ladies Champ.', kr: 'BMW 레이디스' }, awayName: { en: 'Round 2', kr: '2라운드' }, status: 'live', score: null, inning: { en: '3 Koreans in top 10', kr: '톱10에 한국 선수 3명' }, room: 640, market: 'm5' },
];

export const ticker = [
  { id: 'm3', en: 'Son to score', kr: '손흥민 득점', yes: 38, chg: 6 },
  { id: 'm2', en: 'Fed Oct cut', kr: '연준 10월 인하', yes: 71, chg: -4 },
  { id: 'm7', en: 'Samsung Q3 beat', kr: '삼성 3Q 서프라이즈', yes: 67, chg: 5 },
  { id: 'm1', en: 'Dem House', kr: '민주당 하원', yes: 58, chg: 2 },
  { id: 'm6', en: 'USD/KRW > 1,400', kr: '환율 1,400 돌파', yes: 63, chg: -2 },
  { id: 'm4', en: 'Dodgers WS', kr: '다저스 WS 우승', yes: 24, chg: 3 },
  { id: 'c4', en: 'BTS 3rd SoFi', kr: 'BTS 소파이 3회', yes: 52, chg: -6 },
];

export const brief = {
  date: { en: 'Friday, Oct 16', kr: '10월 16일 금요일' },
  items: [
    { en: 'Fed cut odds slid to 71% after a hot jobs print. If you are refinancing, watch Oct 28.', kr: '고용 지표 호조로 연준 인하 확률이 71%로 하락. 재융자 계획이 있다면 10월 28일을 주목하세요.' },
    { en: 'Sonny-to-score jumped 6 points on news he trained fully Thursday.', kr: '손흥민이 목요일 정상 훈련을 소화했다는 소식에 득점 확률 6%p 상승.' },
    { en: 'KBO playoff Game 3 is at 2:30 AM PT. The live room opens at 2:00.', kr: 'KBO 플레이오프 3차전은 새벽 2:30 PT. 라이브 룸은 2:00에 열립니다.' },
  ],
};

export const users = {
  gracek: { name: 'Grace Kim', city: 'LA' },
  joon: { name: 'Joon Lee', city: 'Fort Lee' },
  sooah: { name: 'Sooah Choi', city: 'Irvine' },
  mike: { name: 'Mike Yoon', city: 'Atlanta' },
  eunji: { name: '박은지', city: 'Annandale' },
  hyun: { name: 'Hyun Jang', city: 'Seattle' },
  ajumma: { name: 'Koreatown Ajumma', city: 'LA' },
  tae: { name: 'Taehoon Oh', city: 'Flushing' },
  dpark_la: { name: 'Daniel Park', city: 'LA' },
};

export const posts = [
  {
    id: 'p1', user: 'gracek', time: { en: '12m', kr: '12분' }, likes: 214, replies: 48,
    text: 'Market has Sonny at 38% to score Saturday. Our crowd is at 72%. One of these numbers is very wrong and I think it’s the market. He’s been sharp in training all week.',
    market: 'm3',
  },
  {
    id: 'p2', user: 'eunji', time: { en: '34m', kr: '34분' }, likes: 96, replies: 22,
    text: '새벽 2시 반 KBO 경기 같이 보실 분? 라이브 룸에서 만나요. 한화 선발 오늘 컨디션 좋아 보여요 ⚾',
    trans: 'Anyone watching the 2:30 AM KBO game? Meet in the live room. Hanwha’s starter looks sharp today.',
  },
  {
    id: 'p3', user: 'joon', time: { en: '1h', kr: '1시간' }, likes: 158, replies: 61,
    poll: {
      q: { en: 'Best spot to watch the NLCS in K-town?', kr: 'K타운에서 NLCS 보기 좋은 곳은?' },
      opts: [
        { en: 'Pocha 21', kr: '포차 21', votes: 412 },
        { en: 'Seoul Garden BBQ', kr: '서울가든 BBQ', votes: 287 },
        { en: 'At home with mom’s jjigae', kr: '집에서 엄마표 찌개', votes: 531 },
      ],
    },
  },
  {
    id: 'p4', user: 'mike', time: { en: '2h', kr: '2시간' }, likes: 73, replies: 15,
    text: 'Bought YES on Samsung Q3 at 61¢ last week, now 67. Memory prices are doing the work. Not advice, just vibes.',
    verified: { side: 'YES', price: 61, market: 'm7' },
  },
  {
    id: 'p5', user: 'ajumma', time: { en: '3h', kr: '3시간' }, likes: 402, replies: 88,
    text: '환율 1,400 넘으면 이번 달 송금은 다음 달로 미룹니다. 다들 어떻게 하세요?',
    trans: 'If the won-dollar rate goes over 1,400 I’m pushing this month’s remittance to next month. What are you all doing?',
    market: 'm6',
  },
];

export const comments = {
  m3: [
    { user: 'hyun', text: 'Seattle’s back line is slow. Sonny cooks.', likes: 41, time: '8m', verified: { side: 'YES', price: 33 } },
    { user: 'sooah', text: '38% feels low but he hasn’t scored in 3 straight. Taking NO for the value.', likes: 19, time: '22m', verified: { side: 'NO', price: 64 } },
    { user: 'tae', text: '손흥민 이번엔 넣는다 🔥', likes: 57, time: '41m' },
  ],
  default: [
    { user: 'gracek', text: 'Watching this one closely. The move this week was real.', likes: 24, time: '15m' },
    { user: 'joon', text: 'Crowd vs market gap is interesting here.', likes: 11, time: '1h', verified: { side: 'YES', price: 52 } },
    { user: 'eunji', text: '저는 반대쪽에 걸었어요. 두고 봅시다.', likes: 8, time: '2h' },
  ],
};

export const picksToday = [
  { id: 'm3', q: { en: 'Son scores vs Seattle', kr: '손흥민 vs 시애틀 득점' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, odds: [38, 62], src: 'kalshi' },
  { id: 'c2', q: { en: 'Hanwha SP 8+ strikeouts', kr: '한화 선발 8탈삼진 이상' }, a: { en: 'Over', kr: '이상' }, b: { en: 'Under', kr: '미만' }, odds: [47, 53], src: 'community' },
  { id: 'm4', q: { en: 'Dodgers win NLCS Game 5', kr: '다저스 NLCS 5차전 승리' }, a: { en: 'LAD', kr: '다저스' }, b: { en: 'MIL', kr: '브루어스' }, odds: [57, 43], src: 'kalshi' },
  { id: 'm2', q: { en: 'Fed cuts in October', kr: '연준 10월 금리 인하' }, a: { en: 'Cut', kr: '인하' }, b: { en: 'Hold', kr: '동결' }, odds: [71, 29], src: 'kalshi' },
  { id: 'c4', q: { en: 'BTS adds 3rd SoFi date', kr: 'BTS 소파이 3회차 추가' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, odds: [52, 48], src: 'community' },
];

export const contests = [
  { id: 'k1', title: { en: 'KBO Postseason Challenge', kr: 'KBO 포스트시즌 챌린지' }, sponsor: 'Seoul Garden BBQ', prize: { en: 'Dinner for 4 + 50K pts', kr: '4인 식사권 + 5만 포인트' }, players: 3812, ends: { en: '15 days', kr: '15일 남음' }, tone: 'jade' },
  { id: 'k2', title: { en: 'World Series Bracket', kr: '월드시리즈 브래킷' }, sponsor: 'Mira Realty', prize: { en: '100K pts + badge', kr: '10만 포인트 + 배지' }, players: 6240, ends: { en: '19 days', kr: '19일 남음' }, tone: 'persimmon' },
  { id: 'k3', title: { en: 'Midterms Pick’em', kr: '중간선거 예측왕' }, sponsor: null, prize: { en: 'Title: 예측왕', kr: '칭호: 예측왕' }, players: 2105, ends: { en: '18 days', kr: '18일 남음' }, tone: 'ink' },
];

export const leaderboard = {
  overall: [
    { user: 'gracek', pts: 48210, acc: 71 },
    { user: 'hyun', pts: 45980, acc: 69 },
    { user: 'joon', pts: 44120, acc: 68 },
    { user: 'sooah', pts: 39870, acc: 66 },
    { user: 'tae', pts: 37440, acc: 65 },
  ],
  city: [
    { user: 'gracek', pts: 48210, acc: 71 },
    { user: 'ajumma', pts: 31200, acc: 63 },
    { user: 'sooah', pts: 29870, acc: 66 },
    { user: 'mike', pts: 19300, acc: 61 },
    { user: 'tae', pts: 15100, acc: 60 },
  ],
  friends: [
    { user: 'sooah', pts: 39870, acc: 66 },
    { user: 'dpark_la', pts: 12480, acc: 64 },
    { user: 'mike', pts: 11300, acc: 61 },
    { user: 'eunji', pts: 9020, acc: 59 },
    { user: 'tae', pts: 7740, acc: 57 },
  ],
};

export const groups = [
  { id: 'gr1', kind: 'city', name: { en: 'LA / OC Koreans', kr: 'LA·OC 한인' }, members: 18420, desc: { en: 'Koreatown to Irvine. Sports, money, food.', kr: '코리아타운부터 어바인까지. 스포츠, 재테크, 맛집.' }, joined: true },
  { id: 'gr2', kind: 'city', name: { en: 'NY / NJ Hanin', kr: '뉴욕·뉴저지 한인' }, members: 14090, desc: { en: 'Fort Lee, Flushing, Palisades Park.', kr: '포트리, 플러싱, 팰팍.' } },
  { id: 'gr3', kind: 'city', name: { en: 'DMV Koreans', kr: 'DMV 한인' }, members: 6210, desc: { en: 'Annandale, Centreville, Ellicott City.', kr: '애넌데일, 센터빌, 엘리콧시티.' } },
  { id: 'gr4', kind: 'team', name: { en: 'Dodgers 한인 팬클럽', kr: '다저스 한인 팬클럽' }, members: 9880, desc: { en: 'Blue since Chan Ho Park.', kr: '박찬호 시절부터 다저 블루.' }, joined: true },
  { id: 'gr5', kind: 'team', name: { en: 'KBO Night Owls', kr: 'KBO 올빼미족' }, members: 4410, desc: { en: 'Watching KBO at 3 AM from the US.', kr: '미국에서 새벽 3시에 KBO 보는 사람들.' } },
  { id: 'gr6', kind: 'private', name: { en: 'Grace Church Young Adults', kr: '은혜교회 청년부' }, members: 46, desc: { en: 'Private · invite only', kr: '비공개 · 초대 전용' }, joined: true },
  { id: 'gr7', kind: 'private', name: { en: 'UCLA KSA Alumni', kr: 'UCLA 한인학생회 동문' }, members: 212, desc: { en: 'Private · invite only', kr: '비공개 · 초대 전용' } },
];

export const events = [
  { id: 'e1', title: { en: 'NLCS Game 5 watch party', kr: 'NLCS 5차전 단체 관람' }, place: 'Pocha 21 · Koreatown LA', when: { en: 'Tonight · 5:00 PM', kr: '오늘 · 오후 5:00' }, going: 86, sponsor: true },
  { id: 'e2', title: { en: 'KBO playoff early-bird viewing', kr: 'KBO 플레이오프 새벽 관람' }, place: 'Morning Bean Café · Fort Lee', when: { en: 'Sat · 5:30 AM ET', kr: '토 · 오전 5:30 ET' }, going: 23 },
  { id: 'e3', title: { en: 'LAFC playoff tailgate', kr: 'LAFC 플레이오프 테일게이트' }, place: 'BMO Stadium Lot 3', when: { en: 'Sat · 4:00 PM', kr: '토 · 오후 4:00' }, going: 141 },
];

export const sponsors = [
  { id: 's1', name: 'Seoul Garden BBQ', kind: { en: 'Restaurant · Koreatown LA', kr: '식당 · LA 코리아타운' }, offer: { en: '15% off on game nights with Hanpan', kr: '경기 있는 날 한판 회원 15% 할인' } },
  { id: 's2', name: 'Han’s Tax & Accounting', kind: { en: 'CPA · Fort Lee, NJ', kr: '회계사 · 뉴저지 포트리' }, offer: { en: 'Free 20-min consult, Korean or English', kr: '20분 무료 상담 (한/영)' } },
  { id: 's3', name: 'Mira Realty', kind: { en: 'Real estate · Irvine', kr: '부동산 · 어바인' }, offer: { en: 'Sponsor of the World Series Bracket', kr: '월드시리즈 브래킷 후원' } },
];

export const roomScript = [
  { user: 'hyun', text: 'Freeman up. Let’s go!!' },
  { user: 'eunji', text: '제발 한 점만 더 ㅠㅠ' },
  { user: 'joon', text: 'Market for Dodgers WS just ticked up to 25¢' },
  { user: 'tae', text: '이 투수 공 진짜 좋다' },
  { user: 'gracek', text: 'Bullpen better hold. I have 2K points on this' },
  { user: 'mike', text: 'Watching from Atlanta, sending Dodger blue vibes' },
  { user: 'ajumma', text: '우리 아들도 같이 보고 있어요 ㅎㅎ' },
  { user: 'sooah', text: 'Strike three! 🔥' },
];

export const lessons = [
  { id: 'l1', min: 2, title: { en: 'What is an event contract?', kr: '이벤트 계약이란?' }, body: {
    en: 'An event contract is a yes-or-no question with a price. If you buy YES and the event happens, each contract pays $1. If it doesn’t, it pays $0. That’s it. Kalshi is a US exchange regulated by the CFTC, the same agency that oversees futures markets.',
    kr: '이벤트 계약은 가격이 붙은 예/아니오 질문입니다. YES를 샀는데 그 일이 일어나면 계약당 $1를 받고, 일어나지 않으면 $0입니다. 그게 전부입니다. 칼시는 선물시장을 감독하는 CFTC의 규제를 받는 미국 거래소입니다.' } },
  { id: 'l2', min: 3, title: { en: 'Reading prices as probabilities', kr: '가격을 확률로 읽기' }, body: {
    en: 'A contract trading at 62¢ means the market thinks there is roughly a 62% chance it resolves YES. When the price moves from 55¢ to 62¢, people are becoming more confident.',
    kr: '62¢에 거래되는 계약은 시장이 YES 확률을 약 62%로 본다는 뜻입니다. 55¢에서 62¢로 오르면 사람들이 더 확신하게 된 것입니다.' } },
  { id: 'l3', min: 2, title: { en: 'Fees and settlement', kr: '수수료와 정산' }, body: {
    en: 'Kalshi charges a small fee per contract, highest near 50¢. When the event is decided, winning contracts settle at $1 automatically in your Kalshi account.',
    kr: '칼시는 계약당 소액 수수료를 받으며, 50¢ 부근에서 가장 높습니다. 결과가 확정되면 이긴 계약은 칼시 계정에서 자동으로 $1에 정산됩니다.' } },
  { id: 'l4', min: 4, title: { en: 'Opening a Kalshi account', kr: '칼시 계정 만들기' }, body: {
    en: 'You need to be 18+ and a US resident. Kalshi verifies your ID and you fund your account directly with them. Hanpan never holds your money.',
    kr: '만 18세 이상 미국 거주자여야 합니다. 칼시가 신분을 확인하며 입금은 칼시에 직접 합니다. 한판은 절대 고객 자금을 보관하지 않습니다.' } },
  { id: 'l5', min: 3, title: { en: 'Managing risk', kr: '리스크 관리' }, body: {
    en: 'Only trade money you can afford to lose. Set a monthly limit and stick to it. Practicing with free picks first is a good way to learn.',
    kr: '잃어도 괜찮은 돈으로만 거래하세요. 월 한도를 정하고 지키세요. 무료 픽으로 먼저 연습하는 것도 좋은 방법입니다.' } },
];

export const notifications = [
  { id: 'n1', icon: 'trend', en: 'Son to score jumped to 38¢ (+6)', kr: '손흥민 득점 38¢로 상승 (+6)', time: '5m', unread: true },
  { id: 'n2', icon: 'chat', en: 'Grace Kim replied to your pick', kr: '그레이스 김님이 회원님의 픽에 답글을 남겼습니다', time: '18m', unread: true },
  { id: 'n3', icon: 'live', en: 'NLCS Game 5 room is live · 4.1K inside', kr: 'NLCS 5차전 룸 라이브 · 4.1K 참여 중', time: '40m', unread: true },
  { id: 'n4', icon: 'trophy', en: 'You moved up to #37 on the LA board', kr: 'LA 랭킹 37위로 상승했습니다', time: '2h' },
  { id: 'n5', icon: 'check', en: 'Your pick “Fed holds in Sept” won +240 pts', kr: '“9월 연준 동결” 픽 적중 +240 포인트', time: '1d' },
];

export const portfolio = [
  { market: 'm7', side: 'YES', qty: 40, avg: 61, now: 67 },
  { market: 'm3', side: 'YES', qty: 25, avg: 31, now: 38 },
  { market: 'm2', side: 'NO', qty: 30, avg: 25, now: 29 },
];

export const record = [
  { q: { en: 'Fed holds in September', kr: '9월 연준 동결' }, pick: 'YES', won: true, pts: 240 },
  { q: { en: 'Kim Ha-seong 2+ hits', kr: '김하성 멀티히트' }, pick: 'NO', won: false, pts: -100 },
  { q: { en: 'Squid Game S3 tops Netflix week 1', kr: '오징어게임3 넷플릭스 1주차 1위' }, pick: 'YES', won: true, pts: 180 },
  { q: { en: 'LG beats Doosan, G2', kr: 'LG, 두산전 2차전 승리' }, pick: 'YES', won: true, pts: 150 },
];
