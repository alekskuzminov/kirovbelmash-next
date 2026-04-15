import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // Яндекс.Бот иногда строит rel. путь из tel:-ссылок: /page/tel:7xxxxxxxxxx → 404
      // Редиректим на страницу без суффикса tel:*
      {
        source: '/:path*/tel\\::phone',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/webp'],
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Last-Modified',
            value: new Date().toUTCString(),
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: blob: https://cdn.kirovbelmash.ru https://cdn.kirovbelmash-site.ru",
              "media-src 'self' https://cdn.kirovbelmash.ru https://cdn.kirovbelmash-site.ru",
              "connect-src 'self' https://mc.yandex.ru https://cdn.kirovbelmash.ru https://cdn.kirovbelmash-site.ru",
              "frame-src 'none'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
