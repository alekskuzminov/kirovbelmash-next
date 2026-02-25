import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data/projects';

export default function Projects() {
    return (
        <section id="projects" className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Реализованные проекты
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
                        Производственные линии и оборудование для изготовления топливных брикетов и пеллет
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                    {projectsData.slice(0, 3).map((project) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.id}`}
                            className="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            <div className="relative w-full h-48 sm:h-64 bg-gray-100 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    loading="lazy"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 bg-red-600 text-white text-[10px] sm:text-xs font-semibold rounded-full">
                                    {project.year}
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                    {project.title}
                                </h3>
                                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                                    <i className="ri-map-pin-line text-red-600"></i>
                                    <span>{project.location}</span>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <Link
                        href="/projects"
                        className="inline-block px-6 sm:px-8 py-3 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        Смотреть все проекты
                    </Link>
                </div>
            </div>
        </section>
    );
}
