'use client';

import { useApp } from '@/context/AppContext';
import markets from '@/data/markets';

export default function Ticker() {
  const { text, theme, t } = useApp();

  const tickerItems = markets
    .filter((m) => m.isHot)
    .map((m) => ({
      title: text(m.title),
      price: m.yesPrice,
      change: m.trend[m.trend.length - 1] - m.trend[m.trend.length - 2],
    }));

  // Duplicate for seamless loop
  const items = [...tickerItems, ...tickerItems];

  return (
    <div
      className="mode-transition"
      style={{
        background: theme.cardBg,
        borderBottom: `1px solid ${theme.border}`,
        overflow: 'hidden',
        height: 36,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Trending label */}
      <div
        style={{
          flexShrink: 0,
          padding: '0 14px',
          fontSize: 11,
          fontWeight: 700,
          color: theme.accent,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          borderRight: `1px solid ${theme.border}`,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2,
          background: theme.cardBg,
        }}
      >
        {t('trending')}
      </div>

      {/* Scrolling track */}
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div
          className="ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            whiteSpace: 'nowrap',
            paddingLeft: 16,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
              }}
            >
              <span style={{ color: '#c9d1d9', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontWeight: 700,
                  color: '#fff',
                  fontSize: 12,
                }}
              >
                {item.price}¢
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  color: item.change >= 0 ? '#00F5A0' : '#ff6b6b',
                }}
              >
                {item.change >= 0 ? '+' : ''}
                {item.change}¢
              </span>
              <span style={{ color: theme.border }}>|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
