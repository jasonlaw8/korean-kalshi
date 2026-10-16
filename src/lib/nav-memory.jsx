// In-memory router used by the single-file preview build.
import { createContext, useContext, useMemo, useState } from 'react';

const Ctx = createContext(null);

export function NavProvider({ children }) {
  const [stack, setStack] = useState(['/']);
  const api = useMemo(() => ({
    path: stack[stack.length - 1],
    push: (to) => setStack((s) => (s[s.length - 1] === to ? s : [...s, to].slice(-50))),
    replace: (to) => setStack((s) => [...s.slice(0, -1), to]),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : ['/'])),
  }), [stack]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useNav = () => useContext(Ctx);

export function Link({ to, children, onClick, ...rest }) {
  const nav = useNav();
  return (
    <a href={to} {...rest} onClick={(e) => { e.preventDefault(); onClick?.(e); nav.push(to); }}>
      {children}
    </a>
  );
}
