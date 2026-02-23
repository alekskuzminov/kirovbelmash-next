import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: добавить output: 'standalone' если потребуется self-hosted деплой
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
