'use client';

import { useStore, dailyFor, leagueTable, levelOf, statsOf, DAILY_STAKE } from '../lib/store';
import { Link } from '../lib/nav';
import { dayKey, until, fmt } from '../lib/time';
import { Icon, Avatar, SecHead, nameOf, shareLink } from '../components/ui';
import { SponsorLine } from '../components/cards';
import { useSheet } from '../components/sheets';
import { contests, placements } from '../data/ads';
import { leagueTiers } from '../data/content';

export function Daily() {
  const { L, s, now, actions, notify } = useStore();
  const today = dayKey(now);
  const qs = dailyFor(today);
  const done = qs.filter((q) => s.picks[`d:${today}:${q.id}`]).length;
  const settleLabel = (p) => p.status === 'open'
    ? `${L('Settles in', '정산까지')} ${until(p.resolveAt, s.lang)}`
    : p.status === 'won' ? `${L('Won', '적중')} +${p.payout}` : L('Missed', '실패');

  return (
    <div className="screen">
      <div className="screen-head">
        <span className="eyebrow">{new Date(now).toLocaleDateString(s.lang === 'kr' ? 'ko-KR' : 'en-US', { month: 'long', day: 'numeric' })}</span>
        <h1 className="h1">{L('Daily 5', '데일리 5')}</h1>
        <p className="sub">{L(`${DAILY_STAKE} points per pick. Long shots pay more. Get all 5 right for a 500-point bonus.`, `픽당 ${DAILY_STAKE} 포인트. 확률이 낮을수록 더 많이 받아요. 5개 모두 맞히면 500 포인트 보너스.`)}</p>
      </div>
      <div className="daily-progress"><i style={{ width: `${(done / 5) * 100}%` }} /><span>{done}/5</span></div>
      <div className="stack">
        {qs.map((q, i) => {
          const p = s.picks[`d:${today}:${q.id}`];
          return (
            <div key={q.id} className={`dq ${p ? 'locked' : ''} ${p?.status || ''}`}>
              <div className="dq-top">
                <span className="dq-n">{i + 1}</span>
                <span className="eyebrow">{q.cat}</span>
                {p && <span className={`dq-status ${p.status}`}>{settleLabel(p)}</span>}
              </div>
              <h3>{L(q.q)}</h3>
              <div className="pick-opts">
                {[['A', q.a, q.pa], ['B', q.b, 100 - q.pa]].map(([side, label, pct]) => {
                  const on = p?.side === side;
                  const win = Math.round((DAILY_STAKE * 100) / pct);
                  return (
                    <button key={side} className={`pick-opt ${on ? 'on' : ''} ${p && p.status !== 'open' && q.out === side ? 'correct' : ''}`} disabled={!!p} onClick={() => actions.pickDaily(q, side)} aria-pressed={on}>
                      <span className="pick-bar" style={{ width: `${pct}%` }} />
                      <span className="pick-label">{L(label)}</span>
                      <span className="pick-pct">{p ? `${pct}%` : `+${win}`}</span>
                      {on && <Icon name="lock" size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {done === 5 && (
        <div className="done-card">
          <Icon name="check" size={22} stroke={2.6} />
          <div>
            <b>{L('Locked in. Come back for results.', '확정 완료. 결과 확인하러 오세요.')}</b>
            <span>{L('Quick picks settle in minutes; the rest tonight or tomorrow morning.', '빠른 픽은 몇 분 후, 나머지는 오늘 밤이나 내일 아침에 정산돼요.')}</span>
          </div>
          <button className="btn btn-ink btn-sm" onClick={() => shareLink({ title: 'Hanpan Daily 5', text: L('I just locked my Hanpan Daily 5. Think you can beat me?', '한판 데일리5 완료! 나보다 잘 맞힐 수 있어?'), path: '/play/daily', L, notify, onShared: actions.shared })}>
            <Icon name="share" size={14} /> {L('Challenge', '도전장')}
          </button>
        </div>
      )}
      <p className="fine">{L('Points are free and have no cash value. They can’t be bought, sold or exchanged for money.', '포인트는 무료이며 현금 가치가 없습니다. 구매, 판매, 현금 교환이 불가합니다.')}</p>
    </div>
  );
}

export default function Play() {
  const { L, s, now, actions } = useStore();
  const open = useSheet();
  const lv = levelOf(s);
  const st = statsOf(s);
  const lg = leagueTable(s, now);
  const today = dayKey(now);
  const done = dailyFor(today).filter((q) => s.picks[`d:${today}:${q.id}`]).length;
  const allSettled = dailyFor(today).every((q) => s.picks[`d:${today}:${q.id}`] && s.picks[`d:${today}:${q.id}`].status !== 'open');
  const picks = Object.entries(s.picks).map(([k, p]) => ({ k, ...p })).sort((a, b) => b.at - a.at);
  const open_ = picks.filter((p) => p.status === 'open');
  const settled = picks.filter((p) => p.status !== 'open').slice(0, 12);
  const tierIdx = s.league.tier;

  return (
    <div className="screen">
      <section className="pts-card">
        <div className="pts-main">
          <div>
            <span className="eyebrow eyebrow-light">{L('Your points', '내 포인트')}</span>
            <div className="pts-big">{fmt(s.points)}</div>
          </div>
          <Link to="/perks" className="btn btn-light btn-sm"><Icon name="gift" size={15} /> {L('Perks', '혜택')}</Link>
        </div>
        <div className="level">
          <div className="level-row"><b>{L(lv.cur)}</b>{lv.next && <span>{fmt(lv.next.at - lv.xp)} {L('to', '남음 →')} {L(lv.next)}</span>}</div>
          <div className="level-bar"><i style={{ width: `${Math.min(100, lv.pct * 100)}%` }} /></div>
        </div>
        <div className="pts-stats">
          <div><b>{st.acc == null ? '–' : `${st.acc}%`}</b><span>{L('accuracy', '적중률')}</span></div>
          <div><b>{st.won}/{st.settled}</b><span>{L('won', '적중')}</span></div>
          <div><b>{st.open}</b><span>{L('open picks', '진행 중')}</span></div>
        </div>
      </section>

      <Link to="/play/daily" className="row-card">
        <div className="row-card-icon"><Icon name="picks" size={22} /></div>
        <div className="row-body"><b>{L('Daily 5', '데일리 5')} · {done}/5</b><span>{allSettled ? L('Done for today. New set at midnight.', '오늘 완료. 자정에 새 문제.') : done === 5 ? L('All locked. Results soon.', '모두 완료. 곧 결과 발표.') : L('Make today’s picks', '오늘의 픽 하기')}</span></div>
        <Icon name="chev" />
      </Link>

      <section>
        <SecHead title={`${L(lg.tier)} ${L('League', '리그')}`} />
        <div className="league-head">
          <div className="tiers">
            {leagueTiers.map((t, i) => <span key={t.id} className={`tier t-${t.id} ${i === tierIdx ? 'on' : ''} ${i < tierIdx ? 'past' : ''}`} title={L(t)} />)}
          </div>
          <span className="muted-sm"><Icon name="clock" size={13} /> {L('Ends in', '마감')} {until(lg.ends, s.lang)}</span>
        </div>
        <p className="sub">{L('Points you earn this week count. Top 5 move up a league, bottom 2 move down.', '이번 주 획득 포인트 기준. 상위 5명 승급, 하위 2명 강등.')}</p>
        <ol className="board">
          {lg.rows.map((r, i) => (
            <li key={r.id} className={`${r.id === 'me' ? 'me' : ''} ${i === 5 ? 'cut' : ''} ${i === lg.rows.length - 2 ? 'cut-down' : ''}`}>
              <span className={`rank r${i + 1}`}>{i + 1}</span>
              <Avatar id={r.id} size={30} />
              <div className="board-who"><b>{r.id === 'me' ? L('You', '나') : nameOf(r.id, s)}</b></div>
              <span className="board-pts">{fmt(r.pts)}</span>
            </li>
          ))}
        </ol>
        <div className="board-sponsor"><SponsorLine id={placements.leagueSponsor} label={L('League prizes by', '리그 상품 제공')} /></div>
      </section>

      <section>
        <SecHead title={L('Contests', '콘테스트')} />
        <div className="hscroll">
          {contests.map((c) => (
            <div key={c.id} className={`contest tone-${c.tone}`}>
              <span className="eyebrow eyebrow-light">{fmt(c.players + (s.contests[c.id] ? 1 : 0))} {L('playing', '명 참가')} · {L('ends', '마감')} {c.ends.slice(5).replace('-', '/')}</span>
              <h3>{L(c.title)}</h3>
              <p>{L(c.prize)}</p>
              {c.ad && <button className="contest-sponsor" onClick={() => open('ad', { id: c.ad })}>{L('Sponsored by', '후원')} <b>{c.ad === 'gogi' ? 'Gogi House' : 'Mira Realty'}</b></button>}
              <button className="btn btn-light btn-sm" onClick={() => actions.joinContest(c.id)}>
                {s.contests[c.id] ? <><Icon name="check" size={14} stroke={2.6} /> {L('Joined', '참가 중')}</> : L('Join free', '무료 참가')}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SecHead title={L('Open picks', '진행 중인 픽')} />
        {open_.length ? (
          <div className="list">
            {open_.map((p) => (
              <Link key={p.k} to={p.kind === 'market' ? `/markets/${p.id}` : '/play/daily'} className="row row-btn">
                <span className="result todo"><Icon name="clock" size={14} /></span>
                <div className="row-body"><b>{L(p.label)}</b><span>{L(p.sideLabel)} · {p.stake} pts · {L('settles in', '정산까지')} {until(p.resolveAt, s.lang)}</span></div>
                <span className="pts-delta">+{Math.round((p.stake * 100) / p.price)}</span>
              </Link>
            ))}
          </div>
        ) : <p className="empty-line">{L('No open picks. Start with the Daily 5.', '진행 중인 픽이 없어요. 데일리 5부터 시작하세요.')}</p>}
      </section>

      {settled.length > 0 && (
        <section>
          <SecHead title={L('History', '기록')} />
          <div className="list">
            {settled.map((p) => (
              <div key={p.k} className="row">
                <span className={`result ${p.status}`}><Icon name={p.status === 'won' ? 'check' : 'x'} size={14} stroke={2.6} /></span>
                <div className="row-body"><b>{L(p.label)}</b><span>{L(p.sideLabel)}</span></div>
                <span className={`pts-delta ${p.status}`}>{p.status === 'won' ? `+${p.payout}` : `−${p.stake}`}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
