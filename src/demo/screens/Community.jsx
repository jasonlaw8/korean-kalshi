import { useState } from 'react';
import { useApp, useL, Icon, Avatar, Chg, fmt } from '../ui';
import { posts, users, markets, groups, games, events, sponsors } from '../data';
import { GameCard } from './Home';

export function Post({ p }) {
  const L = useL();
  const { open, liked, setLiked, votes, setVotes } = useApp();
  const [showTr, setShowTr] = useState(false);
  const m = p.market && markets.find((x) => x.id === p.market);
  const isLiked = liked[p.id];
  const vote = votes[p.id];
  const total = p.poll ? p.poll.opts.reduce((a, o) => a + o.votes, 0) + (vote != null ? 1 : 0) : 0;
  return (
    <article className="post">
      <div className="post-head">
        <Avatar id={p.user} size={38} />
        <div className="post-who">
          <b>{users[p.user].name}</b>
          <span>@{p.user} · {users[p.user].city} · {typeof p.time === 'object' ? L(p.time) : p.time}</span>
        </div>
      </div>
      {p.text && <p className="post-text">{showTr && p.trans ? p.trans : p.text}</p>}
      {p.trans && (
        <button className="link link-sm" onClick={() => setShowTr(!showTr)}>
          <Icon name="globe" size={13} /> {showTr ? L('Show original', '원문 보기') : L('See translation', '번역 보기')}
        </button>
      )}
      {p.verified && (
        <div className="verified"><Icon name="shield" size={13} stroke={2.2} /> {L('Verified position', '인증된 포지션')}: {p.verified.side} @ {p.verified.price}¢</div>
      )}
      {p.poll && (
        <div className="poll">
          <b>{L(p.poll.q)}</b>
          {p.poll.opts.map((o, i) => {
            const n = o.votes + (vote === i ? 1 : 0);
            const pct = Math.round((n / total) * 100);
            return (
              <button key={i} className={`poll-opt ${vote === i ? 'on' : ''}`} onClick={() => setVotes({ ...votes, [p.id]: i })} disabled={vote != null}>
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
        <button className="embed" onClick={() => open('market', { id: m.id })}>
          <div>
            <span className="eyebrow">{L(m.cat)}</span>
            <p>{L(m.title)}</p>
          </div>
          <div className="embed-num">{m.yes}%<Chg v={m.chg} /></div>
        </button>
      )}
      <div className="post-actions">
        <button className={isLiked ? 'on' : ''} onClick={() => setLiked({ ...liked, [p.id]: !isLiked })} aria-pressed={!!isLiked}>
          <Icon name="heart" size={17} fill={isLiked ? 'currentColor' : 'none'} /> {p.likes + (isLiked ? 1 : 0)}
        </button>
        <button onClick={() => (m ? open('market', { id: m.id }) : null)}><Icon name="chat" size={17} /> {p.replies}</button>
        <button onClick={() => open('share', { title: p.text || L(p.poll.q), market: p.market })}><Icon name="share" size={17} /> {L('Share', '공유')}</button>
      </div>
    </article>
  );
}

function Composer() {
  const L = useL();
  const { extraPosts, setExtraPosts, notify } = useApp();
  const [v, setV] = useState('');
  return (
    <form className="composer" onSubmit={(e) => {
      e.preventDefault();
      if (!v.trim()) return;
      setExtraPosts([{ id: 'u' + Date.now(), user: 'dpark_la', time: 'now', likes: 0, replies: 0, text: v.trim() }, ...extraPosts]);
      setV('');
      notify(L('Posted to LA / OC Koreans', 'LA·OC 한인 그룹에 게시됨'));
    }}>
      <Avatar id="dpark_la" size={36} />
      <div className="composer-body">
        <textarea id="composer" rows={2} value={v} onChange={(e) => setV(e.target.value)} placeholder={L('What’s your take? 한국어도 OK', '의견을 남겨주세요. English OK')} />
        <div className="composer-row">
          <div className="composer-tools">
            <button type="button" className="icon-btn" aria-label="Add image"><Icon name="image" size={18} /></button>
            <button type="button" className="icon-btn" aria-label="Add poll"><Icon name="poll" size={18} /></button>
            <button type="button" className="icon-btn" aria-label="Attach market"><Icon name="markets" size={18} /></button>
          </div>
          <button className="btn btn-ink btn-sm" type="submit" disabled={!v.trim()}>{L('Post', '게시')}</button>
        </div>
      </div>
    </form>
  );
}

function Feed() {
  const { extraPosts } = useApp();
  return (
    <div className="stack">
      <Composer />
      {[...extraPosts, ...posts].map((p) => <Post key={p.id} p={p} />)}
    </div>
  );
}

function Groups() {
  const L = useL();
  const { joined, setJoined, notify } = useApp();
  const kinds = [['city', 'By city', '지역별'], ['team', 'By team', '팀별'], ['private', 'Private groups', '비공개 그룹']];
  return (
    <div className="stack-lg">
      {kinds.map(([k, en, kr]) => (
        <section key={k}>
          <h3 className="h3">{L(en, kr)}</h3>
          <div className="list">
            {groups.filter((g) => g.kind === k).map((g) => {
              const isIn = joined[g.id] ?? !!g.joined;
              return (
                <div key={g.id} className="row">
                  <div className={`group-icon k-${k}`}><Icon name={k === 'city' ? 'pin' : k === 'team' ? 'trophy' : 'lock'} size={18} /></div>
                  <div className="row-body">
                    <b>{L(g.name)}</b>
                    <span>{fmt(g.members)} {L('members', '명')} · {L(g.desc)}</span>
                  </div>
                  <button className={`btn btn-sm ${isIn ? 'btn-ghost' : 'btn-ink'}`} onClick={() => {
                    setJoined({ ...joined, [g.id]: !isIn });
                    if (!isIn) notify(k === 'private' ? L('Request sent to the group admin', '그룹 관리자에게 요청을 보냈어요') : L('Joined', '가입 완료'));
                  }}>
                    {isIn ? L('Joined', '가입됨') : k === 'private' ? L('Request', '요청') : L('Join', '가입')}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <button className="btn btn-ghost btn-block" onClick={() => notify(L('Create a private group for your church, team or friends.', '교회, 팀, 친구를 위한 비공개 그룹을 만들어보세요.'))}>
        <Icon name="plus" size={16} /> {L('Create a group', '그룹 만들기')}
      </button>
    </div>
  );
}

function Live() {
  const L = useL();
  return (
    <div className="stack">
      <p className="sub">{L('Real-time chat for every game, with the market price on screen.', '모든 경기의 실시간 채팅, 마켓 가격과 함께.')}</p>
      <div className="grid2">
        {games.map((g) => <GameCard key={g.id} g={g} />)}
      </div>
    </div>
  );
}

function Local() {
  const L = useL();
  const { rsvp, setRsvp, notify } = useApp();
  return (
    <div className="stack-lg">
      <section>
        <h3 className="h3">{L('Watch parties & events', '단체 관람 & 이벤트')}</h3>
        <div className="list">
          {events.map((e) => (
            <div key={e.id} className="row">
              <div className="date-chip"><Icon name="calendar" size={18} /></div>
              <div className="row-body">
                <b>{L(e.title)} {e.sponsor && <span className="badge badge-sponsor">{L('Sponsored', '후원')}</span>}</b>
                <span>{e.place}</span>
                <span>{L(e.when)} · {e.going + (rsvp[e.id] ? 1 : 0)} {L('going', '명 참석')}</span>
              </div>
              <button className={`btn btn-sm ${rsvp[e.id] ? 'btn-ghost' : 'btn-ink'}`} onClick={() => { setRsvp({ ...rsvp, [e.id]: !rsvp[e.id] }); if (!rsvp[e.id]) notify(L('You’re going. Added to your calendar.', '참석 완료. 캘린더에 추가했어요.')); }}>
                {rsvp[e.id] ? L('Going', '참석') : 'RSVP'}
              </button>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="h3">{L('Local partners', '지역 파트너')}</h3>
        <div className="stack">
          {sponsors.map((s) => (
            <div key={s.id} className="sponsor">
              <div className="sponsor-mark">{s.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
              <div className="row-body">
                <b>{s.name}</b>
                <span>{L(s.kind)}</span>
                <p>{L(s.offer)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="fine">{L('Sample businesses for the demo. Own a Korean-American business? Sponsor a city page or contest.', '데모용 샘플 업체입니다. 한인 비즈니스를 운영하시나요? 지역 페이지나 콘테스트를 후원하세요.')}</p>
      </section>
    </div>
  );
}

export default function Community() {
  const L = useL();
  const [view, setView] = useState('feed');
  const V = { feed: Feed, groups: Groups, live: Live, local: Local }[view];
  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Community', '커뮤니티')}</h1>
      </div>
      <div className="seg seg-sticky">
        {[['feed', 'Feed', '피드'], ['groups', 'Groups', '그룹'], ['live', 'Live rooms', '라이브'], ['local', 'Local', '지역']].map(([id, en, kr]) => (
          <button key={id} className={view === id ? 'on' : ''} onClick={() => setView(id)}>{L(en, kr)}</button>
        ))}
      </div>
      <V />
    </div>
  );
}
