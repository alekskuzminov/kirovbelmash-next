import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';

export default function BriquettingSeoText() {
    return (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Заголовок секции */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-0.5 bg-red-500" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Линия брикетирования и оборудование для производства брикетов от производителя
                    </h2>
                </div>

                {/* Двухколоночный layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Левая колонка — основной контент */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Вводный абзац */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Линия по производству брикетов из опилок — это не один пресс, а связанный
                            комплект оборудования для брикетов: подготовка сырья, сушка, накопление,
                            прессование, резка и автоматика. КировБелМаш проектирует и изготавливает
                            такие линии полного цикла на собственной производственной площадке в
                            Кировской области. Покупая напрямую у производителя, вы получаете заводскую
                            цену без посредников и одного ответственного подрядчика на весь проект.
                        </p>

                        {/* Quote-блок */}
                        <div className="bg-red-50 rounded-xl py-6 px-6 sm:px-8 border border-red-100 relative">
                            <svg className="absolute top-4 left-4 w-6 h-6 text-red-200 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                            </svg>
                            <p className="text-base sm:text-lg text-gray-800 italic font-medium leading-relaxed pl-4">
                                Главное преимущество линии брикетирования — переработка древесных
                                отходов в товарный продукт с понятной экономикой. Опилки, стружка,
                                щепа и лузга превращаются в топливные брикеты без связующих
                                добавок: форму держит сам лигнин, который выделяется при нагреве
                                и давлении. Поэтому оборудование для производства брикетов хорошо
                                подходит предприятиям, которые хотят монетизировать отходы, а не
                                просто снизить расходы на утилизацию.
                            </p>
                        </div>

                        {/* Список с иконками — состав линии */}
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-settings-3-line text-red-600 text-xl" />
                                Что входит в оборудование для производства брикетов из опилок
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    'Рубительная машина / измельчитель',
                                    'Молотковая дробилка',
                                    'Теплогенератор для сушки',
                                    'Сушильный барабан',
                                    'Бункер-накопитель с ворошителем',
                                    'Пресс для брикетов Pini & Kay',
                                    'Автомат резки брикетов',
                                    'Система автоматики и управления',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-2.5">
                                        <i className="ri-checkbox-circle-fill text-red-600 text-lg mt-0.5 flex-shrink-0" />
                                        <span className="text-sm sm:text-base text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                                В результате вы получаете не отдельный станок для брикетов, а
                                увязанную линию брикетирования, где все узлы подобраны по
                                производительности, влажности сырья и формату готового брикета.
                            </p>
                        </div>

                        {/* Абзац про «под ключ» */}
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Для предприятий, которые планируют запуск производства брикетов с нуля,
                            мы предлагаем комплексную услугу «под ключ»:{' '}
                            <Link href="/services/design" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                проектирование
                            </Link>{' '}
                            технологической схемы под ваше помещение и сырьё,{' '}
                            <Link href="/services/installation" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                монтаж
                            </Link>{' '}
                            и{' '}
                            <Link href="/services/commissioning" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                пусконаладку
                            </Link>{' '}
                            силами наших инженеров,{' '}
                            <Link href="/services/training" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                обучение персонала
                            </Link>{' '}
                            работе на оборудовании для брикетирования. Гарантия — 36 месяцев,
                            сервисная поддержка — на весь срок эксплуатации.
                        </p>

                        <div className="border border-red-100 rounded-xl p-5 sm:p-6 bg-red-50/60">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-git-branch-line text-red-600 text-xl" />
                                Нужны отдельные станки, а не вся линия?
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Если вы модернизируете действующий цех, можно купить не только
                                комплексную линию, но и отдельное оборудование для производства
                                брикетов: например,{' '}
                                <Link href="/oborudovanie/press-pbm2-dlya-briketov" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                    пресс ПБМ-2
                                </Link>{' '}
                                или весь раздел{' '}
                                <Link href="/oborudovanie/briketirujushhee-oborudovanie" className="text-red-600 underline underline-offset-2 hover:text-red-700 font-medium">
                                    станков для производства брикетов
                                </Link>.
                                Если же вы запускаете производство с нуля, выгоднее линия
                                брикетирования под ключ: она сразу учитывает сушку, транспорт,
                                резку и автоматику.
                            </p>
                        </div>

                        {/* Блок: как купить / цена за комплект */}
                        <div className="border border-gray-200 rounded-xl p-5 sm:p-6 bg-gray-50">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-price-tag-3-line text-red-600 text-xl" />
                                Цена за комплект и условия поставки
                            </h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                                Цена линии брикетирования и комплекта оборудования для производства
                                топливных брикетов из опилок зависит от производительности: от 10,5 млн ₽
                                за решение на 500 кг/ч до 33 млн ₽ на 2000 кг/ч. В стоимость входит
                                всё основное оборудование — от рубительной машины до системы автоматики.
                                Монтаж и пусконаладка рассчитываются отдельно исходя из удалённости объекта.
                            </p>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                Купить линию по производству брикетов или отдельный станок можно
                                напрямую с завода: без посредников, с договором, актом и гарантийным
                                талоном. Срок изготовления — 6–8 недель с момента подписания договора.
                                Доставка по всей России и в страны СНГ.
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
                                Подберём линию или отдельное оборудование
                            </h3>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                Расскажите о задаче — рассчитаем стоимость, подберём
                                состав оборудования и подготовим коммерческое предложение.
                            </p>
                            <ContactModalButton
                                message="Подбор линии и оборудования для брикетирования"
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
