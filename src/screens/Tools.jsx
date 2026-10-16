'use client';

import { useCallback, useEffect, useState } from 'react';
import { useStore } from '../lib/store';
import { Link } from '../lib/nav';
import { drift, series, ago, fmt, HOUR } from '../lib/time';
import { Icon, Chg, LineChart, SecHead } from '../components/ui';
import { AdCard, SponsorLine } from '../components/cards';
import { useSheet } from '../components/sheets';
import { krw, athletes, markets, lessons } from '../data/content';
import { advertisers, perks, placements } from '../data/ads';

// ---------- Won / dollar ----------

export function Won() {
  const { L, s, now } = useStore();
  const open = useSheet();
  const rate = Math.round(drift('krw', krw.base, 6, now) * 100) / 100;
  const [usd, setUsd] = useState('1000');
  const [fee, setFee] = useState('bank');
  const n = Number(usd) || 0;
  const options = [
    { id: 'bank', en: 'Typical bank wire', kr: '일반 은행 송금', spread: 0.018, fixed: 35 },
    { id: 'card', en: 'Card-funded app', kr: '카드 결제 송금앱', spread: 0.012, fixed: 4.99 },
    { id: 'bora', en: 'Bora Remit (sponsor)', kr: '보라 송금 (광고)', spread: 0.0025, fixed: 0 },
  ];
  const calc = (o) => Math.max(0, (n - o.fixed) * rate * (1 - o.spread));
  const best = calc(options[2]);
  const gen = useCallback((range, len) => series('krw' + range, 50, krw.chg * 2, len).map((v) => rate + (v - 50) * 1.6), [rate]);
  const alert = s.alerts.krw;

  return (
    <div className="screen">
      <div className="screen-head">
        <span className="eyebrow"><Icon name="won" size={13} /> USD → KRW</span>
        <h1 className="won-rate">₩{rate.toFixed(2)}</h1>
        <div className="row-inline"><Chg v={Math.round((rate - (krw.base - krw.chg)) * 100) / 100} suffix=" ₩" /> <span className="muted-sm">{L('today', '오늘')} · {L('52-week range', '52주 범위')} ₩{krw.low52}–₩{krw.high52}</span></div>
      </div>
      <LineChart pts={gen} unit={(v) => fmt(v)} step={5} />
      <div className="action-row">
        <button className={`pill-btn ${alert ? 'on' : ''}`} onClick={() => open('alert', { id: 'krw' })}><Icon name="bell" size={15} /> {alert ? `${alert.dir === 'above' ? '≥' : '≤'} ₩${alert.value}` : L('Rate alert', '환율 알림')}</button>
        <Link className="pill-btn" to="/markets/m6"><Icon name="markets" size={15} /> {L('Will it top ₩1,400?', '₩1,400 넘을까?')}</Link>
      </div>

      <section className="calc">
        <h2 className="h2">{L('Sending money home', '한국으로 송금하기')}</h2>
        <label className="field">
          <span>$</span>
          <input id="usd-amount" inputMode="decimal" value={usd} onChange={(e) => setUsd(e.target.value.replace(/[^\d.]/g, ''))} aria-label={L('Amount in dollars', '달러 금액')} />
          <span className="field-suffix">USD</span>
        </label>
        <div className="list">
          {options.map((o) => (
            <button key={o.id} className={`row row-btn ${fee === o.id ? 'sel' : ''}`} onClick={() => setFee(o.id)}>
              <div className="row-body"><b>{L(o)}</b><span>{L('fee', '수수료')} ${o.fixed} · {L('rate markup', '환율 마진')} {(o.spread * 100).toFixed(2)}%</span></div>
              <span className="num-strong">₩{fmt(calc(o))}</span>
            </button>
          ))}
        </div>
        <p className="muted-sm">{L(`Recipient gets up to ₩${fmt(best - calc(options[0]))} more than a typical bank wire.`, `일반 은행 송금보다 최대 ₩${fmt(best - calc(options[0]))} 더 받습니다.`)}</p>
      </section>

      <AdCard id={placements.wonSponsor} />

      <section>
        <SecHead title={L('Community take', '커뮤니티 의견')} />
        <div className="poll-static">
          <div className="crowd-row"><span>{L('Send now', '지금 송금')}</span><div className="bar bar-crowd"><i style={{ width: '44%' }} /></div><b>44%</b></div>
          <div className="crowd-row"><span>{L('Wait', '기다림')}</span><div className="bar"><i style={{ width: '56%' }} /></div><b>56%</b></div>
          <span className="muted-sm">{L('2,184 members voted this week', '이번 주 2,184명 투표')}</span>
        </div>
      </section>

      <AdCard id={placements.wonSecondary} compact />
      <p className="fine">{L('Rates are indicative mid-market rates and update through the day. Provider rates and fees vary; check before sending.', '표시 환율은 참고용 중간 환율이며 하루 중 변동됩니다. 업체별 환율과 수수료는 다르니 송금 전 확인하세요.')}</p>
    </div>
  );
}

