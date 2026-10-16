// Hardcoded content. In production this comes from Kalshi's public market
// data, a sports feed and an editorial CMS. Athlete and game details are
// placeholders to be replaced by live feeds.

export const cities = [
  { id: 'la', en: 'Los Angeles / OC', kr: 'LA / 오렌지카운티' },
  { id: 'nynj', en: 'New York / New Jersey', kr: '뉴욕 / 뉴저지' },
  { id: 'dmv', en: 'DC / Virginia / Maryland', kr: 'DC / 버지니아 / 메릴랜드' },
  { id: 'atl', en: 'Atlanta', kr: '애틀랜타' },
  { id: 'sea', en: 'Seattle', kr: '시애틀' },
  { id: 'chi', en: 'Chicago', kr: '시카고' },
  { id: 'other', en: 'Somewhere else', kr: '기타 지역' },
];

export const interests = [
  { id: 'mlb', en: 'MLB', kr: 'MLB', icon: 'ball' },
  { id: 'kbo', en: 'KBO', kr: 'KBO', icon: 'ball' },
  { id: 'soccer', en: 'Soccer', kr: '축구', icon: 'ball' },
  { id: 'nba', en: 'NBA', kr: 'NBA', icon: 'ball' },
  { id: 'golf', en: 'Golf', kr: '골프', icon: 'ball' },
  { id: 'econ', en: 'Economy & rates', kr: '경제·금리', icon: 'trend' },
  { id: 'won', en: 'Won / dollar', kr: '원/달러 환율', icon: 'won' },
  { id: 'politics', en: 'US politics', kr: '미국 정치', icon: 'flag' },
  { id: 'kcos', en: 'Korean stocks', kr: '한국 주식', icon: 'markets' },
  { id: 'kculture', en: 'K-pop & dramas', kr: 'K-팝·드라마', icon: 'star' },
];

export const users = {
  gracek: { name: 'Grace Kim', city: 'LA', bio: 'Dodgers since 1994. Calls it early.' },
  joon: { name: 'Joon Lee', city: 'Fort Lee', bio: 'NJ. Rates, KBO, bad puns.' },
  sooah: { name: 'Sooah Choi', city: 'Irvine', bio: 'Accountant by day, LPGA nerd by night.' },
  mike: { name: 'Mike Yoon', city: 'Atlanta', bio: 'Samsung bull. Braves fan in exile.' },
  eunji: { name: '박은지', city: 'Annandale', bio: 'KBO 올빼미족 회장' },
  hyun: { name: 'Hyun Jang', city: 'Seattle', bio: 'Sounders season ticket. Sorry LAFC.' },
  ajumma: { name: 'Koreatown Ajumma', city: 'LA', bio: '환율이랑 다저스만 봅니다' },
  tae: { name: 'Taehoon Oh', city: 'Flushing', bio: 'Mets, Lotte Giants, heartbreak.' },
  minji: { name: 'Minji Seo', city: 'Chicago', bio: 'Grad student. K-drama oracle.' },
  dan: { name: 'Dan Cho', city: 'Duluth', bio: 'Pastor’s kid. Fed watcher.' },
};

export const collections = [
  { id: 'all', en: 'For you', kr: '추천' },
  { id: 'kplayers', en: 'Korean athletes', kr: '한국 선수' },
  { id: 'la', en: 'LA sports', kr: 'LA 스포츠' },
  { id: 'kbo', en: 'KBO', kr: 'KBO' },
  { id: 'econ', en: 'Fed & economy', kr: '연준·경제' },
  { id: 'won', en: 'Won / dollar', kr: '환율' },
  { id: 'elections', en: 'Midterms', kr: '중간선거' },
  { id: 'kcos', en: 'Korean companies', kr: '한국 기업' },
  { id: 'kculture', en: 'K-culture', kr: 'K-컬처' },
];

