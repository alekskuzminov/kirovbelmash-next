import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { projectsData } from '@/components/projects/projectsData';
import ContactForm from '@/components/home/ContactForm';
import ProjectImageGallery from '@/components/projects/ProjectImageGallery';
import ContactModalButton from '@/components/common/ContactModalButton';
import { SITE_CONFIG } from '@/config/site.config';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';
import ProjectVideo from '@/components/projects/ProjectVideo';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return projectsData.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Проект не найден',
        };
    }

    return {
        title: `${project.title} | Проекты`,
        description: project.description,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: {
            title: project.title,
            description: project.description,
            url: `https://kirovbelmash.ru/projects/${project.slug}`,
        },
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const item = projectsData.find((p) => p.slug === slug);

    if (!item) {
        notFound();
    }

    const images = item.gallery && item.gallery.length > 0
        ? item.gallery
        : Array(5).fill(item.image);

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Проекты', href: '/projects' },
        { label: item.title },
    ];

    return (
        <div className="min-h-screen bg-white pb-20 pt-32 sm:pt-40">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="mb-8"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Левая колонка: Галерея */}
                    <ProjectImageGallery images={images} title={item.title} />

                    {/* Правая колонка: Информация о проекте */}
                    <div>
                        <div className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">
                            {item.category}
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
                            {item.title}
                        </h1>

                        <div className="flex items-end gap-2 mb-6 pb-6 border-b border-gray-100">
                            <i className="ri-map-pin-line text-xl text-gray-500"></i>
                            <span className="text-lg font-medium text-gray-900 leading-none">{item.location}</span>
                            <span className="text-gray-400 mx-2">|</span>
                            <i className="ri-calendar-line text-xl text-gray-500"></i>
                            <span className="text-lg font-medium text-gray-900 leading-none">{item.year}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-4 text-base">
                            {item.description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-8">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:border-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <i className="ri-arrow-left-s-line text-base" />
                                Все проекты
                            </Link>
                            <ContactModalButton
                                message={`КП по проекту: «${item.title}»`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                            >
                                Запросить КП
                                <i className="ri-send-plane-fill text-base" />
                            </ContactModalButton>
                        </div>

                        {item.specs && item.specs.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-list-settings-line text-red-600"></i>
                                    Характеристики проекта
                                </h3>
                                <div className="rounded-xl border border-gray-100 overflow-hidden text-sm">
                                    {item.specs.map((spec: string, idx: number) => {
                                        const parts = spec.split(':');
                                        const label = parts[0];
                                        const value = parts.slice(1).join(':').trim();
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex justify-between p-3.5 ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                                                    }`}
                                            >
                                                {parts.length > 1 ? (
                                                    <>
                                                        <span className="text-gray-500">{label.trim()}</span>
                                                        <span className="font-semibold text-gray-900 text-right">{value}</span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-gray-900 text-left w-full">
                                                        <i className="ri-check-line text-red-500 mr-2"></i>
                                                        {spec}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div className="bg-red-50/50 rounded-xl p-5 flex gap-4 items-start border border-red-100">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="ri-shield-star-line text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Реализуем аналогичный проект</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Мы можем спроектировать и установить похожую линию под ваши задачи и особенности сырья.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 pt-20">
                {item.video && (
                    <ProjectVideo
                        videoUrl={item.video}
                        title={item.title}
                        poster={item.image}
                    />
                )}
                <ContactForm initialMessage={`Требуется консультация по проекту: «${item.title}»`} isModal={false} />
            </div>
        </div>
    );
}
