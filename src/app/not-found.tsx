import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Основной контент */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="max-w-lg">
                    <div className="text-8xl font-black text-red-600 mb-4 leading-none">404</div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Страница не найдена
                    </h1>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Запрашиваемая страница не существует или была перемещена.
                        Воспользуйтесь навигацией ниже, чтобы найти нужный раздел.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            <i className="ri-home-line"></i>
                            На главную
                        </Link>
                        <Link
                            href="/oborudovanie"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors"
                        >
                            <i className="ri-tools-line"></i>
                            Каталог оборудования
                        </Link>
                    </div>

                    {/* Быстрые ссылки */}
                    <div className="border-t border-gray-100 pt-8">
                        <p className="text-sm text-gray-400 mb-4">Популярные разделы</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { href: '/linii-briketirovaniya', label: 'Линии брикетирования' },
                                { href: '/linii-granulirovaniya', label: 'Линии гранулирования' },
                                { href: '/projects', label: 'Проекты' },
                                { href: '/calculator', label: 'Калькулятор' },
                                { href: '/contacts', label: 'Контакты' },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg border border-gray-200 hover:border-red-200 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Подвал */}
            <footer className="border-t border-gray-100 px-4 py-4 text-center">
                <p className="text-xs text-gray-400">
                    © {SITE_CONFIG.company.copyrightYear} {SITE_CONFIG.company.name} —{' '}
                    <a href={`tel:${SITE_CONFIG.contacts.phone}`} className="hover:text-red-500 transition-colors">
                        {SITE_CONFIG.contacts.phoneFormatted}
                    </a>
                </p>
            </footer>
        </div>
    );
}
