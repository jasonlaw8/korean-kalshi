'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import games from '@/data/games';
import GameRow from './GameRow';
import BetSlip from './BetSlip';
import PromoBanner from './PromoBanner';

const leagues = ['all', 'kbo', 'kleague', 'kbl', 'lck', 'mlb', 'epl'];

export default function SportsMode() {
  const { t, theme, betSlip } = useApp();
  const [activeLeague, setActiveLeague] = useState('all');
  const [showMobileBetSlip, setShowMobileBetSlip] = useState(false);

  const filtered = useMemo(() => {
    if (activeLeague === 'all') return games;
    return games.filter((g) => g.league === activeLeague);
  }, [activeLeague]);

  // Group games by league
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((game) => {
      if (!groups[game.league]) groups[game.league] = [];
      groups[game.league].push(game);
    });
    return groups;
  }, [filtered]);

  return (
    <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto', padding: '0 20px', gap: 20 }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0, padding: '24px 0' }}>
        <PromoBanner />

        {/* Odds column headers */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 6,
            marginBottom: 12,
            paddingRight: 0,
          }}
        >
          {['spread', 'moneyline', 'total'].map((col) => (
            <div
              key={col}
              style={{
                width: 70,
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 700,
                color: theme.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {t(col)}
            </div>
          ))}
        </div>

        {/* League filter tabs */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 20,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none',
          }}
        >
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setActiveLeague(league)}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: `1px solid ${activeLeague === league ? theme.accent : theme.border}`,
                background: activeLeague === league ? theme.accent + '15' : 'transparent',
                color: activeLeague === league ? theme.accent : theme.textSecondary,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: 'var(--font-mono), monospace',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                flexShrink: 0,
              }}
            >
              {league === 'all' ? t('all') : t(league)}
            </button>
          ))}
        </div>

        {/* Games grouped by league */}
        {Object.entries(grouped).map(([league, leagueGames]) => (
          <div key={league} style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: theme.accent,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 10,
                fontFamily: 'var(--font-mono), monospace',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {t(league)}
              {leagueGames.some((g) => g.isLive) && (
                <span
                  className="live-pulse"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: theme.live,
                    display: 'inline-block',
                  }}
                />
              )}
            </div>
            {leagueGames.map((game, i) => (
              <GameRow key={game.id} game={game} index={i} />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Bet Slip Sidebar */}
      <div
        style={{
          width: 340,
          flexShrink: 0,
          paddingTop: 24,
          position: 'sticky',
          top: 100,
          height: 'fit-content',
          maxHeight: 'calc(100vh - 140px)',
          overflowY: 'auto',
        }}
        className="desktop-betslip"
      >
        <BetSlip />
      </div>

      {/* Mobile FAB for bet slip */}
      {betSlip.length > 0 && (
        <button
          onClick={() => setShowMobileBetSlip(true)}
          className="mobile-betslip-fab"
          style={{
            display: 'none', // shown via CSS on mobile
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: '50%',
            border: 'none',
            background: theme.accent,
            color: '#000',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'var(--font-mono), monospace',
            cursor: 'pointer',
            boxShadow: `0 4px 20px ${theme.accent}40`,
            zIndex: 90,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {betSlip.length}
        </button>
      )}

      {/* Mobile Bottom Sheet */}
      {showMobileBetSlip && (
        <div
          className="modal-overlay"
          onClick={() => setShowMobileBetSlip(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            className="bottom-sheet"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              background: theme.cardBg,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <div
              style={{
                width: 40,
                height: 4,
                borderRadius: 2,
                background: theme.border,
                margin: '0 auto 16px',
              }}
            />
            <BetSlip onClose={() => setShowMobileBetSlip(false)} />
          </div>
        </div>
      )}

    </div>
  );
}
