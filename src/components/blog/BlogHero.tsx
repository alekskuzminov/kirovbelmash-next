import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function BlogHero() {
    return (
        <section className="relative min-h-[400px] sm:min-h-[500px] overflow-hidden bg-gray-900">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="https://readdy.ai/api/search-image?query=professional%20industrial%20factory%20interior%20wide%20shot%20modern%20equipment%20clean%20bright%20lighting&width=1920&height=1080&seq=blghero&orientation=landscape"
                    alt="Блог КировБелМаш — статьи об оборудовании"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/40" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 sm:pb-16 h-full flex flex-col justify-end">
                <div className="max-w-2xl">
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', href: '/' },
                            { label: 'Блог' }
                        ]}
                        className="mb-6"
                        textColor="text-gray-300"
                        activeTextColor="text-white"
                        hoverColor="hover:text-white"
                    />

                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-0.5 bg-red-600" />
                        <span className="text-red-500 text-sm font-bold tracking-wider uppercase">
                            Экспертные статьи
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                        Блог КировБелМаш
                    </h1>

                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl font-light">
                        Практические руководства, разборы оборудования и реальные кейсы клиентов.
                        Помогаем принимать правильные решения в промышленном производстве.
                    </p>
                </div>
            </div>
        </section>
    );
}
