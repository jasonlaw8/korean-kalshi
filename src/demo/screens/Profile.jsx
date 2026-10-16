import { useState } from 'react';
import { useApp, useL, Icon, Avatar, Toggle, fmt } from '../ui';
import { me, record, lessons } from '../data';

export default function Profile() {
  const L = useL();
  const { open, connected, plus, lang, setLang, theme, setTheme, beginner, setBeginner, lessonsDone, points } = useApp();
  const [alerts, setAlerts] = useState({ moves: true, games: true, replies: true, brief: false });
  const [follows, setFollows] = useState(['Dodgers', 'LAFC', 'Son Heung-min', 'Fed', 'KBO', 'BTS']);
  const done = Object.keys(lessonsDone).length;

  return (
    <div className="screen">
      <section className="profile">
        <Avatar id="dpark_la" size={68} />
        <div className="profile-who">
          <h1 className="h1">{me.name} {plus && <span className="badge badge-plus">PLUS</span>}</h1>
          <span>@{me.handle} · {L(me.city)}</span>
          <div className="profile-follow"><b>{me.followers}</b> {L('followers', '팔로워')} <b>{me.following}</b> {L('following', '팔로잉')}</div>
        </div>
      </section>

      <div className="badges">
        {me.badges.map((b) => (
          <span key={b.id} className="mbadge"><Icon name={b.icon} size={14} stroke={2.2} /> {L(b)}</span>
        ))}
      </div>

      <section className="stats">
        <div><b>{fmt(points)}</b><span>{L('points', '포인트')}</span></div>
        <div><b>{me.accuracy}%</b><span>{L('accuracy', '적중률')}</span></div>
        <div><b>{me.picks}</b><span>{L('picks', '픽')}</span></div>
        <div><b>{me.bestStreak}</b><span>{L('best streak', '최고 연속')}</span></div>
      </section>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Recent picks', '최근 픽')}</h2></div>
        <div className="list">
          {record.map((r, i) => (
            <div key={i} className="row">
              <span className={`result ${r.won ? 'won' : 'lost'}`}><Icon name={r.won ? 'check' : 'x'} size={14} stroke={2.6} /></span>
              <div className="row-body"><b>{L(r.q)}</b><span>{L('Picked', '선택')} {r.pick}</span></div>
              <span className={`pts-delta ${r.won ? 'won' : 'lost'}`}>{r.pts > 0 ? '+' : ''}{r.pts}</span>
            </div>
          ))}
        </div>
      </section>

      <button className="feature kalshi" onClick={() => open('connect')}>
        <div className="feature-icon"><Icon name="link" size={22} /></div>
        <div className="row-body">
          <b>{connected ? L('Kalshi account connected', '칼시 계정 연결됨') : L('Connect your Kalshi account', '칼시 계정 연결하기')}</b>
          <span>{connected ? L('See positions and verified badges', '포지션 및 인증 배지 보기') : L('Show verified positions. Your money stays at Kalshi.', '포지션 인증. 자금은 칼시에 그대로.')}</span>
        </div>
        <Icon name="chev" />
      </button>

      <button className="feature plus" onClick={() => open('premium')}>
        <div className="feature-icon"><Icon name="star" size={22} /></div>
        <div className="row-body">
          <b>{plus ? L('Hanpan Plus · active', '한판 플러스 · 이용 중') : L('Try Hanpan Plus', '한판 플러스 체험')}</b>
          <span>{L('Ad-free, smart alerts, crowd-vs-market analytics', '광고 없음, 스마트 알림, 커뮤니티 vs 마켓 분석')}</span>
        </div>
        <Icon name="chev" />
      </button>

      <button className="feature academy" onClick={() => open('academy')}>
        <div className="feature-icon"><Icon name="book" size={22} /></div>
        <div className="row-body">
          <b>{L('Hanpan Academy', '한판 아카데미')}</b>
          <span>{done}/{lessons.length} {L('lessons done · How event contracts work', '강의 완료 · 이벤트 계약의 원리')}</span>
          <span className="progress"><i style={{ width: `${(done / lessons.length) * 100}%` }} /></span>
        </div>
        <Icon name="chev" />
      </button>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Following', '팔로우 중')}</h2></div>
        <div className="chips chips-wrap">
          {follows.map((f) => (
            <button key={f} className="chip on" onClick={() => setFollows(follows.filter((x) => x !== f))} aria-label={`Unfollow ${f}`}>{f} <Icon name="x" size={12} /></button>
          ))}
          {['Lakers', 'LPGA', 'Samsung', 'Midterms'].filter((x) => !follows.includes(x)).map((f) => (
            <button key={f} className="chip" onClick={() => setFollows([...follows, f])}><Icon name="plus" size={12} /> {f}</button>
          ))}
        </div>
      </section>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Alerts', '알림 설정')}</h2></div>
        <div className="list">
          {[['moves', 'Big price moves on markets I follow', '팔로우한 마켓 급등락'], ['games', 'Game starts and live rooms', '경기 시작 및 라이브 룸'], ['replies', 'Replies and mentions', '답글 및 멘션'], ['brief', 'Daily brief by email', '이메일 데일리 브리핑']].map(([k, en, kr]) => (
            <div key={k} className="row">
              <div className="row-body"><b>{L(en, kr)}</b></div>
              <Toggle id={`alert-${k}`} label={L(en, kr)} on={alerts[k]} onChange={(v) => setAlerts({ ...alerts, [k]: v })} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="sec-head"><h2 className="h2">{L('Settings', '설정')}</h2></div>
        <div className="list">
          <div className="row">
            <div className="row-body"><b>{L('Language', '언어')}</b></div>
            <div className="seg seg-sm">
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>English</button>
              <button className={lang === 'kr' ? 'on' : ''} onClick={() => setLang('kr')}>한국어</button>
            </div>
          </div>
          <div className="row">
            <div className="row-body"><b>{L('Theme', '테마')}</b></div>
            <div className="seg seg-sm">
              {[['system', 'Auto', '자동'], ['light', 'Light', '라이트'], ['dark', 'Dark', '다크']].map(([id, en, kr]) => (
                <button key={id} className={theme === id ? 'on' : ''} onClick={() => setTheme(id)}>{L(en, kr)}</button>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="row-body"><b>{L('Beginner mode', '초보자 모드')}</b><span>{L('Explain prices on every market card', '모든 마켓 카드에 가격 설명 표시')}</span></div>
            <Toggle id="beginner" label="Beginner mode" on={beginner} onChange={setBeginner} />
          </div>
          <button className="row row-btn" onClick={() => open('responsible')}>
            <div className="row-body"><b>{L('Responsible trading', '책임감 있는 거래')}</b><span>{L('Limits, cool-offs and help lines', '한도, 휴식 기간, 상담 전화')}</span></div>
            <Icon name="chev" />
          </button>
        </div>
      </section>

      <footer className="fine">
        {L('Hanpan is not affiliated with Kalshi in this demo. Hanpan does not hold customer funds, execute trades on anyone’s behalf, or charge per-trade fees.', '이 데모에서 한판은 칼시와 제휴 관계가 아닙니다. 한판은 고객 자금을 보관하거나, 대리 거래를 하거나, 거래 수수료를 받지 않습니다.')}
      </footer>
    </div>
  );
}
