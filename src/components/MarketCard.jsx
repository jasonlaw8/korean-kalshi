'use client';

import { useApp } from '@/context/AppContext';

function Sparkline({ data, color, width = 80, height = 30 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Glow effect */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.2"
      />
    </svg>
  );
}

export default function MarketCard({ market, index, onClick }) {
  const { text, textBoth, t, theme } = useApp();

  const noPrice = 100 - market.yesPrice;
  const titleBoth = textBoth(market.title);
  const categoryKey = market.category;
  const lastChange = market.trend[market.trend.length - 1] - market.trend[market.trend.length - 2];

  return (
    <div
      className="card-enter"
      onClick={() => onClick(market)}
      style={{
        animationDelay: `${index * 0.06}s`,
        animationFillMode: 'backwards',
        background: theme.cardBg,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        padding: 20,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.accent + '40';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top row: category + hot badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t(categoryKey)}
        </span>
        {market.isHot && (
          <span
            className="hot-badge"
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              background: '#ff6b6b',
              padding: '2px 8px',
              borderRadius: 10,
            }}
          >
            {t('hot')}
          </span>
        )}
      </div>

      {/* Title with bilingual display */}
      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            lineHeight: 1.4,
            color: '#fff',
            marginBottom: 4,
          }}
        >
          {titleBoth.primary}
        </div>
        <div
          style={{
            fontSize: 12,
            color: theme.textMuted,
            lineHeight: 1.3,
          }}
        >
          {titleBoth.secondary}
        </div>
      </div>

      {/* Sparkline */}
      <div style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Sparkline data={market.trend} color={theme.accent} />
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 11,
            fontWeight: 600,
            color: lastChange >= 0 ? '#00F5A0' : '#ff6b6b',
          }}
        >
          {lastChange >= 0 ? '+' : ''}
          {lastChange}¢
        </span>
      </div>

      {/* Yes/No prices */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <div
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 10,
            background: theme.accent + '15',
            border: `1px solid ${theme.accent}30`,
            textAlign: 'center',
            transition: 'background 0.15s ease',
          }}
        >
          <div style={{ fontSize: 11, color: theme.textSecondary, marginBottom: 2 }}>{t('yes')}</div>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 20,
              fontWeight: 700,
              color: theme.accent,
            }}
          >
            {market.yesPrice}¢
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 10,
            background: '#ff6b6b15',
            border: '1px solid #ff6b6b30',
            textAlign: 'center',
            transition: 'background 0.15s ease',
          }}
        >
          <div style={{ fontSize: 11, color: theme.textSecondary, marginBottom: 2 }}>{t('no')}</div>
          <div
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 20,
              fontWeight: 700,
              color: '#ff6b6b',
            }}
          >
            {noPrice}¢
          </div>
        </div>
      </div>

      {/* Footer: volume + end date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: theme.textSecondary }}>
          <span style={{ fontFamily: 'var(--font-mono), monospace' }}>${market.volume}</span>{' '}
          {t('volume')}
        </span>
        <span style={{ fontSize: 11, color: theme.textSecondary }}>
          {t('ends')} {market.endDate}
        </span>
      </div>
    </div>
  );
}
