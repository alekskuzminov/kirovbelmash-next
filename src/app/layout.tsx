import type { Metadata } from "next";
import "./globals.css";

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
  openGraph: {
    title:
      "КировБелМаш — Промышленное оборудование для брикетирования и гранулирования",
    description:
      "Профессиональные производственные линии для брикетирования и гранулирования от 2 до 40 тонн/сутки",
    type: "website",
    locale: "ru_RU",
    url: "https://kirovbelmash.ru/",
  },
  other: {
    "geo.position": "58.603595;49.668007",
    "geo.placename": "Киров, Россия",
    "geo.region": "RU-KIR",
  },
  metadataBase: new URL("https://kirovbelmash.ru"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TODO: динамический lang при переносе i18n
    <html lang="ru" className="scroll-smooth scroll-pt-[64px] lg:scroll-pt-[108px]">
      <body className="antialiased">{children}</body>
    </html>
  );
}
