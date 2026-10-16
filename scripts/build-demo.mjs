// Bundles the demo into one self-contained HTML file: dist/hanpan-demo.html
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';

const out = await build({
  entryPoints: ['src/demo/entry.jsx'],
  bundle: true,
  minify: true,
  write: false,
  outdir: 'dist',
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  define: { 'process.env.NODE_ENV': '"production"' },
  target: 'es2020',
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
writeFileSync('dist/hanpan-demo.html', html);
console.log('wrote dist/hanpan-demo.html', (html.length / 1024).toFixed(0) + ' KB');
