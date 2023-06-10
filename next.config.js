/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
};

module.exports = nextConfig;
