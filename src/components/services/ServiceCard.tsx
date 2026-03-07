import Image from 'next/image';
import Link from 'next/link';
import { Service } from './servicesData';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full">
            <div className="relative w-full h-40 sm:h-56 overflow-hidden flex-shrink-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg">
                    Этап {service.number}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 mb-1">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-lg">
                            <i className={`${service.icon} text-lg text-white`} aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white">
                            {service.title}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-200 line-clamp-1">{service.subtitle}</p>
                </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                    {service.shortDesc}
                </p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5">
                            <i className="ri-time-line text-red-500 text-base"></i>
                            <span className="text-xs text-gray-500">
                                {service.duration}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <i className="ri-bar-chart-box-line text-red-500 text-base"></i>
                            <span className="text-xs text-gray-500">
                                {service.stats.value} {service.stats.label}
                            </span>
                        </div>
                    </div>
                </div>

                <Link
                    href={`/services/${service.id}`}
                    className="flex items-center space-x-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                    <span>Подробнее</span>
                    <i className="ri-arrow-right-line text-lg" aria-hidden="true"></i>
                </Link>
            </div>
        </div>
    );
}
