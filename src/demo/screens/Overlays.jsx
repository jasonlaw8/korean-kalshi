import { useEffect, useRef, useState } from 'react';
import { useApp, useL, Icon, Avatar, Chg, Sheet, PriceChart, SrcBadge, fmt } from '../ui';
import { markets, comments, users, games, roomScript, lessons, notifications, portfolio } from '../data';

function MarketSheet({ id, side: initialSide }) {
  const L = useL();
  const { close, open, points, setPoints, picks, setPicks, notify, extraComments, setExtraComments } = useApp();
  const m = markets.find((x) => x.id === id);
  const [side, setSide] = useState(initialSide || null);
  const [stake, setStake] = useState(100);
  const [text, setText] = useState('');
  const mine = picks[m.id];
  const thread = [...(extraComments[m.id] || []), ...(comments[m.id] || comments.default)];
  const price = side === 'NO' ? 100 - m.yes : m.yes;
  const win = side ? Math.round(stake * (100 / price) - stake) : 0;

  const lock = () => {
    if (stake > points) return notify(L('Not enough points.', '포인트가 부족합니다.'));
    setPicks({ ...picks, [m.id]: { side, stake } });
    setPoints(points - stake);
    notify(L(`Picked ${side} for ${stake} pts`, `${side} 선택 · ${stake} 포인트`));
  };

  return (
    <Sheet open onClose={close} title={L(m.cat)} full>
      <div className="msheet">
        <div className="mcard-top"><SrcBadge src={m.src} /><span className="muted-sm">{L('Closes', '마감')} {L(m.closes)}</span></div>
        <h2 className="msheet-title">{L(m.title)}</h2>
        <div className="msheet-prob">
          <span className="prob-num prob-xl">{m.yes}<small>%</small></span>
          <div>
            <Chg v={m.chg} /> <span className="muted-sm">{L('this week', '이번 주')}</span>
            <div className="muted-sm">{m.src === 'kalshi' ? L(`YES ${m.yes}¢ · NO ${100 - m.yes}¢`, `YES ${m.yes}¢ · NO ${100 - m.yes}¢`) : L('Community consensus', '커뮤니티 컨센서스')}</div>
          </div>
        </div>

        <PriceChart seed={m.id} end={m.yes} chg={m.chg} />

        {m.src === 'kalshi' && (
          <div className="crowd">
            <div className="crowd-head"><b>{L('Hanpan crowd vs market', '한판 커뮤니티 vs 마켓')}</b><span className="muted-sm">{L('Free picks', '무료 픽 기준')}</span></div>
            <div className="crowd-row"><span>{L('Market', '마켓')}</span><div className="bar"><i style={{ width: `${m.yes}%` }} /></div><b>{m.yes}%</b></div>
            <div className="crowd-row"><span>{L('Crowd', '커뮤니티')}</span><div className="bar bar-crowd"><i style={{ width: `${m.crowd}%` }} /></div><b>{m.crowd}%</b></div>
            {Math.abs(m.crowd - m.yes) >= 10 && <p className="crowd-note"><Icon name="sparkle" size={14} /> {L(`Big gap: the community is ${Math.abs(m.crowd - m.yes)} points ${m.crowd > m.yes ? 'more' : 'less'} confident than traders.`, `큰 차이: 커뮤니티가 트레이더보다 ${Math.abs(m.crowd - m.yes)}%p ${m.crowd > m.yes ? '더' : '덜'} 확신하고 있어요.`)}</p>}
          </div>
        )}

        <div className="explain">
          <span className="eyebrow">{L('What this means', '쉽게 말하면')}</span>
          <p>{L(m.explain)}</p>
        </div>

        <div className="pickbox">
          <div className="pickbox-head">
            <b>{mine ? L('Your free pick', '내 무료 픽') : L('Make a free pick', '무료 픽 하기')}</b>
            <span className="muted-sm">{L('Points only', '포인트 전용')}</span>
          </div>
          {mine ? (
            <p className="mine big"><Icon name="check" size={16} stroke={2.6} /> {mine.side} · {mine.stake} pts · {L('Results update live', '결과 실시간 반영')}</p>
          ) : (
            <>
              <div className="mcard-actions">
                <button className={`yn yes ${side === 'YES' ? 'picked' : ''}`} onClick={() => setSide('YES')} aria-pressed={side === 'YES'}>{L('Yes', '예')} <b>{m.yes}%</b></button>
                <button className={`yn no ${side === 'NO' ? 'picked' : ''}`} onClick={() => setSide('NO')} aria-pressed={side === 'NO'}>{L('No', '아니오')} <b>{100 - m.yes}%</b></button>
              </div>
              <div className="stakes">
                {[100, 250, 500, 1000].map((s) => (
                  <button key={s} className={`chip ${stake === s ? 'on' : ''}`} onClick={() => setStake(s)}>{s} pts</button>
                ))}
              </div>
              <button className="btn btn-accent btn-block" disabled={!side} onClick={lock}>
                {side ? L(`Lock ${side} · win +${win} pts`, `${side} 확정 · 적중 시 +${win} 포인트`) : L('Choose Yes or No', '예 또는 아니오를 선택하세요')}
              </button>
            </>
          )}
        </div>

        <div className="msheet-ctas">
          {m.src === 'kalshi' && (
            <button className="btn btn-ink btn-block" onClick={() => open('trade', { id: m.id })}>
              {L('Trade with real money on Kalshi', '칼시에서 실제 거래하기')} <Icon name="ext" size={16} />
            </button>
          )}
          <button className="btn btn-ghost btn-block" onClick={() => open('share', { title: L(m.title), market: m.id, back: m.id })}>
            <Icon name="share" size={16} /> {L('Share to KakaoTalk', '카카오톡으로 공유')}
          </button>
        </div>

        <details className="rules">
          <summary>{L('Rules', '정산 규칙')}</summary>
          <p>{L(m.rules)}</p>
        </details>

        <div className="thread">
          <div className="sec-head"><h3 className="h3">{L('Discussion', '토론')} · {m.comments + (extraComments[m.id]?.length || 0)}</h3></div>
          <form className="reply" onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setExtraComments({ ...extraComments, [m.id]: [{ user: 'dpark_la', text: text.trim(), likes: 0, time: 'now' }, ...(extraComments[m.id] || [])] });
            setText('');
          }}>
            <Avatar id="dpark_la" size={30} />
            <input id="reply-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={L('Add to the discussion', '의견 남기기')} />
            <button className="icon-btn" type="submit" aria-label="Send"><Icon name="send" size={18} /></button>
          </form>
          {thread.map((c, i) => (
            <div key={i} className="comment">
              <Avatar id={c.user} size={30} />
              <div>
                <div className="take-who"><b>{users[c.user].name}</b> <span>· {c.time}</span></div>
                {c.verified && <div className="verified"><Icon name="shield" size={12} stroke={2.2} /> {c.verified.side} @ {c.verified.price}¢</div>}
                <p>{c.text}</p>
                <div className="take-meta"><Icon name="heart" size={12} /> {c.likes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

function TradeSheet({ id }) {
  const L = useL();
  const { open } = useApp();
  const m = markets.find((x) => x.id === id);
  return (
    <Sheet open onClose={() => open('market', { id })} title={L('Continue to Kalshi', '칼시로 이동')}>
      <div className="handoff">
        <div className="handoff-flow">
          <span className="hf-node">한판</span>
          <span className="hf-line" />
          <span className="hf-node hf-k">Kalshi</span>
        </div>
        <p className="handoff-q">{L(m.title)}</p>
        <ul className="checks">
          <li><Icon name="check" size={16} stroke={2.6} /> {L('You trade on Kalshi, a CFTC-regulated US exchange.', 'CFTC 규제를 받는 미국 거래소 칼시에서 거래합니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Kalshi verifies your ID and holds your money. Hanpan never does.', '신분 확인과 자금 보관은 칼시가 합니다. 한판은 하지 않습니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('18+ and US residents only. Some markets aren’t available in every state.', '18세 이상 미국 거주자만 가능. 일부 마켓은 주에 따라 이용 불가.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Hanpan may earn a referral fee if you open an account.', '계정을 개설하시면 한판이 추천 수수료를 받을 수 있습니다.')}</li>
        </ul>
        <a className="btn btn-ink btn-block" href="https://kalshi.com" target="_blank" rel="noopener noreferrer">
          {L('Open Kalshi', '칼시 열기')} <Icon name="ext" size={16} />
        </a>
        <p className="fine">{L('Only trade what you can afford to lose. Not financial advice.', '잃어도 되는 금액만 거래하세요. 투자 조언이 아닙니다.')}</p>
      </div>
    </Sheet>
  );
}

function ShareSheet({ title, market, back }) {
  const L = useL();
  const { open, close, notify } = useApp();
  const m = market && markets.find((x) => x.id === market);
  const done = (msg) => { notify(msg); back ? open('market', { id: back }) : close(); };
  const link = `hanpan.app/m/${market || 'post'}`;
  return (
    <Sheet open onClose={() => (back ? open('market', { id: back }) : close())} title={L('Share', '공유하기')}>
      <div className="share-card">
        <div className="share-brand">한판 Hanpan</div>
        <p>{title}</p>
        {m && <div className="share-num">{m.yes}% <span>{L('chance', '확률')}</span></div>}
        <span className="share-cta">{L('What’s your pick?', '당신의 선택은?')}</span>
      </div>
      <div className="share-grid">
        <button onClick={() => done(L('Opened KakaoTalk', '카카오톡을 열었어요'))}><span className="share-ic kakao"><Icon name="chat" size={22} fill="currentColor" stroke={0} /></span>KakaoTalk</button>
        <button onClick={() => done(L('Opened Instagram Stories', '인스타그램 스토리를 열었어요'))}><span className="share-ic insta"><Icon name="image" size={22} /></span>Instagram</button>
        <button onClick={() => done(L('Opened Messages', '메시지를 열었어요'))}><span className="share-ic sms"><Icon name="send" size={20} /></span>{L('Messages', '메시지')}</button>
        <button onClick={async () => {
          try { await navigator.clipboard.writeText('https://' + link); done(L('Link copied', '링크 복사됨')); } catch { done(link); }
        }}><span className="share-ic copy"><Icon name="link" size={20} /></span>{L('Copy link', '링크 복사')}</button>
      </div>
    </Sheet>
  );
}

function Notifications() {
  const L = useL();
  const { close } = useApp();
  return (
    <Sheet open onClose={close} title={L('Notifications', '알림')}>
      <div className="list">
        {notifications.map((n) => (
          <div key={n.id} className={`row ${n.unread ? 'unread' : ''}`}>
            <span className={`notif-ic n-${n.icon}`}><Icon name={n.icon} size={16} /></span>
            <div className="row-body"><b>{L(n)}</b><span>{n.time}</span></div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

function Room({ id }) {
  const L = useL();
  const { close, open } = useApp();
  const g = games.find((x) => x.id === id);
  const m = markets.find((x) => x.id === g.market);
  const [msgs, setMsgs] = useState(roomScript.slice(0, 3).map((r, i) => ({ ...r, k: i })));
  const [text, setText] = useState('');
  const [price, setPrice] = useState(m.yes);
  const [bursts, setBursts] = useState([]);
  const end = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    let i = 3;
    const t = setInterval(() => {
      setMsgs((ms) => [...ms.slice(-40), { ...roomScript[i % roomScript.length], k: Date.now() }]);
      if (i % 3 === 0) setPrice((p) => Math.max(2, Math.min(98, p + (Math.random() > 0.45 ? 1 : -1))));
      i++;
    }, 2600);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); }, [msgs, reduce]);

  const react = (e) => {
    const k = Date.now() + Math.random();
    setBursts((b) => [...b, { k, e, x: 20 + Math.random() * 60 }]);
    setTimeout(() => setBursts((b) => b.filter((z) => z.k !== k)), 1400);
  };

  return (
    <Sheet open onClose={close} title={L('Live room', '라이브 룸')} full>
      <div className="room">
        <div className="scoreboard">
          <span className="eyebrow eyebrow-light">{g.league} {g.status === 'live' && <span className="live-tag"><i />LIVE</span>}</span>
          {g.away ? (
            <div className="sb-teams">
              <div><span className="sb-code">{g.away}</span><span>{L(g.awayName)}</span></div>
              <div className="sb-score">{g.score ? `${g.score[1]} – ${g.score[0]}` : 'vs'}</div>
              <div><span className="sb-code">{g.home}</span><span>{L(g.homeName)}</span></div>
            </div>
          ) : <div className="sb-teams"><div className="sb-solo">{L(g.homeName)}</div></div>}
          <span className="sb-sub">{g.inning ? L(g.inning) : L(g.time)} · {fmt(g.room)} {L('watching', '시청 중')}</span>
        </div>
        <button className="room-market" onClick={() => open('market', { id: m.id })}>
          <span>{L(m.title)}</span>
          <b>{price}%</b>
        </button>
        <div className="chat" aria-live="polite">
          {msgs.map((c) => (
            <div key={c.k} className={`msg ${c.user === 'dpark_la' ? 'mine-msg' : ''}`}>
              <Avatar id={c.user} size={26} />
              <div><b>{users[c.user].name}</b><p>{c.text}</p></div>
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
          setMsgs((ms) => [...ms, { user: 'dpark_la', text: text.trim(), k: Date.now() }]);
          setText('');
        }}>
          <input id="room-input" value={text} onChange={(e) => setText(e.target.value)} placeholder={L('Say something…', '메시지 입력…')} />
          <button className="icon-btn" type="submit" aria-label="Send"><Icon name="send" size={18} /></button>
        </form>
      </div>
    </Sheet>
  );
}

function Connect() {
  const L = useL();
  const { close, connected, setConnected, notify } = useApp();
  const [step, setStep] = useState(connected ? 'done' : 'intro');
  const total = portfolio.reduce((a, p) => a + p.qty * (p.now - p.avg), 0) / 100;
  if (step === 'done') {
    return (
      <Sheet open onClose={close} title={L('Your Kalshi positions', '내 칼시 포지션')}>
        <div className="pnl">
          <span className="eyebrow">{L('Unrealized P&L · sample', '평가 손익 · 샘플')}</span>
          <div className={`pnl-num ${total >= 0 ? 'up' : 'down'}`}>{total >= 0 ? '+' : '−'}${Math.abs(total).toFixed(2)}</div>
        </div>
        <div className="list">
          {portfolio.map((p) => {
            const m = markets.find((x) => x.id === p.market);
            const d = (p.qty * (p.now - p.avg)) / 100;
            return (
              <div key={p.market} className="row">
                <div className="row-body"><b>{L(m.title)}</b><span>{p.qty} {p.side} @ {p.avg}¢ → {p.now}¢</span></div>
                <span className={`pts-delta ${d >= 0 ? 'won' : 'lost'}`}>{d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <p className="fine">{L('Read-only view of your own account. To trade, deposit or withdraw, use Kalshi.', '내 계정의 읽기 전용 화면입니다. 거래·입출금은 칼시에서 하세요.')}</p>
        <button className="btn btn-ghost btn-block" onClick={() => { setConnected(false); setStep('intro'); notify(L('Disconnected', '연결 해제됨')); }}>{L('Disconnect', '연결 해제')}</button>
      </Sheet>
    );
  }
  return (
    <Sheet open onClose={close} title={L('Connect Kalshi', '칼시 연결')}>
      <div className="handoff">
        <div className="handoff-flow"><span className="hf-node">한판</span><span className="hf-line" /><span className="hf-node hf-k">Kalshi</span></div>
        <ul className="checks">
          <li><Icon name="shield" size={16} stroke={2.2} /> {L('Read-only. Hanpan can see positions, never move money.', '읽기 전용. 한판은 포지션만 볼 수 있고 자금은 움직일 수 없습니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Earn “Verified position” badges on your posts.', '게시물에 “인증된 포지션” 배지가 붙습니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Disconnect any time.', '언제든 연결을 해제할 수 있습니다.')}</li>
        </ul>
        <button className="btn btn-ink btn-block" onClick={() => { setConnected(true); setStep('done'); notify(L('Kalshi connected (demo)', '칼시 연결됨 (데모)')); }}>
          {L('Connect (demo)', '연결하기 (데모)')}
        </button>
      </div>
    </Sheet>
  );
}

function Premium() {
  const L = useL();
  const { close, plus, setPlus, notify } = useApp();
  const feats = [
    ['sparkle', 'Crowd-vs-market gap alerts', '커뮤니티 vs 마켓 차이 알림'],
    ['bell', 'Custom price alerts on any market', '모든 마켓 맞춤 가격 알림'],
    ['trend', 'Pick history analytics and accuracy by topic', '주제별 적중률 등 픽 분석'],
    ['lock', 'Private group tools: brackets, custom contests', '비공개 그룹 도구: 브래킷, 맞춤 콘테스트'],
    ['x', 'No ads', '광고 제거'],
  ];
  return (
    <Sheet open onClose={close} title="Hanpan Plus">
      <div className="premium">
        <div className="premium-price"><b>$6.99</b><span>/{L('month', '월')}</span></div>
        <ul className="checks">
          {feats.map(([ic, en, kr]) => <li key={en}><Icon name={ic} size={16} stroke={2.2} /> {L(en, kr)}</li>)}
        </ul>
        <button className="btn btn-accent btn-block" onClick={() => { setPlus(!plus); notify(plus ? L('Plus canceled', '플러스 해지됨') : L('Welcome to Plus (demo)', '플러스 가입 완료 (데모)')); close(); }}>
          {plus ? L('Cancel Plus', '플러스 해지') : L('Start 14-day free trial', '14일 무료 체험 시작')}
        </button>
        <p className="fine">{L('Subscription unlocks app features only. It never affects picks, points or trading.', '구독은 앱 기능만 제공하며 픽, 포인트, 거래에는 영향을 주지 않습니다.')}</p>
      </div>
    </Sheet>
  );
}

function Academy({ lesson }) {
  const L = useL();
  const { close, open, lessonsDone, setLessonsDone, setPoints, points, notify } = useApp();
  if (lesson) {
    const idx = lessons.findIndex((l) => l.id === lesson);
    const l = lessons[idx];
    const next = lessons[idx + 1];
    return (
      <Sheet open onClose={() => open('academy')} title={`${L('Lesson', '강의')} ${idx + 1}/${lessons.length}`}>
        <div className="lesson">
          <h3 className="msheet-title">{L(l.title)}</h3>
          <p>{L(l.body)}</p>
          {l.id === 'l2' && (
            <div className="lesson-demo">
              <div className="bar"><i style={{ width: '62%' }} /></div>
              <span>62¢ ≈ 62%</span>
            </div>
          )}
          <button className="btn btn-accent btn-block" onClick={() => {
            if (!lessonsDone[l.id]) { setLessonsDone({ ...lessonsDone, [l.id]: true }); setPoints(points + 50); notify(L('+50 pts for finishing a lesson', '강의 완료 +50 포인트')); }
            next ? open('academy', { lesson: next.id }) : open('academy');
          }}>
            {next ? L('Done · next lesson', '완료 · 다음 강의') : L('Finish', '마치기')}
          </button>
        </div>
      </Sheet>
    );
  }
  return (
    <Sheet open onClose={close} title={L('Hanpan Academy', '한판 아카데미')}>
      <p className="sub">{L('Five short lessons in English or Korean. Earn 50 points each.', '영어 또는 한국어로 된 5개의 짧은 강의. 강의당 50 포인트.')}</p>
      <div className="list">
        {lessons.map((l, i) => (
          <button key={l.id} className="row row-btn" onClick={() => open('academy', { lesson: l.id })}>
            <span className={`result ${lessonsDone[l.id] ? 'won' : 'todo'}`}>{lessonsDone[l.id] ? <Icon name="check" size={14} stroke={2.6} /> : i + 1}</span>
            <div className="row-body"><b>{L(l.title)}</b><span>{l.min} min</span></div>
            <Icon name="chev" />
          </button>
        ))}
      </div>
    </Sheet>
  );
}

function Responsible() {
  const L = useL();
  const { close, notify } = useApp();
  const [limit, setLimit] = useState('');
  return (
    <Sheet open onClose={close} title={L('Responsible trading', '책임감 있는 거래')}>
      <div className="stack">
        <p className="sub">{L('Prediction markets involve real financial risk. Set limits that work for you.', '예측 시장에는 실제 재정적 위험이 따릅니다. 나에게 맞는 한도를 정하세요.')}</p>
        <form className="suggest-row" onSubmit={(e) => { e.preventDefault(); notify(L('Reminder set. We’ll nudge you before you pass it.', '알림 설정 완료. 한도에 가까워지면 알려드려요.')); }}>
          <input id="limit-input" inputMode="numeric" value={limit} onChange={(e) => setLimit(e.target.value.replace(/\D/g, ''))} placeholder={L('Monthly limit reminder ($)', '월 한도 알림 ($)')} />
          <button className="btn btn-ink" type="submit">{L('Save', '저장')}</button>
        </form>
        <button className="btn btn-ghost btn-block" onClick={() => notify(L('Trading links hidden for 30 days', '30일간 거래 링크 숨김'))}>{L('Take a 30-day break from trading links', '30일간 거래 링크 숨기기')}</button>
        <div className="explain">
          <span className="eyebrow">{L('Need to talk?', '상담이 필요하신가요?')}</span>
          <p>{L('National Problem Gambling Helpline: 1-800-GAMBLER (24/7). Korean-language support is available through many state programs.', '전국 문제성 도박 상담전화: 1-800-GAMBLER (24시간). 여러 주 프로그램에서 한국어 상담을 제공합니다.')}</p>
        </div>
      </div>
    </Sheet>
  );
}

export default function Overlays({ overlay }) {
  if (!overlay) return null;
  const { type, ...p } = overlay;
  const C = { market: MarketSheet, trade: TradeSheet, share: ShareSheet, notifications: Notifications, room: Room, connect: Connect, premium: Premium, academy: Academy, responsible: Responsible }[type];
  return C ? <C key={type + JSON.stringify(p)} {...p} /> : null;
}
