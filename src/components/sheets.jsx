'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../lib/store';
import { Icon, Sheet } from './ui';
import { advertisers } from '../data/ads';
import { markets, krw } from '../data/content';
import { priceNow, drift, fmt } from '../lib/time';

const Ctx = createContext(() => {});
export const useSheet = () => useContext(Ctx);

export function SheetHost({ children }) {
  const [sheet, setSheet] = useState(null);
  const open = useCallback((type, props = {}) => setSheet({ type, ...props }), []);
  const close = useCallback(() => setSheet(null), []);
  const C = sheet && { ad: AdSheet, trade: TradeSheet, alert: AlertSheet, results: ResultsSheet, code: CodeSheet }[sheet.type];
  return (
    <Ctx.Provider value={open}>
      {children}
      {C && createPortal(<C {...sheet} close={close} />, document.getElementById('sheet-root') || document.body)}
    </Ctx.Provider>
  );
}

function AdSheet({ id, close }) {
  const { L, notify } = useStore();
  const a = advertisers[id];
  const [why, setWhy] = useState(false);
  return (
    <Sheet onClose={close} title={L('Sponsored', '광고')}>
      <div className="ad-detail">
        <div className="ad-detail-head">
          <span className="ad-mark lg" style={{ background: a.color }}>{a.mark}</span>
          <div><b>{a.name}</b><span>{L(a.kind)}</span></div>
        </div>
        <h3 className="msheet-title">{L(a.headline)}</h3>
        <p className="lead">{L(a.body)}</p>
        {a.code && (
          <button className="code-box" onClick={async () => {
            try { await navigator.clipboard.writeText(a.code); notify(L('Code copied', '코드 복사됨')); } catch { notify(a.code); }
          }}>
            <span>{L('Hanpan member code', '한판 회원 코드')}</span>
            <b>{a.code}</b>
            <Icon name="copy" size={16} />
          </button>
        )}
        <button className="btn btn-block" style={{ background: a.color, color: '#fff' }} onClick={() => { notify(L(`Opening ${a.name}…`, `${a.name}로 이동 중…`)); close(); }}>
          {L(a.cta)} <Icon name="ext" size={16} />
        </button>
        <button className="link link-sm" onClick={() => setWhy(!why)}><Icon name="info" size={13} /> {L('Why am I seeing this?', '이 광고가 보이는 이유')}</button>
        {why && <p className="fine">{L('Ads on Hanpan are matched to the page you’re on, not to your personal data. Hanpan Plus members can turn display ads off; perks stay.', '한판 광고는 개인 정보가 아닌 보고 계신 페이지 내용에 맞춰 표시됩니다. 한판 플러스 회원은 광고를 끌 수 있으며 혜택은 유지됩니다.')}</p>}
      </div>
    </Sheet>
  );
}

function TradeSheet({ id, close }) {
  const { L, s } = useStore();
  const m = markets.find((x) => x.id === id);
  return (
    <Sheet onClose={close} title={L('Trade on Kalshi', '칼시에서 거래')}>
      <div className="handoff">
        <div className="handoff-flow"><span className="hf-node">한판</span><span className="hf-line" /><span className="hf-node hf-k">Kalshi</span></div>
        <p className="handoff-q">{L(m.title)}</p>
        <ul className="checks">
          <li><Icon name="check" size={16} stroke={2.6} /> {L('You trade on Kalshi, a CFTC-regulated US exchange.', 'CFTC 규제를 받는 미국 거래소 칼시에서 거래합니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Kalshi verifies your ID and holds your money. Hanpan never does.', '신분 확인과 자금 보관은 칼시가 합니다. 한판은 하지 않습니다.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('18+ and US residents only. Some markets aren’t available in every state.', '18세 이상 미국 거주자만. 일부 마켓은 주에 따라 이용 불가.')}</li>
          <li><Icon name="check" size={16} stroke={2.6} /> {L('Hanpan may earn a referral fee if you open an account.', '계정 개설 시 한판이 추천 수수료를 받을 수 있습니다.')}</li>
        </ul>
        {s.profile.over18 ? (
          <a className="btn btn-ink btn-block" href={`https://kalshi.com/?utm_source=hanpan&utm_campaign=${m.id}`} target="_blank" rel="noopener noreferrer" onClick={close}>
            {L('Open Kalshi', '칼시 열기')} <Icon name="ext" size={16} />
          </a>
        ) : (
          <p className="warn">{L('You told us you’re under 18, so trading links are off. Free picks are still open to you.', '18세 미만으로 등록되어 거래 링크가 꺼져 있습니다. 무료 픽은 계속 이용할 수 있어요.')}</p>
        )}
        <p className="fine">{L('Only trade what you can afford to lose. Not financial advice.', '잃어도 되는 금액만 거래하세요. 투자 조언이 아닙니다.')}</p>
      </div>
    </Sheet>
  );
}

function AlertSheet({ id, close }) {
  const { L, s, actions, notify } = useStore();
  const isKrw = id === 'krw';
  const m = !isKrw && markets.find((x) => x.id === id);
  const cur = isKrw ? Math.round(drift('krw', krw.base, 6) * 100) / 100 : priceNow(m);
  const existing = s.alerts[id];
  const [dir, setDir] = useState(existing?.dir || 'above');
  const [value, setValue] = useState(String(existing?.value ?? (isKrw ? Math.round(cur + 5) : Math.min(99, cur + 5))));
  return (
    <Sheet onClose={close} title={L('Price alert', '가격 알림')}>
      <div className="stack">
        <p className="lead">{isKrw ? L('USD/KRW', '원/달러 환율') : L(m.title)}</p>
        <p className="muted-sm">{L('Now', '현재')}: <b className="num">{isKrw ? `₩${cur.toFixed(2)}` : `${cur}%`}</b></p>
        <div className="seg">
          <button className={dir === 'above' ? 'on' : ''} onClick={() => setDir('above')}>{L('Goes above', '이상일 때')}</button>
          <button className={dir === 'below' ? 'on' : ''} onClick={() => setDir('below')}>{L('Goes below', '이하일 때')}</button>
        </div>
        <label className="field">
          <span>{isKrw ? '₩' : '%'}</span>
          <input id="alert-value" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))} />
        </label>
        <button className="btn btn-accent btn-block" disabled={!value} onClick={() => {
          actions.setAlert(id, { dir, value: Number(value), at: Date.now() });
          notify(L('Alert saved. We’ll notify you here.', '알림 저장됨. 앱에서 알려드릴게요.'));
          close();
        }}>{L('Save alert', '알림 저장')}</button>
        {existing && <button className="btn btn-ghost btn-block" onClick={() => { actions.setAlert(id, null); close(); }}>{L('Remove alert', '알림 삭제')}</button>}
      </div>
    </Sheet>
  );
}

