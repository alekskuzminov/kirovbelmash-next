import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import MissionValues from '@/components/about/MissionValues';
import HistoryTimeline from '@/components/about/HistoryTimeline';
// import TeamSection from '@/components/about/TeamSection';
import CertificatesSection from '@/components/about/CertificatesSection';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
    title: 'О компании',
    description: 'КировБелМаш — производитель промышленного оборудования для брикетирования и гранулирования с 2011 года. 80+ реализованных проектов в 35+ регионах России. 5000+ м² производственных площадей.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'О компании КировБелМаш',
        description: 'Производитель линий брикетирования и гранулирования с 2011 года. 80+ реализованных проектов, гарантия и сервис.',
        url: 'https://kirovbelmash.ru/about',
    },
};

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
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