// src 'kalshi': real-money market listed on Kalshi. 'community': Hanpan-only, points.
export const markets = [
  {
    id: 'm1', src: 'kalshi', coll: ['elections'], tags: ['politics'], closeAt: '2026-11-03T20:00:00-08:00',
    cat: { en: 'Politics', kr: '정치' },
    title: { en: 'Will Democrats win the House in the 2026 midterms?', kr: '2026 중간선거에서 민주당이 하원을 차지할까?' },
    yes: 58, chg: 2, vol: '$14.2M', comments: 486, crowd: 61, ad: 'pacific',
    explain: { en: 'Traders put the chance of a Democratic House majority at about 58%. A YES contract costs 58¢ and pays $1 if Democrats win 218+ seats.', kr: '트레이더들은 민주당 하원 과반 확률을 약 58%로 봅니다. YES 계약은 58¢이며 민주당이 218석 이상을 얻으면 $1를 받습니다.' },
    rules: { en: 'Resolves YES if Democrats hold 218 or more seats when the new House is seated, per official results.', kr: '새 하원 개원 시 공식 결과 기준 민주당이 218석 이상이면 YES.' },
  },
  {
    id: 'm2', src: 'kalshi', coll: ['econ'], tags: ['econ'], closeAt: '2026-10-28T11:00:00-07:00',
    cat: { en: 'Economy', kr: '경제' },
    title: { en: 'Will the Fed cut rates at its October meeting?', kr: '연준이 10월 회의에서 금리를 인하할까?' },
    yes: 71, chg: -4, vol: '$9.8M', comments: 212, crowd: 66, ad: 'pacific',
    explain: { en: 'The market sees a 71% chance of a cut, down 4 points after a strong jobs report. Mortgage, HELOC and car-loan rates usually follow.', kr: '시장은 인하 확률을 71%로 보며, 강한 고용 지표 이후 4%p 하락했습니다. 주택담보·HELOC·자동차 대출 금리도 대체로 따라 움직입니다.' },
    rules: { en: 'Resolves YES if the FOMC lowers the federal funds target range at the meeting ending Oct 28.', kr: '10월 28일 종료되는 FOMC 회의에서 기준금리 목표 범위를 인하하면 YES.' },
  },
  {
    id: 'm3', src: 'kalshi', coll: ['kplayers', 'la'], tags: ['soccer'], closeAt: '2026-10-17T21:30:00-07:00', athlete: 'son',
    cat: { en: 'Soccer', kr: '축구' },
    title: { en: 'Will Son Heung-min score in LAFC’s next playoff match?', kr: '손흥민이 LAFC 다음 플레이오프 경기에서 골을 넣을까?' },
    yes: 38, chg: 6, vol: '$1.1M', comments: 934, crowd: 72, ad: 'gogi',
    explain: { en: 'The market gives Sonny a 38% chance to score. The Hanpan crowd is far more bullish at 72%.', kr: '시장은 손흥민의 득점 확률을 38%로 봅니다. 한판 커뮤니티는 72%로 훨씬 낙관적입니다.' },
    rules: { en: 'Resolves YES if Son Heung-min is credited with a goal in regulation or extra time. Shootouts do not count.', kr: '정규시간 또는 연장전에 손흥민의 득점이 공식 기록되면 YES. 승부차기 제외.' },
  },
  {
    id: 'm4', src: 'kalshi', coll: ['la'], tags: ['mlb'], closeAt: '2026-11-04T20:00:00-08:00',
    cat: { en: 'Baseball', kr: '야구' },
    title: { en: 'Will the Dodgers win the 2026 World Series?', kr: '다저스가 2026 월드시리즈에서 우승할까?' },
    yes: 24, chg: 3, vol: '$22.6M', comments: 1288, crowd: 39, ad: 'gogi',
    explain: { en: 'About a 1-in-4 chance by the market’s math. A 24¢ YES pays $1 if the Dodgers take the title.', kr: '시장 계산으로는 약 4분의 1 확률입니다. 24¢ YES 계약은 다저스 우승 시 $1를 받습니다.' },
    rules: { en: 'Resolves YES if the Los Angeles Dodgers win the 2026 World Series.', kr: 'LA 다저스가 2026 월드시리즈에서 우승하면 YES.' },
  },
  {
    id: 'm5', src: 'kalshi', coll: ['kplayers'], tags: ['golf'], closeAt: '2026-10-18T03:00:00-07:00',
    cat: { en: 'Golf', kr: '골프' },
    title: { en: 'Will a Korean golfer win the BMW Ladies Championship?', kr: 'BMW 레이디스 챔피언십에서 한국 선수가 우승할까?' },
    yes: 46, chg: 1, vol: '$640K', comments: 158, crowd: 58, ad: 'dalbit',
    explain: { en: 'Home soil, deep field. Traders say slightly less than a coin flip that a Korean player lifts the trophy.', kr: '홈 코스, 강한 출전진. 트레이더들은 한국 선수 우승 가능성을 반반보다 조금 낮게 봅니다.' },
    rules: { en: 'Resolves YES if the winner represents the Republic of Korea on the LPGA Tour.', kr: '우승자가 LPGA 투어에 대한민국 국적으로 등록된 선수이면 YES.' },
  },
  {
    id: 'm6', src: 'kalshi', coll: ['econ', 'won'], tags: ['won', 'econ'], closeAt: '2026-10-30T15:30:00+09:00',
    cat: { en: 'Currency', kr: '환율' },
    title: { en: 'Will USD/KRW close above ₩1,400 on Oct 30?', kr: '10월 30일 원/달러 환율이 ₩1,400 위에서 마감할까?' },
    yes: 63, chg: -2, vol: '$410K', comments: 97, crowd: 55, ad: 'bora',
    explain: { en: 'Matters if you send money home. 63% says the dollar stays strong against the won through month-end.', kr: '한국에 송금한다면 중요합니다. 63% 확률로 월말까지 달러 강세가 이어진다고 봅니다.' },
    rules: { en: 'Resolves YES if the official closing rate is above 1,400 KRW per USD on Oct 30.', kr: '10월 30일 공식 종가가 달러당 1,400원을 넘으면 YES.' },
  },
  {
    id: 'm7', src: 'kalshi', coll: ['kcos'], tags: ['kcos'], closeAt: '2026-10-30T08:00:00+09:00',
    cat: { en: 'Companies', kr: '기업' },
    title: { en: 'Will Samsung beat Q3 operating profit estimates?', kr: '삼성전자가 3분기 영업이익 전망치를 넘어설까?' },
    yes: 67, chg: 5, vol: '$520K', comments: 143, crowd: 70, ad: 'pacific',
    explain: { en: 'Memory prices are up and traders lean yes, up 5 points this week.', kr: '메모리 가격 상승으로 트레이더들이 YES 쪽으로 기울고 있습니다. 이번 주 5%p 상승.' },
    rules: { en: 'Resolves YES if reported Q3 operating profit exceeds the consensus estimate published before the report.', kr: '발표된 3분기 영업이익이 사전 컨센서스를 넘으면 YES.' },
  },
  {
    id: 'm8', src: 'kalshi', coll: ['la', 'econ'], tags: ['econ'], closeAt: '2026-11-01T09:00:00-07:00',
    cat: { en: 'Economy', kr: '경제' },
    title: { en: 'Will California gas average above $5 on Nov 1?', kr: '11월 1일 캘리포니아 휘발유 평균가가 $5를 넘을까?' },
    yes: 41, chg: -3, vol: '$380K', comments: 76, crowd: 48, ad: 'hanbit',
    explain: { en: 'Prices have eased since summer. The market sees a 41% chance the state average is back over $5.', kr: '여름 이후 가격이 내려왔습니다. 주 평균가가 다시 $5를 넘을 확률은 41%입니다.' },
    rules: { en: 'Resolves YES if the AAA California regular average exceeds $5.000 on Nov 1.', kr: '11월 1일 AAA 캘리포니아 일반 휘발유 평균가가 $5.000를 넘으면 YES.' },
  },
  {
    id: 'm9', src: 'kalshi', coll: ['la'], tags: ['nba'], closeAt: '2026-10-31T22:00:00-07:00',
    cat: { en: 'Basketball', kr: '농구' },
    title: { en: 'Will the Lakers start the season 5-0?', kr: '레이커스가 시즌 개막 5연승을 할까?' },
    yes: 14, chg: -1, vol: '$290K', comments: 201, crowd: 27, ad: 'gogi',
    explain: { en: 'A long shot. 14¢ pays $1 if they win their first five.', kr: '가능성 낮음. 첫 5경기를 모두 이기면 14¢가 $1가 됩니다.' },
    rules: { en: 'Resolves YES if the Lakers win each of their first five regular-season games.', kr: '레이커스가 정규시즌 첫 5경기를 모두 이기면 YES.' },
  },
  {
    id: 'c1', src: 'community', coll: ['kbo'], tags: ['kbo'], closeAt: '2026-10-31T06:00:00-07:00',
    cat: { en: 'KBO', kr: 'KBO' },
    title: { en: 'Will the LG Twins win the 2026 Korean Series?', kr: 'LG 트윈스가 2026 한국시리즈에서 우승할까?' },
    yes: 34, chg: 4, vol: '18.2K picks', comments: 742, crowd: 34, ad: 'arirang',
    explain: { en: 'A Hanpan community market. Kalshi doesn’t list KBO, so we run it for points. 34% of members back the Twins.', kr: '한판 커뮤니티 마켓입니다. 칼시에 KBO가 없어 포인트로 운영합니다. 회원 34%가 트윈스를 선택했습니다.' },
    rules: { en: 'Points only, no cash value. Resolves on the official KBO result.', kr: '포인트 전용이며 현금 가치가 없습니다. KBO 공식 결과로 정산됩니다.' },
  },
  {
    id: 'c2', src: 'community', coll: ['kbo', 'kplayers'], tags: ['kbo'], closeAt: '2026-10-17T05:30:00-07:00',
    cat: { en: 'KBO', kr: 'KBO' },
    title: { en: 'Will Hanwha’s starter record 8+ strikeouts in Game 3?', kr: '한화 선발투수가 3차전에서 삼진 8개 이상을 기록할까?' },
    yes: 47, chg: 9, vol: '6.4K picks', comments: 318, crowd: 47, ad: 'arirang',
    explain: { en: 'First pitch is 2:30 AM PT. Night owls only.', kr: '플레이볼은 태평양시간 새벽 2:30. 올빼미 전용.' },
    rules: { en: 'Points only. Resolves on the official KBO box score.', kr: '포인트 전용. KBO 공식 기록 기준 정산.' },
  },
  {
    id: 'c3', src: 'community', coll: ['kculture'], tags: ['kculture'], closeAt: '2026-11-23T20:00:00-05:00',
    cat: { en: 'K-culture', kr: 'K-컬처' },
    title: { en: 'Will a K-drama win at the International Emmys?', kr: 'K-드라마가 국제 에미상을 수상할까?' },
    yes: 29, chg: 2, vol: '9.1K picks', comments: 265, crowd: 29, ad: 'dalbit',
    explain: { en: 'Two Korean nominees this year. Members give it 29%.', kr: '올해 한국 후보작 2편. 회원들은 29%로 봅니다.' },
    rules: { en: 'Points only. Resolves YES if a Korean-produced series wins any category.', kr: '포인트 전용. 한국 제작 시리즈가 어떤 부문이든 수상하면 YES.' },
  },
  {
    id: 'c4', src: 'community', coll: ['kculture', 'la'], tags: ['kculture'], closeAt: '2026-12-31T23:59:00-08:00',
    cat: { en: 'K-culture', kr: 'K-컬처' },
    title: { en: 'Will BTS add a third SoFi Stadium date?', kr: 'BTS가 소파이 스타디움 3회차 공연을 추가할까?' },
    yes: 52, chg: -6, vol: '22.7K picks', comments: 1904, crowd: 52, ad: 'dalbit',
    explain: { en: 'ARMY says coin flip. Two LA shows sold out in minutes.', kr: '아미들은 반반으로 봅니다. LA 2회 공연은 몇 분 만에 매진.' },
    rules: { en: 'Points only. Resolves YES on an official announcement before Dec 31.', kr: '포인트 전용. 12월 31일 전 공식 발표 시 YES.' },
  },
  {
    id: 'c5', src: 'community', coll: ['won'], tags: ['won'], closeAt: '2026-11-11T00:00:00+09:00',
    cat: { en: 'Community', kr: '커뮤니티' },
    title: { en: 'Will Hanbit Mart sell out of Pepero before Pepero Day?', kr: '한빛마트가 빼빼로데이 전에 빼빼로 품절될까?' },
    yes: 61, chg: 3, vol: '4.0K picks', comments: 88, crowd: 61, ad: 'hanbit',
    explain: { en: 'Nov 11 is Pepero Day. Last year three LA stores ran out by Nov 9.', kr: '11월 11일은 빼빼로데이. 작년엔 LA 3개 매장이 11월 9일에 품절됐어요.' },
    rules: { en: 'Points only. Resolves per Hanbit Mart’s official inventory post.', kr: '포인트 전용. 한빛마트 공식 재고 공지로 정산.' },
  },
];

