import Link from 'next/link';
import { projectsData, Project } from './projectsData';
import ProjectCard from './ProjectCard';

interface Props {
    currentSlug: string;
    category: string;
}

export default function RelatedProjectsBlock({ currentSlug, category }: Props) {
    // Сначала ищем проекты той же категории (исключая текущий)
    let related: Project[] = projectsData
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .slice(0, 3);

    // Если в категории нет 3 проектов — добираем из других категорий
    if (related.length < 3) {
        const extra = projectsData
            .filter((p) => p.slug !== currentSlug && p.category !== category)
            .slice(0, 3 - related.length);
        related = [...related, ...extra];
    }

    if (related.length === 0) return null;

    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                            Похожие проекты
                        </h2>
                        <p className="text-base text-gray-500">
                            Другие реализованные линии {category !== 'Комбинированные линии' ? `— ${category.toLowerCase()}` : ''}
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors shrink-0"
                    >
                        Все проекты
                        <i className="ri-arrow-right-line" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {related.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                <div className="mt-6 sm:hidden text-center">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                        Все проекты
                        <i className="ri-arrow-right-line" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
