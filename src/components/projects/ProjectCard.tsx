import Image from 'next/image';
import Link from 'next/link';
import { Project } from './projectsData';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer h-full"
        >
            <div className="relative w-full h-48 sm:h-56 bg-gray-100 overflow-hidden">
                <Image
                    src={project.image}
                    alt={`${project.title} — ${project.location}`}
                    title={`${project.title} — промышленное оборудование КировБелМаш`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <i className="ri-arrow-right-line text-xl text-gray-800"></i>
                    </div>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-gray-800 text-xs font-medium rounded-full backdrop-blur-sm shadow-sm">
                    {project.category}
                </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between h-[calc(100%-12rem)] sm:h-[calc(100%-14rem)]">
                <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-red-600 transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        <div className="flex items-center space-x-1.5 line-clamp-1">
                            <i className="ri-map-pin-line text-red-500 shrink-0"></i>
                            <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 shrink-0 ml-auto">
                            <i className="ri-calendar-line text-red-500"></i>
                            <span className="font-medium text-gray-600">{project.year}</span>
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {project.description}
                    </p>
                </div>
                {project.specs && project.specs.length > 0 && (
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                        {project.specs.slice(0, 2).map((spec, i) => {
                            const parts = typeof spec === 'string' ? spec.split(':') : [spec];
                            const value = parts.length > 1 ? parts.slice(1).join(':').trim() : String(spec);
                            return (
                                <span key={i} className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-50 text-gray-600 text-[10px] sm:text-xs rounded-md border border-gray-100 whitespace-nowrap overflow-hidden text-ellipsis max-w-[220px]">
                                    {value}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </Link>
    );
}
