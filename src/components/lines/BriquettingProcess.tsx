import Image from 'next/image';
import Link from 'next/link';

export default function BriquettingProcess() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Как происходит переработка сырья в топливные брикеты<br className="hidden sm:block" />
                        с помощью нашего оборудования?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Производственные линии КировБелМаш для изготовления топливных брикетов позволяют эффективно
                        перерабатывать широкий спектр сырья в качественное топливо. Весь процесс осуществляется в 3 этапа:
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Step 1 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/briquetting/raw-material.webp"
                                alt="Сырьё для производства брикетов"
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
                                Выбираете сырьё для переработки
                            </h3>
                        </div>
                        <ul className="text-sm text-gray-600 leading-relaxed space-y-1.5 pl-11">
                            <li>Древесные опилки, стружку, отходы лесопиления. Наше оборудование для брикетирования опилок отлично справляется с такими материалами.</li>
                            <li>Древесину и древесные отходы.</li>
                            <li>Щепу, ветки, стебли травы и растительные отходы.</li>
                            <li>Брёвна и горбыль.</li>
                            <li>Сено и солому, лигнин и шелуху.</li>
                            <li>Семечки и зёрна.</li>
                            <li>Отходы сельхозпереработки.</li>
                        </ul>
                        <p className="text-sm text-gray-500 mt-3 pl-11 italic">
                            Оборудование для изготовления брикетов эффективно справляется с любым сырьём.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/briquetting/recycling.webp"
                                alt="Переработка сырья на линии брикетирования"
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
                            <p className="mb-2">Наша линия по производству брикетов обеспечивает автоматизированный процесс:</p>
                            <ul className="space-y-2">
                                <li>
                                    <strong className="text-gray-800">Первый этап — дробление и подача сырья:</strong>{' '}
                                    Сырьё (опил, щепа) выгружается на живое дно. Далее, проходя через дисковый сепаратор,
                                    происходит отделение крупнокусковых включений.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Второй этап — сушка сырья:</strong>{' '}
                                    После попадания в среду горячего воздуха{' '}
                                    <Link href="/sushilnie-linii" className="text-red-600 hover:underline font-medium">сушильного барабана</Link>
                                    {' '}происходит испарение влаги.
                                </li>
                                <li>
                                    <strong className="text-gray-800">Третий этап — прессование в брикеты:</strong>{' '}
                                    Из бункера с помощью шнекового дозатора сырьё с определённой скоростью подаётся в пресс.
                                    Здесь формируются плотные топливные брикеты.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/briquetting/briquettes-result.webp"
                                alt="Готовые топливные брикеты RUF и Pini Kay"
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
                                Получаете топливные брикеты
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                Наши готовые линии производят древесные топливные брикеты формата RUF и Pini Key.
                                Они эффективно заменяют дрова, уголь и другие виды топлива.
                            </p>
                            <p>
                                <strong className="text-gray-800">Назначение брикета:</strong>{' '}
                                данный продукт, полученный с помощью нашего оборудования для изготовления брикетов,
                                предназначен для использования в качестве экологичного топлива в топочных устройствах
                                с плоским колосником. Проще говоря, брикет призван заменять дрова, уголь и брикеты
                                из других материалов.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
