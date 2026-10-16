'use client';

import { useEffect, useMemo, useState } from 'react';
import { useL, useStore } from '../lib/store';
import { Link } from '../lib/nav';
import { series } from '../lib/time';
import { users, botNames } from '../data/content';

const paths = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  markets: 'M4 19V9m5 10V5m5 14v-7m5 7V8',
  picks: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  community: 'M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm13 9v-1a4 4 0 0 0-3-3.87M16 3.13a3.5 3.5 0 0 1 0 6.75',
  user: 'M20 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-7A4.5 4.5 0 0 0 4 19.5V21M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  share: 'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4m4-4v13',
  chat: 'M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12Z',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z',
  ext: 'M7 17 17 7M8 7h9v9',
  check: 'M20 6 9 17l-5-5',
  flame: 'M12 22c4.4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 2.6 7 7 7Z',
  trophy: 'M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3',
  pin: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  calendar: 'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14H4zm0 4h16M8 2v4m8-4v4',
  lock: 'M6 11h12v10H6zm2 0V7a4 4 0 1 1 8 0v4',
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9Z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20',
  x: 'M18 6 6 18M6 6l12 12',
  chev: 'm9 18 6-6-6-6',
  back: 'm15 18-6-6 6-6',
  send: 'M22 2 11 13M22 2l-7 20-4-9-9-4z',
  plus: 'M12 5v14M5 12h14',
  live: 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-4.2 2.2a6 6 0 0 1 0-8.4m8.4 0a6 6 0 0 1 0 8.4M4.9 19.1a10 10 0 0 1 0-14.2m14.2 0a10 10 0 0 1 0 14.2',
  link: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
  trend: 'm22 7-8.5 8.5-5-5L2 17M16 7h6v6',
  sparkle: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6',
  gift: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7m0 0H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z',
  settings: 'M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6',
  image: 'M3 5h18v14H3zM8.5 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM21 15l-5-5L5 19',
  poll: 'M4 20h4V10H4zm6 0h4V4h-4zm6 0h4v-7h-4z',
  ball: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM5.6 4.4c2 2.2 2 13 0 15.2M18.4 4.4c-2 2.2-2 13 0 15.2',
  won: 'M4 6l3.5 12L12 8l4.5 10L20 6M3 11h18M3 14h18',
  flag: 'M4 22V4m0 0h13l-2 4 2 4H4',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v5l3 2',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-6v-5m0-3h.01',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  swap: 'M7 4 3 8l4 4M3 8h14m0 12 4-4-4-4m4 4H7',
};

export function Icon({ name, size = 20, stroke = 1.8, fill = 'none', className = '' }) {
  return (
    <svg className={`ic ${className}`} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.info} />
    </svg>
  );
}

export function Logo({ size = 22 }) {
  return (
    <span className="logo" style={{ fontSize: size }}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width={size + 6} height={size + 6}>
          <path d="M16 1a15 15 0 0 1 0 30 7.5 7.5 0 0 1 0-15 7.5 7.5 0 0 0 0-15Z" fill="var(--persimmon)" />
          <path d="M16 1a7.5 7.5 0 0 1 0 15 7.5 7.5 0 0 0 0 15A15 15 0 0 1 16 1Z" fill="var(--jade)" />
        </svg>
      </span>
      <span className="logo-kr">한판</span>
    </span>
  );
}

export function nameOf(id, s) {
  if (id === 'me') return s?.profile.name || 'You';
  return users[id]?.name || botNames[id] || id;
}

export function Avatar({ id, size = 36 }) {
  const { s } = useStore();
  const name = nameOf(id, s);
  let h = 0;
  for (const c of id === 'me' ? name : id) h = (h * 31 + c.charCodeAt(0)) % 360;
  const initials = name.split(/\s+/).map((w) => [...w][0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: id === 'me' ? 'var(--ink)' : `hsl(${h} 42% 46%)`, color: id === 'me' ? 'var(--bg)' : '#fff' }}>
      {initials || '?'}
    </span>
  );
}

export function Sparkline({ seed, end, chg, w = 84, h = 30 }) {
  const pts = useMemo(() => series(seed, end, chg, 28), [seed, end, chg]);
  const min = Math.min(...pts) - 2;
  const max = Math.max(...pts) + 2;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * w, h - ((v - min) / (max - min)) * h]);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
  const cls = chg >= 0 ? 'up' : 'down';
  return (
    <svg className={`spark ${cls}`} width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path d={`${d}L${w},${h}L0,${h}Z`} className="spark-fill" />
      <path d={d} className="spark-line" fill="none" />
      <circle cx={xy.at(-1)[0]} cy={xy.at(-1)[1]} r="2.6" className="spark-dot" />
    </svg>
  );
}

