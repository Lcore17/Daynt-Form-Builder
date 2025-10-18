/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['localhost'] },
  async rewrites() {
    // Proxy API requests to the backend. This removes CORS in the browser and ensures cookies work on Vercel.
    // Default to the Render API host; can be overridden by API_PROXY_TARGET if needed.
    const target = process.env.API_PROXY_TARGET ||
      (process.env.NODE_ENV === 'production'
        ? 'https://daynt-form-api.onrender.com/api'
        : 'http://localhost:4000/api');
    return [
      {
        source: '/api/:path*',
        destination: `${target}/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;
