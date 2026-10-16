'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DAY, MIN, dayKey, weekStart, nextAt, shuffle, priceNow, drift } from './time';
import { dailyPool, leagueBots, leagueTiers, levels, markets, krw } from '../data/content';

const KEY = 'hanpan:v2';
const Ctx = createContext(null);

export const WELCOME_BONUS = 1000;
export const DAILY_STAKE = 100;

function fresh() {
  return {
    onboarded: false,
    profile: { name: '', handle: '', city: 'la', interests: [], over18: false, ref: '' },
    lang: 'en',
    points: 0,
    ledger: [],
    picks: {},
    activeDays: [],
    bonusDays: [],
    freezes: 1,
    follows: { markets: [], athletes: [], users: ['gracek', 'sooah', 'mike'] },
    alerts: {},
    joined: {},
    posts: [],
    comments: {},
    liked: {},
    votes: {},
    rsvp: {},
    redeemed: [],
    lessons: {},
    notifs: [],
    pendingResults: [],
    contests: {},
    waitlist: {},
    shares: 0,
    league: { tier: 0, week: weekStart(), history: [] },
    settings: { theme: 'system', beginner: true, notify: { moves: true, games: true, replies: true, streak: true } },
    createdAt: Date.now(),
  };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fresh();
    return { ...fresh(), ...JSON.parse(raw) };
  } catch {
    return fresh();
  }
}

// ---------- Derived values ----------

export function streakOf(s, now = Date.now()) {
  const days = new Set(s.activeDays);
  let d = new Date(now);
  if (!days.has(dayKey(d))) d = new Date(now - DAY);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d = new Date(d.getTime() - DAY);
  }
  return n;
}

export function xpOf(s) {
  return s.ledger.reduce((a, e) => a + (e.amt > 0 ? e.amt : 0), 0);
}

export function levelOf(s) {
  const xp = xpOf(s);
  let i = 0;
  while (i + 1 < levels.length && xp >= levels[i + 1].at) i++;
  const cur = levels[i];
  const next = levels[i + 1];
  return { i, cur, next, xp, pct: next ? (xp - cur.at) / (next.at - cur.at) : 1 };
}

export function weeklyPoints(s, ws = weekStart()) {
  return s.ledger.filter((e) => e.at >= ws && e.at < ws + 7 * DAY && e.amt > 0).reduce((a, e) => a + e.amt, 0);
}

export function leagueTable(s, now = Date.now()) {
  const ws = weekStart(now);
  const frac = Math.min(1, (now - ws) / (7 * DAY));
  const curve = 0.15 + 0.85 * frac;
  const tierBoost = 1 + s.league.tier * 0.35;
  const rows = leagueBots.map(([id, base], i) => ({ id, pts: Math.round(base * tierBoost * curve * (0.9 + ((i * 37) % 20) / 100)) }));
  rows.push({ id: 'me', pts: weeklyPoints(s, ws) });
  rows.sort((a, b) => b.pts - a.pts);
  return { rows, ends: ws + 7 * DAY, tier: leagueTiers[s.league.tier] };
}

export function dailyFor(day = dayKey()) {
  return shuffle(dailyPool, 'daily:' + day).slice(0, 5);
}

export function statsOf(s) {
  const all = Object.values(s.picks);
  const settled = all.filter((p) => p.status !== 'open');
  const won = settled.filter((p) => p.status === 'won').length;
  return { total: all.length, settled: settled.length, won, acc: settled.length ? Math.round((won / settled.length) * 100) : null, open: all.length - settled.length };
}

export function badgesOf(s) {
  const st = statsOf(s);
  const streak = streakOf(s);
  const out = [];
  if (st.total >= 1) out.push({ id: 'first', icon: 'picks', en: 'First pick', kr: '첫 픽' });
  if (streak >= 3) out.push({ id: 's3', icon: 'flame', en: '3-day streak', kr: '3일 연속' });
  if (streak >= 7) out.push({ id: 's7', icon: 'flame', en: '7-day streak', kr: '7일 연속' });
  if (s.ledger.some((e) => e.reason === 'perfect5')) out.push({ id: 'p5', icon: 'star', en: 'Perfect Daily 5', kr: '데일리5 올킬' });
  if (Object.keys(s.lessons).length >= 5) out.push({ id: 'acad', icon: 'book', en: 'Academy grad', kr: '아카데미 수료' });
  if (s.posts.length >= 1) out.push({ id: 'voice', icon: 'chat', en: 'First post', kr: '첫 게시글' });
  if (Object.values(s.joined).filter(Boolean).length >= 2) out.push({ id: 'social', icon: 'community', en: 'Joined 2 groups', kr: '그룹 2개 가입' });
  if (s.redeemed.length >= 1) out.push({ id: 'perk', icon: 'gift', en: 'First perk', kr: '첫 혜택' });
  if (s.shares >= 1) out.push({ id: 'share', icon: 'share', en: 'Spread the word', kr: '홍보대사' });
  return out;
}