export const friendPicks = {
  m3: [['gracek', 'YES'], ['hyun', 'NO'], ['tae', 'YES']],
  m4: [['gracek', 'YES'], ['ajumma', 'YES'], ['joon', 'NO']],
  m2: [['dan', 'YES'], ['joon', 'YES']],
  m6: [['ajumma', 'YES'], ['sooah', 'NO']],
  m7: [['mike', 'YES']],
  c1: [['eunji', 'NO'], ['tae', 'YES']],
  c4: [['minji', 'YES'], ['sooah', 'YES']],
};

export const games = [
  { id: 'g1', league: 'MLB · NLCS G5', away: 'MIL', home: 'LAD', awayName: { en: 'Brewers', kr: '브루어스' }, homeName: { en: 'Dodgers', kr: '다저스' }, status: 'live', score: [2, 3], detail: { en: 'Top 7th', kr: '7회초' }, room: 4120, market: 'm4', sponsor: 'gogi' },
  { id: 'g2', league: 'KBO · PO G3', away: 'HAN', home: 'LG', awayName: { en: 'Hanwha Eagles', kr: '한화 이글스' }, homeName: { en: 'LG Twins', kr: 'LG 트윈스' }, status: 'soon', time: { en: '2:30 AM PT', kr: '새벽 2:30 PT' }, room: 1860, market: 'c2', sponsor: 'arirang' },
  { id: 'g3', league: 'MLS · Playoffs', away: 'SEA', home: 'LAFC', awayName: { en: 'Sounders', kr: '사운더스' }, homeName: { en: 'LAFC', kr: 'LAFC' }, status: 'soon', time: { en: 'Sat 7:30 PM', kr: '토 오후 7:30' }, room: 2290, market: 'm3', sponsor: 'gogi' },
  { id: 'g4', league: 'LPGA · R2', away: null, home: 'BMW', awayName: null, homeName: { en: 'BMW Ladies Championship', kr: 'BMW 레이디스 챔피언십' }, status: 'live', score: null, detail: { en: '3 Koreans in the top 10', kr: '톱10에 한국 선수 3명' }, room: 640, market: 'm5', sponsor: 'dalbit' },
];

