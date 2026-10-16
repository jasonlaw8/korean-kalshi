'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import { Link } from '../lib/nav';
import { priceNow, until, ago, fmt, MIN } from '../lib/time';
import { Icon, Avatar, Chg, SrcBadge, LineChart, nameOf, shareLink } from '../components/ui';
import { MarketCard, AdCard, intent } from '../components/cards';
import { useSheet } from '../components/sheets';
import { markets, collections, seedComments, friendPicks } from '../data/content';
import { placements } from '../data/ads';

export default function Markets() {
  const { L, s, notify, actions } = useStore();
  const [coll, setColl] = useState('all');
  const [src, setSrc] = useState('all');
  const [q, setQ] = useState('');
  const [idea, setIdea] = useState('');
  const forYou = (m) => m.tags.some((t) => s.profile.interests.includes(t));
  let list = markets.filter((m) =>
    (coll === 'all' || m.coll.includes(coll)) &&
    (src === 'all' || m.src === src) &&
    (!q || (m.title.en + m.title.kr).toLowerCase().includes(q.toLowerCase())));
  if (coll === 'all') list = [...list].sort((a, b) => forYou(b) - forYou(a));

  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Markets', '마켓')}</h1>
        <p className="sub">{L('What people think will happen, as live odds. Kalshi markets trade with real money; community markets use points.', '사람들이 예상하는 확률을 실시간으로. 칼시 마켓은 실거래, 커뮤니티 마켓은 포인트로 운영됩니다.')}</p>
      </div>
      <label className="search">
        <Icon name="search" size={18} />
        <input id="market-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={L('Search Son, Fed, KBO, BTS…', '손흥민, 연준, KBO, BTS 검색…')} />
      </label>
      <div className="chips" role="tablist">
        {collections.map((c) => (
          <button key={c.id} role="tab" aria-selected={coll === c.id} className={`chip ${coll === c.id ? 'on' : ''}`} onClick={() => setColl(c.id)}>{L(c)}</button>
        ))}
      </div>
      <div className="seg">
        {[['all', 'All', '전체'], ['kalshi', 'Kalshi', '칼시'], ['community', 'Community', '커뮤니티']].map(([id, en, kr]) => (
          <button key={id} className={src === id ? 'on' : ''} onClick={() => setSrc(id)}>{L(en, kr)}</button>
        ))}
      </div>
      <div className="stack">
        {list.map((m, i) => (
          <div key={m.id} className="stack">
            <MarketCard m={m} />
            {i === 2 && <AdCard id={placements.feedRotation[0]} compact />}
          </div>
        ))}
        {!list.length && (
          <div className="empty">
            <Icon name="search" size={28} />
            <p>{L('Nothing matches yet. Suggest it below.', '일치하는 마켓이 없어요. 아래에서 제안해 주세요.')}</p>
          </div>
        )}
      </div>
      <form className="suggest" onSubmit={(e) => {
        e.preventDefault();
        if (!idea.trim()) return;
        actions.post(`💡 ${L('Market idea', '마켓 제안')}: ${idea.trim()}`);
        setIdea('');
        notify(L('Posted to the community. Upvotes decide what we run next.', '커뮤니티에 게시됐어요. 추천 수로 다음 마켓을 정합니다.'));
      }}>
        <div>
          <h3>{L('Suggest a market', '마켓 제안하기')}</h3>
          <p>{L('Top-voted ideas run as community markets, and we pitch the best to Kalshi.', '추천을 많이 받은 아이디어는 커뮤니티 마켓으로 열리고, 최고의 아이디어는 칼시에 제안합니다.')}</p>
        </div>
        <div className="suggest-row">
          <input id="suggest-input" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder={L('Will Lee Jung-hoo hit .300 next year?', '이정후가 내년 3할을 칠까?')} />
          <button className="btn btn-ink" type="submit">{L('Post', '게시')}</button>
        </div>
      </form>
    </div>
  );
}

const STAKES = [100, 250, 500, 1000];

