/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle ES modules compatibility
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Handle Deck.gl and Mapbox GL compatibility
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })

    // Handle ES modules in node_modules
    config.module.rules.push({
      test: /node_modules\/.*\.m?js$/,
      type: 'javascript/auto',
    })

    return config
  },
  transpilePackages: ['@deck.gl/core', '@deck.gl/layers', '@deck.gl/react', 'react-map-gl', 'mapbox-gl'],
  experimental: {
    esmExternals: 'loose'
  }
}

export default nextConfig
