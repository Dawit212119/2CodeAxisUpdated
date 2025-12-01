import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.genshifter.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.insa.gov.et',
      },
      {
        protocol: 'https',
        hostname: 'www.ethiopianairlines.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ethiotelecom.et',
      },
      {
        protocol: 'https',
        hostname: 'www.safaricom.et',
      },
      {
        protocol: 'https',
        hostname: 'chapa.co',
      },
      {
        protocol: 'https',
        hostname: 'icog-labs.com',
      },
      {
        protocol: 'https',
        hostname: 'kifiya.com',
      },
      {
        protocol: 'https',
        hostname: 'gebeya.com',
      },
    ],
  },
};

export default nextConfig;
