/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optimize for serverless
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
