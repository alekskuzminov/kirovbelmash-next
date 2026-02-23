import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { projectsData } from '@/components/projects/projectsData';
import ContactForm from '@/components/home/ContactForm';
import ProjectImageGallery from '@/components/projects/ProjectImageGallery';

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id.toString(),
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = projectsData.find((p) => p.id.toString() === id);

    if (!project) {
        return {
            title: 'Проект не найден',
        };
    }

    return {
        title: `${project.title} | Проекты КировБелМаш`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const item = projectsData.find((p) => p.id.toString() === id);

    if (!item) {
        notFound();
    }

    const images = Array(5).fill(item.image);

    return (
        <div className="min-h-screen bg-white pb-20 pt-32 lg:pt-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                    <Link href="/" className="hover:text-red-600 transition-colors">Главная</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/projects" className="hover:text-red-600 transition-colors">Проекты</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">{item.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Левая колонка: Галерея */}
                    <ProjectImageGallery images={images} title={item.title} />

                    {/* Правая колонка: Информация о проекте */}
                    <div>
                        <div className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">
                            {item.category}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {item.title}
                        </h1>

                        <div className="flex items-end gap-2 mb-6 pb-6 border-b border-gray-100">
                            <i className="ri-map-pin-line text-xl text-gray-500"></i>
                            <span className="text-lg font-medium text-gray-900 leading-none">{item.location}</span>
                            <span className="text-gray-400 mx-2">|</span>
                            <i className="ri-calendar-line text-xl text-gray-500"></i>
                            <span className="text-lg font-medium text-gray-900 leading-none">{item.year}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-base">
                            {item.description}
                        </p>

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
                <ContactForm initialMessage={`Требуется консультация по проекту: «${item.title}»`} isModal={false} />
            </div>
        </div>
    );
}
