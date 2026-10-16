'use client';

import dynamic from 'next/dynamic';

// Client-only: the demo reads localStorage and the theme attribute on mount.
const App = dynamic(() => import('../demo/App'), { ssr: false });

export default function Page() {
  return <App />;
}
