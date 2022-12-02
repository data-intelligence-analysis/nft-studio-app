/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  swcMinify: true, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
    ];
  },
  images:{
    domains: ["cdn.discordapp.com"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Fixes npm packages that depend on `fs` module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config
  }
};

module.exports = nextConfig;