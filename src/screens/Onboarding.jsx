'use client';

import { useState } from 'react';
import { useStore, WELCOME_BONUS } from '../lib/store';
import { Icon, Logo } from '../components/ui';
import { cities, interests, athletes } from '../data/content';

export const IS_DEMO = !!process.env.NEXT_PUBLIC_DEMO;

export function DemoNote() {
  const { L } = useStore();
  return (
    <p className="demo-ribbon">
      <b>{L('Product demo', '제품 데모')}</b> · {L('Sample data. Nothing here is real money, and your activity stays on this device.', '샘플 데이터입니다. 실제 돈은 오가지 않으며 활동 기록은 이 기기에만 저장됩니다.')}
    </p>
  );
}

export default function Onboarding() {
  const { L, s, actions, update } = useStore();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [city, setCity] = useState('la');
  const [picked, setPicked] = useState(['mlb', 'won']);
  const [follow, setFollow] = useState(['son']);
  const [over18, setOver18] = useState(null);
  const [ref, setRef] = useState(() => {
    try { return (new URLSearchParams(window.location.search).get('ref') || '').toUpperCase(); } catch { return ''; }
  });

  const autoHandle = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 18);
  const steps = 5;
  const canNext = [true, name.trim().length > 1 && handle.length > 2, !!city, picked.length > 0, over18 != null][step];

  const finish = () => {
    update((d) => { d.follows.athletes = follow; });
    actions.finishOnboarding({ name: name.trim(), handle, city, interests: picked, over18, ref: ref.trim() });
  };

  return (
    <div className="onb">
      {step > 0 && (
        <div className="onb-top">
          <button className="icon-btn" onClick={() => setStep(step - 1)} aria-label={L('Back', '뒤로')}><Icon name="back" /></button>
          <div className="onb-progress"><i style={{ width: `${(step / (steps - 1)) * 100}%` }} /></div>
          <span className="muted-sm">{step}/{steps - 1}</span>
        </div>
      )}

      {step === 0 && (
        <div className="onb-hero">
          {IS_DEMO && <DemoNote />}
          <Logo size={34} />
          <h1 className="onb-title">{L('Your people. Your teams. Your calls.', '우리 사람들. 우리 팀. 우리의 예측.')}</h1>
          <p className="lead">{L('The Korean-American home for sports, money and culture. Follow Korean athletes, track the won, watch games together, and prove you called it.', '스포츠, 재테크, 문화를 위한 한인 커뮤니티. 한국 선수 응원, 환율 체크, 함께 경기 보기, 그리고 예측 실력 증명까지.')}</p>
          <ul className="onb-points">
            <li><Icon name="picks" size={18} /> {L('Free daily picks with points, streaks and weekly leagues', '포인트, 연속 기록, 주간 리그가 있는 무료 데일리 픽')}</li>
            <li><Icon name="won" size={18} /> {L('Won/dollar tracker with alerts for sending money home', '송금을 위한 환율 추적과 알림')}</li>
            <li><Icon name="community" size={18} /> {L('Live game rooms, city groups and local perks', '라이브 경기 룸, 지역 그룹, 동네 혜택')}</li>
          </ul>
          <div className="onb-lang">
            <span className="muted-sm">{L('Language', '언어')}</span>
            <div className="seg">
              <button className={s.lang === 'en' ? 'on' : ''} onClick={() => actions.setLang('en')}>English</button>
              <button className={s.lang === 'kr' ? 'on' : ''} onClick={() => actions.setLang('kr')}>한국어</button>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="onb-step">
          <h2 className="onb-h">{L('What should we call you?', '어떻게 불러드릴까요?')}</h2>
          <label className="field-block">
            <span>{L('Name', '이름')}</span>
            <input id="onb-name" autoFocus value={name} onChange={(e) => { setName(e.target.value); if (!handle || handle === autoHandle(name)) setHandle(autoHandle(e.target.value)); }} placeholder={L('e.g. Daniel Park', '예: 박다니엘')} />
          </label>
          <label className="field-block">
            <span>{L('Username', '사용자 이름')}</span>
            <div className="field-prefix"><b>@</b><input id="onb-handle" value={handle} onChange={(e) => setHandle(autoHandle(e.target.value))} placeholder="dpark_la" /></div>
          </label>
          <p className="fine">{L('Shown on leaderboards and posts. You can use Korean or English for your name.', '리더보드와 게시글에 표시됩니다. 이름은 한글 또는 영어 모두 가능해요.')}</p>
        </div>
      )}

      {step === 2 && (
        <div className="onb-step">
          <h2 className="onb-h">{L('Where are you based?', '어디에 사세요?')}</h2>
          <p className="sub">{L('We’ll put you in your city group and show local watch parties and perks.', '지역 그룹에 자동 가입되고 동네 관람 모임과 혜택을 보여드려요.')}</p>
          <div className="choice-list">
            {cities.map((c) => (
              <button key={c.id} className={`choice ${city === c.id ? 'on' : ''}`} onClick={() => setCity(c.id)} aria-pressed={city === c.id}>
                <Icon name="pin" size={18} /> <span>{L(c)}</span> {city === c.id && <Icon name="check" size={18} stroke={2.6} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="onb-step">
          <h2 className="onb-h">{L('What do you follow?', '무엇에 관심 있으세요?')}</h2>
          <div className="chips chips-wrap">
            {interests.map((i) => {
              const on = picked.includes(i.id);
              return <button key={i.id} className={`chip ${on ? 'on' : ''}`} onClick={() => setPicked(on ? picked.filter((x) => x !== i.id) : [...picked, i.id])} aria-pressed={on}>{on && <Icon name="check" size={13} stroke={2.6} />} {L(i)}</button>;
            })}
          </div>
          <h3 className="h3" style={{ marginTop: 18 }}>{L('Follow Korean athletes', '한국 선수 팔로우')}</h3>
          <div className="chips chips-wrap">
            {athletes.slice(0, 7).map((a) => {
              const on = follow.includes(a.id);
              return <button key={a.id} className={`chip ${on ? 'on' : ''}`} onClick={() => setFollow(on ? follow.filter((x) => x !== a.id) : [...follow, a.id])} aria-pressed={on}>{on && <Icon name="check" size={13} stroke={2.6} />} {L(a.name)}</button>;
            })}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="onb-step">
          <h2 className="onb-h">{L('One last thing', '마지막으로')}</h2>
          <div className="how">
            <div><Icon name="picks" size={20} /><p><b>{L('Picks use free points.', '픽은 무료 포인트로.')}</b> {L('No money, ever. Points can’t be bought or cashed out.', '돈은 전혀 들지 않아요. 포인트는 구매하거나 현금화할 수 없습니다.')}</p></div>
            <div><Icon name="shield" size={20} /><p><b>{L('Real-money trading happens on Kalshi.', '실제 거래는 칼시에서.')}</b> {L('A CFTC-regulated exchange. We link you there; we never hold your money.', 'CFTC 규제 거래소입니다. 링크만 연결하며 자금은 보관하지 않습니다.')}</p></div>
          </div>
          <p className="lead">{L('Are you 18 or older?', '만 18세 이상인가요?')}</p>
          <div className="seg">
            <button className={over18 === true ? 'on' : ''} onClick={() => setOver18(true)}>{L('Yes, 18+', '네, 18세 이상')}</button>
            <button className={over18 === false ? 'on' : ''} onClick={() => setOver18(false)}>{L('Under 18', '18세 미만')}</button>
          </div>
          {over18 === false && <p className="fine">{L('You can use picks, community and tools. Links to Kalshi stay off.', '픽, 커뮤니티, 도구는 이용 가능하며 칼시 링크는 꺼집니다.')}</p>}
          <label className="field-block">
            <span>{L('Invite code (optional)', '초대 코드 (선택)')}</span>
            <input id="onb-ref" value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} placeholder="GRACEK-250" />
          </label>
        </div>
      )}

      <div className="onb-foot">
        {step < steps - 1 ? (
          <button className="btn btn-ink btn-block" disabled={!canNext} onClick={() => setStep(step + 1)}>
            {step === 0 ? L('Get started', '시작하기') : L('Continue', '계속')}
          </button>
        ) : (
          <button className="btn btn-accent btn-block" disabled={!canNext} onClick={finish}>
            <Icon name="gift" size={18} /> {L(`Claim ${WELCOME_BONUS.toLocaleString()} welcome points`, `가입 포인트 ${WELCOME_BONUS.toLocaleString()} 받기`)}
          </button>
        )}
      </div>
    </div>
  );
}
