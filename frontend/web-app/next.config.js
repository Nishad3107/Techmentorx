/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode for better development experience
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['localhost'],
  },
  
  // Environment variables that should be available on the client side
  // are prefixed with NEXT_PUBLIC_
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
  
  // Optionally, disable source maps in production for better performance
  // productionBrowserSourceMaps: false,
}

module.exports = nextConfig
