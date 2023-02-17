/** @type {import('next').NextConfig} */
//const autoprefixer = require("autoprefixer");
//const tailwind = require("tailwindcss")

//const postcssPlugins = [tailwind(), autoprefixer()];
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
      /*{ //proxy any requests on http://localhost:3000/api/* to http://localhost:5000/api/*
        source: '/api/:slug*',
        destination: 'http://localhost:5000/api/:slug*'
      },*/
    ];
  },
  images:{
    domains: [
      'cdn.discordapp.com',
      'res.cloudinary.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /*css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins
      }
    }
  },*/
  // Fixes npm packages that depend on `fs` module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      }
    }
    return config
  }
  /*webpack: (config) => {
		config.node = {
			fs: 'empty',
			modules: false
		}

		return config
	}*/
};

module.exports = nextConfig;