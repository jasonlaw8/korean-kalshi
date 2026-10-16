'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useStore } from '../lib/store';
import { Link, useNav } from '../lib/nav';
import { priceNow, fmt, MIN } from '../lib/time';
import { Icon, Avatar, nameOf } from '../components/ui';
import { Post, GameCard, AdCard, SponsorLine } from '../components/cards';
import { useSheet } from '../components/sheets';
import { seedPosts, groups, games, events, markets, roomScript, users, cities } from '../data/content';
import { placements, advertisers, perks } from '../data/ads';

const TABS = [['', 'Feed', '피드'], ['groups', 'Groups', '그룹'], ['live', 'Live', '라이브'], ['local', 'Local', '지역']];

export default function Community({ tab = '' }) {
  const { L } = useStore();
  const V = { '': Feed, groups: Groups, live: Live, local: Local }[tab] || Feed;
  return (
    <div className="screen">
      <div className="screen-head"><h1 className="h1">{L('Community', '커뮤니티')}</h1></div>
      <div className="seg seg-sticky">
        {TABS.map(([id, en, kr]) => (
          <Link key={id} to={`/community${id ? '/' + id : ''}`} className={tab === id ? 'on' : ''}>{L(en, kr)}</Link>
        ))}
      </div>
      <V />
    </div>
  );
}

function Composer({ group }) {
  const { L, s, actions, notify } = useStore();
  const [v, setV] = useState('');
  const [market, setMarket] = useState(null);
  const [picking, setPicking] = useState(false);
  const g = groups.find((x) => x.id === group);
  return (
    <form className="composer" onSubmit={(e) => {
      e.preventDefault();
      if (!v.trim()) return;
      actions.post(v.trim(), { group, market });
      setV(''); setMarket(null);
      notify(g ? L(`Posted to ${g.name.en}`, `${g.name.kr}에 게시됨`) : L('Posted', '게시됨'));
    }}>
      <Avatar id="me" size={36} />
      <div className="composer-body">
        <textarea id={`composer-${group || 'feed'}`} rows={2} value={v} onChange={(e) => setV(e.target.value)} placeholder={L('What’s your take? 한국어도 OK', '의견을 남겨주세요. English OK')} />
        {market && <div className="attached"><Icon name="markets" size={14} /> {L(markets.find((m) => m.id === market).title)} <button type="button" onClick={() => setMarket(null)} aria-label="Remove"><Icon name="x" size={14} /></button></div>}
        {picking && (
          <div className="attach-list">
            {markets.slice(0, 8).map((m) => <button type="button" key={m.id} onClick={() => { setMarket(m.id); setPicking(false); }}>{L(m.title)}</button>)}
          </div>
        )}
        <div className="composer-row">
          <button type="button" className="link link-sm" onClick={() => setPicking(!picking)}><Icon name="markets" size={15} /> {L('Attach market', '마켓 첨부')}</button>
          <button className="btn btn-ink btn-sm" type="submit" disabled={!v.trim()}>{L('Post', '게시')}</button>
        </div>
      </div>
    </form>
  );
}

function Feed() {
  const { s } = useStore();
  const all = [...s.posts, ...seedPosts];
  return (
    <div className="stack">
      <Composer />
      {all.map((p, i) => (
        <Fragment key={p.id}>
          <Post p={p} />
          {(i + 1) % placements.feedEvery === 0 && <AdCard id={placements.feedRotation[Math.floor(i / placements.feedEvery) % placements.feedRotation.length]} />}
        </Fragment>
      ))}
    </div>
  );
}