function ResultsSheet({ close }) {
  const { L, s, actions } = useStore();
  const keys = s.pendingResults;
  const ps = keys.map((k) => s.picks[k]).filter(Boolean);
  const won = ps.filter((p) => p.status === 'won');
  const total = won.reduce((a, p) => a + p.payout, 0);
  const a = advertisers.gogi;
  const done = () => { actions.seenResults(); close(); };
  return (
    <Sheet onClose={done} title={L('Your results', '결과 발표')}>
      <div className="results">
        <div className="results-score">
          <span className="results-big">{won.length}/{ps.length}</span>
          <span>{L('correct', '적중')}</span>
          {total > 0 && <b className="results-pts">+{fmt(total)} pts</b>}
        </div>
        <div className="list">
          {ps.map((p, i) => (
            <div key={i} className="row">
              <span className={`result ${p.status === 'won' ? 'won' : 'lost'}`}><Icon name={p.status === 'won' ? 'check' : 'x'} size={14} stroke={2.6} /></span>
              <div className="row-body"><b>{L(p.label)}</b><span>{L('You picked', '선택')}: {L(p.sideLabel)}</span></div>
              <span className={`pts-delta ${p.status === 'won' ? 'won' : 'lost'}`}>{p.status === 'won' ? `+${p.payout}` : `−${p.stake}`}</span>
            </div>
          ))}
        </div>
        <div className="sponsor-strip">
          <span className="ad-label">{L('Sponsored', '광고')}</span>
          <span><b>{a.name}</b> · {L('Celebrate a good night: 15% off with code', '좋은 결과 축하: 코드 입력 시 15% 할인')} {a.code}</span>
        </div>
        <button className="btn btn-accent btn-block" onClick={done}>{L('Nice', '좋아요')}</button>
      </div>
    </Sheet>
  );
}

function CodeSheet({ perk, code, close }) {
  const { L, notify } = useStore();
  const a = advertisers[perk.ad];
  return (
    <Sheet onClose={close} title={L('Your perk', '내 혜택')}>
      <div className="stack">
        <div className="ad-detail-head">
          <span className="ad-mark lg" style={{ background: a.color }}>{a.mark}</span>
          <div><b>{a.name}</b><span>{L(perk.title)}</span></div>
        </div>
        <button className="code-box big" onClick={async () => { try { await navigator.clipboard.writeText(code); notify(L('Code copied', '코드 복사됨')); } catch { notify(code); } }}>
          <span>{L('Show this at checkout', '결제 시 보여주세요')}</span>
          <b>{code}</b>
          <Icon name="copy" size={16} />
        </button>
        <p className="fine">{L('Valid 30 days. One per member. Offered and fulfilled by the business above; points have no cash value.', '30일간 유효. 회원당 1회. 위 업체가 제공 및 이행하며 포인트는 현금 가치가 없습니다.')}</p>
      </div>
    </Sheet>
  );
}
