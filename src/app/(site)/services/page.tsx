import type { Metadata } from 'next';
import { servicesData } from '@/components/services/servicesData';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesHero from '@/components/services/ServicesHero';
import ProcessSteps from '@/components/services/ProcessSteps';
import ServiceDetails from '@/components/services/ServiceDetails';
import ServicesAdvantages from '@/components/services/ServicesAdvantages';
import ContactForm from '@/components/home/ContactForm';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';

export const metadata: Metadata = {
    title: 'Услуги',
    description: 'Комплексные услуги КировБелМаш: проектирование, монтаж, пусконаладка, обучение персонала и гарантийное обслуживание производственных линий.',
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'Услуги КировБелМаш',
        description: 'Проектирование, монтаж, пусконаладка и обслуживание линий брикетирования и гранулирования.',
        url: 'https://kirovbelmash.ru/services',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Услуги КировБелМаш',
            },
        ],
    },
};

export default function ServicesPage() {
    return (
        <main>
            <WebPageJsonLd
                type="CollectionPage"
                name="Услуги КировБелМаш"
                description="Проектирование, монтаж, пусконаладка и обучение персонала для производственных линий."
                url="/services"
            />
            <ServicesHero />

            <section id="services" className="pt-20 sm:pt-28 pb-12 sm:pb-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 sm:mb-14">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                            <div className="w-8 h-0.5 bg-red-500"></div>
                            <span className="text-red-600 text-sm font-medium tracking-wider uppercase">
                                Что мы делаем
                            </span>
                            <div className="w-8 h-0.5 bg-red-500"></div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Наши услуги
                        </h2>
                        <p className="text-base text-gray-600 max-w-2xl mx-auto">
                            Комплексный подход к реализации промышленных проектов — от первого
                            чертежа до стабильной работы вашего производства
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {servicesData.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            <ProcessSteps />
            <ServiceDetails />
            <ServicesAdvantages />

            <div id="cta" className="bg-gray-50 pt-20 pb-20">
                <ContactForm
                    initialMessage="Закажите комплекс услуг со скидкой!"
                    isModal={false}
                />
            </div>
        </main>
    );
}
