import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "КировБелМаш — Производство линий брикетирования и гранулирования от 2 до 40 тонн/сутки",
    template: "%s | КировБелМаш",
  },
  description:
    "Полный цикл производства линий брикетирования и гранулирования. Обучение специалистов, пусконаладка и гарантийное обслуживание. Профессиональное промышленное оборудование с 10-летним опытом и производственной площадью 5000+ м².",
  keywords: [
    "линии брикетирования",
    "оборудование гранулирования",
    "промышленные производственные линии",
    "производство пеллет",
    "переработка биомассы",
  ],
  metadataBase: new URL("https://kirovbelmash.ru"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "КировБелМаш — Промышленное оборудование для брикетирования и гранулирования",
    description:
      "Профессиональные производственные линии для брикетирования и гранулирования от 2 до 40 тонн/сутки",
    type: "website",
    locale: "ru_RU",
    url: "https://kirovbelmash.ru/",
    siteName: "КировБелМаш",
    images: [
      {
        url: "/images/logo/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "КировБелМаш — промышленное оборудование для брикетирования и гранулирования",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "КировБелМаш — Промышленное оборудование для брикетирования и гранулирования",
    description:
      "Производственные линии брикетирования и гранулирования от 2 до 40 тонн/сутки. Полный цикл под ключ.",
    images: ["/images/logo/og-image.jpg"],
  },
  other: {
    "geo.position": "58.603595;49.668007",
    "geo.placename": "Белая Холуница, Кировская область, Россия",
    "geo.region": "RU-KIR",
  },
  icons: {
    icon: "/images/logo/logo.webp",
  },
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
    "Производство промышленного оборудования для линий брикетирования и гранулирования. Полный цикл: проектирование, изготовление, монтаж, обучение, сервис.",
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
