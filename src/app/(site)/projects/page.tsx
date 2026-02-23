import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsGallery from '@/components/projects/ProjectsGallery';
import Testimonials from '@/components/projects/Testimonials';
import ProjectsCTA from '@/components/projects/ProjectsCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Реализованные проекты | КировБелМаш',
    description: 'Примеры реализованных проектов по установке оборудования для производства топливных брикетов и пеллет.',
};

export default function ProjectsPage() {
    return (
        <>
            <ProjectsHero />
            <ProjectsGallery />
            <Testimonials />
            <ProjectsCTA />
        </>
    );
}
