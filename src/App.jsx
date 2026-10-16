'use client';

import { useEffect, useRef } from 'react';
import { StoreProvider, useStore, dailyFor } from './lib/store';
import { useNav, Link } from './lib/nav';
import { dayKey, fmt } from './lib/time';
import { Icon, Logo } from './components/ui';
import { SheetHost } from './components/sheets';
import Onboarding from './screens/Onboarding';
import Today from './screens/Today';
import Markets, { MarketDetail } from './screens/Markets';
import Play, { Daily } from './screens/Play';
import Community, { GroupPage, Room } from './screens/Community';
import Me, { Invite, Settings } from './screens/Me';
import { Won, Athletes, Perks, Academy, Notifications } from './screens/Tools';

const TABS = [
  { id: 'home', to: '/', icon: 'home', en: 'Today', kr: '투데이' },
  { id: 'markets', to: '/markets', icon: 'markets', en: 'Markets', kr: '마켓' },
  { id: 'play', to: '/play', icon: 'picks', en: 'Play', kr: '플레이' },
  { id: 'community', to: '/community', icon: 'community', en: 'Community', kr: '커뮤니티' },
  { id: 'me', to: '/me', icon: 'user', en: 'Me', kr: 'MY' },
];

// [pattern, component, tab, title (for pages with a back button)]
const ROUTES = [
  ['/', Today, 'home'],
  ['/markets', Markets, 'markets'],
  ['/markets/:id', MarketDetail, 'markets', ['Market', '마켓']],
  ['/play', Play, 'play'],
  ['/play/daily', Daily, 'play', ['Daily 5', '데일리 5']],
  ['/community', Community, 'community'],
  ['/community/:tab', Community, 'community'],
  ['/groups/:id', GroupPage, 'community', ['Group', '그룹']],
  ['/rooms/:id', Room, 'community', ['Live room', '라이브 룸']],
  ['/me', Me, 'me'],
  ['/settings', Settings, 'me', ['Settings', '설정']],
  ['/invite', Invite, 'me', ['Invite', '초대']],
  ['/perks', Perks, 'me', ['Perks', '혜택']],
  ['/won', Won, 'home', ['Won tracker', '환율']],
  ['/athletes', Athletes, 'home', ['Athletes', '선수']],
  ['/academy', Academy, 'me', ['Academy', '아카데미']],
  ['/academy/:id', Academy, 'me', ['Academy', '아카데미']],
  ['/notifications', Notifications, 'home', ['Notifications', '알림']],
];

function match(path) {
  const clean = path.split('?')[0].replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);
  for (const [pattern, C, tab, title] of ROUTES) {
    const pp = pattern.split('/').filter(Boolean);
    if (pp.length !== parts.length) continue;
    const params = {};
    if (pp.every((seg, i) => (seg.startsWith(':') ? ((params[seg.slice(1)] = decodeURIComponent(parts[i])), true) : seg === parts[i]))) {
      return { C, tab, title, params, key: clean };
    }
  }
  return { C: Today, tab: 'home', params: {}, key: '/' };
}

function Shell() {
  const store = useStore();
  const nav = useNav();
  const scroller = useRef(null);
  const route = match(nav.path);
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [route.key]);

  if (!store) return <div className="phone splash"><Logo size={34} /></div>;
  const { s, L, toast, now } = store;
  if (!s.onboarded) {
    return (
      <div className="phone">
        <main className="scroller"><Onboarding /></main>
        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
    );
  }

  const unread = s.notifs.filter((n) => !n.read).length;
  const today = dayKey(now);
  const dailyLeft = dailyFor(today).some((q) => !s.picks[`d:${today}:${q.id}`]);
  const { C, params, title, tab } = route;
  const isRoom = C === Room;

  return (
    <div className="phone">
      <header className="topbar">
        {title ? (
          <div className="topbar-left">
            <button className="icon-btn" onClick={nav.back} aria-label={L('Back', '뒤로')}><Icon name="back" /></button>
            <span className="topbar-title">{L(title[0], title[1])}</span>
          </div>
        ) : (
          <Link to="/" className="logo-btn" aria-label="Hanpan"><Logo /></Link>
        )}
        <div className="topbar-right">
          <Link to="/perks" className="pts-pill" aria-label={L('Points and perks', '포인트와 혜택')}>
            <Icon name="flame" size={15} stroke={2.2} /><span>{fmt(s.points)}</span>
          </Link>
          <button className="lang-btn" onClick={() => store.actions.setLang(s.lang === 'en' ? 'kr' : 'en')} aria-label="Switch language / 언어 변경">
            <span className={s.lang === 'en' ? 'on' : ''}>EN</span>
            <span className={s.lang === 'kr' ? 'on' : ''}>한</span>
          </button>
          <Link to="/notifications" className="icon-btn bell" aria-label={L('Notifications', '알림')}>
            <Icon name="bell" />
            {unread > 0 && <span className="dot-badge">{unread > 9 ? '9+' : unread}</span>}
          </Link>
        </div>
      </header>

      <main className={`scroller ${isRoom ? 'scroller-room' : ''}`} ref={scroller}>
        <C key={route.key} {...params} />
      </main>

      <nav className="tabbar" aria-label="Main">
        {TABS.map((t) => (
          <Link key={t.id} to={t.to} className={tab === t.id ? 'on' : ''} aria-current={tab === t.id ? 'page' : undefined}>
            <span className="tab-ic">
              <Icon name={t.icon} size={22} stroke={tab === t.id ? 2.2 : 1.7} />
              {t.id === 'play' && dailyLeft && <i className="tab-dot" />}
            </span>
            <span>{L(t.en, t.kr)}</span>
          </Link>
        ))}
      </nav>

      <div id="sheet-root" />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <div className="stage">
        <SheetHostWrap />
      </div>
    </StoreProvider>
  );
}

function SheetHostWrap() {
  // Sheets render inside the phone frame so they line up with it on desktop.
  return (
    <SheetHost>
      <Shell />
    </SheetHost>
  );
}
