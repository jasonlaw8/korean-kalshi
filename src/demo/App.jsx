import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppCtx, Icon, Logo, fmt } from './ui';
import { me, notifications } from './data';
import Home from './screens/Home';
import Markets from './screens/Markets';
import Picks from './screens/Picks';
import Community from './screens/Community';
import Profile from './screens/Profile';
import Overlays from './screens/Overlays';

const TABS = [
  { id: 'home', icon: 'home', en: 'Home', kr: '홈' },
  { id: 'markets', icon: 'markets', en: 'Markets', kr: '마켓' },
  { id: 'picks', icon: 'picks', en: 'Picks', kr: '픽' },
  { id: 'community', icon: 'community', en: 'Community', kr: '커뮤니티' },
  { id: 'profile', icon: 'user', en: 'Me', kr: 'MY' },
];

function load(key, fallback) {
  try {
    const v = localStorage.getItem('hanpan:' + key);
    return v == null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}
function save(key, v) {
  try { localStorage.setItem('hanpan:' + key, JSON.stringify(v)); } catch { /* storage unavailable */ }
}

export default function App() {
  const [lang, setLang] = useState(() => load('lang', 'en'));
  const [theme, setTheme] = useState(() => load('theme', 'system'));
  const [tab, setTab] = useState('home');
  const [beginner, setBeginner] = useState(false);
  const [points, setPoints] = useState(me.points);
  const [picks, setPicks] = useState({}); // marketId -> { side, stake }
  const [overlay, setOverlay] = useState(null); // { type, ...props }
  const [toast, setToast] = useState(null);
  const [extraComments, setExtraComments] = useState({});
  const [extraPosts, setExtraPosts] = useState([]);
  const [liked, setLiked] = useState({});
  const [votes, setVotes] = useState({});
  const [joined, setJoined] = useState({});
  const [rsvp, setRsvp] = useState({});
  const [connected, setConnected] = useState(false);
  const [plus, setPlus] = useState(false);
  const [lessonsDone, setLessonsDone] = useState({ l1: true });
  const [contestsIn, setContestsIn] = useState({ k1: true });
  const [unread, setUnread] = useState(notifications.filter((n) => n.unread).length);
  const scroller = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => save('lang', lang), [lang]);
  useEffect(() => {
    save('theme', theme);
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [tab]);

  const notify = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const open = useCallback((type, props = {}) => setOverlay({ type, ...props }), []);
  const close = useCallback(() => setOverlay(null), []);

  const ctx = useMemo(() => ({
    lang, setLang, theme, setTheme, tab, setTab, beginner, setBeginner,
    points, setPoints, picks, setPicks, open, close, notify,
    extraComments, setExtraComments, extraPosts, setExtraPosts, liked, setLiked, votes, setVotes,
    joined, setJoined, rsvp, setRsvp, connected, setConnected, plus, setPlus,
    lessonsDone, setLessonsDone, contestsIn, setContestsIn,
  }), [lang, theme, tab, beginner, points, picks, open, close, notify, extraComments, extraPosts, liked, votes, joined, rsvp, connected, plus, lessonsDone, contestsIn]);

  const L = (a, b) => (lang === 'kr' ? b : a);
  const Screen = { home: Home, markets: Markets, picks: Picks, community: Community, profile: Profile }[tab];

  return (
    <AppCtx.Provider value={ctx}>
      <div className="stage" lang={lang === 'kr' ? 'ko' : 'en'}>
        <div className="phone">
          <header className="topbar">
            <button className="logo-btn" onClick={() => setTab('home')} aria-label="Hanpan home"><Logo /></button>
            <div className="topbar-right">
              <button className="pts-pill" onClick={() => setTab('picks')} aria-label={L('Your points', '내 포인트')}>
                <Icon name="flame" size={15} stroke={2.2} />
                <span>{fmt(points)}</span>
              </button>
              <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'kr' : 'en')} aria-label="Switch language">
                <span className={lang === 'en' ? 'on' : ''}>EN</span>
                <span className={lang === 'kr' ? 'on' : ''}>한</span>
              </button>
              <button className="icon-btn bell" onClick={() => { setUnread(0); open('notifications'); }} aria-label={L('Notifications', '알림')}>
                <Icon name="bell" />
                {unread > 0 && <span className="dot-badge">{unread}</span>}
              </button>
            </div>
          </header>

          <main className="scroller" ref={scroller}>
            <Screen key={tab} />
          </main>

          <nav className="tabbar" aria-label="Main">
            {TABS.map((t) => (
              <button key={t.id} className={tab === t.id ? 'on' : ''} onClick={() => setTab(t.id)} aria-current={tab === t.id ? 'page' : undefined}>
                <Icon name={t.icon} size={22} stroke={tab === t.id ? 2.2 : 1.7} />
                <span>{lang === 'kr' ? t.kr : t.en}</span>
              </button>
            ))}
          </nav>

          <Overlays overlay={overlay} />
          {toast && <div className="toast" role="status">{toast}</div>}
        </div>
      </div>
    </AppCtx.Provider>
  );
}