export const athletes = [
  { id: 'son', name: { en: 'Son Heung-min', kr: '손흥민' }, team: 'LAFC', sport: { en: 'Soccer · MLS', kr: '축구 · MLS' }, status: { en: 'Next: Sat vs Seattle, 7:30 PM PT', kr: '다음: 토 vs 시애틀, 오후 7:30 PT' }, last: { en: 'Last match: 1 goal, 1 assist', kr: '지난 경기: 1골 1도움' }, market: 'm3', hot: true },
  { id: 'khs', name: { en: 'Kim Hye-seong', kr: '김혜성' }, team: 'Dodgers', sport: { en: 'Baseball · MLB', kr: '야구 · MLB' }, status: { en: 'NLCS Game 5 tonight', kr: '오늘 NLCS 5차전' }, last: { en: 'G4: 1-for-3, SB', kr: '4차전: 3타수 1안타, 도루' }, market: 'm4', hot: true },
  { id: 'ljh', name: { en: 'Lee Jung-hoo', kr: '이정후' }, team: 'Giants', sport: { en: 'Baseball · MLB', kr: '야구 · MLB' }, status: { en: 'Offseason', kr: '오프시즌' }, last: { en: 'Season over', kr: '시즌 종료' } },
  { id: 'kmj', name: { en: 'Kim Min-jae', kr: '김민재' }, team: 'Bayern', sport: { en: 'Soccer · Bundesliga', kr: '축구 · 분데스리가' }, status: { en: 'Sat 6:30 AM PT', kr: '토 오전 6:30 PT' }, last: { en: 'Clean sheet last match', kr: '지난 경기 무실점' } },
  { id: 'lki', name: { en: 'Lee Kang-in', kr: '이강인' }, team: 'PSG', sport: { en: 'Soccer · Ligue 1', kr: '축구 · 리그1' }, status: { en: 'Sun 12:00 PM PT', kr: '일 오후 12:00 PT' }, last: { en: 'Subbed on 63′', kr: '63분 교체 투입' } },
  { id: 'hhc', name: { en: 'Hwang Hee-chan', kr: '황희찬' }, team: 'Wolves', sport: { en: 'Soccer · EPL', kr: '축구 · EPL' }, status: { en: 'Sat 7:00 AM PT', kr: '토 오전 7:00 PT' }, last: { en: 'Goal vs Brentford', kr: '브렌트포드전 득점' } },
  { id: 'kjy', name: { en: 'Ko Jin-young', kr: '고진영' }, team: 'LPGA', sport: { en: 'Golf · LPGA', kr: '골프 · LPGA' }, status: { en: 'BMW Ladies R2: T4 (−7)', kr: 'BMW 레이디스 2R: 공동 4위 (−7)' }, last: { en: 'R1: 67', kr: '1R: 67타' }, market: 'm5', hot: true },
  { id: 'tom', name: { en: 'Tom Kim', kr: '김주형' }, team: 'PGA', sport: { en: 'Golf · PGA Tour', kr: '골프 · PGA 투어' }, status: { en: 'Off this week', kr: '이번 주 휴식' }, last: { en: 'T12 last start', kr: '지난 대회 공동 12위' } },
];

