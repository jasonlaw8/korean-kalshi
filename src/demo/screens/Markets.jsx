import { useState } from 'react';
import { useApp, useL, Icon, Sparkline, Chg, SrcBadge } from '../ui';
import { markets, collections } from '../data';

export function MarketCard({ m, compact }) {
  const L = useL();
  const { open, beginner, picks } = useApp();
  const mine = picks[m.id];
  return (
    <article className={`mcard ${compact ? 'mcard-compact' : ''}`}>
      <button className="mcard-main" onClick={() => open('market', { id: m.id })}>
        <div className="mcard-top">
          <span className="eyebrow">{L(m.cat)}</span>
          <SrcBadge src={m.src} />
        </div>
        <h3 className="mcard-title">{L(m.title)}</h3>
        <div className="mcard-row">
          <div className="prob">
            <span className="prob-num">{m.yes}<small>%</small></span>
            <Chg v={m.chg} />
          </div>
          <Sparkline seed={m.id} end={m.yes} chg={m.chg} />
        </div>
        {beginner && (
          <p className="tip">
            <Icon name="sparkle" size={14} />
            {m.src === 'kalshi'
              ? L(`${m.yes}¢ means traders see about a ${m.yes}% chance. YES pays $1 if it happens.`, `${m.yes}¢는 약 ${m.yes}% 확률이라는 뜻. 일어나면 YES가 $1를 받아요.`)
              : L(`${m.yes}% of members picked YES. Points only, no money.`, `회원 ${m.yes}%가 YES를 선택. 포인트 전용, 돈 없음.`)}
          </p>
        )}
      </button>
      {!compact && (
        <div className="mcard-actions">
          <button className={`yn yes ${mine?.side === 'YES' ? 'picked' : ''}`} onClick={() => open('market', { id: m.id, side: 'YES' })}>
            {L('Yes', '예')} <b>{m.src === 'kalshi' ? `${m.yes}¢` : `${m.yes}%`}</b>
          </button>
          <button className={`yn no ${mine?.side === 'NO' ? 'picked' : ''}`} onClick={() => open('market', { id: m.id, side: 'NO' })}>
            {L('No', '아니오')} <b>{m.src === 'kalshi' ? `${100 - m.yes}¢` : `${100 - m.yes}%`}</b>
          </button>
        </div>
      )}
      <div className="mcard-meta">
        <span>{m.vol} {m.src === 'kalshi' ? L('vol', '거래량') : ''}</span>
        <span><Icon name="chat" size={13} /> {m.comments}</span>
        <span><Icon name="calendar" size={13} /> {L(m.closes)}</span>
        {mine && <span className="mine"><Icon name="check" size={13} stroke={2.6} /> {L('Picked', '픽 완료')} {mine.side}</span>}
      </div>
    </article>
  );
}

export default function Markets() {
  const L = useL();
  const [coll, setColl] = useState('all');
  const [src, setSrc] = useState('all');
  const [q, setQ] = useState('');
  const list = markets.filter((m) =>
    (coll === 'all' || m.coll.includes(coll)) &&
    (src === 'all' || m.src === src) &&
    (!q || (m.title.en + m.title.kr).toLowerCase().includes(q.toLowerCase())));

  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Markets', '마켓')}</h1>
        <p className="sub">{L('Live prices from Kalshi, plus community markets Kalshi doesn’t list.', '칼시 실시간 가격과 칼시에 없는 커뮤니티 마켓.')}</p>
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
        {[['all', 'All', '전체'], ['kalshi', 'Kalshi · real money', '칼시 · 실거래'], ['community', 'Community · points', '커뮤니티 · 포인트']].map(([id, en, kr]) => (
          <button key={id} className={src === id ? 'on' : ''} onClick={() => setSrc(id)}>{L(en, kr)}</button>
        ))}
      </div>
      <div className="stack">
        {list.map((m) => <MarketCard key={m.id} m={m} />)}
        {!list.length && (
          <div className="empty">
            <Icon name="search" size={28} />
            <p>{L('No markets match. Suggest one and we’ll pitch it to Kalshi or run it for points.', '일치하는 마켓이 없어요. 제안해주시면 칼시에 요청하거나 포인트 마켓으로 열게요.')}</p>
          </div>
        )}
      </div>
      <SuggestCard />
    </div>
  );
}

function SuggestCard() {
  const L = useL();
  const { notify } = useApp();
  const [v, setV] = useState('');
  return (
    <form className="suggest" onSubmit={(e) => { e.preventDefault(); if (!v.trim()) return; setV(''); notify(L('Thanks! Members can upvote your idea.', '감사합니다! 회원들이 추천할 수 있어요.')); }}>
      <div>
        <h3>{L('Suggest a market', '마켓 제안하기')}</h3>
        <p>{L('Top-voted ideas run as community markets, and we pitch the best to Kalshi.', '추천을 많이 받은 아이디어는 커뮤니티 마켓으로 열리고, 최고의 아이디어는 칼시에 제안합니다.')}</p>
      </div>
      <div className="suggest-row">
        <input id="suggest-input" value={v} onChange={(e) => setV(e.target.value)} placeholder={L('Will Lee Jung-hoo hit .300 next year?', '이정후가 내년 3할을 칠까?')} />
        <button className="btn btn-ink" type="submit">{L('Submit', '제출')}</button>
      </div>
    </form>
  );
}