export function MarketDetail({ id }) {
  const { L, s, now, actions, notify } = useStore();
  const open = useSheet();
  const m = markets.find((x) => x.id === id);
  const [side, setSide] = useState(null);
  const [stake, setStake] = useState(250);
  const [text, setText] = useState('');
  useEffect(() => { if (intent.side) { setSide(intent.side); intent.side = null; } }, [id]);
  if (!m) return <div className="screen"><p className="empty-line">{L('Market not found.', '마켓을 찾을 수 없어요.')}</p></div>;

  const p = priceNow(m, now);
  const mine = s.picks[`m:${m.id}`];
  const price = side === 'NO' ? 100 - p : p;
  const win = side ? Math.round((stake * 100) / price) : 0;
  const followed = s.follows.markets.includes(m.id);
  const alert = s.alerts[m.id];
  const mineComments = (s.comments[m.id] || []);
  const seeded = (seedComments[m.id] || seedComments.default).map((c) => ({ ...c, at: s.createdAt - c.t * MIN }));
  const thread = [...mineComments, ...seeded];
  const friends = friendPicks[m.id] || [];
  const closes = new Date(m.closeAt).getTime();

  return (
    <div className="screen">
      <div className="mcard-top">
        <span className="eyebrow">{L(m.cat)}</span>
        <SrcBadge src={m.src} />
      </div>
      <h1 className="msheet-title">{L(m.title)}</h1>
      <div className="msheet-prob">
        <span className="prob-num prob-xl">{p}<small>%</small></span>
        <div className="stack-tight">
          <span><Chg v={m.chg} /> <span className="muted-sm">{L('this week', '이번 주')}</span></span>
          <span className="muted-sm">{closes > now ? `${L('Closes in', '마감까지')} ${until(closes, s.lang)}` : L('Closed', '마감')}</span>
          {m.src === 'kalshi' && <span className="muted-sm">YES {p}¢ · NO {100 - p}¢ · {m.vol}</span>}
        </div>
      </div>

      <div className="action-row">
        <button className={`pill-btn ${followed ? 'on' : ''}`} onClick={() => actions.follow('markets', m.id)}><Icon name={followed ? 'check' : 'plus'} size={15} /> {followed ? L('Following', '팔로우 중') : L('Follow', '팔로우')}</button>
        <button className={`pill-btn ${alert ? 'on' : ''}`} onClick={() => open('alert', { id: m.id })}><Icon name="bell" size={15} /> {alert ? `${alert.dir === 'above' ? '≥' : '≤'} ${alert.value}%` : L('Alert', '알림')}</button>
        <button className="pill-btn" onClick={() => shareLink({ title: 'Hanpan', text: `${L(m.title)} ${p}%`, path: `/markets/${m.id}`, L, notify, onShared: actions.shared })}><Icon name="share" size={15} /> {L('Share', '공유')}</button>
      </div>

      <LineChart seed={m.id} end={p} chg={m.chg} />

      <div className="crowd">
        <div className="crowd-head"><b>{L('Hanpan crowd vs market', '한판 커뮤니티 vs 마켓')}</b></div>
        <div className="crowd-row"><span>{L('Market', '마켓')}</span><div className="bar"><i style={{ width: `${p}%` }} /></div><b>{p}%</b></div>
        <div className="crowd-row"><span>{L('Crowd', '커뮤니티')}</span><div className="bar bar-crowd"><i style={{ width: `${m.crowd}%` }} /></div><b>{m.crowd}%</b></div>
        {Math.abs(m.crowd - p) >= 10 && <p className="crowd-note"><Icon name="sparkle" size={14} /> {L(`The community is ${Math.abs(m.crowd - p)} points ${m.crowd > p ? 'more' : 'less'} confident than the market.`, `커뮤니티가 마켓보다 ${Math.abs(m.crowd - p)}%p ${m.crowd > p ? '더' : '덜'} 확신하고 있어요.`)}</p>}
        {friends.length > 0 && (
          <div className="friend-picks">
            {friends.map(([u, sd]) => <span key={u} className="fp"><Avatar id={u} size={22} /> {nameOf(u, s).split(' ')[0]} <b className={sd === 'YES' ? 'yes' : 'no'}>{sd}</b></span>)}
          </div>
        )}
      </div>

      <div className="explain">
        <span className="eyebrow">{L('What this means', '쉽게 말하면')}</span>
        <p>{L(m.explain)}</p>
      </div>

      <div className="pickbox">
        <div className="pickbox-head">
          <b>{mine ? L('Your free pick', '내 무료 픽') : L('Make a free pick', '무료 픽 하기')}</b>
          <span className="muted-sm">{L('Points only', '포인트 전용')} · {fmt(s.points)} {L('available', '보유')}</span>
        </div>
        {mine ? (
          <p className="mine big"><Icon name="check" size={16} stroke={2.6} /> {mine.side} · {mine.stake} pts @ {mine.price}% · {L('pays', '적중 시')} +{Math.round((mine.stake * 100) / mine.price)}</p>
        ) : (
          <>
            <div className="mcard-actions flush">
              <button className={`yn yes ${side === 'YES' ? 'picked' : ''}`} onClick={() => setSide('YES')} aria-pressed={side === 'YES'}>{L('Yes', '예')} <b>{p}%</b></button>
              <button className={`yn no ${side === 'NO' ? 'picked' : ''}`} onClick={() => setSide('NO')} aria-pressed={side === 'NO'}>{L('No', '아니오')} <b>{100 - p}%</b></button>
            </div>
            <div className="stakes">
              {STAKES.map((v) => <button key={v} className={`chip ${stake === v ? 'on' : ''}`} disabled={v > s.points} onClick={() => setStake(v)}>{v} pts</button>)}
            </div>
            <button className="btn btn-accent btn-block" disabled={!side || stake > s.points} onClick={() => actions.pickMarket(m, side, stake, price)}>
              {side ? L(`Lock ${side} · win +${win} pts`, `${side} 확정 · 적중 시 +${win} 포인트`) : L('Choose Yes or No', '예 또는 아니오를 선택하세요')}
            </button>
          </>
        )}
      </div>

      {m.src === 'kalshi' && (
        <button className="btn btn-ink btn-block" onClick={() => open('trade', { id: m.id })}>
          {L('Trade with real money on Kalshi', '칼시에서 실제 거래하기')} <Icon name="ext" size={16} />
        </button>
      )}

      {m.ad && <AdCard id={m.ad} compact />}

      <details className="rules">
        <summary>{L('Rules', '정산 규칙')}</summary>
        <p>{L(m.rules)}</p>
      </details>

      <section className="thread">
        <h2 className="h2">{L('Discussion', '토론')} · {fmt(m.comments + mineComments.length)}</h2>
        <form className="reply" onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; actions.comment(m.id, text.trim()); setText(''); }}>
          <Avatar id="me" size={30} />
          <input id="reply-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={L('Add your take', '의견 남기기')} />
          <button className="icon-btn" type="submit" aria-label={L('Send', '보내기')}><Icon name="send" size={18} /></button>
        </form>
        {thread.map((c, i) => (
          <div key={i} className="comment">
            <Avatar id={c.user} size={30} />
            <div>
              <div className="take-who"><b>{nameOf(c.user, s)}</b> <span>· {ago(c.at, s.lang)}</span></div>
              {c.user === 'me' && mine && <div className="verified"><Icon name="picks" size={12} stroke={2.2} /> {L('Picked', '픽')} {mine.side}</div>}
              {c.verified && <div className="verified"><Icon name="shield" size={12} stroke={2.2} /> {c.verified.side} @ {c.verified.price}¢</div>}
              <p>{c.text}</p>
            </div>
          </div>
        ))}
      </section>
      <Link to="/academy" className="link">{L('New to this? Take the 2-minute lesson', '처음이세요? 2분 강의 보기')} <Icon name="chev" size={14} /></Link>
    </div>
  );
}
