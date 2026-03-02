const games = [
  // KBO
  {
    id: 1,
    league: 'kbo',
    home: { en: 'Samsung Lions', kr: '삼성 라이온즈' },
    away: { en: 'LG Twins', kr: 'LG 트윈스' },
    time: '7:00 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '-1.5', odds: '+130' },
      away: { line: '+1.5', odds: '-150' },
    },
    moneyline: { home: '-120', away: '+100' },
    total: {
      over: { line: '8.5', odds: '-110' },
      under: { line: '8.5', odds: '-110' },
    },
  },
  {
    id: 2,
    league: 'kbo',
    home: { en: 'Kia Tigers', kr: '기아 타이거즈' },
    away: { en: 'Doosan Bears', kr: '두산 베어스' },
    time: '6:30 PM KST',
    isLive: true,
    liveScore: { home: 3, away: 2, inning: 'Top 5th' },
    koreanPlayer: null,
    spread: {
      home: { line: '-0.5', odds: '-115' },
      away: { line: '+0.5', odds: '-105' },
    },
    moneyline: { home: '-135', away: '+115' },
    total: {
      over: { line: '9.5', odds: '+100' },
      under: { line: '9.5', odds: '-120' },
    },
  },
  {
    id: 3,
    league: 'kbo',
    home: { en: 'NC Dinos', kr: 'NC 다이노스' },
    away: { en: 'SSG Landers', kr: 'SSG 랜더스' },
    time: '7:00 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '-1.5', odds: '+140' },
      away: { line: '+1.5', odds: '-160' },
    },
    moneyline: { home: '+105', away: '-125' },
    total: {
      over: { line: '7.5', odds: '-105' },
      under: { line: '7.5', odds: '-115' },
    },
  },
  // K League
  {
    id: 4,
    league: 'kleague',
    home: { en: 'Jeonbuk Motors', kr: '전북 현대 모터스' },
    away: { en: 'Ulsan HD', kr: '울산 HD' },
    time: '7:30 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '-0.5', odds: '+110' },
      away: { line: '+0.5', odds: '-130' },
    },
    moneyline: { home: '+140', away: '-110', draw: '+220' },
    total: {
      over: { line: '2.5', odds: '-120' },
      under: { line: '2.5', odds: '+100' },
    },
  },
  {
    id: 5,
    league: 'kleague',
    home: { en: 'FC Seoul', kr: 'FC 서울' },
    away: { en: 'Suwon Bluewings', kr: '수원 삼성 블루윙즈' },
    time: '8:00 PM KST',
    isLive: true,
    liveScore: { home: 1, away: 1, minute: "62'" },
    koreanPlayer: null,
    spread: {
      home: { line: '-0.5', odds: '-105' },
      away: { line: '+0.5', odds: '-115' },
    },
    moneyline: { home: '+130', away: '+150', draw: '+200' },
    total: {
      over: { line: '2.5', odds: '+105' },
      under: { line: '2.5', odds: '-125' },
    },
  },
  // KBL
  {
    id: 6,
    league: 'kbl',
    home: { en: 'Seoul Samsung Thunders', kr: '서울 삼성 썬더스' },
    away: { en: 'Anyang KGC', kr: '안양 KGC' },
    time: '7:00 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '-4.5', odds: '-110' },
      away: { line: '+4.5', odds: '-110' },
    },
    moneyline: { home: '-180', away: '+155' },
    total: {
      over: { line: '162.5', odds: '-110' },
      under: { line: '162.5', odds: '-110' },
    },
  },
  {
    id: 7,
    league: 'kbl',
    home: { en: 'Wonju DB Promy', kr: '원주 DB 프로미' },
    away: { en: 'Seoul SK Knights', kr: '서울 SK 나이츠' },
    time: '7:30 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '+2.5', odds: '-105' },
      away: { line: '-2.5', odds: '-115' },
    },
    moneyline: { home: '+130', away: '-150' },
    total: {
      over: { line: '158.5', odds: '-115' },
      under: { line: '158.5', odds: '-105' },
    },
  },
  // LCK
  {
    id: 8,
    league: 'lck',
    home: { en: 'T1', kr: 'T1' },
    away: { en: 'Gen.G', kr: 'Gen.G' },
    time: '5:00 PM KST',
    isLive: true,
    liveScore: { home: 1, away: 1, game: 'Game 3' },
    koreanPlayer: null,
    spread: {
      home: { line: '-1.5', odds: '+140' },
      away: { line: '+1.5', odds: '-170' },
    },
    moneyline: { home: '-130', away: '+110' },
    total: {
      over: { line: '3.5', odds: '-125' },
      under: { line: '3.5', odds: '+105' },
    },
  },
  {
    id: 9,
    league: 'lck',
    home: { en: 'DRX', kr: 'DRX' },
    away: { en: 'Hanwha Life', kr: '한화생명 e스포츠' },
    time: '8:00 PM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: null,
    spread: {
      home: { line: '+1.5', odds: '-140' },
      away: { line: '-1.5', odds: '+120' },
    },
    moneyline: { home: '+175', away: '-210' },
    total: {
      over: { line: '3.5', odds: '+110' },
      under: { line: '3.5', odds: '-130' },
    },
  },
  // MLB (Korean players)
  {
    id: 10,
    league: 'mlb',
    home: { en: 'SD Padres', kr: 'SD 파드리스' },
    away: { en: 'LA Dodgers', kr: 'LA 다저스' },
    time: '10:10 AM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: {
      name: { en: 'Kim Ha-seong', kr: '김하성' },
      team: 'home',
    },
    spread: {
      home: { line: '+1.5', odds: '-160' },
      away: { line: '-1.5', odds: '+140' },
    },
    moneyline: { home: '+130', away: '-150' },
    total: {
      over: { line: '8.0', odds: '-110' },
      under: { line: '8.0', odds: '-110' },
    },
  },
  {
    id: 11,
    league: 'mlb',
    home: { en: 'Toronto Blue Jays', kr: '토론토 블루제이스' },
    away: { en: 'NY Yankees', kr: 'NY 양키스' },
    time: '8:05 AM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: {
      name: { en: 'Ryu Hyun-jin', kr: '류현진' },
      team: 'home',
    },
    spread: {
      home: { line: '+1.5', odds: '-145' },
      away: { line: '-1.5', odds: '+125' },
    },
    moneyline: { home: '+155', away: '-175' },
    total: {
      over: { line: '8.5', odds: '-105' },
      under: { line: '8.5', odds: '-115' },
    },
  },
  // EPL (Son Heung-min)
  {
    id: 12,
    league: 'epl',
    home: { en: 'Tottenham', kr: '토트넘' },
    away: { en: 'Arsenal', kr: '아스널' },
    time: '1:30 AM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: {
      name: { en: 'Son Heung-min', kr: '손흥민' },
      team: 'home',
    },
    spread: {
      home: { line: '+0.5', odds: '-110' },
      away: { line: '-0.5', odds: '-110' },
    },
    moneyline: { home: '+200', away: '+110', draw: '+240' },
    total: {
      over: { line: '2.5', odds: '-105' },
      under: { line: '2.5', odds: '-115' },
    },
  },
  {
    id: 13,
    league: 'epl',
    home: { en: 'Wolves', kr: '울버햄튼' },
    away: { en: 'Tottenham', kr: '토트넘' },
    time: '4:00 AM KST',
    isLive: false,
    liveScore: null,
    koreanPlayer: {
      name: { en: 'Hwang Hee-chan', kr: '황희찬' },
      team: 'home',
    },
    spread: {
      home: { line: '+0.5', odds: '+100' },
      away: { line: '-0.5', odds: '-120' },
    },
    moneyline: { home: '+250', away: '+100', draw: '+230' },
    total: {
      over: { line: '2.5', odds: '+100' },
      under: { line: '2.5', odds: '-120' },
    },
  },
];

export default games;
