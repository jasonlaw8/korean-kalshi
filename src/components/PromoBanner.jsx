'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const promos = [
  {
    titleKey: 'promoTitle1',
    descKey: 'promoDesc1',
    emoji: '&#9918;',
    gradient: 'linear-gradient(135deg, #1a3a2a, #0d2d1a)',
  },
  {
    titleKey: 'promoTitle2',
    descKey: 'promoDesc2',
    emoji: '&#128640;',
    gradient: 'linear-gradient(135deg, #1a2a3a, #0d1a2d)',
  },
  {
    titleKey: 'promoTitle3',
    descKey: 'promoDesc3',
    emoji: '&#127873;',
    gradient: 'linear-gradient(135deg, #2a1a3a, #1d0d2d)',
  },
];

export default function PromoBanner() {
  const { t, theme } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const promo = promos[activeIndex];

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        key={activeIndex}
        className="promo-enter"
        style={{
          background: promo.gradient,
          borderRadius: 16,
          border: `1px solid ${theme.accent}30`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 80,
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            <span dangerouslySetInnerHTML={{ __html: promo.emoji }} />{' '}
            {t(promo.titleKey)}
          </div>
          <div style={{ fontSize: 14, color: theme.textSecondary }}>{t(promo.descKey)}</div>
        </div>
        <button
          style={{
            padding: '10px 24px',
            borderRadius: 12,
            border: 'none',
            background: theme.accent,
            color: '#000',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {t('placeBet')}
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? 20 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              background: i === activeIndex ? theme.accent : theme.border,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