// ---------- Athletes ----------

export function Athletes() {
  const { L, s, actions } = useStore();
  const sorted = [...athletes].sort((a, b) => s.follows.athletes.includes(b.id) - s.follows.athletes.includes(a.id));
  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Korean athletes', '한국 선수')}</h1>
        <p className="sub">{L('Every Korean star abroad, with game times in your time zone.', '해외 한국 선수 총정리. 경기 시간은 내 시간대로.')}</p>
      </div>
      <div className="stack">
        {sorted.map((a) => {
          const on = s.follows.athletes.includes(a.id);
          const m = a.market && markets.find((x) => x.id === a.market);
          return (
            <article key={a.id} className={`ath ${a.hot ? 'hot' : ''}`}>
              <div className="ath-head">
                <span className="ath-av">{[...L(a.name)][0]}</span>
                <div className="row-body"><b>{L(a.name)}</b><span>{a.team} · {L(a.sport)}</span></div>
                <button className={`btn btn-sm ${on ? 'btn-ghost' : 'btn-ink'}`} onClick={() => actions.follow('athletes', a.id)}>{on ? L('Following', '팔로우 중') : L('Follow', '팔로우')}</button>
              </div>
              <div className="ath-body">
                <span><Icon name="clock" size={14} /> {L(a.status)}</span>
                <span><Icon name="trend" size={14} /> {L(a.last)}</span>
              </div>
              {m && <Link className="embed" to={`/markets/${m.id}`}><div><span className="eyebrow">{L('Market', '마켓')}</span><p>{L(m.title)}</p></div><Icon name="chev" /></Link>}
            </article>
          );
        })}
      </div>
      <AdCard id={placements.athletesSponsor} compact />
    </div>
  );
}

// ---------- Perks ----------

export function Perks() {
  const { L, s, actions } = useStore();
  const open = useSheet();
  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Perks', '혜택')}</h1>
        <p className="sub">{L('Spend points on real offers from Korean-American businesses. Paid for by our partners, free for you.', '한인 비즈니스의 실제 혜택을 포인트로. 파트너가 비용을 부담하며 회원은 무료.')}</p>
      </div>
      <div className="perk-balance"><Icon name="flame" size={18} stroke={2.2} /> <b>{fmt(s.points)}</b> {L('points available', '포인트 보유')}</div>
      <div className="perk-grid">
        {perks.map((pk) => {
          const a = advertisers[pk.ad];
          const got = s.redeemed.find((r) => r.id === pk.id);
          const short = s.points < pk.cost;
          return (
            <article key={pk.id} className="perk">
              <div className="perk-top" style={{ background: a.color }}>
                <span className="perk-mark">{a.mark}</span>
                <span className="perk-left">{pk.left} {L('left', '남음')}</span>
              </div>
              <div className="perk-body">
                <b>{L(pk.title)}</b>
                <span>{a.name}</span>
                {got ? (
                  <button className="btn btn-ghost btn-sm btn-block" onClick={() => open('code', { perk: pk, code: got.code })}><Icon name="check" size={14} stroke={2.6} /> {L('View code', '코드 보기')}</button>
                ) : (
                  <button className="btn btn-ink btn-sm btn-block" disabled={short} onClick={() => { const code = `HP-${pk.id.toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`; actions.redeem(pk, code); open('code', { perk: pk, code }); }}>
                    {fmt(pk.cost)} pts
                  </button>
                )}
                {short && !got && <span className="muted-sm">{fmt(pk.cost - s.points)} {L('more to go', '더 필요')}</span>}
              </div>
            </article>
          );
        })}
      </div>
      <p className="fine">{L('Perks are promotional offers provided by each business. Points have no cash value and can’t be exchanged for money. No purchase necessary.', '혜택은 각 업체가 제공하는 프로모션입니다. 포인트는 현금 가치가 없으며 현금으로 교환할 수 없습니다. 구매 불필요.')}</p>
      <section className="advertise">
        <h2 className="h2">{L('Own a business?', '사업체를 운영하시나요?')}</h2>
        <p className="sub">{L('Reach Korean-Americans in your city with a perk, a sponsored contest or a live-room sponsorship.', '혜택, 후원 콘테스트, 라이브 룸 스폰서로 지역 한인 고객을 만나보세요.')}</p>
        <p className="muted-sm">partners@hanpan.app</p>
      </section>
    </div>
  );
}

