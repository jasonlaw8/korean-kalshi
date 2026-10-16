'use client';

import { useState } from 'react';
import { useStore, streakOf, levelOf, statsOf, badgesOf } from '../lib/store';
import { Link } from '../lib/nav';
import { fmt, ago } from '../lib/time';
import { Icon, Avatar, Toggle, SecHead, shareLink } from '../components/ui';
import { cities, interests, lessons } from '../data/content';
import { advertisers, perks } from '../data/ads';
import { useSheet } from '../components/sheets';
import { IS_DEMO, DemoNote } from './Onboarding';

export default function Me() {
  const { L, s, now } = useStore();
  const open = useSheet();
  const lv = levelOf(s);
  const st = statsOf(s);
  const streak = streakOf(s, now);
  const badges = badgesOf(s);
  const city = cities.find((c) => c.id === s.profile.city);
  const lessonsDone = Object.keys(s.lessons).length;

  return (
    <div className="screen">
      <section className="profile">
        <Avatar id="me" size={68} />
        <div className="profile-who">
          <h1 className="h1">{s.profile.name}</h1>
          <span>@{s.profile.handle} · {L(city)}</span>
          <span className="lvl-tag">{L(lv.cur)} · {fmt(lv.xp)} XP</span>
        </div>
      </section>

      <section className="stats">
        <div><b>{fmt(s.points)}</b><span>{L('points', '포인트')}</span></div>
        <div><b>{st.acc == null ? '–' : `${st.acc}%`}</b><span>{L('accuracy', '적중률')}</span></div>
        <div><b>{st.total}</b><span>{L('picks', '픽')}</span></div>
        <div><b>{streak}</b><span>{L('day streak', '연속')}</span></div>
      </section>

      <section>
        <SecHead title={L('Badges', '배지')} />
        {badges.length ? (
          <div className="badges">{badges.map((b) => <span key={b.id} className="mbadge"><Icon name={b.icon} size={14} stroke={2.2} /> {L(b)}</span>)}</div>
        ) : <p className="empty-line">{L('Make your first pick to earn a badge.', '첫 픽을 하면 배지를 받아요.')}</p>}
      </section>

      <Link to="/invite" className="feature invite">
        <div className="feature-icon"><Icon name="gift" size={22} /></div>
        <div className="row-body"><b>{L('Invite friends, get 250 each', '친구 초대하고 각각 250 포인트')}</b><span>{L('Your code', '내 코드')}: {s.profile.handle.toUpperCase()}-250</span></div>
        <Icon name="chev" />
      </Link>

      <div className="list">
        <Link to="/perks" className="row row-btn">
          <span className="row-icon"><Icon name="gift" size={18} /></span>
          <div className="row-body"><b>{L('Perks', '혜택')}</b><span>{s.redeemed.length} {L('redeemed', '사용')} · {perks.length} {L('available', '이용 가능')}</span></div><Icon name="chev" />
        </Link>
        <Link to="/academy" className="row row-btn">
          <span className="row-icon"><Icon name="book" size={18} /></span>
          <div className="row-body"><b>{L('Academy', '아카데미')}</b><span>{lessonsDone}/{lessons.length} {L('lessons', '강의')}</span></div><Icon name="chev" />
        </Link>
        <Link to="/won" className="row row-btn">
          <span className="row-icon"><Icon name="won" size={18} /></span>
          <div className="row-body"><b>{L('Won tracker', '환율 추적')}</b><span>{s.alerts.krw ? L('Alert on', '알림 켜짐') : L('Set a rate alert', '환율 알림 설정')}</span></div><Icon name="chev" />
        </Link>
        <Link to="/athletes" className="row row-btn">
          <span className="row-icon"><Icon name="star" size={18} /></span>
          <div className="row-body"><b>{L('Korean athletes', '한국 선수')}</b><span>{s.follows.athletes.length} {L('followed', '팔로우')}</span></div><Icon name="chev" />
        </Link>
      </div>

      {s.redeemed.length > 0 && (
        <section>
          <SecHead title={L('My perk codes', '내 혜택 코드')} />
          <div className="list">
            {s.redeemed.map((r) => {
              const pk = perks.find((p) => p.id === r.id);
              return (
                <button key={r.code} className="row row-btn" onClick={() => open('code', { perk: pk, code: r.code })}>
                  <span className="ad-mark" style={{ background: advertisers[pk.ad].color }}>{advertisers[pk.ad].mark}</span>
                  <div className="row-body"><b>{L(pk.title)}</b><span>{r.code} · {ago(r.at, s.lang)}</span></div>
                  <Icon name="chev" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      <Upcoming />

      <Link to="/settings" className="btn btn-ghost btn-block"><Icon name="settings" size={16} /> {L('Settings', '설정')}</Link>
      {IS_DEMO && <DemoNote />}
    </div>
  );
}

function Upcoming() {
  const { L, s, actions, notify } = useStore();
  const items = [
    ['plus', 'star', 'Hanpan Plus', '한판 플러스', 'Ad-free, crowd-vs-market alerts, pick analytics. $6.99/mo.', '광고 제거, 커뮤니티 vs 마켓 알림, 픽 분석. 월 $6.99.'],
    ['kalshi', 'link', 'Connect Kalshi', '칼시 연결', 'Show verified positions on your posts. Read-only; your money stays at Kalshi.', '게시글에 인증된 포지션 표시. 읽기 전용이며 자금은 칼시에 그대로.'],
  ];
  return (
    <section>
      <SecHead title={L('Coming soon', '출시 예정')} />
      <div className="list">
        {items.map(([id, icon, en, kr, den, dkr]) => (
          <div key={id} className="row">
            <span className="row-icon"><Icon name={icon} size={18} /></span>
            <div className="row-body"><b>{L(en, kr)}</b><span>{L(den, dkr)}</span></div>
            <button className={`btn btn-sm ${s.waitlist[id] ? 'btn-ghost' : 'btn-ink'}`} disabled={!!s.waitlist[id]} onClick={() => { actions.joinWaitlist(id); notify(L('You’re on the list', '대기 명단에 등록됐어요')); }}>
              {s.waitlist[id] ? L('On list', '등록됨') : L('Notify me', '알림 받기')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Invite() {
  const { L, s, actions, notify } = useStore();
  const code = `${s.profile.handle.toUpperCase()}-250`;
  return (
    <div className="screen">
      <section className="invite-hero">
        <Icon name="gift" size={34} />
        <h1 className="h1">{L('Bring your people', '우리 사람들을 데려오세요')}</h1>
        <p>{L('Friends who join with your code get 250 points. So do you. Private leagues are more fun with your church group, team or KSA crew.', '내 코드로 가입한 친구는 250 포인트를 받고, 나도 받아요. 비공개 리그는 교회, 팀, 한인학생회 친구들과 함께하면 더 재밌어요.')}</p>
        <button className="code-box big" onClick={async () => { try { await navigator.clipboard.writeText(code); notify(L('Code copied', '코드 복사됨')); } catch { notify(code); } }}>
          <span>{L('Your invite code', '내 초대 코드')}</span><b>{code}</b><Icon name="copy" size={16} />
        </button>
        <button className="btn btn-kakao btn-block" onClick={() => shareLink({ title: 'Hanpan 한판', text: L(`Join me on Hanpan, the Korean-American app for sports, the won and predictions. Use my code ${code} for 250 points.`, `한판에서 같이 해요! 스포츠, 환율, 예측을 위한 한인 앱. 내 코드 ${code} 입력하면 250 포인트.`), path: `/?ref=${code}`, L, notify, onShared: actions.shared })}>
          <Icon name="chat" size={18} fill="currentColor" stroke={0} /> {L('Share to KakaoTalk', '카카오톡으로 공유')}
        </button>
      </section>
    </div>
  );
}

export function Settings() {
  const { L, s, actions, update } = useStore();
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="screen">
      <div className="screen-head"><h1 className="h1">{L('Settings', '설정')}</h1></div>
      <section>
        <SecHead title={L('Display', '화면')} />
        <div className="list">
          <div className="row">
            <div className="row-body"><b>{L('Language', '언어')}</b></div>
            <div className="seg seg-sm">
              <button className={s.lang === 'en' ? 'on' : ''} onClick={() => actions.setLang('en')}>English</button>
              <button className={s.lang === 'kr' ? 'on' : ''} onClick={() => actions.setLang('kr')}>한국어</button>
            </div>
          </div>
          <div className="row">
            <div className="row-body"><b>{L('Theme', '테마')}</b></div>
            <div className="seg seg-sm">
              {[['system', 'Auto', '자동'], ['light', 'Light', '라이트'], ['dark', 'Dark', '다크']].map(([id, en, kr]) => (
                <button key={id} className={s.settings.theme === id ? 'on' : ''} onClick={() => actions.setSetting('theme', id)}>{L(en, kr)}</button>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="row-body"><b>{L('Beginner tips', '초보자 팁')}</b><span>{L('Explain prices on market cards', '마켓 카드에 가격 설명 표시')}</span></div>
            <Toggle id="beginner" label="Beginner tips" on={s.settings.beginner} onChange={(v) => actions.setSetting('beginner', v)} />
          </div>
        </div>
      </section>
      <section>
        <SecHead title={L('Notifications', '알림')} />
        <div className="list">
          {[['moves', 'Big moves on markets I follow', '팔로우한 마켓 급등락'], ['games', 'Game starts and live rooms', '경기 시작 및 라이브 룸'], ['replies', 'Replies and mentions', '답글 및 멘션'], ['streak', 'Streak reminder at 6 PM', '오후 6시 연속 기록 알림']].map(([k, en, kr]) => (
            <div key={k} className="row">
              <div className="row-body"><b>{L(en, kr)}</b></div>
              <Toggle id={`n-${k}`} label={L(en, kr)} on={s.settings.notify[k]} onChange={(v) => actions.setNotify(k, v)} />
            </div>
          ))}
        </div>
      </section>
      <section>
        <SecHead title={L('Interests', '관심사')} />
        <div className="chips chips-wrap">
          {interests.map((i) => {
            const on = s.profile.interests.includes(i.id);
            return <button key={i.id} className={`chip ${on ? 'on' : ''}`} onClick={() => update((d) => { const a = d.profile.interests; const x = a.indexOf(i.id); if (x >= 0) a.splice(x, 1); else a.push(i.id); })}>{L(i)}</button>;
          })}
        </div>
      </section>
      <section>
        <SecHead title={L('City', '지역')} />
        <div className="chips chips-wrap">
          {cities.map((c) => <button key={c.id} className={`chip ${s.profile.city === c.id ? 'on' : ''}`} onClick={() => update((d) => { d.profile.city = c.id; })}>{L(c)}</button>)}
        </div>
      </section>
      <section>
        <SecHead title={L('Responsible play', '책임감 있는 이용')} />
        <div className="explain">
          <p>{L('Picks on Hanpan are free and use points only. If you trade on Kalshi, set a monthly limit and only use money you can afford to lose. Need to talk? National Problem Gambling Helpline: 1-800-GAMBLER (24/7).', '한판 픽은 무료이며 포인트만 사용합니다. 칼시에서 거래한다면 월 한도를 정하고 잃어도 되는 돈만 사용하세요. 상담이 필요하면: 전국 문제성 도박 상담전화 1-800-GAMBLER (24시간).')}</p>
        </div>
      </section>
      <section>
        <SecHead title={L('Account', '계정')} />
        {confirm ? (
          <div className="confirm">
            <p>{L('This erases your points, picks, streak and posts on this device.', '이 기기의 포인트, 픽, 연속 기록, 게시글이 모두 삭제됩니다.')}</p>
            <div className="suggest-row">
              <button className="btn btn-ghost" onClick={() => setConfirm(false)}>{L('Cancel', '취소')}</button>
              <button className="btn btn-danger" onClick={actions.reset}>{L('Erase and start over', '삭제 후 다시 시작')}</button>
            </div>
          </div>
        ) : <button className="btn btn-ghost btn-block" onClick={() => setConfirm(true)}>{L('Reset account', '계정 초기화')}</button>}
      </section>
      <p className="fine">{L('Hanpan is not affiliated with Kalshi. Hanpan does not hold customer funds, execute trades on anyone’s behalf, or charge per-trade fees. Advertisers shown are independent businesses.', '한판은 칼시와 제휴 관계가 아닙니다. 한판은 고객 자금을 보관하거나 대리 거래를 하거나 거래 수수료를 받지 않습니다. 표시된 광고주는 독립 업체입니다.')}</p>
    </div>
  );
}
