/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;