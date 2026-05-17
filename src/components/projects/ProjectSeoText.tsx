import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';

interface ResultItem {
    icon: string;
    label: string;
    value: string;
}

interface ProjectSeoTextProps {
    title: string;
    quote: string;
    paragraphs: string[];
    listTitle?: string;
    listItems?: string[];
    listFooter?: string;
    resultsBlock?: {
        title: string;
        items: ResultItem[];
        footer?: string;
    };
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    ctaMessage: string;
    links?: { text: string; href: string }[];
    priceBlock?: {
        title: string;
        lines: string[];
    };
}

export default function ProjectSeoText({
    title,
    quote,
    paragraphs,
    listTitle,
    listItems,
    listFooter,
    resultsBlock,
    ctaTitle,
    ctaDescription,
    ctaButtonText,
    ctaMessage,
    links,
    priceBlock,
}: ProjectSeoTextProps) {
    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Заголовок секции */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {title}
                    </h2>
                </div>

                {/* Двухколоночный layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Левая колонка — основной контент */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Вводные абзацы */}
                        {paragraphs.map((text, idx) => (
                            <p key={idx} className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                {text}
                            </p>
                        ))}

                        {/* Quote-блок */}
                        <div className="bg-red-50 rounded-xl py-6 px-6 sm:px-8 border border-red-100 relative">
                            <svg className="absolute top-4 left-4 w-6 h-6 text-red-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-base sm:text-lg text-gray-800 italic font-medium leading-relaxed pl-4">
                                {quote}
                            </p>
                        </div>

                        {/* Список с иконками (состав) */}
                        {listItems && listItems.length > 0 && (
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-settings-3-line text-red-600 text-xl" />
                                    {listTitle}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {listItems.map((item) => (
                                        <div key={item} className="flex items-start gap-2.5">
                                            <i className="ri-checkbox-circle-fill text-red-600 text-lg mt-0.5 flex-shrink-0" />
                                            <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                {listFooter && (
                                    <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                                        {listFooter}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Блок результатов проекта */}
                        {resultsBlock && (
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-bar-chart-box-line text-red-600 text-xl" />
                                    {resultsBlock.title}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {resultsBlock.items.map((item) => (
                                        <div key={item.label} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <i className={`${item.icon} text-red-600 text-lg`} />
                                            </div>
                                            <div>
                                                <p className="text-lg sm:text-xl font-bold text-gray-900">{item.value}</p>
                                                <p className="text-sm text-gray-500">{item.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {resultsBlock.footer && (
                                    <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                                        {resultsBlock.footer}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Ссылки на услуги */}
                        {links && links.length > 0 && (
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                Реализуем проекты «под ключ»:{' '}
                                {links.map((link, idx) => (
                                    <span key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium"
                                        >
                                            {link.text}
                                        </Link>
                                        {idx < links.length - 1 ? ', ' : '. '}
                                    </span>
                                ))}
                                Гарантия — 36 месяцев, сервисная поддержка — на весь срок эксплуатации.
                            </p>
                        )}

                        {/* Блок цены */}
                        {priceBlock && (
                            <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="ri-price-tag-3-line text-red-600 text-xl" />
                                    {priceBlock.title}
                                </h3>
                                {priceBlock.lines.map((line, idx) => (
                                    <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 last:mb-0">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Правая колонка — CTA-карточка */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-[#1a1f2c] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-5">
                                <i className="ri-mail-send-line text-white text-xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                                {ctaTitle}
                            </h3>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                {ctaDescription}
                            </p>
                            <ContactModalButton
                                message={ctaMessage}
                                className="w-full px-5 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                {ctaButtonText}
                                <i className="ri-arrow-right-line text-base" />
                            </ContactModalButton>
                            <a
                                href="tel:+79005218477"
                                className="mt-3 w-full px-5 py-3 bg-white/10 text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <i className="ri-phone-line text-base" />
                                +7 (900) 521-84-77
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
