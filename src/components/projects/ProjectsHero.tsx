import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { projectStats } from './projectsData';

export default function ProjectsHero() {
    return (
        <section className="relative min-h-[450px] sm:min-h-[480px] overflow-visible mb-16 sm:mb-24">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/projects/projects-hero-bg.webp"
                    alt="Реализованные проекты КировБелМаш"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent h-1/2"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24">
                <div className="max-w-2xl">
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', href: '/' },
                            { label: 'Проекты' }
                        ]}
                        className="mb-3 sm:mb-4"
                        textColor="text-gray-300"
                        activeTextColor="text-white"
                        hoverColor="hover:text-white"
                    />
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                            Портфолио
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                        Реализованные<br />проекты
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-200 leading-relaxed max-w-lg">
                        Более 80 успешно запущенных производственных линий по всей России. Каждый проект —
                        индивидуальное решение под задачи клиента.
                    </p>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 w-full translate-y-1/2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                        {projectStats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="text-xl sm:text-3xl font-bold text-red-600 mb-0.5 sm:mb-1">{stat.value}</div>
                                <div className="text-[10px] sm:text-sm text-gray-600 leading-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
