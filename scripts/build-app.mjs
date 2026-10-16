// Bundles the app into one self-contained HTML file (dist/hanpan.html) that
// runs without Next.js, using an in-memory router instead of URLs.
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const memoryNav = {
  name: 'memory-nav',
  setup(b) {
    b.onResolve({ filter: /lib\/nav$/ }, () => ({ path: resolve('src/lib/nav-memory.jsx') }));
  },
};

const out = await build({
  entryPoints: ['src/entry.jsx'],
  bundle: true,
  minify: true,
  write: false,
  outdir: 'dist',
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  target: 'es2020',
  plugins: [memoryNav],
});
const js = out.outputFiles.find((f) => f.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script');
const css = out.outputFiles.find((f) => f.path.endsWith('.css')).text;

const html = `<title>Hanpan 한판</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap">
<style>${css}</style>
<div id="root"></div>
<script>${js}</script>
`;
mkdirSync('dist', { recursive: true });
writeFileSync('dist/hanpan.html', html);
console.log('wrote dist/hanpan.html', (html.length / 1024).toFixed(0) + ' KB');
