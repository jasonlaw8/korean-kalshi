import { useApp, useL, Icon, Chg, Avatar, fmt } from '../ui';
import { brief, ticker, games, markets, contests, posts, users, events } from '../data';
import { MarketCard } from './Markets';

export function GameCard({ g }) {
  const L = useL();
  const { open } = useApp();
  return (
    <button className="game" onClick={() => open('room', { id: g.id })}>
      <div className="game-top">
        <span className="eyebrow">{g.league}</span>
        {g.status === 'live' ? <span className="live-tag"><i />LIVE</span> : <span className="soon-tag">{L(g.time)}</span>}
      </div>
      {g.away ? (
        <div className="game-teams">
          <div className="team"><span className="team-code">{g.away}</span><span>{L(g.awayName)}</span>{g.score && <b>{g.score[1]}</b>}</div>
          <div className="team"><span className="team-code">{g.home}</span><span>{L(g.homeName)}</span>{g.score && <b>{g.score[0]}</b>}</div>
        </div>
      ) : (
        <div className="game-teams">
          <div className="team team-solo"><span>{L(g.homeName)}</span></div>
          <div className="team-note">{L(g.awayName)}</div>
        </div>
      )}
      <div className="game-foot">
        {g.inning && <span>{L(g.inning)}</span>}
        <span className="room-count"><Icon name="chat" size={13} /> {fmt(g.room)} {L('in room', '참여')}</span>
      </div>
    </button>
  );
}

export default function Home() {
  const L = useL();
  const { open, setTab, contestsIn, setContestsIn, notify } = useApp();
  const trending = ['m3', 'm2', 'c1'].map((id) => markets.find((m) => m.id === id));
  const takes = posts.filter((p) => p.text).slice(0, 2);
  const contest = contests[0];

  return (
    <div className="screen">
      <div className="demo-note">{L('Demo · sample data, not live prices', '데모 · 샘플 데이터이며 실시간 가격이 아닙니다')}</div>

      <section className="brief">
        <div className="brief-head">
          <div>
            <span className="eyebrow eyebrow-light">{L('Hanpan Daily', '한판 데일리')} · {L(brief.date)}</span>
            <h1 className="brief-title">{L('Good evening, Daniel', '다니엘님, 좋은 저녁이에요')}</h1>
          </div>
        </div>
        <ul className="brief-list">
          {brief.items.map((b, i) => <li key={i}>{L(b)}</li>)}
        </ul>
        <button className="brief-more" onClick={() => notify(L('Full brief sent to your email every morning at 7.', '전체 브리핑은 매일 아침 7시 이메일로 발송됩니다.'))}>
          {L('Get the brief by email', '이메일로 브리핑 받기')} <Icon name="chev" size={16} />
        </button>
      </section>

      <div className="ticker" aria-label={L('Market moves', '마켓 변동')}>
        <div className="ticker-track">
          {[...ticker, ...ticker].map((t, i) => (
            <button key={i} className="tick" onClick={() => open('market', { id: t.id })} tabIndex={i >= ticker.length ? -1 : 0}>
              <span>{L(t)}</span><b>{t.yes}¢</b><Chg v={t.chg} />
            </button>
          ))}
        </div>
      </div>

      <section>
        <div className="sec-head">
          <h2 className="h2">{L('Tonight', '오늘의 경기')}</h2>
          <button className="link" onClick={() => setTab('community')}>{L('All rooms', '모든 룸')}</button>
        </div>
        <div className="hscroll">
          {games.map((g) => <GameCard key={g.id} g={g} />)}
        </div>
      </section>

      <section className={`contest-hero tone-${contest.tone}`}>
        <div className="contest-hero-body">
          <span className="eyebrow eyebrow-light"><Icon name="trophy" size={13} /> {L('Contest', '콘테스트')} · {L(contest.ends)}</span>
          <h2>{L(contest.title)}</h2>
          <p>{L('Pick every postseason game. Top 10 win', '포스트시즌 전 경기 예측. 상위 10명 상품')}: {L(contest.prize)}</p>
          <div className="contest-hero-foot">
            <span className="sponsor-line">{L('Presented by', '후원')} <b>{contest.sponsor}</b></span>
            <button className="btn btn-light" onClick={() => {
              if (!contestsIn[contest.id]) { setContestsIn({ ...contestsIn, [contest.id]: true }); notify(L('You’re in. Good luck!', '참가 완료. 행운을 빌어요!')); }
              setTab('picks');
            }}>
              {contestsIn[contest.id] ? L('Make picks', '픽 하기') : L('Join free', '무료 참가')}
            </button>
          </div>
        </div>
        <div className="contest-players">{fmt(contest.players)} {L('playing', '명 참가')}</div>
      </section>

      <section>
        <div className="sec-head">
          <h2 className="h2">{L('Trending in the community', '커뮤니티 인기 마켓')}</h2>
          <button className="link" onClick={() => setTab('markets')}>{L('See all', '전체 보기')}</button>
        </div>
        <div className="stack">
          {trending.map((m) => <MarketCard key={m.id} m={m} />)}
        </div>
      </section>

      <section>
        <div className="sec-head">
          <h2 className="h2">{L('Hot takes', '핫한 의견')}</h2>
          <button className="link" onClick={() => setTab('community')}>{L('Open feed', '피드 열기')}</button>
        </div>
        <div className="stack">
          {takes.map((p) => (
            <button key={p.id} className="take" onClick={() => setTab('community')}>
              <Avatar id={p.user} size={32} />
              <div>
                <div className="take-who"><b>{users[p.user].name}</b> <span>· {users[p.user].city} · {L(p.time)}</span></div>
                <p>{p.text}</p>
                <div className="take-meta"><Icon name="heart" size={13} /> {p.likes} <Icon name="chat" size={13} /> {p.replies}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="local-card">
        <div className="local-icon"><Icon name="pin" size={22} /></div>
        <div className="local-body">
          <span className="eyebrow">{L('Near you · Koreatown LA', '내 주변 · LA 코리아타운')}</span>
          <h3>{L(events[0].title)}</h3>
          <p>{events[0].place} · {L(events[0].when)} · {events[0].going} {L('going', '명 참석')}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => setTab('community')}>{L('RSVP', '참석')}</button>
      </section>

      <footer className="fine">
        {L('Hanpan is a community and information service. Real-money trading happens on Kalshi, a CFTC-regulated exchange; Hanpan never holds your funds. Points have no cash value. 18+. Not financial advice.',
          '한판은 커뮤니티·정보 서비스입니다. 실제 거래는 CFTC 규제를 받는 거래소 칼시에서 이루어지며, 한판은 고객 자금을 보관하지 않습니다. 포인트는 현금 가치가 없습니다. 18세 이상. 투자 조언이 아닙니다.')}
      </footer>
    </div>
  );
}
