import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kirovbelmash-site.ru',
      },
    ],
  },
};

export default nextConfig;
