/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/web-store',
  assetPrefix: '/web-store/',
}

module.exports = nextConfig 