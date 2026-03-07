import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import MissionValues from '@/components/about/MissionValues';
import HistoryTimeline from '@/components/about/HistoryTimeline';
// import TeamSection from '@/components/about/TeamSection';
import CertificatesSection from '@/components/about/CertificatesSection';
import AboutCTA from '@/components/about/AboutCTA';

export const metadata: Metadata = {
    title: 'О компании - КировБелМаш',
    description: 'КировБелМаш — надёжный партнёр с 2011 года. Мы проектируем и производим промышленное оборудование для брикетирования и гранулирования.',
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
