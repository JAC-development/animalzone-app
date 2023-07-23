/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
  env: {
    secretKey: 'signInKey',
  },
};

module.exports = nextConfig;
