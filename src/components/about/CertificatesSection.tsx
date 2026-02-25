import Image from 'next/image';
import { certificates } from '@/data/about';

export default function CertificatesSection() {
    return (
        <section id="certificates" className="py-12 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Гарантия качества</span>
                        <div className="w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Сертификаты и лицензии
                    </h2>
                    <p className="text-base text-gray-500 max-w-2xl mx-auto">
                        Наша продукция соответствует всем требованиям российских и международных стандартов
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {certificates.map((cert, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-5 sm:p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center">
                                <i className="ri-checkbox-circle-fill text-xl text-red-500/30 group-hover:text-red-500 transition-colors duration-300"></i>
                            </div>
                            <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-xl mb-5 group-hover:bg-red-600 transition-colors duration-300">
                                <i className={`${cert.icon} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{cert.description}</p>
                            <div className="flex items-center space-x-2">
                                <i className="ri-calendar-line text-sm text-gray-400"></i>
                                <span className="text-xs text-gray-400 font-medium">{cert.year}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-16 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 border border-gray-100 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                                Производственный контроль качества
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 sm:mb-6">
                                Каждая единица оборудования проходит многоступенчатый контроль на всех этапах производства.
                                Мы гарантируем соответствие заявленным характеристикам и безотказную работу.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    'Входной контроль материалов и комплектующих',
                                    'Операционный контроль на каждом этапе сборки',
                                    'Стендовые испытания готового оборудования',
                                    'Финальная приёмка с оформлением паспорта изделия',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start space-x-3">
                                        <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                                            <i className="ri-check-line text-base text-red-600"></i>
                                        </div>
                                        <span className="text-sm text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative w-full h-[200px] sm:h-[300px] rounded-xl overflow-hidden">
                            <Image
                                src="/images/backgrounds/about-certificates-bg.webp"
                                alt="Контроль качества на производстве"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
