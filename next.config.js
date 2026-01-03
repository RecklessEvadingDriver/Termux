/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable standalone output for optimal deployment
  output: 'standalone',
  // Optimize for serverless
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
