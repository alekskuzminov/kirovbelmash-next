import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Политика конфиденциальности',
    description: 'Политика в отношении обработки персональных данных ООО «КировБелМаш». Мы заботимся о безопасности ваших данных.',
};

const privacyBreadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Политика конфиденциальности' },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-white">
            <BreadcrumbJsonLd items={privacyBreadcrumbs} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs
                    items={privacyBreadcrumbs}
                    className="mb-6 sm:mb-8"
                />

                <article className="prose prose-slate max-w-none">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                        Политика в отношении обработки персональных данных ООО «КировБелМаш»
                    </h1>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Общие положения</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Настоящая политика составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» и определяет порядок обработки и меры по обеспечению безопасности данных, которые предпринимает ООО «КировБелМаш» (далее — Оператор).
                        </p>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                <span className="font-semibold">1.1.</span> Цель Оператора — соблюдение прав и свобод человека при обработке его персональных данных, включая защиту прав на неприкосновенность частной жизни.
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">1.2.</span> Политика применяется ко всей информации, которую Оператор может получить о посетителях сайта <a href="https://kirovbelmash.ru" className="text-red-600 hover:underline">kirovbelmash.ru</a>.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Основные понятия</h2>
                        <ul className="space-y-2 list-none p-0">
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Сайт</span> — совокупность графических материалов, программ для ЭВМ и баз данных по адресу kirovbelmash.ru.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Обработка персональных данных</span> — любое действие с данными: сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача, обезличивание, блокирование и уничтожение.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Пользователь</span> — любой посетитель сайта.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Обезличивание</span> — действия, после которых невозможно определить принадлежность данных конкретному лицу без дополнительной информации.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Права и обязанности Оператора</h2>
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-900 mb-2">3.1. Оператор имеет право:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                <li>Получать от субъекта достоверные данные и документы.</li>
                                <li>Продолжить обработку данных без согласия субъекта при наличии законных оснований (даже в случае отзыва согласия).</li>
                                <li>Самостоятельно определять состав мер безопасности.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">3.2. Оператор обязан:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                <li>Предоставлять пользователю информацию о его данных по запросу.</li>
                                <li>Организовывать защиту данных от неправомерного доступа.</li>
                                <li>Отвечать на запросы РКН в течение 10 дней.</li>
                                <li>Публиковать настоящую Политику в свободном доступе.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Права и обязанности субъектов данных</h2>
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-900 mb-2">4.1. Пользователь имеет право:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                <li>Получать сведения о сроках и способах обработки своих данных.</li>
                                <li>Требовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие или незаконно полученные.</li>
                                <li>Отозвать согласие на обработку в любой момент.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">4.2. Пользователь обязан:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                <li>Предоставлять достоверные сведения.</li>
                                <li>Своевременно сообщать об изменении своих данных.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. Принципы обработки данных</h2>
                        <ul className="space-y-4 list-none p-0">
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Законность:</span> Обработка только на справедливой основе.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Целеполагание:</span> Обработка ограничивается достижением конкретных целей.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Качество:</span> Данные должны быть точными, достаточными и актуальными.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Ограничение хранения:</span> Данные хранятся не дольше, чем этого требуют цели обработки.</li>
                            <li className="text-gray-600"><span className="font-semibold text-gray-900">Прозрачность:</span> Отсутствие скрытой передачи данных сторонним ресурсам (скидки, кэшбэк на Яндекс Маркет и т.д.) без уведомления.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. Условия обработки</h2>
                        <p className="text-gray-600 mb-2">Оператор обрабатывает данные, если:</p>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                            <li>Получено согласие пользователя.</li>
                            <li>Это необходимо для исполнения договора (например, доставки товара).</li>
                            <li>Это требуется для осуществления правосудия или выполнения норм закона.</li>
                            <li>Данные являются общедоступными (опубликованы самим субъектом).</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">7. Порядок обработки и актуализации данных</h2>
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 mb-2">7.1. Безопасность</h3>
                            <p className="text-gray-600">Оператор принимает правовые, организационные и технические меры для защиты данных от неуполномоченных лиц.</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-900 mb-2">7.2. Передача данных</h3>
                            <p className="text-gray-600">Данные не передаются третьим лицам, кроме случаев исполнения закона или согласия пользователя для выполнения договора (например, логистика).</p>
                        </div>
                        <div className="mb-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-2">7.3. Контакты для связи</h3>
                            <ul className="space-y-2 list-none p-0">
                                <li className="text-gray-600"><span className="font-semibold text-gray-900">Актуализация данных:</span> Направить письмо на <a href="mailto:marketing.kirovbelmash@yandex.ru" className="text-red-600 hover:underline">marketing.kirovbelmash@yandex.ru</a> с пометкой «Актуализация персональных данных».</li>
                                <li className="text-gray-600"><span className="font-semibold text-gray-900">Отзыв согласия:</span> Направить письмо на тот же адрес с пометкой «Отзыв согласия на обработку персональных данных».</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">7.4. Доставка товаров</h3>
                            <p className="text-gray-600">При оформлении доставки Оператор передает необходимые данные (ФИО, адрес) транспортным компаниям и курьерским службам.</p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">8. Трансграничная передача</h2>
                        <p className="text-gray-600">Перед началом передачи данных на территорию иностранного государства Оператор обязан убедиться в надежной защите прав субъектов в этой стране и уведомить уполномоченный орган.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">9. Заключительные положения</h2>
                        <div className="space-y-2">
                            <p className="text-gray-600"><span className="font-semibold text-gray-900">11.1.</span> Любые разъяснения можно получить через e-mail: <a href="mailto:marketing.kirovbelmash@yandex.ru" className="text-red-600 hover:underline">marketing.kirovbelmash@yandex.ru</a></p>
                            <p className="text-gray-600"><span className="font-semibold text-gray-900 text-gray-900">11.2.</span> Политика действует бессрочно до выхода новой версии.</p>
                            <p className="text-gray-600"><span className="font-semibold text-gray-900">11.3.</span> Актуальный текст всегда доступен по ссылке: <a href="https://kirovbelmash.ru/privacy-policy" className="text-red-600 hover:underline">https://kirovbelmash.ru/privacy-policy</a></p>
                        </div>
                    </section>
                </article>
            </div>
        </main>
    );
}
