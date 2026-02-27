'use client';

import { useState, useMemo } from 'react';
import { projectsData, projectCategories, Project } from './projectsData';
import ProjectCard from './ProjectCard';

const monthMap: Record<string, number> = {
    'Январь': 1, 'Февраль': 2, 'Март': 3, 'Апрель': 4, 'Май': 5, 'Июнь': 6,
    'Июль': 7, 'Август': 8, 'Сентябрь': 9, 'Октябрь': 10, 'Ноябрь': 11, 'Декабрь': 12
};

export default function ProjectsGallery() {
    const [activeCategory, setActiveCategory] = useState('Все');
    const [activeYear, setActiveYear] = useState('Все');

    // Dynamically calculate available years from data
    const availableYears = useMemo(() => {
        const years = Array.from(new Set(projectsData.map(p => p.year)));
        return ['Все', ...years.sort((a, b) => b.localeCompare(a))];
    }, []);

    // Combined filtering and sorting
    const filteredAndSorted = useMemo(() => {
        return projectsData
            .filter((p) => {
                const categoryMatch = activeCategory === 'Все' || p.category === activeCategory;
                const yearMatch = activeYear === 'Все' || p.year === activeYear;
                return categoryMatch && yearMatch;
            })
            .sort((a, b) => {
                // Sort by year desc
                if (b.year !== a.year) return b.year.localeCompare(a.year);
                // Then by month desc
                return (monthMap[b.month] || 0) - (monthMap[a.month] || 0);
            });
    }, [activeCategory, activeYear]);

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

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4">
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

                {/* Years Filter */}
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
                    {availableYears.map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`px-3 sm:px-4 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-200 whitespace-nowrap border cursor-pointer ${activeYear === year
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                    {filteredAndSorted.map((project) => (
                        <div key={project.id}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>

                {filteredAndSorted.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                            <i className="ri-folder-open-line text-2xl text-gray-400"></i>
                        </div>
                        <p className="text-gray-500">В данной категории или году пока нет проектов</p>
                    </div>
                )}
            </div>
        </section>
    );
}
