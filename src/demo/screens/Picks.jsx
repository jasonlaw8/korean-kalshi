import { useState } from 'react';
import { useApp, useL, Icon, Avatar, SrcBadge, fmt } from '../ui';
import { picksToday, contests, leaderboard, users, me } from '../data';

const STAKE = 100;

export default function Picks() {
  const L = useL();
  const { points, setPoints, picks, setPicks, notify, contestsIn, setContestsIn } = useApp();
  const [slip, setSlip] = useState({});
  const [board, setBoard] = useState('overall');
  const locked = (id) => picks[id];
  const count = Object.keys(slip).length;

  const choose = (id, side) => {
    if (locked(id)) return;
    setSlip((s) => {
      const n = { ...s };
      if (n[id] === side) delete n[id]; else n[id] = side;
      return n;
    });
  };
  const lockIn = () => {
    const cost = count * STAKE;
    if (cost > points) return notify(L('Not enough points.', '포인트가 부족합니다.'));
    const next = { ...picks };
    Object.entries(slip).forEach(([id, side]) => { next[id] = { side, stake: STAKE }; });
    setPicks(next);
    setPoints(points - cost);
    setSlip({});
    notify(L(`${count} picks locked. Results update live.`, `${count}개 픽 확정. 결과는 실시간으로 업데이트됩니다.`));
  };

  const rows = leaderboard[board];
  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Free picks', '무료 픽')}</h1>
        <p className="sub">{L('Predict for points. Climb the boards. No money involved.', '포인트로 예측하고 랭킹에 도전하세요. 돈은 들지 않습니다.')}</p>
      </div>

      <section className="pts-card">
        <div className="pts-main">
          <span className="eyebrow eyebrow-light">{L('Your points', '내 포인트')}</span>
          <div className="pts-big">{fmt(points)}</div>
        </div>
        <div className="pts-stats">
          <div><b><Icon name="flame" size={15} stroke={2.2} /> {me.streak}</b><span>{L('day streak', '일 연속')}</span></div>
          <div><b>#{me.rank}</b><span>{L('LA rank', 'LA 순위')}</span></div>
          <div><b>{me.accuracy}%</b><span>{L('accuracy', '적중률')}</span></div>
        </div>
      </section>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Contests', '콘테스트')}</h2></div>
        <div className="hscroll">
          {contests.map((c) => (
            <div key={c.id} className={`contest tone-${c.tone}`}>
              <span className="eyebrow eyebrow-light">{L(c.ends)} · {fmt(c.players)} {L('playing', '명')}</span>
              <h3>{L(c.title)}</h3>
              <p>{L(c.prize)}</p>
              {c.sponsor && <span className="sponsor-line">{L('Presented by', '후원')} <b>{c.sponsor}</b></span>}
              <button className="btn btn-light btn-sm" onClick={() => {
                setContestsIn({ ...contestsIn, [c.id]: !contestsIn[c.id] });
                if (!contestsIn[c.id]) notify(L('Joined. Picks below count toward it.', '참가 완료. 아래 픽이 반영됩니다.'));
              }}>
                {contestsIn[c.id] ? <><Icon name="check" size={14} stroke={2.6} /> {L('Joined', '참가 중')}</> : L('Join free', '무료 참가')}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sec-head">
          <h2 className="h2">{L('Today’s picks', '오늘의 픽')}</h2>
          <span className="muted-sm">{STAKE} {L('pts each', '포인트/픽')}</span>
        </div>
        <div className="stack">
          {picksToday.map((p) => {
            const lk = locked(p.id);
            const sel = lk ? lk.side : slip[p.id];
            return (
              <div key={p.id} className={`pick ${lk ? 'locked' : ''}`}>
                <div className="pick-top">
                  <h3>{L(p.q)}</h3>
                  <SrcBadge src={p.src} />
                </div>
                <div className="pick-opts">
                  {[['YES', p.a, p.odds[0]], ['NO', p.b, p.odds[1]]].map(([side, label, pct]) => (
                    <button key={side} className={`pick-opt ${sel === side ? 'on' : ''}`} onClick={() => choose(p.id, side)} disabled={!!lk} aria-pressed={sel === side}>
                      <span className="pick-bar" style={{ width: `${pct}%` }} />
                      <span className="pick-label">{L(label)}</span>
                      <span className="pick-pct">{pct}%</span>
                      {sel === side && lk && <Icon name="lock" size={14} />}
                    </button>
                  ))}
                </div>
                <div className="pick-foot">
                  {lk ? <span className="mine"><Icon name="check" size={13} stroke={2.6} /> {L('Locked in', '확정됨')} · {lk.stake} pts</span>
                    : <span>{L('Win', '적중 시')} +{Math.round(STAKE * (100 / (sel === 'NO' ? p.odds[1] : p.odds[0])) - STAKE)} pts</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Leaderboard', '리더보드')}</h2></div>
        <div className="seg">
          {[['overall', 'Overall', '전체'], ['city', 'LA / OC', 'LA·OC'], ['friends', 'Friends', '친구']].map(([id, en, kr]) => (
            <button key={id} className={board === id ? 'on' : ''} onClick={() => setBoard(id)}>{L(en, kr)}</button>
          ))}
        </div>
        <ol className="board">
          {rows.map((r, i) => (
            <li key={r.user} className={r.user === 'dpark_la' ? 'me' : ''}>
              <span className={`rank r${i + 1}`}>{i + 1}</span>
              <Avatar id={r.user} size={34} />
              <div className="board-who"><b>{users[r.user].name}</b><span>{users[r.user].city} · {r.acc}% {L('acc', '적중')}</span></div>
              <span className="board-pts">{fmt(r.pts)}</span>
            </li>
          ))}
          {board !== 'friends' && (
            <li className="me">
              <span className="rank">{me.rank}</span>
              <Avatar id="dpark_la" size={34} />
              <div className="board-who"><b>{L('You', '나')}</b><span>LA · {me.accuracy}% {L('acc', '적중')}</span></div>
              <span className="board-pts">{fmt(points)}</span>
            </li>
          )}
        </ol>
      </section>

      <p className="fine">{L('Points are free and have no cash value. They can’t be bought, sold or exchanged.', '포인트는 무료이며 현금 가치가 없습니다. 구매, 판매, 교환할 수 없습니다.')}</p>

      {count > 0 && (
        <div className="slip">
          <div>
            <b>{count} {L(count === 1 ? 'pick' : 'picks', '개 픽')}</b>
            <span>{count * STAKE} pts</span>
          </div>
          <button className="btn btn-accent" onClick={lockIn}><Icon name="lock" size={16} /> {L('Lock in', '확정하기')}</button>
        </div>
      )}
    </div>
  );
}
