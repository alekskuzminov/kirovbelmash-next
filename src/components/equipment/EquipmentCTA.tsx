import ContactModalButton from '@/components/common/ContactModalButton';

export default function EquipmentCTA() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                                Не нашли нужное оборудование?
                            </h3>
                            <p className="text-sm sm:text-base text-red-100 max-w-xl">
                                Мы проектируем и производим индивидуальные решения под ваши конкретные производственные задачи. Свяжитесь с нами для консультации.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                            <ContactModalButton
                                message={'\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043f\u043e\u0434\u0431\u043e\u0440 \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u044f'}
                                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-red-600 text-xs sm:text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                            >
                                <i className="ri-mail-send-line text-base"></i>
                                Оставить заявку
                            </ContactModalButton>
                            <a
                                href="tel:+79005218477"
                                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                            >
                                <i className="ri-phone-line text-base"></i>
                                Позвонить
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
