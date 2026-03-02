'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function MarketModal({ market, onClose }) {
  const { t, text, textBoth, theme } = useApp();
  const [side, setSide] = useState('yes'); // 'yes' | 'no'
  const [amount, setAmount] = useState(10);
  const [confirmed, setConfirmed] = useState(false);

  if (!market) return null;

  const titleBoth = textBoth(market.title);
  const price = side === 'yes' ? market.yesPrice : 100 - market.yesPrice;
  const payout = ((amount * 100) / price).toFixed(2);
  const cost = ((amount * price) / 100).toFixed(2);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: theme.modalBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.cardBg,
          borderRadius: 20,
          border: `1px solid ${theme.border}`,
          padding: 28,
          width: '100%',
          maxWidth: 440,
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: theme.textSecondary,
            cursor: 'pointer',
            fontSize: 20,
            lineHeight: 1,
            padding: 4,
          }}
        >
          &times;
        </button>

        {/* Category */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: 8,
          }}
        >
          {t(market.category)}
        </div>

        {/* Title */}
        <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: '#fff', marginBottom: 4 }}>
          {titleBoth.primary}
        </div>
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 24 }}>{titleBoth.secondary}</div>

        {confirmed ? (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#10003;</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent }}>{t('tradeConfirmed')}</div>
          </div>
        ) : (
          <>
            {/* Yes/No Toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <button
                onClick={() => setSide('yes')}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  borderRadius: 12,
                  border: `2px solid ${side === 'yes' ? theme.accent : theme.border}`,
                  background: side === 'yes' ? theme.accent + '20' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 4 }}>{t('buyYes')}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 24,
                    fontWeight: 700,
                    color: theme.accent,
                  }}
                >
                  {market.yesPrice}¢
                </div>
              </button>
              <button
                onClick={() => setSide('no')}
                style={{
                  flex: 1,
                  padding: '14px 0',
                  borderRadius: 12,
                  border: `2px solid ${side === 'no' ? '#ff6b6b' : theme.border}`,
                  background: side === 'no' ? '#ff6b6b20' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 4 }}>{t('buyNo')}</div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#ff6b6b',
                  }}
                >
                  {100 - market.yesPrice}¢
                </div>
              </button>
            </div>

            {/* Amount Slider */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  fontSize: 13,
                  color: theme.textSecondary,
                }}
              >
                <span>{t('amount')}</span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', color: '#fff', fontWeight: 600 }}>
                  {amount} {t('contracts')}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 3,
                  appearance: 'none',
                  background: `linear-gradient(to right, ${side === 'yes' ? theme.accent : '#ff6b6b'} ${amount}%, ${theme.border} ${amount}%)`,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 6,
                  fontSize: 11,
                  color: theme.textMuted,
                  fontFamily: 'var(--font-mono), monospace',
                }}
              >
                <span>1</span>
                <span>100</span>
              </div>
            </div>

            {/* Trade Summary */}
            <div
              style={{
                background: theme.bg,
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  fontSize: 13,
                }}
              >
                <span style={{ color: theme.textSecondary }}>{t('avgPrice')}</span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: '#fff' }}>
                  {price}¢
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  fontSize: 13,
                }}
              >
                <span style={{ color: theme.textSecondary }}>{t('amount')}</span>
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontWeight: 600, color: '#fff' }}>
                  ${cost}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 15,
                  paddingTop: 10,
                  borderTop: `1px solid ${theme.border}`,
                }}
              >
                <span style={{ color: theme.textSecondary, fontWeight: 600 }}>{t('potentialPayout')}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontWeight: 700,
                    color: side === 'yes' ? theme.accent : '#ff6b6b',
                    fontSize: 18,
                  }}
                >
                  ${payout}
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              style={{
                width: '100%',
                padding: '14px 0',
                borderRadius: 12,
                border: 'none',
                background: side === 'yes' ? theme.accent : '#ff6b6b',
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
              {t('confirmTrade')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
