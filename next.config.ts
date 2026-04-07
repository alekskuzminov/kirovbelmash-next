import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.kirovbelmash.ru',
      },
      // TODO: удалить после настройки CNAME cdn.kirovbelmash.ru и полного перехода
      {
        protocol: 'https',
        hostname: 'cdn.kirovbelmash-site.ru',
      },
    ],
  },
};

export default nextConfig;