// ---------- Academy ----------

export function Academy({ id }) {
  const { L, s, actions } = useStore();
  const [answer, setAnswer] = useState(null);
  if (id) {
    const idx = lessons.findIndex((l) => l.id === id);
    const l = lessons[idx];
    if (!l) return null;
    const next = lessons[idx + 1];
    const correct = answer === l.quiz.a;
    return (
      <div className="screen">
        <span className="eyebrow">{L('Lesson', '강의')} {idx + 1}/{lessons.length} · {l.min} min</span>
        <h1 className="msheet-title">{L(l.title)}</h1>
        <p className="lesson-text">{L(l.body)}</p>
        <section className="quiz">
          <b>{L(l.quiz.q)}</b>
          {l.quiz.opts.map((o, i) => (
            <button key={o} className={`poll-opt ${answer === i ? (correct ? 'on' : 'wrong') : ''} ${answer != null && i === l.quiz.a ? 'on' : ''}`} onClick={() => { setAnswer(i); if (i === l.quiz.a) actions.completeLesson(l.id); }}>
              <span>{o}</span>{answer != null && i === l.quiz.a && <Icon name="check" size={16} stroke={2.6} />}
            </button>
          ))}
          {answer != null && <p className={correct ? 'mine' : 'warn'}>{correct ? (s.lessons[l.id] ? L('Correct! +50 points', '정답! +50 포인트') : '') : L('Not quite. Try again.', '아쉬워요. 다시 해보세요.')}</p>}
        </section>
        {next ? <Link className="btn btn-ink btn-block" to={`/academy/${next.id}`} onClick={() => setAnswer(null)}>{L('Next lesson', '다음 강의')}</Link>
          : <Link className="btn btn-ink btn-block" to="/academy">{L('Back to Academy', '아카데미로')}</Link>}
      </div>
    );
  }
  const done = Object.keys(s.lessons).length;
  return (
    <div className="screen">
      <div className="screen-head">
        <h1 className="h1">{L('Hanpan Academy', '한판 아카데미')}</h1>
        <p className="sub">{L('Five two-minute lessons on how prediction markets work. 50 points each.', '예측 시장 원리를 배우는 2분짜리 강의 5개. 강의당 50 포인트.')}</p>
      </div>
      <div className="level-bar thick"><i style={{ width: `${(done / lessons.length) * 100}%` }} /></div>
      <div className="list">
        {lessons.map((l, i) => (
          <Link key={l.id} to={`/academy/${l.id}`} className="row row-btn">
            <span className={`result ${s.lessons[l.id] ? 'won' : 'todo'}`}>{s.lessons[l.id] ? <Icon name="check" size={14} stroke={2.6} /> : i + 1}</span>
            <div className="row-body"><b>{L(l.title)}</b><span>{l.min} min · +50 pts</span></div>
            <Icon name="chev" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------- Notifications ----------

export function Notifications() {
  const { L, s, actions } = useStore();
  useEffect(() => {
    const t = setTimeout(actions.readNotifs, 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="screen">
      <div className="screen-head"><h1 className="h1">{L('Notifications', '알림')}</h1></div>
      {s.notifs.length ? (
        <div className="list">
          {s.notifs.map((n) => (
            <Link key={n.id} to={n.to || '/'} className={`row row-btn ${n.read ? '' : 'unread'}`}>
              <span className={`notif-ic n-${n.icon}`}><Icon name={n.icon} size={16} /></span>
              <div className="row-body"><b>{L(n)}</b><span>{ago(n.at, s.lang)}</span></div>
            </Link>
          ))}
        </div>
      ) : <p className="empty-line">{L('Nothing yet. Results, alerts and replies show up here.', '아직 알림이 없어요. 결과, 알림, 답글이 여기에 표시됩니다.')}</p>}
    </div>
  );
}
