export default function ContactDetails() {
    return (
        <section className="py-10 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                    {/* Left Column - Company Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Реквизиты компании
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                        <i className="ri-building-2-line text-red-600 text-base"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Компания</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            &quot;КировБелМаш&quot;
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                        <i className="ri-file-text-line text-red-600 text-base"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">ИНН/КПП</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            4345006974/430301001
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                        <i className="ri-file-list-3-line text-red-600 text-base"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">ОГРН</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            1174350015223
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Адреса</h3>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-map-pin-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Юридический адрес
                                            </p>
                                            <p className="text-sm text-gray-900 leading-relaxed">
                                                Россия, 613200, Кировская область, г. Белая Холуница,
                                                ул. Советская, д. 8
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-store-2-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Адрес склада</p>
                                            <p className="text-sm text-gray-900 leading-relaxed">
                                                Россия, 613200, Кировская область, г. Белая Холуница,
                                                ул. Глазырина, д. 112Л
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                График работы
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                        <i className="ri-time-line text-red-600 text-base"></i>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-sm font-medium text-gray-900">
                                                Пн — Пт:
                                            </span>
                                            <span className="text-sm text-gray-700">
                                                7:30 — 16:30
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-medium text-gray-900">
                                                Сб — Вс:
                                            </span>
                                            <span className="text-sm text-red-600">Выходные</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a
                                href="https://t.me/"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center bg-sky-500 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                            >
                                <i className="ri-telegram-fill text-xl"></i>
                            </a>
                            <a
                                href="https://wa.me/79005218477"
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                            >
                                <i className="ri-whatsapp-fill text-xl"></i>
                            </a>
                            <a
                                href="tel:+79005218477"
                                className="w-12 h-12 flex items-center justify-center bg-violet-600 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                            >
                                <i className="ri-phone-fill text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Phones & Emails */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Телефоны и почта
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-phone-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Общий</p>
                                            <a
                                                href="tel:+78336441850"
                                                className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                +7-833-644-18-50
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-shopping-bag-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Отдел продаж
                                            </p>
                                            <a
                                                href="tel:+79005218477"
                                                className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                +7-900-521-84-77
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-truck-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Отдел снабжения
                                            </p>
                                            <a
                                                href="tel:+79195263341"
                                                className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                +7-919-526-33-41
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-calculator-line text-red-600 text-base"></i>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Бухгалтерия
                                            </p>
                                            <a
                                                href="tel:+79513474534"
                                                className="block text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                                            >
                                                +7-951-347-45-34
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Почта</h3>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-md flex-shrink-0 mt-0.5">
                                            <i className="ri-mail-line text-red-600 text-base"></i>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    Общая почта
                                                </p>
                                                <a
                                                    href="mailto:brike@kirovbelmash.tw1.ru"
                                                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                                                >
                                                    brike@kirovbelmash.tw1.ru
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    Отдел продаж
                                                </p>
                                                <a
                                                    href="mailto:sale@kirovbelmash.tw1.ru"
                                                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                                                >
                                                    sale@kirovbelmash.tw1.ru
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    Отдел снабжения
                                                </p>
                                                <a
                                                    href="mailto:snab@kirovbelmash.tw1.ru"
                                                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                                                >
                                                    snab@kirovbelmash.tw1.ru
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    Конструкторский отдел
                                                </p>
                                                <a
                                                    href="mailto:ogk@kirovbelmash.tw1.ru"
                                                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                                                >
                                                    ogk@kirovbelmash.tw1.ru
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-0.5">
                                                    Бухгалтерия
                                                </p>
                                                <a
                                                    href="mailto:mail@kirovbelmash.tw1.ru"
                                                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                                                >
                                                    mail@kirovbelmash.tw1.ru
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
