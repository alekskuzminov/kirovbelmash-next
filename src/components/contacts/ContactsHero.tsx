import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { SITE_CONFIG } from '@/config/site.config';

export default function ContactsHero() {
    const { sales, supply } = SITE_CONFIG.contacts.departments;

    return (
        <section className="relative pt-32 sm:pt-40 pb-8 sm:pb-12 overflow-hidden bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/contacts/contacts-hero-bg.png"
                    alt="Контакты КировБелМаш"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/50 to-black/75 shadow-inner" />
                {/* Top overlay for header readability */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs
                    items={[
                        { label: 'Главная', href: '/' },
                        { label: 'Контакты' }
                    ]}
                    className="mb-4 sm:mb-6"
                    textColor="text-gray-400"
                    activeTextColor="text-white"
                    hoverColor="hover:text-white"
                />

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5">КОНТАКТЫ</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Отдел продаж:</h3>
                        <a
                            href={`mailto:${sales.email}`}
                            className="block text-red-400 hover:text-red-300 text-sm mb-2 cursor-pointer transition-colors"
                        >
                            {sales.email}
                        </a>
                        <a
                            href={`tel:${sales.phone}`}
                            className="block text-gray-300 hover:text-white text-sm cursor-pointer transition-colors"
                        >
                            {sales.phoneFormatted}
                        </a>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Отдел снабжения:</h3>
                        <a
                            href={`mailto:${supply.email}`}
                            className="block text-red-400 hover:text-red-300 text-sm mb-2 cursor-pointer transition-colors"
                        >
                            {supply.email}
                        </a>
                        <a
                            href={`tel:${supply.phone}`}
                            className="block text-gray-300 hover:text-white text-sm cursor-pointer transition-colors"
                        >
                            {supply.phoneFormatted}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
