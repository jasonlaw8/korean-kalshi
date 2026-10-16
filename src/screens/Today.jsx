'use client';

import { useStore, streakOf, bonusAmount, dailyFor, leagueTable } from '../lib/store';
import { Link } from '../lib/nav';
import { dayKey, drift, until, nextAt, fmt } from '../lib/time';
import { Icon, Avatar, Chg, SecHead, nameOf } from '../components/ui';
import { MarketCard, GameCard, AdCard, SponsorLine } from '../components/cards';
import { useSheet } from '../components/sheets';
import { brief, games, markets, athletes, krw, calendar, friendPicks, events, users } from '../data/content';
import { placements } from '../data/ads';

export default function Today() {
  const { L, s, now, actions } = useStore();
  const open = useSheet();
  const streak = streakOf(s, now);
  const today = dayKey(now);
  const claimed = s.bonusDays.includes(today);
  const daily = dailyFor(today);
  const done = daily.filter((q) => s.picks[`d:${today}:${q.id}`]).length;
  const settled = daily.filter((q) => s.picks[`d:${today}:${q.id}`]?.status && s.picks[`d:${today}:${q.id}`].status !== 'open');
  const wonToday = settled.filter((q) => s.picks[`d:${today}:${q.id}`].status === 'won').length;
  const prevClose = krw.base - krw.chg;
  const rate = drift('krw', krw.base, 6, now);
  const lg = leagueTable(s, now);
  const myRank = lg.rows.findIndex((r) => r.id === 'me') + 1;
  const hr = new Date(now).getHours();
  const greet = hr < 12 ? L('Good morning', '좋은 아침이에요') : hr < 18 ? L('Good afternoon', '좋은 오후예요') : L('Good evening', '좋은 저녁이에요');
  const first = s.profile.name.split(' ')[0];
  const forYou = markets.filter((m) => m.tags.some((t) => s.profile.interests.includes(t))).slice(0, 3);
  const feed = forYou.length ? forYou : markets.slice(0, 3);
  const followedAth = athletes.filter((a) => s.follows.athletes.includes(a.id));
  const activity = Object.entries(friendPicks).flatMap(([mid, list]) => list.filter(([u]) => s.follows.users.includes(u)).map(([u, side]) => ({ u, side, m: markets.find((x) => x.id === mid) }))).slice(0, 4);
  const localEvent = events.find((e) => e.city === s.profile.city);

  return (
    <div className="screen">
      <section className="hello">
        <div>
          <p className="muted-sm">{new Date(now).toLocaleDateString(s.lang === 'kr' ? 'ko-KR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <h1 className="h1">{greet}, {first}</h1>
        </div>
        <Link to="/me" className="streak-chip" aria-label={L('Streak', '연속 기록')}>
          <Icon name="flame" size={18} stroke={2.2} />
          <b>{streak}</b>
        </Link>
      </section>

      {s.pendingResults.length > 0 && (
        <button className="results-banner" onClick={() => open('results')}>
          <Icon name="trophy" size={22} />
          <div><b>{L(`${s.pendingResults.length} picks settled`, `${s.pendingResults.length}개 픽 결과 발표`)}</b><span>{L('Tap to see how you did', '탭해서 결과 확인')}</span></div>
          <Icon name="chev" />
        </button>
      )}

      <section className="checkin">
        <div className="checkin-days" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => {
            const d = new Date(now - (6 - i) * 86400000);
            const k = dayKey(d);
            const on = s.activeDays.includes(k);
            return (
              <span key={k} className={`cday ${on ? 'on' : ''} ${k === today ? 'today' : ''}`}>
                <i>{on ? <Icon name="flame" size={13} stroke={2.4} /> : null}</i>
                {d.toLocaleDateString(s.lang === 'kr' ? 'ko-KR' : 'en-US', { weekday: 'narrow' })}
              </span>
            );
          })}
        </div>
        <div className="checkin-row">
          <div>
            <b>{streak > 0 ? L(`${streak}-day streak`, `${streak}일 연속`) : L('Start a streak today', '오늘 연속 기록을 시작하세요')}</b>
            <span className="muted-sm">{claimed ? L(`Tomorrow’s bonus: +${bonusAmount(streak + 1)}`, `내일 보너스: +${bonusAmount(streak + 1)}`) : L('Bonus grows each day you show up, up to +120', '매일 출석하면 보너스가 커져요 (최대 +120)')}</span>
          </div>
          <button className="btn btn-accent btn-sm" disabled={claimed} onClick={actions.claimBonus}>
            {claimed ? <><Icon name="check" size={14} stroke={2.6} /> {L('Claimed', '완료')}</> : `+${bonusAmount(streak)} ${L('Check in', '출석')}`}
          </button>
        </div>
      </section>

      <Link to="/play/daily" className="daily5">
        <div className="daily5-top">
          <span className="eyebrow eyebrow-light">{L('Daily 5', '데일리 5')} · {L('resets in', '초기화까지')} {until(nextAt(0, now), s.lang)}</span>
          <span className="daily5-count">{done}/5</span>
        </div>
        <h2>{settled.length === 5 ? L(`You went ${wonToday}/5 today. New set at midnight.`, `오늘 ${wonToday}/5 적중. 자정에 새 문제.`) : done === 5 ? L('All 5 locked. Results are on the way.', '5개 모두 완료. 결과가 곧 나와요.') : L('Five quick calls. Takes a minute.', '빠른 예측 5개. 1분이면 끝.')}</h2>
        <div className="daily5-dots">{daily.map((q) => { const p = s.picks[`d:${today}:${q.id}`]; return <i key={q.id} className={p ? (p.status === 'lost' ? 'lost' : 'on') : ''} />; })}</div>
        <span className="daily5-cta">{done === 5 ? L('Review picks', '픽 확인') : done ? L('Finish your picks', '나머지 픽 하기') : L('Play today’s 5', '오늘의 5개 하기')} <Icon name="chev" size={16} /></span>
      </Link>

      <div className="tiles">
        <Link to="/won" className="tile">
          <span className="eyebrow"><Icon name="won" size={13} /> USD/KRW</span>
          <b className="tile-num">₩{rate.toFixed(1)}</b>
          <Chg v={Math.round((rate - prevClose) * 10) / 10} />
          <span className="tile-sub">{L('Send-home rate', '송금 환율')}</span>
        </Link>
        <Link to="/play" className="tile">
          <span className="eyebrow"><Icon name="trophy" size={13} /> {L(lg.tier)} {L('league', '리그')}</span>
          <b className="tile-num">#{myRank}</b>
          <span className={`tile-tag ${myRank <= 5 ? 'up' : myRank >= 14 ? 'down' : ''}`}>{myRank <= 5 ? L('Promotion zone', '승급권') : myRank >= 14 ? L('Danger zone', '강등권') : L('Top 5 move up', '상위 5명 승급')}</span>
          <span className="tile-sub">{L('ends in', '마감')} {until(lg.ends, s.lang)}</span>
        </Link>
      </div>

      <section className="brief">
        <span className="eyebrow eyebrow-light">{L('Hanpan Brief', '한판 브리핑')}</span>
        <ul className="brief-list">
          {(s.lang === 'kr' ? brief.kr : brief.en).map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="brief-foot"><SponsorLine id={placements.briefSponsor} /></div>
      </section>

      {followedAth.length > 0 && (
        <section>
          <SecHead title={L('Your athletes', '내 선수')} action={L('All', '전체')} to="/athletes" />
          <div className="hscroll">
            {followedAth.map((a) => (
              <Link key={a.id} to="/athletes" className={`ath-chip ${a.hot ? 'hot' : ''}`}>
                <b>{L(a.name)}</b>
                <span>{a.team}</span>
                <span className="ath-status">{L(a.status)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <SecHead title={L('Tonight', '오늘의 경기')} action={L('All rooms', '모든 룸')} to="/community/live" />
        <div className="hscroll">{games.map((g) => <GameCard key={g.id} g={g} />)}</div>
      </section>

      <section>
        <SecHead title={L('For you', '추천 마켓')} action={L('Markets', '마켓')} to="/markets" />
        <div className="stack">{feed.map((m) => <MarketCard key={m.id} m={m} />)}</div>
      </section>

      <AdCard id={placements.todayNative} />

      {activity.length > 0 && (
        <section>
          <SecHead title={L('Friends are picking', '친구들의 픽')} />
          <div className="list">
            {activity.map(({ u, side, m }) => (
              <Link key={u + m.id} to={`/markets/${m.id}`} className="row row-btn">
                <Avatar id={u} size={32} />
                <div className="row-body"><b>{nameOf(u, s)} <span className={`side-tag ${side === 'YES' ? 'yes' : 'no'}`}>{side}</span></b><span>{L(m.title)}</span></div>
                <Icon name="chev" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <SecHead title={L('Coming up', '다가오는 일정')} />
        <div className="list">
          {calendar.map((c) => (
            <div key={c.date} className="row">
              <span className="date-pill">{c.date}</span>
              <div className="row-body"><b>{L(c)}</b></div>
            </div>
          ))}
        </div>
      </section>

      {localEvent && (
        <Link to="/community/local" className="local-card">
          <div className="local-icon"><Icon name="pin" size={22} /></div>
          <div className="local-body">
            <span className="eyebrow">{L('Near you', '내 주변')}</span>
            <h3>{L(localEvent.title)}</h3>
            <p>{localEvent.place} · {L(localEvent.when)}</p>
          </div>
          <Icon name="chev" />
        </Link>
      )}

      <footer className="fine">
        {L('Hanpan is a community and information service. Real-money trading happens on Kalshi, a CFTC-regulated exchange; Hanpan never holds your funds. Points have no cash value. Not financial advice.', '한판은 커뮤니티·정보 서비스입니다. 실제 거래는 CFTC 규제 거래소 칼시에서 이루어지며 한판은 자금을 보관하지 않습니다. 포인트는 현금 가치가 없습니다. 투자 조언이 아닙니다.')}
      </footer>
    </div>
  );
}
