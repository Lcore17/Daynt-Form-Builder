/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['localhost', 'daynt-form-api.onrender.com'] },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://daynt-form-api.onrender.com/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
