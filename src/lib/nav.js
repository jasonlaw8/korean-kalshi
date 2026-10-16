'use client';

// Navigation for the Next.js app. scripts/build-app.mjs swaps this module for
// nav-memory.jsx when bundling the single-file preview.
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function useNav() {
  const path = usePathname() || '/';
  const router = useRouter();
  return { path, push: (to) => router.push(to), back: () => router.back(), replace: (to) => router.replace(to) };
}

export function Link({ to, children, ...rest }) {
  return <NextLink href={to} {...rest}>{children}</NextLink>;
}

export function NavProvider({ children }) {
  return children;
}
