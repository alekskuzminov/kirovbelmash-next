import Image from 'next/image';
import Link from 'next/link';

export default function DryingProcess() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        Сушка сырья при производстве<br className="hidden sm:block" />
                        топливных брикетов и пеллет
                    </h2>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Step 1 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/drying/drying-recycling.webp"
                                alt="Линия сушки сырья на производстве"
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
                                Для чего нужна линия сушки сырья на производстве?
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                Линия сушки сырья необходима при производстве{' '}
                                <Link href="/linii-briketirovaniya" className="text-red-600 hover:underline font-medium">топливных брикетов</Link>
                                ,{' '}
                                <Link href="/linii-granulirovaniya" className="text-red-600 hover:underline font-medium">пеллет и гранул</Link>
                                . Она удаляет излишнюю влагу из сырья, что важно для
                                обеспечения качества и стабильности всего производства. Сушка сырья улучшает
                                характеристики топливных евродров и делает их более эффективными в использовании
                                в качестве топлива.
                            </p>
                            <p>
                                Линию сушки можно легко интегрировать в различные производства, что делает её
                                универсальным инструментом для предприятий, занимающихся производством топливных
                                материалов.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/briquetting/raw-material.webp"
                                alt="Сырьё для сушки — опилки, щепа, биомасса"
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
                                Какое сырьё подходит для сушки в линии?
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11">
                            <p className="mb-2">Мелкофракционные древесные и растительные отходы, например такие как:</p>
                            <ul className="space-y-1.5">
                                <li>Древесные опилки, стружку, отходы лесопиления.</li>
                                <li>Дерево (древесину), древесные отходы.</li>
                                <li>Щепу, ветки, стебли травы и растительные отходы.</li>
                                <li>Брёвна и горбыль.</li>
                                <li>Сено и солому, лигнин и шелуху.</li>
                                <li>Семечки и зёрна.</li>
                                <li>Отходы сельхозпереработки.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-gray-100">
                            <Image
                                src="/images/lines/drying/drying-result.webp"
                                alt="Высушенное сырьё на выходе из линии сушки"
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
                                Что получаем на выходе из линии сушки сырья?
                            </h3>
                        </div>
                        <div className="text-sm text-gray-600 leading-relaxed pl-11 space-y-2">
                            <p>
                                При производстве топливных евродров важно получить сухое топливное сырьё с оптимальной
                                влажностью. Процесс сушки снижает содержание влаги до приемлемого уровня в 10%.
                                Этот уровень влажности сырья важен для эффективной работы{' '}
                                <Link href="/linii-briketirovaniya" className="text-red-600 hover:underline font-medium">линий брикетирования</Link>
                                {' '}и{' '}
                                <Link href="/linii-granulirovaniya" className="text-red-600 hover:underline font-medium">линий гранулирования пеллет</Link>
                                .
                            </p>
                            <p>
                                Готовые пеллеты, брикеты и гранулы с влажностью в 10% более эффективно дают
                                необходимое тепло при горении.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