export const krw = { base: 1402.35, chg: -3.1, low52: 1318.4, high52: 1487.9 };

export const calendar = [
  { date: 'Oct 17', en: 'KBO playoff Game 3 · 2:30 AM PT', kr: 'KBO 플레이오프 3차전 · 새벽 2:30 PT' },
  { date: 'Oct 28', en: 'Fed rate decision', kr: '연준 금리 결정' },
  { date: 'Nov 3', en: 'Election Day', kr: '미국 선거일' },
  { date: 'Nov 11', en: 'Pepero Day 빼빼로데이', kr: '빼빼로데이' },
  { date: 'Nov 19', en: 'Suneung (Korean SAT) · good luck to the kids', kr: '수능 · 수험생 화이팅' },
  { date: 'Nov 20', en: 'Gimjang season starts at Hanbit Mart', kr: '한빛마트 김장 시즌 시작' },
];

export const brief = {
  en: [
    'Fed cut odds slid to 71% after a hot jobs print. Refinancing? Watch Oct 28.',
    'Sonny-to-score jumped 6 points on news he trained fully Thursday.',
    'Won is at ₩1,402. Members are split on sending now or waiting.',
  ],
  kr: [
    '고용 지표 호조로 연준 인하 확률 71%로 하락. 재융자 계획이 있다면 10월 28일 주목.',
    '손흥민이 목요일 정상 훈련 소화 소식에 득점 확률 6%p 상승.',
    '환율 ₩1,402. 지금 송금할지 기다릴지 회원들 의견이 갈립니다.',
  ],
};

// Seed posts. `t` is minutes ago when the app first runs.
export const seedPosts = [
  { id: 'p1', user: 'gracek', t: 12, likes: 214, replies: 48, group: 'gr1', market: 'm3',
    text: 'Market has Sonny at 38% to score Saturday. Our crowd is at 72%. One of these numbers is very wrong and I think it’s the market. He’s been sharp in training all week.' },
  { id: 'p2', user: 'eunji', t: 34, likes: 96, replies: 22, group: 'gr5',
    text: '새벽 2시 반 KBO 경기 같이 보실 분? 라이브 룸에서 만나요. 한화 선발 오늘 컨디션 좋아 보여요 ⚾',
    trans: 'Anyone watching the 2:30 AM KBO game? Meet in the live room. Hanwha’s starter looks sharp today.' },
  { id: 'p3', user: 'joon', t: 61, likes: 158, replies: 61, group: 'gr2',
    poll: { q: { en: 'Best way to watch the NLCS tonight?', kr: '오늘 NLCS 어디서 보세요?' },
      opts: [{ en: 'K-town bar with friends', kr: 'K타운 술집에서 친구들과', votes: 412 }, { en: 'KBBQ spot with a TV', kr: 'TV 있는 고깃집', votes: 287 }, { en: 'Home with mom’s jjigae', kr: '집에서 엄마표 찌개', votes: 531 }] } },
  { id: 'p4', user: 'mike', t: 120, likes: 73, replies: 15, market: 'm7',
    text: 'Bought YES on Samsung Q3 at 61¢ last week, now 67. Memory prices are doing the work. Not advice, just vibes.',
    verified: { side: 'YES', price: 61 } },
  { id: 'p5', user: 'ajumma', t: 180, likes: 402, replies: 88, group: 'gr1', market: 'm6',
    text: '환율 1,400 넘으면 이번 달 송금은 다음 달로 미룹니다. 다들 어떻게 하세요?',
    trans: 'If the won goes over 1,400 I’m pushing this month’s remittance to next month. What are you all doing?' },
  { id: 'p6', user: 'minji', t: 240, likes: 131, replies: 40, market: 'c3',
    text: 'International Emmys prediction thread. I’m at 35% for a Korean win, higher than the crowd. The limited-series category is wide open.' },
  { id: 'p7', user: 'sooah', t: 300, likes: 88, replies: 12, group: 'gr1', market: 'm5',
    text: 'Ko Jin-young at −7 through R1 on home soil. Taking YES on a Korean winner at 46%.' },
  { id: 'p8', user: 'dan', t: 420, likes: 54, replies: 19, group: 'gr6', market: 'm2',
    text: 'Youth group asked me to explain the Fed. Told them: 71% chance their parents’ HELOC gets slightly cheaper.' },
];

