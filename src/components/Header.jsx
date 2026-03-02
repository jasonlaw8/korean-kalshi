'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { mode, toggleMode, language, toggleLanguage, t, theme, walletBalance, betSlip } = useApp();
  const [searchFocused, setSearchFocused] = useState(false);

  const accentColor = theme.accent;

  return (
    <header
      className="mode-transition"
      style={{
        background: theme.headerBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: '0 20px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: 16,
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: '#fff',
          }}
        >
          K-
        </span>
        <span
          className="mode-transition"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: accentColor,
          }}
        >
          BET
        </span>
      </div>

      {/* Mode Toggle */}
      <div
        style={{
          display: 'flex',
          background: '#1a1f2e',
          borderRadius: 24,
          padding: 3,
          gap: 2,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => mode !== 'beginner' && toggleMode()}
          style={{
            padding: '6px 16px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
            background: mode === 'beginner' ? accentColor : 'transparent',
            color: mode === 'beginner' ? '#000' : '#8b949e',
            transition: 'all 0.3s ease',
          }}
        >
          {t('beginner')}
        </button>
        <button
          onClick={() => mode !== 'sports' && toggleMode()}
          style={{
            padding: '6px 16px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'inherit',
            background: mode === 'sports' ? accentColor : 'transparent',
            color: mode === 'sports' ? '#000' : '#8b949e',
            transition: 'all 0.3s ease',
          }}
        >
          {t('sports')}
        </button>
      </div>

      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 12,
            color: '#8b949e',
            fontSize: 14,
            pointerEvents: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          type="text"
          placeholder={mode === 'beginner' ? t('search') : t('searchSports')}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            borderRadius: 20,
            border: `1px solid ${searchFocused ? accentColor : theme.border}`,
            background: theme.cardBg,
            color: '#fff',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        />
      </div>

      {/* Right section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 12px',
            borderRadius: 16,
            border: `1px solid ${theme.border}`,
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            transition: 'border-color 0.2s ease',
          }}
        >
          <span style={{ color: language === 'en' ? accentColor : '#8b949e' }}>EN</span>
          <span style={{ color: '#484f58' }}>|</span>
          <span style={{ color: language === 'kr' ? accentColor : '#8b949e' }}>KR</span>
        </button>

        {/* Wallet */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 16,
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M16 12h.01" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-mono), monospace',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {walletBalance.toLocaleString()}
          </span>
          <span style={{ fontSize: 11, color: '#8b949e' }}>KRW</span>
        </div>

        {/* Mobile bet slip count badge (sports mode only) */}
        {mode === 'sports' && betSlip.length > 0 && (
          <div
            className="bet-added"
            style={{
              display: 'none', // hidden on desktop, shown via media query workaround
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: accentColor,
              color: '#000',
              fontWeight: 700,
              fontSize: 13,
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono), monospace',
            }}
          >
            {betSlip.length}
          </div>
        )}
      </div>
    </header>
  );
}
