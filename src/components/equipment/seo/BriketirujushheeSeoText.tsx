import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';

export default function BriketirujushheeSeoText() {
    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Станок для производства брикетов из опилок
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Левая колонка — основной контент */}
                    <div className="lg:col-span-2 space-y-6">

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Мы производим брикетировочное оборудование на собственном заводе в
                            Кировской области. Основная модель —{' '}
                            <Link
                                href="/oborudovanie/press-pbm2-dlya-briketov"
                                className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium"
                            >
                                шнековый пресс ПБМ-2
                            </Link>
                            , станок для изготовления топливных брикетов Pini&nbsp;Kay из опилок
                            и мелкой древесной фракции без связующих. Производительность — 500–1000&nbsp;кг/ч,
                            влажность сырья на входе — 8–12%.
                        </p>

                        {/* Quote-блок */}
                        <div className="bg-red-50 rounded-xl py-6 px-6 sm:px-8 border border-red-100 relative">
                            <svg className="absolute top-4 left-4 w-6 h-6 text-red-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-base sm:text-lg text-gray-800 italic font-medium leading-relaxed pl-4">
                                Станок для прессовки брикетов из опилок окупается быстрее, чем
                                гранулятор: меньше расходников, проще обслуживание.
                                В нашей практике — срок окупаемости 12–18 месяцев при загрузке
                                одной смены.
                            </p>
                        </div>

                        {/* Типы брикетов и их применение */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-fire-line text-red-600 text-xl" />
                                Какие брикеты производит станок
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Pini Kay — плотный брикет с отверстием, горит 3–4 часа',
                                    'Сырьё: опилки, стружка, мебельная пыль фракции 1–5 мм',
                                    'Без связующих — только давление и нагрев до 250–300 °C',
                                    'Влажность входного сырья 8–12% (нужна сушка при выше 14%)',
                                    'Плотность брикета 1,0–1,2 г/см³',
                                    'Теплотворность до 4 800 ккал/кг',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                        <i className="ri-checkbox-circle-fill text-red-600 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Подготовка сырья */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Если сырьё влажнее 14% или крупнее 5 мм — перед станком для
                            брикетирования устанавливается{' '}
                            <Link href="/sushilnie-linii" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                сушильная линия
                            </Link>{' '}
                            и дробилка. Полная схема — в составе{' '}
                            <Link href="/linii-briketirovaniya" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                линии брикетирования под ключ
                            </Link>.
                            Поставляем как отдельный станок, так и комплект с автоматом резки,
                            транспортёрами и системой управления.
                        </p>

                        {/* Блок: покупка */}
                        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-price-tag-3-line text-red-600 text-xl" />
                                Купить станок для брикетов от производителя
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                Цена зависит от комплектации: базовый пресс, пресс + автомат резки
                                или полная линия с сушкой и дроблением. Поставляем по всей России.
                                Договор, паспорт оборудования, гарантия 36 месяцев. Срок
                                изготовления — 6–8 недель.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Точную стоимость станка для производства топливных брикетов из
                                опилок рассчитаем после уточнения параметров сырья и
                                производительности.
                            </p>
                        </div>
                    </div>

                    {/* Правая колонка — CTA-карточка */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-[#1a1f2c] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-5">
                                <i className="ri-mail-send-line text-white text-xl" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">
                                Рассчитаем цену под ваше сырьё
                            </h3>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                Укажите вид сырья, влажность и желаемую производительность —
                                подготовим КП с ценой и сроками изготовления.
                            </p>
                            <ContactModalButton
                                message="Запрос КП: Станок для брикетов"
                                className="w-full px-5 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                            >
                                Запросить КП
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