export const seedComments = {
  m3: [
    { user: 'hyun', text: 'Seattle’s back line is slow. Sonny cooks.', likes: 41, t: 8, verified: { side: 'YES', price: 33 } },
    { user: 'sooah', text: '38% feels low but he hasn’t scored in 3 straight. Taking NO for the value.', likes: 19, t: 22, verified: { side: 'NO', price: 64 } },
    { user: 'tae', text: '손흥민 이번엔 넣는다 🔥', likes: 57, t: 41 },
  ],
  default: [
    { user: 'gracek', text: 'Watching this one closely. The move this week was real.', likes: 24, t: 15 },
    { user: 'joon', text: 'Crowd vs market gap is interesting here.', likes: 11, t: 60, verified: { side: 'YES', price: 52 } },
    { user: 'eunji', text: '저는 반대쪽에 걸었어요. 두고 봅시다.', likes: 8, t: 130 },
  ],
};

export const groups = [
  { id: 'gr1', kind: 'city', city: 'la', name: { en: 'LA / OC Koreans', kr: 'LA·OC 한인' }, members: 18420, desc: { en: 'Koreatown to Irvine. Sports, money, food.', kr: '코리아타운부터 어바인까지. 스포츠, 재테크, 맛집.' } },
  { id: 'gr2', kind: 'city', city: 'nynj', name: { en: 'NY / NJ Hanin', kr: '뉴욕·뉴저지 한인' }, members: 14090, desc: { en: 'Fort Lee, Flushing, Palisades Park.', kr: '포트리, 플러싱, 팰팍.' } },
  { id: 'gr3', kind: 'city', city: 'dmv', name: { en: 'DMV Koreans', kr: 'DMV 한인' }, members: 6210, desc: { en: 'Annandale, Centreville, Ellicott City.', kr: '애넌데일, 센터빌, 엘리콧시티.' } },
  { id: 'gr8', kind: 'city', city: 'atl', name: { en: 'Atlanta Koreans', kr: '애틀랜타 한인' }, members: 5120, desc: { en: 'Duluth, Suwanee, Johns Creek.', kr: '둘루스, 스와니, 존스크릭.' } },
  { id: 'gr4', kind: 'team', name: { en: 'Dodgers 한인 팬클럽', kr: '다저스 한인 팬클럽' }, members: 9880, desc: { en: 'Blue since Chan Ho Park.', kr: '박찬호 시절부터 다저 블루.' } },
  { id: 'gr5', kind: 'team', name: { en: 'KBO Night Owls', kr: 'KBO 올빼미족' }, members: 4410, desc: { en: 'Watching KBO at 3 AM from the US.', kr: '미국에서 새벽 3시에 KBO 보는 사람들.' } },
  { id: 'gr9', kind: 'team', name: { en: 'Sonny Army', kr: '손흥민 응원단' }, members: 7350, desc: { en: 'Every LAFC match, every goal.', kr: 'LAFC 전 경기, 모든 골.' } },
  { id: 'gr6', kind: 'private', name: { en: 'Grace Church Young Adults', kr: '은혜교회 청년부' }, members: 46, desc: { en: 'Private league · invite only', kr: '비공개 리그 · 초대 전용' } },
  { id: 'gr7', kind: 'private', name: { en: 'UCLA KSA Alumni', kr: 'UCLA 한인학생회 동문' }, members: 212, desc: { en: 'Private league · invite only', kr: '비공개 리그 · 초대 전용' } },
];

export const events = [
  { id: 'e1', city: 'la', title: { en: 'NLCS Game 5 watch party', kr: 'NLCS 5차전 단체 관람' }, place: 'Gogi House · Koreatown LA', when: { en: 'Tonight · 5:00 PM', kr: '오늘 · 오후 5:00' }, going: 86, ad: 'gogi' },
  { id: 'e2', city: 'nynj', title: { en: 'KBO playoff early-bird viewing', kr: 'KBO 플레이오프 새벽 관람' }, place: 'Morning Bean Café · Fort Lee', when: { en: 'Sat · 5:30 AM ET', kr: '토 · 오전 5:30 ET' }, going: 23 },
  { id: 'e3', city: 'la', title: { en: 'LAFC playoff tailgate', kr: 'LAFC 플레이오프 테일게이트' }, place: 'BMO Stadium Lot 3', when: { en: 'Sat · 4:00 PM', kr: '토 · 오후 4:00' }, going: 141 },
  { id: 'e4', city: 'la', title: { en: 'Gimjang day for seniors (volunteers)', kr: '어르신 김장 나눔 (봉사자 모집)' }, place: 'Koreatown Senior Center', when: { en: 'Nov 21 · 9:00 AM', kr: '11월 21일 · 오전 9:00' }, going: 54 },
];

