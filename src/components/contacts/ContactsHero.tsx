import Link from 'next/link';

export default function ContactsHero() {
    return (
        <section className="pt-32 sm:pt-40 pb-8 sm:pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">
                    <Link href="/" className="hover:text-white transition-colors cursor-pointer">
                        Главная
                    </Link>
                    <i className="ri-arrow-right-s-line text-gray-500"></i>
                    <span className="text-white">Контакты</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">КОНТАКТЫ</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Отдел продаж:</h3>
                        <a
                            href="mailto:sale@kirovbelmash.tw1.ru"
                            className="block text-red-400 hover:text-red-300 text-sm mb-2 cursor-pointer transition-colors"
                        >
                            sale@kirovbelmash.tw1.ru
                        </a>
                        <a
                            href="tel:+79005218477"
                            className="block text-gray-300 hover:text-white text-sm cursor-pointer transition-colors"
                        >
                            +7-900-521-84-77
                        </a>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Отдел снабжения:</h3>
                        <a
                            href="mailto:snab@kirovbelmash.tw1.ru"
                            className="block text-red-400 hover:text-red-300 text-sm mb-2 cursor-pointer transition-colors"
                        >
                            snab@kirovbelmash.tw1.ru
                        </a>
                        <a
                            href="tel:+79195263341"
                            className="block text-gray-300 hover:text-white text-sm cursor-pointer transition-colors"
                        >
                            +7-919-526-33-41
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