function Groups() {
  const { L, s, actions } = useStore();
  const kinds = [['city', 'By city', '지역별'], ['team', 'By team', '팀별'], ['private', 'Private leagues', '비공개 리그']];
  return (
    <div className="stack-lg">
      {kinds.map(([k, en, kr]) => (
        <section key={k}>
          <h3 className="h3">{L(en, kr)}</h3>
          <div className="list">
            {groups.filter((g) => g.kind === k).map((g) => {
              const isIn = !!s.joined[g.id];
              return (
                <div key={g.id} className="row">
                  <Link to={`/groups/${g.id}`} className={`group-icon k-${k}`}><Icon name={k === 'city' ? 'pin' : k === 'team' ? 'trophy' : 'lock'} size={18} /></Link>
                  <Link to={`/groups/${g.id}`} className="row-body">
                    <b>{L(g.name)}</b>
                    <span>{fmt(g.members + (isIn ? 1 : 0))} {L('members', '명')} · {L(g.desc)}</span>
                  </Link>
                  {k !== 'private' || isIn ? (
                    <button className={`btn btn-sm ${isIn ? 'btn-ghost' : 'btn-ink'}`} onClick={() => actions.toggle('joined', g.id)}>{isIn ? L('Joined', '가입됨') : L('Join', '가입')}</button>
                  ) : <span className="muted-sm">{L('Invite', '초대')}</span>}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <p className="fine">{L('Private leagues are invite-only. Ask a member for their group’s code.', '비공개 리그는 초대 전용입니다. 회원에게 그룹 코드를 요청하세요.')}</p>
    </div>
  );
}

export function GroupPage({ id }) {
  const { L, s, actions } = useStore();
  const g = groups.find((x) => x.id === id);
  if (!g) return <div className="screen"><p className="empty-line">{L('Group not found.', '그룹을 찾을 수 없어요.')}</p></div>;
  const isIn = !!s.joined[g.id];
  const posts = [...s.posts.filter((p) => p.group === id), ...seedPosts.filter((p) => p.group === id)];
  const top = Object.keys(users).slice((id.length * 3) % 5, ((id.length * 3) % 5) + 5);
  return (
    <div className="screen">
      <section className={`group-hero k-${g.kind}`}>
        <span className="eyebrow eyebrow-light">{g.kind === 'city' ? L('City group', '지역 그룹') : g.kind === 'team' ? L('Fan group', '팬 그룹') : L('Private league', '비공개 리그')}</span>
        <h1 className="h1">{L(g.name)}</h1>
        <p>{L(g.desc)} · {fmt(g.members + (isIn ? 1 : 0))} {L('members', '명')}</p>
        {(g.kind !== 'private' || isIn) && (
          <button className="btn btn-light btn-sm" onClick={() => actions.toggle('joined', g.id)}>{isIn ? <><Icon name="check" size={14} stroke={2.6} /> {L('Joined', '가입됨')}</> : L('Join group', '그룹 가입')}</button>
        )}
      </section>
      <section>
        <h2 className="h2">{L('This week’s top pickers', '이번 주 상위 예측러')}</h2>
        <ol className="board">
          {top.map((u, i) => (
            <li key={u}><span className={`rank r${i + 1}`}>{i + 1}</span><Avatar id={u} size={30} /><div className="board-who"><b>{nameOf(u, s)}</b></div><span className="board-pts">{fmt(2400 - i * 310)}</span></li>
          ))}
        </ol>
      </section>
      {isIn ? <Composer group={id} /> : <p className="empty-line">{L('Join to post in this group.', '가입하면 이 그룹에 글을 쓸 수 있어요.')}</p>}
      <div className="stack">
        {posts.length ? posts.map((p) => <Post key={p.id} p={p} />) : <p className="empty-line">{L('No posts yet. Start the conversation.', '아직 게시글이 없어요. 대화를 시작해 보세요.')}</p>}
      </div>
    </div>
  );
}

function Live() {
  const { L } = useStore();
  return (
    <div className="stack">
      <p className="sub">{L('Real-time chat for every game, with the market price on screen.', '모든 경기의 실시간 채팅, 마켓 가격과 함께.')}</p>
      <div className="grid2">{games.map((g) => <GameCard key={g.id} g={g} />)}</div>
    </div>
  );
}

function Local() {
  const { L, s, actions, notify } = useStore();
  const open = useSheet();
  const mine = events.filter((e) => e.city === s.profile.city);
  const other = events.filter((e) => e.city !== s.profile.city);
  const cityName = cities.find((c) => c.id === s.profile.city);
  const Row = (e) => (
    <div key={e.id} className="row">
      <div className="date-chip"><Icon name="calendar" size={18} /></div>
      <div className="row-body">
        <b>{L(e.title)} {e.ad && <span className="ad-label">{L('Sponsored', '광고')}</span>}</b>
        <span>{e.place}</span>
        <span>{L(e.when)} · {e.going + (s.rsvp[e.id] ? 1 : 0)} {L('going', '명 참석')}</span>
      </div>
      <button className={`btn btn-sm ${s.rsvp[e.id] ? 'btn-ghost' : 'btn-ink'}`} onClick={() => { actions.toggle('rsvp', e.id); if (!s.rsvp[e.id]) notify(L('You’re going. We’ll remind you.', '참석 완료. 알림 보내드릴게요.')); }}>
        {s.rsvp[e.id] ? L('Going', '참석') : 'RSVP'}
      </button>
    </div>
  );
  return (
    <div className="stack-lg">
      <section>
        <h3 className="h3">{L('Near you', '내 주변')} · {L(cityName)}</h3>
        {mine.length ? <div className="list">{mine.map(Row)}</div> : <p className="empty-line">{L('No events in your city yet. Host one?', '아직 지역 이벤트가 없어요. 직접 열어보세요?')}</p>}
      </section>
      {other.length > 0 && (
        <section>
          <h3 className="h3">{L('Elsewhere', '다른 지역')}</h3>
          <div className="list">{other.map(Row)}</div>
        </section>
      )}
      <section>
        <div className="sec-head"><h2 className="h2">{L('Local perks', '동네 혜택')}</h2><Link className="link" to="/perks">{L('All perks', '전체 혜택')}</Link></div>
        <div className="stack">
          {perks.slice(0, 3).map((pk) => {
            const a = advertisers[pk.ad];
            return (
              <button key={pk.id} className="sponsor" onClick={() => open('ad', { id: pk.ad })}>
                <span className="ad-mark lg" style={{ background: a.color }}>{a.mark}</span>
                <div className="row-body"><b>{a.name}</b><span>{L(a.kind)}</span><p>{L(pk.title)} · {fmt(pk.cost)} pts</p></div>
              </button>
            );
          })}
        </div>
      </section>
      <AdCard id="hans" compact />
    </div>
  );
}

export function Room({ id }) {
  const { L, s, now } = useStore();
  const g = games.find((x) => x.id === id);
  const m = g && markets.find((x) => x.id === g.market);
  const [msgs, setMsgs] = useState(() => roomScript.slice(0, 3).map((r, i) => ({ ...r, k: i })));
  const [text, setText] = useState('');
  const [bursts, setBursts] = useState([]);
  const end = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let i = 3;
    const t = setInterval(() => {
      const next = i === 6 && g?.sponsor
        ? { user: '__ad', text: L(advertisers[g.sponsor].headline), k: Date.now() }
        : { ...roomScript[i % roomScript.length], k: Date.now() };
      setMsgs((ms) => [...ms.slice(-50), next]);
      i++;
    }, 3200);
    return () => clearInterval(t);
  }, [g?.sponsor]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); }, [msgs, reduce]);

  if (!g) return <div className="screen"><p className="empty-line">{L('Room not found.', '룸을 찾을 수 없어요.')}</p></div>;
  const react = (e) => {
    const k = Date.now() + Math.random();
    setBursts((b) => [...b, { k, e, x: 15 + Math.random() * 70 }]);
    setTimeout(() => setBursts((b) => b.filter((z) => z.k !== k)), 1400);
  };

  return (
    <div className="room">
      <div className="scoreboard">
        <span className="eyebrow eyebrow-light">{g.league} {g.status === 'live' && <span className="live-tag"><i />LIVE</span>}</span>
        {g.away ? (
          <div className="sb-teams">
            <div><span className="sb-code">{g.away}</span><span>{L(g.awayName)}</span></div>
            <div className="sb-score">{g.score ? `${g.score[0]} – ${g.score[1]}` : 'vs'}</div>
            <div><span className="sb-code">{g.home}</span><span>{L(g.homeName)}</span></div>
          </div>
        ) : <div className="sb-teams"><div className="sb-solo">{L(g.homeName)}</div></div>}
        <span className="sb-sub">{g.detail ? L(g.detail) : L(g.time)} · {fmt(g.room + msgs.length)} {L('watching', '시청 중')}</span>
        {g.sponsor && <div className="sb-sponsor"><SponsorLine id={g.sponsor} label={L('Room presented by', '룸 제공')} /></div>}
      </div>
      <Link className="room-market" to={`/markets/${m.id}`}>
        <span>{L(m.title)}</span>
        <b>{priceNow(m, now)}%</b>
      </Link>
      <div className="chat" aria-live="polite">
        {msgs.map((c) => c.user === '__ad' ? (
          <div key={c.k} className="msg-ad"><span className="ad-label">{L('Sponsored', '광고')}</span> <b>{advertisers[g.sponsor].name}</b>: {c.text}</div>
        ) : (
          <div key={c.k} className={`msg ${c.user === 'me' ? 'mine-msg' : ''}`}>
            <Avatar id={c.user} size={26} />
            <div><b>{nameOf(c.user, s)}</b><p>{c.text}</p></div>
          </div>
        ))}
        <div ref={end} />
        {bursts.map((b) => <span key={b.k} className="burst" style={{ left: `${b.x}%` }}>{b.e}</span>)}
      </div>
      <div className="reactions">
        {['🔥', '⚾', '👏', '😱', '💙'].map((e) => <button key={e} onClick={() => react(e)} aria-label={`React ${e}`}>{e}</button>)}
      </div>
      <form className="reply" onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        setMsgs((ms) => [...ms, { user: 'me', text: text.trim(), k: Date.now() }]);
        setText('');
      }}>
        <input id="room-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={L('Say something…', '메시지 입력…')} />
        <button className="icon-btn" type="submit" aria-label={L('Send', '보내기')}><Icon name="send" size={18} /></button>
      </form>
    </div>
  );
}
