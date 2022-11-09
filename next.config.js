/** @type {import('next').NextConfig} */

/*module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
}*/


const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  swcMinify: false, // Required to fix: https://nextjs.org/docs/messages/failed-loading-swc
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      // { source: '/categories', destination: '/c },
    ];
  },
};

module.exports = nextConfig;