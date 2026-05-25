import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';

export default function PressPbm2SeoText() {
    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Заголовок секции */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Брикетирующий пресс для производства топливных брикетов из опилок
                    </h2>
                </div>

                {/* Двухколоночный layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Левая колонка — основной контент */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Вводный абзац */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            ПБМ-2 — шнековый экструдер для изготовления топливных брикетов Pini&nbsp;Kay:
                            оборудование собственного производства, которое мы изготавливаем на заводе
                            в Кировской области. Пресс формирует брикет из измельчённых опилок, стружки
                            и другой мелкой фракции без добавления связующих — при нагреве до
                            250–300&nbsp;°C лигнин в древесине плавится и склеивает частицы. На выходе —
                            плотный брикет с характерным отверстием по центру и глянцевой поверхностью обжига.
                        </p>

                        {/* Quote-блок */}
                        <div className="bg-red-50 rounded-xl py-6 px-6 sm:px-8 border border-red-100 relative">
                            <svg className="absolute top-4 left-4 w-6 h-6 text-red-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-base sm:text-lg text-gray-800 italic font-medium leading-relaxed pl-4">
                                Pini&nbsp;Kay продаётся дороже RUF и нестингового брикета —
                                розничная цена на 15–30% выше за счёт плотности и внешнего вида.
                                При этом шнековый пресс проще в обслуживании, чем гидравлический:
                                основной расходник — шнек и обжимная втулка, замена занимает
                                2–3 часа без демонтажа линии.
                            </p>
                        </div>

                        {/* Список — почему ПБМ-2 */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-shield-check-line text-red-600 text-xl" />
                                Почему выбирают пресс ПБМ-2 для брикетов
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Производительность 500–1000 кг/ч на одном шнеке',
                                    'Работа без связующих — только давление и нагрев',
                                    'Компактные габариты — помещается в цех от 80 м²',
                                    'Быстрая замена шнека и втулки без разборки линии',
                                    'Низкое энергопотребление: привод 0,55 кВт + нагрев 2,7 кВт',
                                    'Готовый брикет Pini Kay — премиум-сегмент рынка',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                        <i className="ri-checkbox-circle-fill text-red-600 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Сравнение Pini Kay vs RUF */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-scales-3-line text-red-600 text-xl" />
                                Pini Kay или RUF: какое оборудование для брикетов выбрать
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                                Два основных типа оборудования для производства топливных брикетов из опилок — шнековый экструдер (Pini Kay) и гидравлический пресс (RUF). Принципиальная разница — в форме брикета, цене реализации и требованиях к оператору.
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-100">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="text-left px-4 py-3 font-semibold text-gray-700">Параметр</th>
                                            <th className="text-left px-4 py-3 font-semibold text-red-600">ПБМ-2 (Pini Kay)</th>
                                            <th className="text-left px-4 py-3 font-semibold text-gray-500">Гидравлика (RUF)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[
                                            ['Принцип работы', 'Шнековая экструзия', 'Гидроцилиндр (поршень)'],
                                            ['Форма брикета', 'Шестигранник с отверстием', 'Кирпич 95×155×65 мм'],
                                            ['Производительность', '500–1000 кг/ч', 'до 650 кг/ч'],
                                            ['Цена готового брикета', 'Выше (+15–30%)', 'Ниже'],
                                            ['Плотность', '1,1–1,2 г/см³', '1,0–1,1 г/см³'],
                                            ['Основной расходник', 'Шнек (замена 1–2 ч)', 'Уплотнения гидросистемы'],
                                        ].map(([param, pbm, ruf], i) => (
                                            <tr key={param} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                                <td className="px-4 py-3 text-gray-500">{param}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900">{pbm}</td>
                                                <td className="px-4 py-3 text-gray-600">{ruf}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                                Если цель — производство брикетов для продажи, Pini Kay выигрывает по марже.
                                Мы производим оборудование для брикетов Pini Kay и поставляем его как
                                отдельным прессом ПБМ-2, так и в составе{' '}
                                <Link href="/linii-briketirovaniya" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                    линии брикетирования «под ключ»
                                </Link>.
                            </p>
                        </div>

                        {/* Абзац про сырьё и применение */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Оборудование рассчитано на мелкую фракцию 1–5 мм при влажности 8–12%.
                            Подходят опилки хвойных и лиственных пород, мебельная пыль, шлифовальная
                            стружка. Если на входе крупная щепа или горбыль — перед прессом
                            устанавливается дробилка и{' '}
                            <Link href="/sushilnie-linii" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                сушильная линия
                            </Link>.
                            Полный комплект оборудования для производства топливных брикетов из опилок
                            мы поставляем в составе{' '}
                            <Link href="/linii-briketirovaniya" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                линии брикетирования «под ключ»
                            </Link>.
                        </p>

                        {/* Блок: покупка и условия */}
                        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-price-tag-3-line text-red-600 text-xl" />
                                Купить оборудование для брикетов от производителя
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                ПБМ-2 можно приобрести отдельно или в составе готовой линии
                                брикетирования. Цена зависит от комплектации: базовый пресс,
                                пресс + автомат резки, полная линия с сушкой и дроблением.
                                Точную стоимость рассчитаем после уточнения параметров сырья
                                и требуемой производительности.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Покупка напрямую с завода: договор, паспорт оборудования, гарантия
                                36 месяцев. Доставка по всей России. Срок изготовления — 6–8 недель.
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
                                Рассчитаем стоимость под ваше сырьё
                            </h3>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                Расскажите, какое сырьё и объём планируете перерабатывать —
                                подготовим КП с ценой и сроками.
                            </p>
                            <ContactModalButton
                                message="Запрос КП: Пресс ПБМ-2 для брикетов"
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
