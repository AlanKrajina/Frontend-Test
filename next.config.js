/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "localhost",
      "imgur.com",
      "www.alpha-orbital.com",
      "alpha-orbital.com",
    ],
  },
};

module.exports = nextConfig;
