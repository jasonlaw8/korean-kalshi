'use client';

import { useState } from 'react';
import { useStore } from '../lib/store';
import { Link, useNav } from '../lib/nav';
import { priceNow, ago, fmt, MIN } from '../lib/time';
import { Icon, Avatar, Sparkline, Chg, SrcBadge, nameOf, shareLink } from './ui';
import { useSheet } from './sheets';
import { markets, users, friendPicks } from '../data/content';
import { advertisers } from '../data/ads';

// Carries the Yes/No tap from a card into the market page.
export const intent = { side: null };

export function MarketCard({ m }) {
  const { L, s } = useStore();
  const nav = useNav();
  const p = priceNow(m);
  const mine = s.picks[`m:${m.id}`];
  const friends = friendPicks[m.id]?.filter(([u]) => s.follows.users.includes(u)) || [];
  return (
    <article className="mcard">
      <Link className="mcard-main" to={`/markets/${m.id}`}>
        <div className="mcard-top">
          <span className="eyebrow">{L(m.cat)}</span>
          <SrcBadge src={m.src} />
        </div>
        <h3 className="mcard-title">{L(m.title)}</h3>
        <div className="mcard-row">
          <div className="prob">
            <span className="prob-num">{p}<small>%</small></span>
            <Chg v={m.chg} />
          </div>
          <Sparkline seed={m.id} end={p} chg={m.chg} />
        </div>
        {s.settings.beginner && (
          <p className="tip">
            <Icon name="sparkle" size={14} />
            {m.src === 'kalshi'
              ? L(`${p}¢ on Kalshi means traders see about a ${p}% chance.`, `칼시 ${p}¢ = 트레이더들이 약 ${p}% 확률로 본다는 뜻.`)
              : L(`${p}% of members picked YES. Points only.`, `회원 ${p}%가 YES 선택. 포인트 전용.`)}
          </p>
        )}
      </Link>
      <div className="mcard-actions">
        <button className={`yn yes ${mine?.side === 'YES' ? 'picked' : ''}`} onClick={() => { intent.side = 'YES'; nav.push(`/markets/${m.id}`); }}>
          {L('Yes', '예')} <b>{p}%</b>
        </button>
        <button className={`yn no ${mine?.side === 'NO' ? 'picked' : ''}`} onClick={() => { intent.side = 'NO'; nav.push(`/markets/${m.id}`); }}>
          {L('No', '아니오')} <b>{100 - p}%</b>
        </button>
      </div>
      <div className="mcard-meta">
        <span>{m.vol}</span>
        <span><Icon name="chat" size={13} /> {fmt(m.comments + (s.comments[m.id]?.length || 0))}</span>
        {friends.length > 0 && (
          <span className="friends-mini">
            <span className="stack-av">{friends.slice(0, 3).map(([u]) => <Avatar key={u} id={u} size={18} />)}</span>
            {friends.length} {L(friends.length === 1 ? 'friend' : 'friends', '명 친구')}
          </span>
        )}
        {mine && <span className="mine"><Icon name="check" size={13} stroke={2.6} /> {mine.side}</span>}
      </div>
    </article>
  );
}

export function GameCard({ g, wide }) {
  const { L } = useStore();
  return (
    <Link className={`game ${wide ? 'game-wide' : ''}`} to={`/rooms/${g.id}`}>
      <div className="game-top">
        <span className="eyebrow">{g.league}</span>
        {g.status === 'live' ? <span className="live-tag"><i />LIVE</span> : <span className="soon-tag">{L(g.time)}</span>}
      </div>
      {g.away ? (
        <div className="game-teams">
          <div className="team"><span className="team-code">{g.away}</span><span>{L(g.awayName)}</span>{g.score && <b>{g.score[0]}</b>}</div>
          <div className="team"><span className="team-code">{g.home}</span><span>{L(g.homeName)}</span>{g.score && <b>{g.score[1]}</b>}</div>
        </div>
      ) : (
        <div className="game-teams">
          <div className="team team-solo"><span>{L(g.homeName)}</span></div>
          <div className="team-note">{L(g.detail)}</div>
        </div>
      )}
      <div className="game-foot">
        {g.away && g.detail ? <span>{L(g.detail)}</span> : <span>{L('Live room', '라이브 룸')}</span>}
        <span className="room-count"><Icon name="chat" size={13} /> {fmt(g.room)}</span>
      </div>
    </Link>
  );
}