export function bonusAmount(streak) {
  return 50 + 10 * Math.min(streak, 7);
}

// ---------- Provider ----------

export function StoreProvider({ children }) {
  const [s, setS] = useState(null);
  const [toast, setToast] = useState(null);
  const toastT = useRef(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => { setS(load()); }, []);
  useEffect(() => {
    if (!s) return;
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage unavailable */ }
  }, [s]);

  useEffect(() => {
    if (!s) return;
    const root = document.documentElement;
    if (s.settings.theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', s.settings.theme);
    root.lang = s.lang === 'kr' ? 'ko' : 'en';
  }, [s?.settings.theme, s?.lang]);

  const update = useCallback((fn) => {
    setS((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      fn(next);
      return next;
    });
  }, []);

  const notify = useCallback((msg) => {
    clearTimeout(toastT.current);
    setToast(msg);
    toastT.current = setTimeout(() => setToast(null), 2600);
  }, []);

  // Engine: settles picks, fires alerts and rolls the weekly league.
  useEffect(() => {
    if (!s?.onboarded) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      update((d) => engine(d, t));
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [s?.onboarded, update]);

  const api = useMemo(() => {
    if (!s) return null;
    const L = (a, b) => (typeof a === 'object' && a ? a[s.lang] ?? a.en : s.lang === 'kr' && b != null ? b : a);
    return { s, now, update, notify, toast, L, actions: makeActions(update, notify, () => s) };
  }, [s, now, update, notify, toast]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
export const useL = () => useContext(Ctx).L;

// ---------- Mutations ----------

function addPoints(d, amt, reason, label) {
  d.points += amt;
  d.ledger.push({ at: Date.now(), amt, reason, label });
  if (d.ledger.length > 600) d.ledger = d.ledger.slice(-600);
}

function markActive(d) {
  const k = dayKey();
  if (!d.activeDays.includes(k)) d.activeDays.push(k);
  if (d.activeDays.length > 400) d.activeDays = d.activeDays.slice(-400);
}

function pushNotif(d, n) {
  d.notifs.unshift({ id: Math.random().toString(36).slice(2), at: Date.now(), read: false, ...n });
  if (d.notifs.length > 60) d.notifs.length = 60;
}

function settleAt(kind) {
  const t = Date.now();
  if (kind === 'quick') return t + 3 * MIN;
  if (kind === 'tonight') return nextAt(23, t);
  const m = nextAt(8, t);
  return m - t < 6 * 3600_000 ? m + DAY : m;
}

function engine(d, t) {
  // Settle picks.
  for (const [key, p] of Object.entries(d.picks)) {
    if (p.status !== 'open' || !p.resolveAt || p.resolveAt > t || !p.outcome) continue;
    const won = p.side === p.outcome;
    p.status = won ? 'won' : 'lost';
    p.settledAt = t;
    if (won) {
      p.payout = Math.round((p.stake * 100) / p.price);
      d.points += p.payout;
      d.ledger.push({ at: t, amt: p.payout, reason: 'win', label: p.label });
    }
    d.pendingResults.push(key);
    pushNotif(d, { icon: won ? 'check' : 'x', en: `${won ? 'Won' : 'Missed'}: ${p.label.en}${won ? ` (+${p.payout})` : ''}`, kr: `${won ? '적중' : '실패'}: ${p.label.kr}${won ? ` (+${p.payout})` : ''}`, to: '/play' });
  }

  // Perfect Daily 5 bonus.
  const days = {};
  for (const [key, p] of Object.entries(d.picks)) {
    if (!key.startsWith('d:')) continue;
    const day = key.split(':')[1];
    (days[day] ||= []).push(p);
  }
  for (const [day, ps] of Object.entries(days)) {
    if (ps.length === 5 && ps.every((p) => p.status === 'won') && !d.ledger.some((e) => e.reason === 'perfect5' && e.day === day)) {
      d.points += 500;
      d.ledger.push({ at: t, amt: 500, reason: 'perfect5', day, label: { en: 'Perfect Daily 5', kr: '데일리5 올킬' } });
      pushNotif(d, { icon: 'star', en: 'Perfect Daily 5! +500 bonus', kr: '데일리5 올킬! +500 보너스', to: '/play' });
    }
  }

  // Price alerts.
  for (const [id, a] of Object.entries(d.alerts)) {
    if (!a || a.fired) continue;
    let v;
    let name;
    if (id === 'krw') {
      v = Math.round(drift('krw', krw.base, 6, t) * 100) / 100;
      name = { en: 'USD/KRW', kr: '원/달러 환율' };
    } else {
      const m = markets.find((x) => x.id === id);
      if (!m) continue;
      v = priceNow(m, t);
      name = m.title;
    }
    const hit = a.dir === 'above' ? v >= a.value : v <= a.value;
    if (hit) {
      a.fired = t;
      pushNotif(d, { icon: 'bell', en: `Alert: ${name.en} is ${a.dir} ${a.value} (now ${v})`, kr: `알림: ${name.kr} ${a.value} ${a.dir === 'above' ? '이상' : '이하'} (현재 ${v})`, to: id === 'krw' ? '/won' : `/markets/${id}` });
    }
  }

  // Weekly league rollover.
  const ws = weekStart(t);
  if (d.league.week !== ws) {
    const prevWs = d.league.week;
    const prev = leagueTable({ ...d, league: { ...d.league } }, prevWs + 7 * DAY - 1);
    const rank = prev.rows.findIndex((r) => r.id === 'me') + 1;
    let tier = d.league.tier;
    if (rank <= 5 && tier < leagueTiers.length - 1) tier++;
    else if (rank >= 14 && tier > 0) tier--;
    d.league.history.unshift({ week: prevWs, rank, tier: d.league.tier });
    pushNotif(d, {
      icon: 'trophy',
      en: tier > d.league.tier ? `Promoted to ${leagueTiers[tier].en} league! You finished #${rank}.` : tier < d.league.tier ? `Moved down to ${leagueTiers[tier].en}. New week, new shot.` : `Week over: you finished #${rank} in ${leagueTiers[tier].en}.`,
      kr: tier > d.league.tier ? `${leagueTiers[tier].kr} 리그로 승급! ${rank}위로 마감.` : tier < d.league.tier ? `${leagueTiers[tier].kr} 리그로 강등. 새 주, 새 기회.` : `주간 마감: ${leagueTiers[tier].kr} 리그 ${rank}위.`,
      to: '/play',
    });
    d.league.tier = tier;
    d.league.week = ws;
  }

  // Evening streak reminder.
  const k = dayKey(t);
  const hr = new Date(t).getHours();
  if (d.settings.notify.streak && hr >= 18 && !d.activeDays.includes(k) && streakOf(d, t) > 0 && d.lastStreakNudge !== k) {
    d.lastStreakNudge = k;
    pushNotif(d, { icon: 'flame', en: `Your ${streakOf(d, t)}-day streak ends at midnight. One pick keeps it alive.`, kr: `${streakOf(d, t)}일 연속 기록이 자정에 끊겨요. 픽 하나면 유지됩니다.`, to: '/play/daily' });
  }
}

function makeActions(update, notify) {
  return {
    setLang: (lang) => update((d) => { d.lang = lang; }),
    setSetting: (k, v) => update((d) => { d.settings[k] = v; }),
    setNotify: (k, v) => update((d) => { d.settings.notify[k] = v; }),

    finishOnboarding: (profile) => update((d) => {
      d.profile = { ...d.profile, ...profile };
      d.onboarded = true;
      addPoints(d, WELCOME_BONUS, 'welcome', { en: 'Welcome bonus', kr: '가입 보너스' });
      const cityGroup = { la: 'gr1', nynj: 'gr2', dmv: 'gr3', atl: 'gr8' }[profile.city];
      if (cityGroup) d.joined[cityGroup] = true;
      pushNotif(d, { icon: 'gift', en: `Welcome to Hanpan! +${WELCOME_BONUS} points to start.`, kr: `한판에 오신 걸 환영해요! 시작 포인트 +${WELCOME_BONUS}.`, to: '/play/daily' });
      if (profile.ref) {
        addPoints(d, 250, 'ref', { en: 'Invite bonus', kr: '초대 보너스' });
      }
    }),

    claimBonus: () => update((d) => {
      const k = dayKey();
      if (d.bonusDays.includes(k)) return;
      markActive(d);
      const amt = bonusAmount(streakOf(d));
      d.bonusDays.push(k);
      addPoints(d, amt, 'bonus', { en: 'Daily bonus', kr: '출석 보너스' });
      notify(d.lang === 'kr' ? `출석 완료 +${amt}` : `Checked in +${amt}`);
    }),

    pickDaily: (q, side) => update((d) => {
      const day = dayKey();
      const key = `d:${day}:${q.id}`;
      if (d.picks[key]) return;
      if (d.points < DAILY_STAKE) { notify(d.lang === 'kr' ? '포인트가 부족해요' : 'Not enough points'); return; }
      addPoints(d, -DAILY_STAKE, 'stake', q.q);
      markActive(d);
      d.picks[key] = { id: q.id, kind: 'daily', side, stake: DAILY_STAKE, price: side === 'A' ? q.pa : 100 - q.pa, at: Date.now(), resolveAt: settleAt(q.settle), outcome: q.out, status: 'open', label: q.q, sideLabel: side === 'A' ? q.a : q.b };
    }),

    pickMarket: (m, side, stake, price) => update((d) => {
      const key = `m:${m.id}`;
      if (d.picks[key]) return;
      if (d.points < stake) { notify(d.lang === 'kr' ? '포인트가 부족해요' : 'Not enough points'); return; }
      addPoints(d, -stake, 'stake', m.title);
      markActive(d);
      d.picks[key] = { id: m.id, kind: 'market', side, stake, price, at: Date.now(), resolveAt: new Date(m.closeAt).getTime(), outcome: null, status: 'open', label: m.title, sideLabel: { en: side, kr: side === 'YES' ? '예' : '아니오' } };
      notify(d.lang === 'kr' ? `${side} 픽 완료 · ${stake} 포인트` : `Picked ${side} · ${stake} pts`);
    }),

    seenResults: () => update((d) => { d.pendingResults = []; }),

    toggle: (field, id, v) => update((d) => { d[field][id] = v ?? !d[field][id]; }),
    follow: (kind, id) => update((d) => {
      const list = d.follows[kind];
      const i = list.indexOf(id);
      if (i >= 0) list.splice(i, 1); else list.push(id);
    }),
    setAlert: (id, a) => update((d) => { d.alerts[id] = a; }),

    post: (text, extra = {}) => update((d) => {
      d.posts.unshift({ id: 'u' + Date.now(), user: 'me', at: Date.now(), likes: 0, replies: 0, text, ...extra });
      markActive(d);
      if (d.posts.length === 1) addPoints(d, 100, 'post', { en: 'First post', kr: '첫 게시글' });
    }),
    comment: (mid, text) => update((d) => {
      (d.comments[mid] ||= []).unshift({ user: 'me', text, likes: 0, at: Date.now() });
      markActive(d);
    }),
    vote: (pid, i) => update((d) => { if (d.votes[pid] == null) d.votes[pid] = i; }),

    redeem: (perk, code) => update((d) => {
      if (d.points < perk.cost) { notify(d.lang === 'kr' ? '포인트가 부족해요' : 'Not enough points'); return; }
      addPoints(d, -perk.cost, 'perk', perk.title);
      d.redeemed.unshift({ id: perk.id, at: Date.now(), code });
    }),

    completeLesson: (id) => update((d) => {
      if (d.lessons[id]) return;
      d.lessons[id] = Date.now();
      addPoints(d, 50, 'lesson', { en: 'Lesson complete', kr: '강의 완료' });
      markActive(d);
    }),

    joinContest: (id) => update((d) => { d.contests[id] = !d.contests[id]; }),
    joinWaitlist: (id) => update((d) => { d.waitlist[id] = Date.now(); }),
    shared: () => update((d) => {
      d.shares++;
      if (d.shares === 1) addPoints(d, 100, 'share', { en: 'First share', kr: '첫 공유' });
    }),
    readNotifs: () => update((d) => { d.notifs.forEach((n) => { n.read = true; }); }),
    reset: () => {
      try { localStorage.removeItem(KEY); } catch { /* ignore */ }
      update((d) => { Object.keys(d).forEach((k) => delete d[k]); Object.assign(d, fresh()); });
    },
  };
}