export const lessons = [
  { id: 'l1', min: 2, title: { en: 'What is an event contract?', kr: '이벤트 계약이란?' }, body: {
    en: 'An event contract is a yes-or-no question with a price. Buy YES and the event happens: each contract pays $1. It doesn’t: it pays $0. Kalshi is a US exchange regulated by the CFTC, the agency that oversees futures markets.',
    kr: '이벤트 계약은 가격이 붙은 예/아니오 질문입니다. YES를 샀는데 그 일이 일어나면 계약당 $1, 일어나지 않으면 $0를 받습니다. 칼시는 선물시장을 감독하는 CFTC의 규제를 받는 미국 거래소입니다.' },
    quiz: { q: { en: 'You buy YES at 30¢ and it happens. What do you get per contract?', kr: 'YES를 30¢에 샀고 일어났습니다. 계약당 얼마를 받나요?' }, opts: ['$0.30', '$1.00', '$0.70'], a: 1 } },
  { id: 'l2', min: 3, title: { en: 'Reading prices as probabilities', kr: '가격을 확률로 읽기' }, body: {
    en: 'A contract at 62¢ means the market thinks there’s roughly a 62% chance it resolves YES. When the price moves from 55¢ to 62¢, people are becoming more confident.',
    kr: '62¢ 계약은 시장이 YES 확률을 약 62%로 본다는 뜻입니다. 55¢에서 62¢로 오르면 사람들이 더 확신하게 된 것입니다.' },
    quiz: { q: { en: 'A market is at 80¢. Roughly how likely does the market think YES is?', kr: '마켓이 80¢입니다. 시장이 보는 YES 확률은?' }, opts: ['20%', '50%', '80%'], a: 2 } },
  { id: 'l3', min: 2, title: { en: 'Fees and settlement', kr: '수수료와 정산' }, body: {
    en: 'Kalshi charges a small fee per contract, highest near 50¢. When the event is decided, winning contracts settle at $1 automatically in your Kalshi account.',
    kr: '칼시는 계약당 소액 수수료를 받으며 50¢ 부근에서 가장 높습니다. 결과가 확정되면 이긴 계약은 칼시 계정에서 자동으로 $1에 정산됩니다.' },
    quiz: { q: { en: 'Where do winnings settle?', kr: '수익은 어디로 정산되나요?' }, opts: ['Hanpan wallet', 'Your Kalshi account', 'Your bank directly'], a: 1 } },
  { id: 'l4', min: 4, title: { en: 'Opening a Kalshi account', kr: '칼시 계정 만들기' }, body: {
    en: 'You need to be 18+ and a US resident. Kalshi verifies your ID and you fund your account directly with them. Hanpan never holds your money.',
    kr: '만 18세 이상 미국 거주자여야 합니다. 칼시가 신분을 확인하며 입금은 칼시에 직접 합니다. 한판은 절대 고객 자금을 보관하지 않습니다.' },
    quiz: { q: { en: 'Who holds your money when you trade?', kr: '거래할 때 돈은 누가 보관하나요?' }, opts: ['Hanpan', 'Kalshi', 'Nobody'], a: 1 } },
  { id: 'l5', min: 3, title: { en: 'Managing risk', kr: '리스크 관리' }, body: {
    en: 'Only trade money you can afford to lose. Set a monthly limit and stick to it. Practicing with free picks first is a good way to learn.',
    kr: '잃어도 괜찮은 돈으로만 거래하세요. 월 한도를 정하고 지키세요. 무료 픽으로 먼저 연습하는 것도 좋은 방법입니다.' },
    quiz: { q: { en: 'What’s a good first step for a beginner?', kr: '초보자에게 좋은 첫 단계는?' }, opts: ['Go big on a long shot', 'Practice with free picks', 'Borrow to trade'], a: 1 } },
];