export function Post({ p }) {
  const { L, s, actions, notify } = useStore();
  const [showTr, setShowTr] = useState(false);
  const m = p.market && markets.find((x) => x.id === p.market);
  const isLiked = s.liked[p.id];
  const vote = s.votes[p.id];
  const total = p.poll ? p.poll.opts.reduce((a, o) => a + o.votes, 0) + (vote != null ? 1 : 0) : 0;
  const at = p.at || (s.createdAt - p.t * MIN);
  const who = p.user === 'me' ? { name: s.profile.name, city: '' } : users[p.user];
  return (
    <article className="post">
      <div className="post-head">
        <Avatar id={p.user} size={38} />
        <div className="post-who">
          <b>{who.name}</b>
          <span>@{p.user === 'me' ? s.profile.handle : p.user}{who.city ? ` · ${who.city}` : ''} · {ago(at, s.lang)}</span>
        </div>
      </div>
      {p.text && <p className="post-text">{showTr && p.trans ? p.trans : p.text}</p>}
      {p.trans && (
        <button className="link link-sm" onClick={() => setShowTr(!showTr)}>
          <Icon name="globe" size={13} /> {showTr ? L('Show original', '원문 보기') : L('See translation', '번역 보기')}
        </button>
      )}
      {p.verified && <div className="verified"><Icon name="shield" size={13} stroke={2.2} /> {L('Verified position', '인증된 포지션')}: {p.verified.side} @ {p.verified.price}¢</div>}
      {p.poll && (
        <div className="poll">
          <b>{L(p.poll.q)}</b>
          {p.poll.opts.map((o, i) => {
            const n = o.votes + (vote === i ? 1 : 0);
            const pct = Math.round((n / total) * 100);
            return (
              <button key={i} className={`poll-opt ${vote === i ? 'on' : ''}`} onClick={() => actions.vote(p.id, i)} disabled={vote != null}>
                {vote != null && <span className="poll-bar" style={{ width: `${pct}%` }} />}
                <span>{L(o)}</span>
                {vote != null && <b>{pct}%</b>}
              </button>
            );
          })}
          <span className="muted-sm">{fmt(total)} {L('votes', '표')}</span>
        </div>
      )}
      {m && (
        <Link className="embed" to={`/markets/${m.id}`}>
          <div><span className="eyebrow">{L(m.cat)}</span><p>{L(m.title)}</p></div>
          <div className="embed-num">{priceNow(m)}%<Chg v={m.chg} /></div>
        </Link>
      )}
      <div className="post-actions">
        <button className={isLiked ? 'on' : ''} onClick={() => actions.toggle('liked', p.id)} aria-pressed={!!isLiked}>
          <Icon name="heart" size={17} fill={isLiked ? 'currentColor' : 'none'} /> {p.likes + (isLiked ? 1 : 0)}
        </button>
        {m ? <Link to={`/markets/${m.id}`}><Icon name="chat" size={17} /> {p.replies}</Link> : <span className="post-stat"><Icon name="chat" size={17} /> {p.replies}</span>}
        <button onClick={() => shareLink({ title: 'Hanpan', text: p.text || L(p.poll.q), path: m ? `/markets/${m.id}` : '/community', L, notify, onShared: actions.shared })}>
          <Icon name="share" size={17} /> {L('Share', '공유')}
        </button>
      </div>
    </article>
  );
}

// Native ad card, styled like content but always labeled.
export function AdCard({ id, compact }) {
  const { L } = useStore();
  const open = useSheet();
  const a = advertisers[id];
  if (!a) return null;
  return (
    <button className={`adcard ${compact ? 'adcard-compact' : ''}`} onClick={() => open('ad', { id })}>
      <div className="adcard-head">
        <span className="ad-mark" style={{ background: a.color }}>{a.mark}</span>
        <div className="adcard-who"><b>{a.name}</b><span>{L(a.kind)}</span></div>
        <span className="ad-label">{L('Sponsored', '광고')}</span>
      </div>
      <p className="adcard-headline">{L(a.headline)}</p>
      {!compact && <p className="adcard-body">{L(a.body)}</p>}
      <span className="adcard-cta" style={{ color: a.color }}>{L(a.cta)} <Icon name="chev" size={14} /></span>
    </button>
  );
}

export function SponsorLine({ id, label }) {
  const { L } = useStore();
  const open = useSheet();
  const a = advertisers[id];
  if (!a) return null;
  return (
    <button className="sponsor-line-btn" onClick={() => open('ad', { id })}>
      <span>{label || L('Presented by', '제공')}</span>
      <span className="ad-mark sm" style={{ background: a.color }}>{a.mark}</span>
      <b>{a.name}</b>
    </button>
  );
}

export function PersonRow({ id, right }) {
  const { s } = useStore();
  return (
    <div className="row">
      <Avatar id={id} size={36} />
      <div className="row-body"><b>{nameOf(id, s)}</b>{users[id] && <span>{users[id].city} · {users[id].bio}</span>}</div>
      {right}
    </div>
  );
}
