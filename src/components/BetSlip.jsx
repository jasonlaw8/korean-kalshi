'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import games from '@/data/games';

function oddsToDecimal(american) {
  const num = parseInt(american, 10);
  if (num > 0) return 1 + num / 100;
  return 1 + 100 / Math.abs(num);
}

function formatPayout(decimal, stake) {
  return (decimal * stake).toFixed(0);
}

export default function BetSlip({ onClose }) {
  const { t, text, theme, betSlip, removeBet, clearBets, updateStake } = useApp();
  const [confirmed, setConfirmed] = useState(false);

  const parlayOdds = useMemo(() => {
    if (betSlip.length < 2) return null;
    return betSlip.reduce((acc, bet) => acc * oddsToDecimal(bet.odds), 1);
  }, [betSlip]);

  const totalStake = useMemo(
    () => betSlip.reduce((acc, bet) => acc + bet.stake, 0),
    [betSlip]
  );

  const handlePlaceBet = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      clearBets();
      onClose?.();
    }, 2000);
  };

  // Get game info for a bet
  const getGameInfo = (bet) => {
    const game = games.find((g) => g.id === bet.gameId);
    if (!game) return { teams: '', detail: '' };
    return {
      home: text(game.home),
      away: text(game.away),
      league: game.league,
    };
  };

  return (
    <div
      style={{
        background: theme.cardBg,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{t('betSlip')}</span>
          {betSlip.length > 0 && (
            <span
              style={{
                background: theme.accent,
                color: '#000',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 10,
                fontFamily: 'var(--font-mono), monospace',
              }}
            >
              {betSlip.length}
            </span>
          )}
        </div>
        {betSlip.length > 0 && (
          <button
            onClick={clearBets}
            style={{
              background: 'none',
              border: 'none',
              color: theme.textSecondary,
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {t('clearAll')}
          </button>
        )}
      </div>

      {/* Bet list */}
      <div style={{ padding: '8px 16px', maxHeight: 400, overflowY: 'auto' }}>
        {betSlip.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.3 }}>&#127936;</div>
            <div style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 4 }}>{t('noBets')}</div>
            <div style={{ fontSize: 12, color: theme.textMuted }}>{t('addBetsHint')}</div>
          </div>
        ) : confirmed ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>&#10003;</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: theme.accent }}>{t('betPlaced')}</div>
          </div>
        ) : (
          betSlip.map((bet) => {
            const info = getGameInfo(bet);
            const decimal = oddsToDecimal(bet.odds);
            const toWin = formatPayout(decimal, bet.stake) - bet.stake;

            return (
              <div
                key={bet.id}
                className="bet-added"
                style={{
                  padding: '12px 0',
                  borderBottom: `1px solid ${theme.border}`,
                }}
              >
                {/* Bet info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 2, textTransform: 'uppercase', fontFamily: 'var(--font-mono), monospace' }}>
                      {t(info.league)} &middot; {t(bet.betType)}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
                      {info.home} vs {info.away}
                    </div>
                    <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>
                      {bet.pick === 'home' ? info.home : bet.pick === 'away' ? info.away : bet.pick.toUpperCase()}{' '}
                      <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: theme.accent }}>
                        {bet.odds}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeBet(bet.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme.textMuted,
                      cursor: 'pointer',
                      fontSize: 16,
                      lineHeight: 1,
                      padding: '0 0 0 8px',
                    }}
                  >
                    &times;
                  </button>
                </div>

                {/* Stake input */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      background: theme.bg,
                      borderRadius: 8,
                      padding: '6px 10px',
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <span style={{ fontSize: 12, color: theme.textMuted, marginRight: 4 }}>&#8361;</span>
                    <input
                      type="number"
                      value={bet.stake}
                      onChange={(e) => updateStake(bet.id, Number(e.target.value))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 13,
                        fontWeight: 600,
                        width: '100%',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: theme.textSecondary, whiteSpace: 'nowrap' }}>
                    {t('toWin')}{' '}
                    <span style={{ color: theme.accent, fontFamily: 'var(--font-mono), monospace', fontWeight: 700 }}>
                      &#8361;{toWin > 0 ? toWin.toFixed(0) : 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer with parlay info + place bet */}
      {betSlip.length > 0 && !confirmed && (
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${theme.border}` }}>
          {/* Parlay info */}
          {parlayOdds && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                padding: '8px 12px',
                borderRadius: 8,
                background: theme.accent + '10',
                border: `1px solid ${theme.accent}20`,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: theme.accent }}>{t('parlay')}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 14,
                  fontWeight: 700,
                  color: theme.accent,
                }}
              >
                {parlayOdds.toFixed(2)}x
              </span>
            </div>
          )}

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: theme.textSecondary }}>{t('totalStake')}</span>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: '#fff' }}>
              &#8361;{totalStake.toLocaleString()}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 13 }}>
            <span style={{ color: theme.textSecondary }}>{t('totalPayout')}</span>
            <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 700, color: theme.accent, fontSize: 16 }}>
              &#8361;
              {parlayOdds
                ? (totalStake * parlayOdds).toFixed(0)
                : betSlip
                    .reduce((acc, b) => acc + oddsToDecimal(b.odds) * b.stake, 0)
                    .toFixed(0)}
            </span>
          </div>

          {/* Place Bet button */}
          <button
            onClick={handlePlaceBet}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 12,
              border: 'none',
              background: theme.accent,
              color: '#000',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            {t('placeBet')}
          </button>
        </div>
      )}
    </div>
  );
}
