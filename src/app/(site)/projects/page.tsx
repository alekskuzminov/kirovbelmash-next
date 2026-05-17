import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsGallery from '@/components/projects/ProjectsGallery';
import Testimonials from '@/components/projects/Testimonials';
import ProjectsCTA from '@/components/projects/ProjectsCTA';
import { Metadata } from 'next';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';

export const metadata: Metadata = {
    title: 'Реализованные проекты',
    description: '80+ реализованных проектов по установке линий брикетирования, гранулирования и сушки в 35+ регионах России. Кейсы с фото и видео.',
    alternates: { canonical: '/projects' },
    openGraph: {
        title: 'Реализованные проекты КировБелМаш',
        description: '80+ проектов в 35+ регионах. Линии брикетирования, гранулирования и сушки с фото и видео.',
        url: 'https://kirovbelmash.ru/projects',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Реализованные проекты КировБелМаш',
            },
        ],
    },
};

export default function ProjectsPage() {
    return (
        <>
            <WebPageJsonLd
                type="CollectionPage"
                name="Реализованные проекты КировБелМаш"
                description="80+ проектов по установке линий брикетирования, гранулирования и сушки в 35+ регионах России."
                url="/projects"
            />
            <ProjectsHero />
            <ProjectsGallery />
            <Testimonials />
            <ProjectsCTA />
        </>
    );
}