// Daily 5 question pool. Five are chosen per calendar day. `settle`:
// 'quick' settles a few minutes after you pick (in-game moments),
// 'tonight' at 11 PM local, 'morning' at 8 AM the next day.
export const dailyPool = [
  { id: 'd1', cat: 'MLB', q: { en: 'Dodgers score 4+ runs tonight?', kr: '다저스 오늘 4점 이상?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 54, out: 'A', settle: 'tonight' },
  { id: 'd2', cat: 'KBO', q: { en: 'KBO game goes to extra innings?', kr: 'KBO 경기 연장전 갈까?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 18, out: 'B', settle: 'morning' },
  { id: 'd3', cat: 'Won', q: { en: 'USD/KRW above ₩1,400 at tomorrow’s Seoul close?', kr: '내일 서울 마감 환율 ₩1,400 이상?' }, a: { en: 'Above', kr: '이상' }, b: { en: 'Below', kr: '미만' }, pa: 62, out: 'A', settle: 'morning' },
  { id: 'd4', cat: 'K-pop', q: { en: 'A BTS member posts on Weverse before midnight KST?', kr: 'BTS 멤버가 한국시간 자정 전 위버스에 글 올릴까?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 77, out: 'A', settle: 'quick' },
  { id: 'd5', cat: 'Soccer', q: { en: '3+ total goals in the LAFC match?', kr: 'LAFC 경기 총 3골 이상?' }, a: { en: 'Over', kr: '이상' }, b: { en: 'Under', kr: '미만' }, pa: 49, out: 'B', settle: 'tonight' },
  { id: 'd6', cat: 'KOSPI', q: { en: 'KOSPI closes up tonight?', kr: '오늘 밤 코스피 상승 마감?' }, a: { en: 'Up', kr: '상승' }, b: { en: 'Down', kr: '하락' }, pa: 56, out: 'A', settle: 'quick' },
  { id: 'd7', cat: 'Netflix', q: { en: 'A K-drama is #1 on Netflix US today?', kr: '오늘 넷플릭스 미국 1위가 K-드라마?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 31, out: 'B', settle: 'quick' },
  { id: 'd8', cat: 'NBA', q: { en: 'Lakers score 115+ in their next game?', kr: '레이커스 다음 경기 115점 이상?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 44, out: 'A', settle: 'tonight' },
  { id: 'd9', cat: 'Weather', q: { en: 'Rain in Koreatown LA tomorrow?', kr: '내일 LA 코리아타운에 비?' }, a: { en: 'Rain', kr: '비' }, b: { en: 'Dry', kr: '맑음' }, pa: 12, out: 'B', settle: 'morning' },
  { id: 'd10', cat: 'Samsung', q: { en: 'Samsung Electronics closes green in Seoul?', kr: '삼성전자 서울 상승 마감?' }, a: { en: 'Green', kr: '상승' }, b: { en: 'Red', kr: '하락' }, pa: 58, out: 'A', settle: 'quick' },
  { id: 'd11', cat: 'Hanpan', q: { en: 'Today’s top hot take gets 500+ likes?', kr: '오늘의 핫테이크 좋아요 500개 이상?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 40, out: 'A', settle: 'tonight' },
  { id: 'd12', cat: 'Golf', q: { en: 'A Korean player leads after LPGA Round 2?', kr: 'LPGA 2라운드 후 한국 선수 선두?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 39, out: 'A', settle: 'morning' },
  { id: 'd13', cat: 'MLB', q: { en: 'Kim Hye-seong gets a hit tonight?', kr: '김혜성 오늘 안타?' }, a: { en: 'Hit', kr: '안타' }, b: { en: 'No hit', kr: '무안타' }, pa: 63, out: 'A', settle: 'tonight' },
  { id: 'd14', cat: 'Gas', q: { en: 'LA County gas average drops overnight?', kr: 'LA 카운티 휘발유 평균가 하룻밤 새 하락?' }, a: { en: 'Drops', kr: '하락' }, b: { en: 'Flat/up', kr: '보합·상승' }, pa: 57, out: 'A', settle: 'morning' },
  { id: 'd15', cat: 'Food', q: { en: 'Line at the new K-town bingsu spot over 1 hour Saturday?', kr: '토요일 K타운 신상 빙수집 대기 1시간 이상?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 66, out: 'A', settle: 'quick' },
  { id: 'd16', cat: 'KBO', q: { en: 'LG Twins win Game 3?', kr: 'LG 트윈스 3차전 승리?' }, a: { en: 'LG', kr: 'LG' }, b: { en: 'Hanwha', kr: '한화' }, pa: 52, out: 'B', settle: 'morning' },
  { id: 'd17', cat: 'Fed', q: { en: 'Fed cut odds above 70% at tonight’s close?', kr: '오늘 마감 연준 인하 확률 70% 이상?' }, a: { en: 'Above', kr: '이상' }, b: { en: 'Below', kr: '미만' }, pa: 51, out: 'A', settle: 'quick' },
  { id: 'd18', cat: 'Soccer', q: { en: 'Kim Min-jae plays the full 90?', kr: '김민재 풀타임 출전?' }, a: { en: 'Yes', kr: '예' }, b: { en: 'No', kr: '아니오' }, pa: 71, out: 'A', settle: 'morning' },
];

export const leagueTiers = [
  { id: 'bronze', en: 'Bronze', kr: '브론즈' },
  { id: 'silver', en: 'Silver', kr: '실버' },
  { id: 'gold', en: 'Gold', kr: '골드' },
  { id: 'jade', en: 'Jade', kr: '비취' },
  { id: 'diamond', en: 'Diamond', kr: '다이아' },
];

// Other players in your weekly league; their points grow through the week.
export const leagueBots = [
  ['gracek', 2600], ['hyun', 2350], ['joon', 2200], ['sooah', 1980], ['tae', 1700], ['minji', 1550],
  ['mike', 1320], ['dan', 1180], ['eunji', 990], ['ajumma', 860],
  ['jy_park', 760], ['k_bae', 640], ['soyeon', 520], ['chris_h', 400], ['yuna_l', 260],
];
export const botNames = { jy_park: 'JY Park', k_bae: 'Kevin Bae', soyeon: 'Soyeon', chris_h: 'Chris Hwang', yuna_l: 'Yuna Lim' };

export const levels = [
  { at: 0, en: 'Rookie', kr: '새내기' },
  { at: 1500, en: 'Regular', kr: '단골' },
  { at: 5000, en: 'Sharp', kr: '고수' },
  { at: 15000, en: 'Master', kr: '달인' },
  { at: 40000, en: 'Legend', kr: '전설' },
];

export const roomScript = [
  { user: 'hyun', text: 'Let’s go!! 가자!!' },
  { user: 'eunji', text: '제발 한 점만 더 ㅠㅠ' },
  { user: 'joon', text: 'Market just ticked up a point' },
  { user: 'tae', text: '이 투수 공 진짜 좋다' },
  { user: 'gracek', text: 'Bullpen better hold. I have 500 points on this' },
  { user: 'mike', text: 'Watching from Atlanta, sending vibes' },
  { user: 'ajumma', text: '우리 아들도 같이 보고 있어요 ㅎㅎ' },
  { user: 'sooah', text: 'Strike three! 🔥' },
  { user: 'minji', text: 'who else is watching at work 👀' },
  { user: 'dan', text: '이거 이기면 내일 교회에서 자랑한다' },
];
