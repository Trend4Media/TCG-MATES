/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // For GitHub Pages deployment
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/TCG-MATES',
    assetPrefix: '/TCG-MATES/',
  }),
}

module.exports = nextConfig