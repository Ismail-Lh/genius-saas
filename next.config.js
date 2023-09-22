/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'googleusercontent.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'cdn.openai.com',
    ],
  },
};

module.exports = nextConfig;
