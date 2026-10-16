// Date, randomness and "live" price helpers. No backend: prices drift
// deterministically with the clock so every device sees the same numbers.

export const MIN = 60_000;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;

export function dayKey(d = new Date()) {
  const z = new Date(d);
  return `${z.getFullYear()}-${String(z.getMonth() + 1).padStart(2, '0')}-${String(z.getDate()).padStart(2, '0')}`;
}

export function weekStart(d = new Date()) {
  const z = new Date(d);
  const dow = (z.getDay() + 6) % 7; // Monday = 0
  z.setHours(0, 0, 0, 0);
  z.setDate(z.getDate() - dow);
  return z.getTime();
}

export function nextAt(hour, from = Date.now()) {
  const z = new Date(from);
  z.setHours(hour, 0, 0, 0);
  if (z.getTime() <= from) z.setDate(z.getDate() + 1);
  return z.getTime();
}

export function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function rng(seed) {
  let s = typeof seed === 'number' ? seed : hashStr(String(seed));
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

export function shuffle(arr, seed) {
  const r = rng(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Live-ish value: base plus slow waves keyed to the market id.
export function drift(id, base, amp, t = Date.now()) {
  const h = hashStr(id);
  const a = Math.sin(t / (3.1 * HOUR) + (h % 97)) * 0.6;
  const b = Math.sin(t / (47 * MIN) + (h % 13)) * 0.4;
  return base + (a + b) * amp;
}

export function priceNow(m, t = Date.now()) {
  return Math.max(1, Math.min(99, Math.round(drift(m.id, m.yes, m.src === 'kalshi' ? 2.2 : 1.2, t))));
}

// Price history that ends at `end`.
export function series(seed, end, chg, n = 48) {
  const r = rng(seed);
  const start = Math.max(3, Math.min(97, end - chg * 2.2 + (r() - 0.5) * 10));
  const out = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    const target = start + ((end - start) * i) / (n - 1);
    v = v + (target - v) * 0.35 + (r() - 0.5) * 5;
    out.push(Math.max(1, Math.min(99, v)));
  }
  out[n - 1] = end;
  return out;
}

export function ago(t, lang = 'en') {
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  const kr = lang === 'kr';
  if (s < 60) return kr ? '방금' : 'now';
  const m = Math.round(s / 60);
  if (m < 60) return kr ? `${m}분` : `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return kr ? `${h}시간` : `${h}h`;
  const d = Math.round(h / 24);
  return kr ? `${d}일` : `${d}d`;
}

export function until(t, lang = 'en') {
  const s = Math.max(0, Math.round((t - Date.now()) / 1000));
  const kr = lang === 'kr';
  if (s < 60) return kr ? `${s}초` : `${s}s`;
  const m = Math.ceil(s / 60);
  if (m < 60) return kr ? `${m}분` : `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return kr ? `${h}시간 ${m % 60}분` : `${h}h ${m % 60}m`;
  const d = Math.round(h / 24);
  return kr ? `${d}일` : `${d}d`;
}

export const fmt = (n) => Math.round(n).toLocaleString('en-US');
