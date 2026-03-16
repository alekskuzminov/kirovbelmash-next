import Image from 'next/image';
import Link from 'next/link';

export default function GranulationProcess() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Как происходит переработка сырья в топливные пеллеты<br className="hidden sm:block" />
                        на нашем оборудовании?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Линии гранулирования КировБелМаш — это современное оборудование для производства топливных пеллет,
                        позволяющее наладить эффективное производство из различных видов сырья. Процесс изготовления пеллет
                        из опилок, щепы и другого сырья состоит из нескольких этапов:
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Step 1 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/briquetting/raw-material.webp"
                                alt="Сырьё для производства пеллет"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white text-sm font-bold rounded-sm flex items-center justify-center">
                                1
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                                Выбор сырья для переработки
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11">
                            <p className="mb-2">Наше оборудование для гранулирования опилок и других материалов эффективно перерабатывает широкий спектр сырья:</p>
                            <ul className="space-y-1.5">
                                <li>Древесные опилки, стружку, отходы лесопиления — основное сырьё для производства пеллет.</li>
                                <li>Щепу, ветки, стебли травы и растительные отходы.</li>
                                <li>Брёвна и горбыль.</li>
                                <li>Сено и солому, лигнин и шелуху.</li>
                                <li>Семечки и зёрна.</li>
                                <li>Отходы сельхозпереработки.</li>
                            </ul>
                            <p className="mt-3 italic text-gray-500">
                                Благодаря универсальности нашего оборудования вы можете использовать практически любое доступное сырьё для запуска рентабельного производства.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/granulation/recycling-pellets.webp"
                                alt="Переработка сырья на линии гранулирования"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white text-sm font-bold rounded-sm flex items-center justify-center">
                                2
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                                Переработка сырья в 3 этапа
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11">
                            <p className="mb-2">Линия гранулирования пеллет обеспечивает полностью автоматизированный процесс переработки сырья:</p>
                            <ul className="space-y-2">
                                <li>
                                    <strong className="text-gray-800">Первый этап — дробление и подача сырья:</strong>{' '}
                                    Сырьё (опил, щепа) выгружается на живое дно. Далее, проходя через дисковый сепаратор
                                    линии гранулирования, происходит отделение крупнокусковых включений. Это гарантирует
                                    однородность фракции и стабильное качество конечного продукта.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Второй этап — сушка сырья:</strong>{' '}
                                    После попадания сырья в среду горячего воздуха{' '}
                                    <Link href="/sushilnie-linii" className="text-red-600 hover:underline font-medium">сушильного барабана</Link>
                                    {' '}происходит испарение влаги.
                                    Наше оборудование для гранулирования обеспечивает точный контроль влажности, что напрямую
                                    влияет на качество готовых топливных пеллет.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Третий этап — гранулирование в пеллеты:</strong>{' '}
                                    Из бункера с помощью шнекового дозатора сырьё с определённой скоростью подаётся в
                                    пеллетайзер — сердце нашей линии гранулирования. Именно здесь происходит формирование
                                    плотных топливных пеллет заданного диаметра и длины.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/granulation/pellets-result.webp"
                                alt="Готовые топливные пеллеты DIN+ EN Plus"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="flex items-start gap-3 mb-3">
                            <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white text-sm font-bold rounded-sm flex items-center justify-center">
                                3
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                                Получаете топливные пеллеты
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                Результат работы нашей пеллетной линии — высококачественные древесные топливные
                                гранулы (пеллеты) качества DIN+ EN Plus диаметром 6–8 мм.
                            </p>
                            <p>
                                <strong className="text-gray-800">Назначение гранулированных пеллет:</strong>{' '}
                                данный продукт предназначен для использования в качестве экологичного топлива
                                в топочных устройствах с плоским колосником. Топливные пеллеты призваны заменять
                                дрова, уголь и брикеты из других материалов. Также гранулы можно использовать
                                в качестве наполнителя для туалета домашних животных или комбикорма — в зависимости
                                от вида сырья, которое перерабатывает линия гранулирования пеллет.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
