import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import MissionValues from '@/components/about/MissionValues';
import HistoryTimeline from '@/components/about/HistoryTimeline';
// import TeamSection from '@/components/about/TeamSection';
import CertificatesSection from '@/components/about/CertificatesSection';
import AboutCTA from '@/components/about/AboutCTA';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'О компании',
    description: 'КировБелМаш — производитель промышленного оборудования для брикетирования и гранулирования с 2011 года. 80+ реализованных проектов в 35+ регионах России. 5000+ м² производственных площадей.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'О компании КировБелМаш',
        description: 'Производитель линий брикетирования и гранулирования с 2011 года. 80+ реализованных проектов, гарантия и сервис.',
        url: 'https://kirovbelmash.ru/about',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'О компании КировБелМаш',
            },
        ],
    },
};

const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'О компании' },
];

export default function AboutPage() {
    return (
        <main>
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <WebPageJsonLd
                type="AboutPage"
                name="О компании КировБелМаш"
                description="Производитель промышленного оборудования для брикетирования и гранулирования с 2011 года. 80+ проектов в 35+ регионах."
                url="/about"
            />
            <AboutHero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Breadcrumbs items={breadcrumbItems} className="mb-0" />
            </div>
            <div className="pt-16">
                <MissionValues />
            </div>
            <HistoryTimeline />
            {/* <TeamSection /> */}
            <CertificatesSection />
            <AboutCTA />
        </main>
    );
}
