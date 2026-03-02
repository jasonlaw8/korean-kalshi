'use client';

import { useApp } from '@/context/AppContext';
import Header from './Header';
import Ticker from './Ticker';
import BeginnerMode from './BeginnerMode';
import SportsMode from './SportsMode';

export default function MainApp() {
  const { mode, theme } = useApp();

  return (
    <div
      className="mode-transition"
      style={{
        minHeight: '100vh',
        background: theme.bg,
      }}
    >
      <Header />
      <Ticker />
      {mode === 'beginner' ? <BeginnerMode /> : <SportsMode />}
    </div>
  );
}
