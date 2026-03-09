import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import { servicesData } from '@/components/services/servicesData';
import ContactForm from '@/components/home/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

interface ServicePageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        id: service.id,
    }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { id } = await params;
    const service = servicesData.find((s) => s.id === id);

    if (!service) {
        return {
            title: 'Услуга не найдена',
        };
    }

    return {
        title: service.title,
        description: service.shortDesc,
        alternates: { canonical: `/services/${service.id}` },
        openGraph: {
            title: service.title,
            description: service.shortDesc,
            url: `https://kirovbelmash.ru/services/${service.id}`,
            type: 'website',
            siteName: 'КировБелМаш',
            images: [
                {
                    url: service.image || '/images/logo/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { id } = await params;
    const service = servicesData.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Услуги', href: '/services' },
        { label: service.title },
    ];

    return (
        <main className="pt-32 sm:pt-40 pb-0">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="mb-8 sm:mb-12 shadow-none"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl shadow-lg">
                            Этап {service.number}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-xl">
                                    <i className={`${service.icon} text-2xl text-white`}></i>
                                </div>
                                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    {service.title}
                                </h1>
                            </div>
                            <p className="text-lg text-gray-200 mt-2">{service.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-8 sm:space-y-10">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Описание услуги</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {service.description}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Что входит в услугу:</h3>
                            <ul className="space-y-4">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <i className="ri-check-double-line text-red-500 text-xl mt-0.5 flex-shrink-0"></i>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-red-600">
                                        <i className="ri-time-line text-xl"></i>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Сроки</span>
                                </div>
                                <p className="text-red-700 font-medium text-lg ml-13">{service.duration}</p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-red-600">
                                        <i className="ri-bar-chart-box-line text-xl"></i>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Показатели</span>
                                </div>
                                <p className="text-gray-900 font-medium text-lg ml-13">
                                    <span className="text-2xl font-bold text-red-600 mr-2">{service.stats.value}</span>
                                    {service.stats.label}
                                </p>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                            <ContactModalButton
                                message={`\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443 \u043d\u0430 \u0443\u0441\u043b\u0443\u0433\u0443: \u00ab${service.title}\u00bb`}
                                className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 group"
                            >
                                <span>Заказать услугу</span>
                                <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                            </ContactModalButton>
                            <Link href="/services" className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors group">
                                <i className="ri-arrow-left-line mr-2 transform group-hover:-translate-x-1 transition-transform text-gray-500"></i>
                                <span className="ml-2">Назад к услугам</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 pt-20 pb-20">
                <ContactForm initialMessage={`Оставить заявку на услугу: «${service.title}»`} isModal={false} />
            </div>
        </main>
    );
}
