import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-8f27dac0e3e64617922a8af7758dbbf7.r2.dev',
        port: '',
        pathname: '/elen-cosmetic/**',
      }
    ], 
  }
};

// Chain both plugins
export default withPayload(nextConfig);
