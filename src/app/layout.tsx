import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
};

export const metadata: Metadata = {
  title: {
    default:
      "КировБелМаш — Оборудование для переработки древесных отходов",
    template: "%s | КировБелМаш",
  },
  description:
    "Завод КировБелМаш — производитель промышленного оборудования для переработки древесных отходов под ключ. Полный цикл: проектирование, изготовление, обучение, запуск и сервис. 10+ лет опыта, производственная площадь 5000+ м².",
  keywords: [
    "производитель оборудования",
    "завод КировБелМаш",
    "переработка древесных отходов",
    "промышленное оборудование для биотоплива",
    "комплексные решения под ключ",
    "оборудование для переработки опилок",
  ],
  metadataBase: new URL("https://kirovbelmash.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "КировБелМаш — Производитель оборудования для переработки древесных отходов",
    description:
      "Завод-производитель промышленного оборудования для переработки древесных отходов. Комплексные решения под ключ за 60 дней.",
    type: "website",
    locale: "ru_RU",
    url: "https://kirovbelmash.ru/",
    siteName: "КировБелМаш",
    images: [
      {
        url: "/images/logo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "КировБелМаш — производитель оборудования для переработки древесных отходов",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "КировБелМаш — Производитель оборудования для переработки древесных отходов",
    description:
      "Промышленное оборудование для переработки древесных отходов от завода-производителя. Комплексные решения под ключ.",
    images: ["/images/logo/og-image.jpg"],
  },
  other: {
    "geo.position": "58.603595;49.668007",
    "geo.placename": "Белая Холуница, Кировская область, Россия",
    "geo.region": "RU-KIR",
  },
  verification: {
    yandex: "202639abf9a4bbe3",
  },
  icons: {
    icon: "/images/logo/logo.webp",
    apple: "/images/logo/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  authors: [{ name: "КировБелМаш", url: "https://kirovbelmash.ru" }],
};

import { Suspense } from "react";
import YandexMetrika from "@/components/YandexMetrika";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://kirovbelmash.ru/#organization",
  name: "КировБелМаш",
  alternateName: "ООО КировБелМаш",
  url: "https://kirovbelmash.ru",
  logo: "https://kirovbelmash.ru/images/logo/logo.webp",
  image: "https://kirovbelmash.ru/images/logo/og-image.jpg",
  description:
    "Завод-производитель промышленного оборудования для переработки древесных отходов. Полный цикл: проектирование, изготовление, монтаж, обучение, сервис.",
  foundingDate: "2011",
  telephone: "+7-900-521-84-77",
  email: "sale@kirovbelmash.ru",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Глазырина, 112",
    addressLocality: "Белая Холуница",
    addressRegion: "Кировская область",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 58.603595,
    longitude: 49.668007,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+7-900-521-84-77",
      contactType: "sales",
      availableLanguage: "Russian",
    },
  ],
  sameAs: [
    "https://vk.com/kirovbelmash",
    "https://t.me/kirovbelmash",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: динамический lang при переносе i18n
    <html lang="ru" className="scroll-smooth scroll-pt-[64px] lg:scroll-pt-[108px]">
      <head>
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
