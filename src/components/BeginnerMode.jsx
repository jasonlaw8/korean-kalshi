'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import markets from '@/data/markets';
import MarketCard from './MarketCard';
import MarketModal from './MarketModal';

const categories = ['all', 'kpop', 'esports', 'kdrama', 'politics', 'economy', 'sportsCat', 'tech'];

export default function BeginnerMode() {
  const { t, text, theme } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = markets;

    if (activeCategory !== 'all') {
      result = result.filter((m) => m.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) => m.title.en.toLowerCase().includes(q) || m.title.kr.includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div style={{ padding: '24px 20px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Category filter pills */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          overflowX: 'auto',
          paddingBottom: 4,
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 18px',
              borderRadius: 20,
              border: `1px solid ${activeCategory === cat ? theme.accent : theme.border}`,
              background: activeCategory === cat ? theme.accent + '20' : 'transparent',
              color: activeCategory === cat ? theme.accent : theme.textSecondary,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      {/* Market Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((market, index) => (
            <MarketCard
              key={market.id}
              market={market}
              index={index}
              onClick={setSelectedMarket}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 0',
              color: theme.textSecondary,
              fontSize: 15,
            }}
          >
            {t('search')}
          </div>
        )}
      </div>

      {/* Market Modal */}
      {selectedMarket && (
        <MarketModal market={selectedMarket} onClose={() => setSelectedMarket(null)} />
      )}
    </div>
  );
}
