import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';

export default function GranuljatorOgm15SeoText() {
    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Гранулятор ОГМ-1,5 для пеллет из опилок
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Левая колонка — основной контент */}
                    <div className="lg:col-span-2 space-y-6">

                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            ОГМ-1,5 — промышленный пресс-гранулятор с кольцевой матрицей,
                            который мы производим на собственном заводе в Кировской области.
                            Предназначен для выпуска топливных пеллет из опилок, стружки,
                            соломы и лузги. Производительность — 0,9–1,2 т/ч при диаметре
                            гранул 6–8 мм и мощности привода 75–90 кВт.
                        </p>

                        {/* Quote-блок */}
                        <div className="bg-red-50 rounded-xl py-6 px-6 sm:px-8 border border-red-100 relative">
                            <svg className="absolute top-4 left-4 w-6 h-6 text-red-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-base sm:text-lg text-gray-800 italic font-medium leading-relaxed pl-4">
                                Ресурс матрицы гранулятора — главный операционный показатель.
                                На наших ОГМ-1,5 матрица из легированной стали ходит 800–1200
                                рабочих часов на сухом опиле. Замена — 1,5–2 часа без снятия
                                гранулятора с рамы. Ролики меняются независимо от матрицы.
                            </p>
                        </div>

                        {/* Преимущества */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-shield-check-line text-red-600 text-xl" />
                                Почему выбирают гранулятор ОГМ-1,5
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Кольцевая матрица — равномерный износ, стабильное качество гранулы',
                                    'Частотный преобразователь — мягкий старт, защита двигателя',
                                    'Автоматическая смазка прессующего узла',
                                    'Датчик температуры подшипников с аварийным отключением',
                                    'Матрица и ролики из легированной стали — ресурс 800–1200 ч',
                                    'Производство из РФ — запчасти на складе, срок поставки 1–5 дней',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                        <i className="ri-checkbox-circle-fill text-red-600 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Матрица и расходники */}
                        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-tools-line text-red-600 text-xl" />
                                Матрица и расходники для гранулятора
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                Поставляем матрицы диаметром 6 и 8 мм, ролики, подшипниковые
                                узлы и уплотнения. Все расходники — собственного производства
                                или от проверенных российских поставщиков. Матрица под конкретное
                                сырьё подбирается по фракции и влажности — уточним при заказе.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Гарантия на гранулятор — 36 месяцев. Гарантия на матрицу —
                                зависит от сырья и соблюдения регламента обслуживания.
                            </p>
                        </div>

                        {/* Состав линии */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Гранулятор ОГМ-1,5 устанавливается в составе{' '}
                            <Link href="/linii-granulirovaniya" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                линии гранулирования
                            </Link>{' '}
                            совместно с сушилкой,{' '}
                            <Link href="/oborudovanie/kolonna-ohlazhdenija" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                колонной охлаждения гранул
                            </Link>,
                            транспортёрами и системой аспирации. Поставляем как отдельный
                            гранулятор, так и линию под ключ.
                        </p>

                        {/* Блок: покупка */}
                        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-price-tag-3-line text-red-600 text-xl" />
                                Купить гранулятор для пеллет от завода
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                Цена на гранулятор ОГМ-1,5 зависит от комплектации: базовый
                                пресс, с частотным преобразователем, с системой автосмазки.
                                Поставляем напрямую с завода — договор, паспорт, гарантия
                                36 месяцев. Доставка по всей России. Срок изготовления —
                                6–8 недель.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Точную стоимость рассчитаем после уточнения вида сырья,
                                влажности и требуемой производительности.
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
                                Рассчитаем цену гранулятора
                            </h3>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                Укажите вид сырья, влажность и желаемую производительность —
                                подготовим КП с ценой, сроками и подбором матрицы.
                            </p>
                            <ContactModalButton
                                message="Запрос КП: Гранулятор ОГМ-1,5"
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
