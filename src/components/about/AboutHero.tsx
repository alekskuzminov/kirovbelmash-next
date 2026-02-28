import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { companyStats } from '@/data/about';

export default function AboutHero() {
    return (
        <section className="relative min-h-[450px] sm:min-h-[600px] overflow-visible pb-32 sm:pb-40 lg:pb-48 mb-16 sm:mb-24 bg-gray-900">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/about/about-hero-bg.webp"
                    alt="Производственный комплекс КировБелМаш"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/35"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-24">
                <div className="max-w-2xl">
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', href: '/' },
                            { label: 'О компании' }
                        ]}
                        className="mb-3 sm:mb-4"
                        textColor="text-gray-300"
                        activeTextColor="text-white"
                        hoverColor="hover:text-white"
                    />
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">О компании</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                        КировБелМаш —<br />надёжный партнёр<br />
                        <span className="text-red-500">с 2014 года</span>
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-200 leading-relaxed max-w-lg mb-6 sm:mb-8">
                        Мы проектируем и производим промышленное оборудование для брикетирования и гранулирования.
                        Полный цикл — от идеи до запуска производства.
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Link href="#history" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer">
                            Наша история
                        </Link>
                        <Link href="#team" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer">
                            Команда
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 w-full translate-y-1/2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                        {companyStats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-5 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="text-lg sm:text-2xl font-bold text-red-600 mb-0.5 sm:mb-1">{stat.value}</div>
                                <div className="text-[9px] sm:text-xs text-gray-500 leading-tight">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
