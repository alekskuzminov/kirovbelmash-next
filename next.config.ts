import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: добавить output: 'standalone' если потребуется self-hosted деплой
  images: {
    loader: 'custom',
    loaderFile: './s3-image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kirovbelmash-next.ru',
      },
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
