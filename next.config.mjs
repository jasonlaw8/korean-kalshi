// BASE_PATH lets the same app run at the root or under a prefix, e.g. the
// public demo served at 5thelementdigital.com/demo/hanpan (set BASE_PATH=/demo/hanpan
// and HANPAN_DEMO=1 on that Vercel project).
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_DEMO: process.env.HANPAN_DEMO || '',
  },
};

export default nextConfig;
