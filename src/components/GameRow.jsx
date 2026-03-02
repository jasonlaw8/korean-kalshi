'use client';

import { useApp } from '@/context/AppContext';

function OddsButton({ odds, label, sub, gameId, betType, pick, isSelected }) {
  const { theme, addBet, removeBet, betSlip, text } = useApp();

  const selected = betSlip.find(
    (b) => b.gameId === gameId && b.betType === betType && b.pick === pick
  );

  const handleClick = (e) => {
    e.stopPropagation();
    if (selected) {
      removeBet(selected.id);
    } else {
      addBet({ gameId, betType, pick, odds, label });
    }
  };

  return (
    <button
      className="odds-btn"
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 4px',
        minWidth: 70,
        borderRadius: 8,
        border: `1px solid ${selected ? theme.accent : theme.border}`,
        background: selected ? theme.accent + '20' : theme.bg,
        cursor: 'pointer',
        gap: 2,
        fontFamily: 'inherit',
      }}
    >
      {sub && (
        <span style={{ fontSize: 10, color: theme.textMuted, fontFamily: 'var(--font-mono), monospace' }}>
          {sub}
        </span>
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: selected ? theme.accent : '#fff',
          fontFamily: 'var(--font-mono), monospace',
        }}
      >
        {odds}
      </span>
    </button>
  );
}

export default function GameRow({ game, index }) {
  const { text, textBoth, t, theme } = useApp();

  const homeBoth = textBoth(game.home);
  const awayBoth = textBoth(game.away);

  return (
    <div
      className="card-enter"
      style={{
        animationDelay: `${index * 0.05}s`,
        animationFillMode: 'backwards',
        background: theme.cardBg,
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        padding: '14px 16px',
        marginBottom: 8,
        position: 'relative',
      }}
    >
      {/* Korean player callout */}
      {game.koreanPlayer && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 10,
            padding: '4px 10px',
            borderRadius: 8,
            background: 'linear-gradient(90deg, #FFD70020, transparent)',
            borderLeft: '3px solid #FFD700',
            fontSize: 12,
            fontWeight: 600,
            color: '#FFD700',
          }}
        >
          <span>&#127472;&#127479;</span>
          <span>{text(game.koreanPlayer.name)}</span>
          <span style={{ color: theme.textMuted, fontWeight: 400 }}>{t('starting')}</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Teams + Time */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Live badge or time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {game.isLive ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div
                  className="live-pulse"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: theme.live,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: theme.live,
                    fontFamily: 'var(--font-mono), monospace',
                  }}
                >
                  {t('live')}
                </span>
                {game.liveScore && (
                  <span
                    style={{
                      fontSize: 11,
                      color: theme.textSecondary,
                      fontFamily: 'var(--font-mono), monospace',
                      marginLeft: 4,
                    }}
                  >
                    {game.liveScore.inning || game.liveScore.minute || game.liveScore.game}
                  </span>
                )}
              </div>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  color: theme.textSecondary,
                  fontFamily: 'var(--font-mono), monospace',
                }}
              >
                {game.time}
              </span>
            )}
          </div>

          {/* Home team */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{homeBoth.primary}</span>
            <span style={{ fontSize: 11, color: theme.textMuted }}>{homeBoth.secondary}</span>
            {game.isLive && game.liveScore && (
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  marginLeft: 'auto',
                }}
              >
                {game.liveScore.home}
              </span>
            )}
          </div>

          {/* Away team */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{awayBoth.primary}</span>
            <span style={{ fontSize: 11, color: theme.textMuted }}>{awayBoth.secondary}</span>
            {game.isLive && game.liveScore && (
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#fff',
                  marginLeft: 'auto',
                }}
              >
                {game.liveScore.away}
              </span>
            )}
          </div>
        </div>

        {/* Odds columns */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {/* Spread */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OddsButton
              odds={game.spread.home.odds}
              sub={game.spread.home.line}
              gameId={game.id}
              betType="spread"
              pick="home"
            />
            <OddsButton
              odds={game.spread.away.odds}
              sub={game.spread.away.line}
              gameId={game.id}
              betType="spread"
              pick="away"
            />
          </div>

          {/* Moneyline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OddsButton
              odds={game.moneyline.home}
              gameId={game.id}
              betType="moneyline"
              pick="home"
            />
            <OddsButton
              odds={game.moneyline.away}
              gameId={game.id}
              betType="moneyline"
              pick="away"
            />
          </div>

          {/* Total */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OddsButton
              odds={game.total.over.odds}
              sub={`O ${game.total.over.line}`}
              gameId={game.id}
              betType="total"
              pick="over"
            />
            <OddsButton
              odds={game.total.under.odds}
              sub={`U ${game.total.under.line}`}
              gameId={game.id}
              betType="total"
              pick="under"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
