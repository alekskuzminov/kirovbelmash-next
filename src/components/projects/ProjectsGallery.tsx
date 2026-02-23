'use client';

import { useState } from 'react';
import { projectsData, projectCategories } from './projectsData';
import ProjectCard from './ProjectCard';

export default function ProjectsGallery() {
    const [activeCategory, setActiveCategory] = useState('Все');

    const filtered = activeCategory === 'Все'
        ? projectsData
        : projectsData.filter((p) => p.category === activeCategory);

    return (
        <section className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Фотогалерея проектов
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Производственные линии и оборудование, установленные на предприятиях наших клиентов
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
                    {projectCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${activeCategory === cat
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                    {filtered.map((project) => (
                        <div key={project.id}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                            <i className="ri-folder-open-line text-2xl text-gray-400"></i>
                        </div>
                        <p className="text-gray-500">В данной категории пока нет проектов</p>
                    </div>
                )}
            </div>
        </section>
    );
}