// Line chart with axis labels. `unit` formats tick labels; `pts` overrides the generated series.
export function LineChart({ seed, end, chg, unit = (v) => `${Math.round(v)}¢`, pts: given, step = 10, labels: lbl }) {
  const [range, setRange] = useState('1W');
  const n = { '1D': 24, '1W': 48, '1M': 60, ALL: 90 }[range];
  const pts = useMemo(() => given ? given(range, n) : series(seed + range, end, chg * (n / 48), n), [seed, end, chg, range, n, given]);
  const W = 340, H = 150, padL = 4, padR = 44, padT = 10, padB = 18;
  const lo = Math.floor((Math.min(...pts) - step * 0.4) / step) * step;
  const hi = Math.ceil((Math.max(...pts) + step * 0.4) / step) * step;
  const x = (i) => padL + (i / (pts.length - 1)) * (W - padL - padR);
  const y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
  const d = pts.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const ticks = [];
  for (let t = lo; t <= hi + 1e-9; t += (hi - lo) / 4) ticks.push(t);
  const labels = lbl || { '1D': ['9a', '3p', 'now'], '1W': ['7d ago', '3d', 'now'], '1M': ['30d ago', '15d', 'now'], ALL: ['90d ago', '45d', 'now'] }[range];
  const dir = pts.at(-1) >= pts[0] ? 'up' : 'down';
  const last = pts.at(-1);
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Chart, now ${unit(last)}`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} className="grid" />
            <text x={W - padR + 6} y={y(t) + 3.5} className="axis">{unit(t)}</text>
          </g>
        ))}
        <path d={`${d}L${x(pts.length - 1)},${H - padB}L${padL},${H - padB}Z`} className={`area ${dir}`} />
        <path d={d} className={`line ${dir}`} fill="none" />
        <circle cx={x(pts.length - 1)} cy={y(last)} r="7" className={`pulse ${dir}`} />
        <circle cx={x(pts.length - 1)} cy={y(last)} r="3.5" className={`dot ${dir}`} />
        {labels.map((l, i) => (
          <text key={l} x={padL + (i / 2) * (W - padL - padR)} y={H - 3} className="axis" textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'}>{l}</text>
        ))}
      </svg>
      <div className="seg seg-sm">
        {['1D', '1W', '1M', 'ALL'].map((r) => (
          <button key={r} className={r === range ? 'on' : ''} onClick={() => setRange(r)}>{r}</button>
        ))}
      </div>
    </div>
  );
}

export function Chg({ v, suffix = '' }) {
  return <span className={`chg ${v >= 0 ? 'up' : 'down'}`}>{v >= 0 ? '▲' : '▼'}{Math.abs(v)}{suffix}</span>;
}

export function SrcBadge({ src }) {
  const L = useL();
  return src === 'kalshi'
    ? <span className="badge badge-kalshi">Kalshi</span>
    : <span className="badge badge-comm">{L('Community · points', '커뮤니티 · 포인트')}</span>;
}

export function Sheet({ onClose, children, title, full }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-label={title}>
      <div className="scrim" onClick={onClose} />
      <div className={`sheet ${full ? 'sheet-full' : ''}`}>
        <div className="sheet-grab" />
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

export function Toggle({ on, onChange, id, label }) {
  return (
    <button id={id} role="switch" aria-checked={on} aria-label={label} className={`toggle ${on ? 'on' : ''}`} onClick={() => onChange(!on)}>
      <span />
    </button>
  );
}

export function SecHead({ title, action, onAction, to }) {
  return (
    <div className="sec-head">
      <h2 className="h2">{title}</h2>
      {action && (to ? <LinkLike to={to}>{action}</LinkLike> : <button className="link" onClick={onAction}>{action}</button>)}
    </div>
  );
}

function LinkLike({ to, children }) {
  return <Link className="link" to={to}>{children}</Link>;
}

// Share via the Web Share sheet (KakaoTalk, Messages, Instagram appear there on phones),
// falling back to copying the link.
export async function shareLink({ title, text, path, L, notify, onShared }) {
  const url = `https://hanpan.app${path || ''}`;
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      onShared?.();
      return;
    }
  } catch (e) {
    if (e?.name === 'AbortError') return;
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    notify(L('Link copied. Paste it in KakaoTalk.', '링크 복사됨. 카카오톡에 붙여넣으세요.'));
    onShared?.();
  } catch {
    notify(url);
  }
}
