'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import translations from '@/data/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState('beginner'); // 'beginner' | 'sports'
  const [betSlip, setBetSlip] = useState([]);
  const [walletBalance] = useState(50000);

  // Translation helper
  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] || entry.en || key;
    },
    [language]
  );

  // Get both languages for dual display
  const tBoth = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return { primary: key, secondary: key };
      const other = language === 'en' ? 'kr' : 'en';
      return {
        primary: entry[language] || key,
        secondary: entry[other] || key,
      };
    },
    [language]
  );

  // Bilingual text from data objects { en, kr }
  const text = useCallback(
    (obj) => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[language] || obj.en || '';
    },
    [language]
  );

  const textBoth = useCallback(
    (obj) => {
      if (!obj) return { primary: '', secondary: '' };
      if (typeof obj === 'string') return { primary: obj, secondary: obj };
      const other = language === 'en' ? 'kr' : 'en';
      return {
        primary: obj[language] || '',
        secondary: obj[other] || '',
      };
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((l) => (l === 'en' ? 'kr' : 'en'));
  }, []);

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'beginner' ? 'sports' : 'beginner'));
  }, []);

  // Bet slip operations
  const addBet = useCallback((bet) => {
    setBetSlip((prev) => {
      // Don't add duplicate
      const exists = prev.find(
        (b) => b.gameId === bet.gameId && b.betType === bet.betType && b.pick === bet.pick
      );
      if (exists) return prev;
      return [...prev, { ...bet, stake: 1000, id: Date.now() }];
    });
  }, []);

  const removeBet = useCallback((betId) => {
    setBetSlip((prev) => prev.filter((b) => b.id !== betId));
  }, []);

  const clearBets = useCallback(() => {
    setBetSlip([]);
  }, []);

  const updateStake = useCallback((betId, stake) => {
    setBetSlip((prev) =>
      prev.map((b) => (b.id === betId ? { ...b, stake: Math.max(0, stake) } : b))
    );
  }, []);

  // Theme colors based on mode
  const theme = {
    accent: mode === 'beginner' ? '#00F5A0' : '#00C853',
    bg: mode === 'beginner' ? '#0a0e1a' : '#0d1117',
    cardBg: mode === 'beginner' ? '#111827' : '#161b22',
    headerBg: mode === 'beginner' ? '#0d1220' : '#0d1117',
    live: '#ff1744',
    text: '#ffffff',
    textSecondary: '#8b949e',
    textMuted: '#484f58',
    border: mode === 'beginner' ? '#1e293b' : '#21262d',
    modalBg: 'rgba(0,0,0,0.7)',
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        mode,
        setMode,
        toggleMode,
        betSlip,
        addBet,
        removeBet,
        clearBets,
        updateStake,
        walletBalance,
        t,
        tBoth,
        text,
        textBoth,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
