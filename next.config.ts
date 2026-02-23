import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: добавить output: 'standalone' если потребуется self-hosted деплой
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.readdy.ai',
      },
      {
        protocol: 'https',
        hostname: 'readdy.ai',
      },
    ],
  },
};

export default nextConfig;
