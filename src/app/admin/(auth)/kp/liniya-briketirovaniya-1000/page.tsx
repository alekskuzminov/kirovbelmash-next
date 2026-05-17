import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PrintButton from '@/components/kp/PrintButton';
import { SITE_CONFIG } from '@/config/site.config';
import '@/components/kp/styles.css';

export const metadata: Metadata = { title: 'КП — Линия брикетирования 1000 кг/час' };

const PARAMS = [
    { label: 'Сырьё', value: 'Опил, щепа, горбыль, лузга естественной влажности до 55%' },
    { label: 'Продукт', value: 'Брикеты Pini & Kay' },
    { label: 'Установленная мощность', value: '155 кВт' },
    { label: 'Потребляемая мощность', value: '65 кВт' },
    { label: 'Персонал', value: '2–4 человека' },
    { label: 'Площадь производства', value: 'от 200 м² (высота потолков ≥ 5 м)' },
    { label: 'Срок изготовления', value: '60 рабочих дней с момента авансового платежа' },
];

type EquipmentLine = { text: string; kw: string };
type EquipmentItem = { num: string; lines: EquipmentLine[]; price: string };
type EquipmentStage = { name: string; items: EquipmentItem[] };

// Этапы 1–2 идут на стр. 3, Этап 3 + итог — на стр. 4 (продолжение).
const EQUIPMENT_P3: EquipmentStage[] = [
    {
        name: 'Первый этап. Подача',
        items: [
            {
                num: '1',
                lines: [
                    { text: 'Бункер приемный БП-5; V-5 м³', kw: '4' },
                    { text: '• Ворошитель бункера', kw: '1,1' },
                    { text: '• ПЧ регулировка скорости подачи сырья', kw: '' },
                    { text: '• Цепь тяговая длиннозвенная М56-2-63-1', kw: '' },
                    { text: '• Мотор-редуктор привода подачи', kw: '' },
                    { text: '• Рама опорная', kw: '' },
                ],
                price: '690 000',
            },
            {
                num: '2',
                lines: [
                    { text: 'Сепаратор дисковый СД-400.1100', kw: '1,5' },
                    { text: '• Система камнедробления', kw: '0,2' },
                    { text: '• Горловина выгрузки отсева', kw: '' },
                ],
                price: '298 000',
            },
            {
                num: '3',
                lines: [
                    { text: 'Транспортер шнековый ТШ-200; L-4м (подача в сушку)', kw: '4' },
                    { text: '• Опора', kw: '' },
                    { text: '• Горловина загрузочная с ворошителем', kw: '0,5' },
                    { text: '• Горловина разгрузочная фланцевая', kw: '' },
                    { text: '• Датчик уровня ёмкостной', kw: '' },
                ],
                price: '422 000',
            },
        ],
    },
    {
        name: 'Второй этап. Сушка',
        items: [
            {
                num: '4',
                lines: [
                    { text: 'Теплогенератор твердотопливный ТГК-1МВт Дровяной', kw: '—' },
                    { text: '• Искрогаситель', kw: '' },
                    { text: '• Золоуловитель', kw: '' },
                    { text: '• Труба растопочная', kw: '' },
                    { text: '• Система отсекания теплогенератора от барабана', kw: '0,45' },
                    { text: '• Комплект колосников', kw: '' },
                ],
                price: '1 664 000',
            },
            {
                num: '5',
                lines: [
                    { text: 'Барабан сушильный АВМ-0,65', kw: '—' },
                    { text: '• Комплект роликоопор с приводом', kw: '4' },
                    { text: '• Секция загрузочная', kw: '' },
                    { text: '• Воздуховод к циклону', kw: '' },
                    { text: '• Клапан взрыворазрядный', kw: '' },
                ],
                price: '2 070 000',
            },
            {
                num: '6',
                lines: [
                    { text: 'Циклон АВМ-0.65', kw: '22' },
                    { text: '• Опора', kw: '' },
                    { text: '• Шибер регулировки потоков воздуха', kw: '' },
                    { text: '• Труба пароотводящая', kw: '' },
                ],
                price: '927 000',
            },
            { num: '7', lines: [{ text: 'Затвор шлюзовой ШУ-4', kw: '1,5' }], price: '162 000' },
            {
                num: '8',
                lines: [
                    { text: 'Дробилка молотковая ДСС-22', kw: '22' },
                    { text: '• Сито калибровочное Ø-8мм', kw: '' },
                    { text: '• Комплект воздуховодов', kw: '' },
                ],
                price: '276 000',
            },
            {
                num: '9',
                lines: [
                    { text: 'Электрощит управления сушильной линией с ТГК / Газ АВМ-0,65', kw: '—' },
                ],
                price: '896 000',
            },
        ],
    },
];

const EQUIPMENT_P4: EquipmentStage[] = [
    {
        name: 'Третий этап. Прессование',
        items: [
            {
                num: '10',
                lines: [
                    { text: 'Бункер-накопитель БНВ-6.1; V-6 м³', kw: '—' },
                    { text: '• Ворошитель бункера', kw: '5,5' },
                    { text: '• Дозатор шнековый', kw: '1,5' },
                    { text: '• Фильтр-мешки', kw: '' },
                    { text: '• Рама опорная', kw: '' },
                    { text: '• Эстакада обслуживания с лестницей', kw: '' },
                    { text: '• Датчик уровня сырья', kw: '' },
                ],
                price: '1 014 000',
            },
            {
                num: '11',
                lines: [
                    { text: 'Пресс экструдер ПБМ-75', kw: '75' },
                    { text: '• Набор инструментов для обслуживания', kw: '' },
                ],
                price: '1 983 000',
            },
            {
                num: '12',
                lines: [
                    { text: 'Автомат резки брикета', kw: '—' },
                    { text: '• Узел привода подачи пилы', kw: '1,1' },
                    { text: '• Узел привода вращения пилы', kw: '3' },
                    { text: '• Механизм контроля длины брикета', kw: '' },
                    { text: '• Рама', kw: '' },
                    { text: '• Зонд вытяжной', kw: '' },
                ],
                price: '339 000',
            },
            { num: '13', lines: [{ text: 'Система дымоудаления под 1 пресс', kw: '7,5' }], price: '140 000' },
            { num: '14', lines: [{ text: 'Электрощит управления участком брикетирования', kw: '—' }], price: '864 000' },
        ],
    },
];

const TOTAL = { kw: '155', price: '14 094 000' };

const TERMS = [
    {
        title: 'Шеф-монтаж',
        text: '20 000 руб/день + предоставление проживания сотрудников ООО «КировБелМаш» на территории Заказчика',
    },
    {
        title: 'Полный монтаж',
        text: 'Включает в себя установку под ключ, запуск и обучение персонала. Стоимость услуги — 15% от стоимости оборудования',
    },
    {
        title: 'Место передачи оборудования',
        text: 'Склад Поставщика в г. Белая Холуница, Кировской области',
    },
    {
        title: 'Условия доставки',
        text: 'При необходимости Поставщик организует доставку за счёт Покупателя',
    },
    {
        title: 'Срок изготовления',
        text: '60 рабочих дней с момента внесения авансового платежа',
    },
    {
        title: 'Условия оплаты',
        text: '30% авансированная, 70% по факту уведомления о готовности оборудования',
    },
    {
        title: 'Гарантия',
        text: '36 месяцев',
    },
];

const TOTAL_PAGES = 7;

/**
 * SVG-схема потоков для страницы «Как работает линия». Взята как есть из
 * kom-pred/2026-05-08-kp-revision/process-page.html и встроена через
 * dangerouslySetInnerHTML — внутри есть <style>-тег с локальными классами,
 * переписывать в JSX сейчас избыточно.
 */
const SCHEME_SVG = `<svg viewBox="0 0 760 270" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#374151"/>
        </marker>
        <marker id="arrHot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#ea580c"/>
        </marker>
        <marker id="arrFuel" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#7c3aed"/>
        </marker>
    </defs>
    <style>
        .node { fill: #ffffff; stroke: #0f172a; stroke-width: 1.4; }
        .nodeAccent { fill: #fff7ed; stroke: #ea580c; stroke-width: 1.4; }
        .label { font: 700 9.5px "Segoe UI", sans-serif; fill: #0f172a; }
        .sub   { font: 400 8px  "Segoe UI", sans-serif; fill: #4b5563; }
        .num   { font: 700 8.5px "Segoe UI", sans-serif; fill: #ffffff; }
        .numC  { fill: #dc2626; }
        .flow  { stroke: #374151; stroke-width: 1.4; fill: none; }
        .hot   { stroke: #ea580c; stroke-width: 1.6; fill: none; stroke-dasharray: 4 3; }
        .fuel  { stroke: #7c3aed; stroke-width: 1.4; fill: none; stroke-dasharray: 2 3; }
        .stageBand  { fill: #f1f5f9; }
        .stageBandLbl { font: 700 8px "Segoe UI", sans-serif; fill: #64748b; letter-spacing: 1px; }
        .branchLbl { font: 700 8.5px "Segoe UI", sans-serif; }
    </style>

    <rect class="stageBand" x="0"   y="0" width="248" height="222"/>
    <rect class="stageBand" x="258" y="0" width="295" height="222" fill="#fef2f2" opacity="0.5"/>
    <rect class="stageBand" x="563" y="0" width="197" height="222"/>
    <text x="124" y="14" text-anchor="middle" class="stageBandLbl">ЭТАП 1 · ПОДАЧА</text>
    <text x="405" y="14" text-anchor="middle" class="stageBandLbl">ЭТАП 2 · СУШКА</text>
    <text x="660" y="14" text-anchor="middle" class="stageBandLbl">ЭТАП 3 · ПРЕССОВАНИЕ</text>

    <text x="14" y="158" class="label">Сырьё</text>
    <text x="14" y="170" class="sub">опил, щепа,</text>
    <text x="14" y="180" class="sub">горбыль, лузга</text>
    <text x="14" y="190" class="sub">влажн. до 55 %</text>

    <rect class="node" x="88" y="140" width="72" height="55" rx="4"/>
    <rect x="93" y="145" width="14" height="14" rx="2" class="numC"/>
    <text x="100" y="156" text-anchor="middle" class="num">1</text>
    <text x="124" y="172" text-anchor="middle" class="label">Рубилка</text>
    <text x="124" y="186" text-anchor="middle" class="sub">измельчитель</text>

    <rect class="node" x="178" y="140" width="64" height="55" rx="4"/>
    <rect x="183" y="145" width="14" height="14" rx="2" class="numC"/>
    <text x="190" y="156" text-anchor="middle" class="num">2</text>
    <text x="210" y="172" text-anchor="middle" class="label">Дробилка</text>
    <text x="210" y="186" text-anchor="middle" class="sub">×2 шт.</text>

    <circle cx="258" cy="167" r="3.5" fill="#dc2626"/>

    <rect class="nodeAccent" x="320" y="30" width="125" height="55" rx="4"/>
    <rect x="325" y="35" width="14" height="14" rx="2" class="numC"/>
    <text x="332" y="46" text-anchor="middle" class="num">3</text>
    <text x="385" y="58" text-anchor="middle" class="label">Теплогенератор</text>
    <text x="385" y="72" text-anchor="middle" class="sub">сжигает крупную фракцию</text>

    <rect class="node" x="295" y="140" width="130" height="60" rx="30"/>
    <rect x="305" y="146" width="14" height="14" rx="2" class="numC"/>
    <text x="312" y="157" text-anchor="middle" class="num">4</text>
    <text x="365" y="172" text-anchor="middle" class="label">Сушильный барабан</text>
    <text x="365" y="186" text-anchor="middle" class="sub">АВМ-1,5 → влажн. ≤ 12 %</text>

    <rect class="node" x="445" y="140" width="65" height="55" rx="4"/>
    <rect x="450" y="145" width="14" height="14" rx="2" class="numC"/>
    <text x="457" y="156" text-anchor="middle" class="num">2</text>
    <text x="478" y="172" text-anchor="middle" class="label">Доизмельч.</text>
    <text x="478" y="186" text-anchor="middle" class="sub">фракции</text>

    <rect class="node" x="525" y="138" width="65" height="62" rx="4"/>
    <rect x="530" y="143" width="14" height="14" rx="2" class="numC"/>
    <text x="537" y="154" text-anchor="middle" class="num">5</text>
    <text x="558" y="171" text-anchor="middle" class="label">Бункер</text>
    <text x="558" y="184" text-anchor="middle" class="sub">с ворошителем</text>
    <text x="558" y="195" text-anchor="middle" class="sub">+ дозатор</text>

    <rect class="node" x="605" y="138" width="65" height="62" rx="4"/>
    <rect x="610" y="143" width="14" height="14" rx="2" class="numC"/>
    <text x="617" y="154" text-anchor="middle" class="num">6</text>
    <text x="638" y="171" text-anchor="middle" class="label">Пресс</text>
    <text x="638" y="184" text-anchor="middle" class="sub">×2 шт.</text>
    <text x="638" y="195" text-anchor="middle" class="sub">Pini &amp; Kay</text>

    <rect class="node" x="685" y="138" width="65" height="62" rx="4"/>
    <rect x="690" y="143" width="14" height="14" rx="2" class="numC"/>
    <text x="697" y="154" text-anchor="middle" class="num">7</text>
    <text x="718" y="171" text-anchor="middle" class="label">Резка</text>
    <text x="718" y="184" text-anchor="middle" class="sub">авто-</text>
    <text x="718" y="195" text-anchor="middle" class="sub">отрез</text>

    <text x="718" y="216" text-anchor="middle" class="label" fill="#dc2626">Брикет</text>

    <path class="flow" d="M62,167 L86,167" marker-end="url(#arr)"/>
    <path class="flow" d="M160,167 L176,167" marker-end="url(#arr)"/>
    <path class="flow" d="M242,167 L256,167"/>

    <path class="fuel" d="M258,167 L258,57 L318,57" marker-end="url(#arrFuel)"/>
    <text x="265" y="103" class="branchLbl" fill="#7c3aed">крупная фракция</text>
    <text x="265" y="115" class="branchLbl" fill="#7c3aed">→ в топку теплогенератора</text>

    <path class="flow" d="M258,167 L293,167" marker-end="url(#arr)"/>
    <text x="265" y="132" class="branchLbl" fill="#0f172a">мелкая фракция → в сушку</text>

    <path class="hot" d="M385,85 L385,138" marker-end="url(#arrHot)"/>
    <text x="392" y="116" class="sub" fill="#ea580c">горячий воздух</text>

    <path class="flow" d="M425,170 L443,170" marker-end="url(#arr)"/>
    <path class="flow" d="M510,170 L523,170" marker-end="url(#arr)"/>
    <path class="flow" d="M590,170 L603,170" marker-end="url(#arr)"/>
    <path class="flow" d="M670,170 L683,170" marker-end="url(#arr)"/>
    <path class="flow" d="M718,200 L718,210" marker-end="url(#arr)"/>

    <rect x="10" y="232" width="740" height="26" rx="4" fill="#0f172a"/>
    <rect x="18" y="238" width="14" height="14" rx="2" fill="#dc2626"/>
    <text x="25" y="249" text-anchor="middle" class="num">8</text>
    <text x="45" y="249" fill="#fff" font-family="Segoe UI" font-size="9.5" font-weight="700">Автоматика и управление</text>
    <text x="225" y="249" fill="#cbd5e1" font-family="Segoe UI" font-size="8.5">— синхронизирует все узлы, поддерживает влажность сушки, контролирует подачу и режим теплогенератора</text>
</svg>`;

function PageHeader() {
    return (
        <div className="kp-header">
            <div className="kp-header__brand">
                <Image
                    src={SITE_CONFIG.assets.logo}
                    alt={SITE_CONFIG.assets.logoAlt}
                    width={36}
                    height={36}
                    className="kp-header__logo"
                />
                <div>
                    <div className="kp-header__brand-name">{SITE_CONFIG.company.name}</div>
                    <div className="kp-header__brand-tagline">{SITE_CONFIG.company.tagline}</div>
                </div>
            </div>
            <span className="kp-header__contact">
                <i className="ri-mail-line" /> {SITE_CONFIG.contacts.email}
            </span>
            <span className="kp-header__contact">
                <i className="ri-phone-line" /> {SITE_CONFIG.contacts.phoneFormatted}
            </span>
        </div>
    );
}

function PageFooter({ pageNo }: { pageNo: number }) {
    return (
        <div className="kp-footer">
            <div className="kp-footer__brand">
                <Image
                    src={SITE_CONFIG.assets.logo}
                    alt={SITE_CONFIG.assets.logoAlt}
                    width={20}
                    height={20}
                />
                <div>
                    <div style={{ fontWeight: 700 }}>{SITE_CONFIG.company.name}</div>
                    <div style={{ color: 'var(--kp-muted)' }}>{SITE_CONFIG.company.tagline}</div>
                </div>
            </div>
            <span className="kp-header__contact">
                <i className="ri-mail-line" /> {SITE_CONFIG.contacts.email}
            </span>
            <span className="kp-header__contact">
                <i className="ri-phone-line" /> {SITE_CONFIG.contacts.phoneFormatted}
            </span>
            <span className="kp-footer__pageno">
                Стр. {pageNo} / {TOTAL_PAGES}
            </span>
        </div>
    );
}

export default function KpLiniyaBriketirovaniya1000Page() {
    return (
        <div className="kp-root">
            <div className="kp-toolbar no-print">
                <div className="kp-toolbar__title">
                    Линия брикетирования 1000 кг/час
                    <small>Коммерческое предложение · {TOTAL_PAGES} стр.</small>
                </div>
                <PrintButton />
            </div>

            {/* === Стр. 1: Титул === */}
            <section className="kp-page">
                <PageHeader />
                <div className="kp-content">
                    <div className="kp-eyebrow">Коммерческое предложение</div>
                    <h1 className="kp-h1">
                        ЛИНИЯ
                        <span className="kp-h1__sub">БРИКЕТИРОВАНИЯ</span>
                    </h1>
                    <div style={{ paddingLeft: 10, borderLeft: '3px solid var(--kp-red)', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                        Производительность — 1 000 кг/час
                    </div>

                    <div className="kp-rule" />

                    <div className="kp-eyebrow" style={{ color: 'var(--kp-muted)' }}>Параметры линии</div>
                    <dl className="kp-params">
                        {PARAMS.map((p) => (
                            <div key={p.label} style={{ display: 'contents' }}>
                                <dt>{p.label}:</dt>
                                <dd>{p.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="kp-callout" style={{ marginTop: 32 }}>
                        Разрабатываем и производим оборудование для переработки{' '}
                        <strong>органического сырья в топливные брикеты и пеллеты:</strong>{' '}
                        опила, льна, камыша, лузги и других материалов.
                    </div>
                </div>
                <PageFooter pageNo={1} />
            </section>

            {/* === Стр. 2 (РЕЗЕРВ): Как работает линия — временно скрыта, вернёмся позднее === */}
            {false && <section className="kp-page">
                <PageHeader />
                <div className="kp-content kp-hiw">
                    <div className="hiw-titleblock">
                        <div className="hiw-eyebrow">Линия брикетирования · 800–1000 кг/ч</div>
                        <h1 className="hiw-title">Как работает линия</h1>
                        <p className="hiw-lead">
                            Полный цикл — от загрузки опила до готового брикета Pini&nbsp;&amp;&nbsp;Kay.{' '}
                            <b>Три этапа, восемь узлов, один оператор.</b>{' '}
                            Сырьё естественной влажности до 55 %; крупная фракция автоматически отбирается
                            и идёт в теплогенератор как бесплатное топливо.
                        </p>
                    </div>

                    <div className="hiw-scheme-wrap">
                        <p className="hiw-scheme-title">Технологическая схема потоков</p>
                        <div className="hiw-scheme" dangerouslySetInnerHTML={{ __html: SCHEME_SVG }} />
                        <div className="hiw-scheme-legend">
                            <div><span className="hiw-num">1</span> Рубилка / измельчитель</div>
                            <div><span className="hiw-num">5</span> Бункер-накопитель с ворошителем</div>
                            <div><span className="hiw-num">2</span> Молотковая дробилка (×2)</div>
                            <div><span className="hiw-num">6</span> Пресс для брикетов Pini &amp; Kay (×2)</div>
                            <div><span className="hiw-num">3</span> Теплогенератор</div>
                            <div><span className="hiw-num">7</span> Автомат резки брикетов</div>
                            <div><span className="hiw-num">4</span> Сушильный барабан АВМ-1,5</div>
                            <div><span className="hiw-num">8</span> Система автоматики и управления</div>
                        </div>
                    </div>

                    <div className="hiw-stages">
                        <div className="hiw-stage">
                            <div className="hiw-stage-num">Этап 1</div>
                            <div className="hiw-stage-title">Подача и сортировка</div>
                            <p className="hiw-stage-text">
                                Сырьё выгружается на живое дно, проходит через дисковый сепаратор
                                (отделение крупных включений) и просеивается на две фракции. <b>Мелкая</b> уходит
                                в сушку, <b>крупная</b> — в теплогенератор как топливо. Шиберная задвижка
                                автоматически добирает топливо из основного потока, если крупной фракции недостаточно.
                            </p>
                        </div>
                        <div className="hiw-stage">
                            <div className="hiw-stage-num">Этап 2</div>
                            <div className="hiw-stage-title">Сушка</div>
                            <p className="hiw-stage-text">
                                Сырьё попадает в среду горячего воздуха <b>сушильного барабана АВМ-1,5</b>.
                                Автоматика держит заданную влажность на выходе (≤ 12 %) и температуру в безопасном
                                диапазоне. После сушки материал доизмельчается до фракции, нужной прессу,
                                и поступает в бункер-накопитель.
                            </p>
                        </div>
                        <div className="hiw-stage">
                            <div className="hiw-stage-num">Этап 3</div>
                            <div className="hiw-stage-title">Прессование</div>
                            <p className="hiw-stage-text">
                                Из бункера <b>шнековый дозатор</b> с заданной скоростью подаёт сырьё в пресс.
                                Под давлением и собственной температурой формируется плотный брикет{' '}
                                <b>Pini&nbsp;&amp;&nbsp;Kay</b>. Автомат резки калибрует брикет по длине —
                                продукт уходит на упаковку.
                            </p>
                        </div>
                    </div>

                    <div className="hiw-auto-block hiw-auto-full">
                        <h3>Что обеспечивает автоматика</h3>
                        <ul>
                            <li>
                                <b>Стабильная влажность сырья на выходе сушки.</b>{' '}
                                Контроллер регулирует подачу дымовых газов и скорость подачи материала.
                            </li>
                            <li>
                                <b>Пожаробезопасность.</b> При остановке подачи сырья поток дымовых газов
                                автоматически перенаправляется в растопочную трубу теплогенератора —
                                барабан не перегревается.
                            </li>
                            <li>
                                <b>Защита от перегрузок.</b> Гидростанция живого дна оснащена
                                предохранительным клапаном на случай попадания крупных кусков (доски, бревна).
                            </li>
                            <li>
                                <b>Дозированная подача в пресс.</b> Шнековый дозатор работает через
                                частотный преобразователь — стабильное давление, ровный брикет.
                            </li>
                        </ul>
                    </div>
                </div>
                <PageFooter pageNo={2} />
            </section>}

            {/* === Стр. 2: Перечень оборудования — Этапы 1 и 2 === */}
            <section className="kp-page">
                <PageHeader />
                <div className="kp-content">
                    <h2 className="kp-h2">Перечень оборудования и стоимость</h2>
                    <table className="kp-table">
                        <thead>
                            <tr>
                                <th className="num">№</th>
                                <th>Наименование</th>
                                <th className="kw">кВт</th>
                                <th className="price">Цена, руб.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EQUIPMENT_P3.map((stage) => (
                                <Fragment key={stage.name}>
                                    <tr className="stage">
                                        <td colSpan={4}>{stage.name}</td>
                                    </tr>
                                    {stage.items.map((it) => (
                                        <tr key={it.num}>
                                            <td className="num">{it.num}</td>
                                            <td className="name">
                                                {it.lines.map((l, i) => (
                                                    <div key={i} style={i === 0 ? { fontWeight: 600 } : undefined}>
                                                        {l.text}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="kw">
                                                {it.lines.map((l, i) => (
                                                    <div key={i}>{l.kw || '\u00A0'}</div>
                                                ))}
                                            </td>
                                            <td className="price">{it.price}</td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PageFooter pageNo={2} />
            </section>

            {/* === Стр. 3: Перечень оборудования — Этап 3 + Итог + Услуги === */}
            <section className="kp-page">
                <PageHeader />
                <div className="kp-content">
                    <table className="kp-table">
                        <thead>
                            <tr>
                                <th className="num">№</th>
                                <th>Наименование</th>
                                <th className="kw">кВт</th>
                                <th className="price">Цена, руб.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EQUIPMENT_P4.map((stage) => (
                                <Fragment key={stage.name}>
                                    <tr className="stage">
                                        <td colSpan={4}>{stage.name}</td>
                                    </tr>
                                    {stage.items.map((it) => (
                                        <tr key={it.num}>
                                            <td className="num">{it.num}</td>
                                            <td className="name">
                                                {it.lines.map((l, i) => (
                                                    <div key={i} style={i === 0 ? { fontWeight: 600 } : undefined}>
                                                        {l.text}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="kw">
                                                {it.lines.map((l, i) => (
                                                    <div key={i}>{l.kw || '\u00A0'}</div>
                                                ))}
                                            </td>
                                            <td className="price">{it.price}</td>
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>Общая установленная мощность / Стоимость линии с НДС</td>
                                <td className="kw">{TOTAL.kw}</td>
                                <td className="price">{TOTAL.price}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="kp-footnote">* агрегат не является обязательным</div>
                    <h2 className="kp-h2" style={{ marginTop: 24 }}>Наши услуги и условия поставки</h2>
                    <div className="kp-cards">
                        {TERMS.map((t) => (
                            <div key={t.title} className="kp-card">
                                <h3>{t.title}</h3>
                                <p>{t.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <PageFooter pageNo={3} />
            </section>

            {/* === Стр. 4: Как работает линия брикетирования === */}
            <section className="kp-page">
                <PageHeader />
                <div className="kp-content kp-hiw">
                    <div className="hiw-titleblock">
                        <div className="hiw-eyebrow">Технология полного цикла</div>
                        <h1 className="hiw-title">Как работает линия брикетирования</h1>
                        <p className="hiw-lead">
                            Линия предназначена для переработки мелкого и крупного сырья естественной влажности
                            (опил, щепа и&nbsp;др.). <b>Перед сушкой сырьё проходит сепарацию и поступает в сушильный барабан.</b>
                        </p>
                    </div>

                    <div className="hiw-ribbon">
                        <p className="hiw-ribbon-title">Маршрут сырья по линии</p>
                        <div className="hiw-flow">
                            <div className="hiw-flow-stage">
                                <div className="hiw-flow-stage-name"><span className="stage-tag">01</span>Подача</div>
                                <div className="hiw-chips">
                                    <span className="hiw-chip"><span className="hiw-chip-num">1</span>Бункер</span>
                                    <span className="hiw-chip"><span className="hiw-chip-num">2</span>Сепаратор</span>
                                    <span className="hiw-chip"><span className="hiw-chip-num">3</span>Транспортёр</span>
                                </div>
                            </div>
                            <div className="hiw-flow-arrow">→</div>
                            <div className="hiw-flow-stage">
                                <div className="hiw-flow-stage-name"><span className="stage-tag">02</span>Сушка</div>
                                <div className="hiw-chips">
                                    <span className="hiw-chip"><span className="hiw-chip-num">5</span>Барабан</span>
                                    <span className="hiw-chip"><span className="hiw-chip-num">8</span>Дробилка</span>
                                    <span className="hiw-chip"><span className="hiw-chip-num">10</span>Накопитель</span>
                                </div>
                            </div>
                            <div className="hiw-flow-arrow">→</div>
                            <div className="hiw-flow-stage">
                                <div className="hiw-flow-stage-name"><span className="stage-tag">03</span>Прессование</div>
                                <div className="hiw-chips">
                                    <span className="hiw-chip"><span className="hiw-chip-num">11</span>Пресс</span>
                                    <span className="hiw-chip"><span className="hiw-chip-num">12</span>Резка</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hiw-text-stages">
                        <div>
                            <h2 className="hiw-text-stage-heading"><span className="stage-num">1-й этап.</span>Подача</h2>
                            <p className="hiw-text-stage-body">
                                Выгрузка сырья осуществляется в подающий бункер. Далее, проходя через{' '}
                                <b>дисковый сепаратор</b>, происходит отделение крупнокусковых включений.
                                После этого сырьё по винтовому транспортёру поступает на сушку в сушильный барабан.
                            </p>
                        </div>
                        <div>
                            <h2 className="hiw-text-stage-heading"><span className="stage-num">2-й этап.</span>Сушка</h2>
                            <p className="hiw-text-stage-body">
                                После попадания сырья в среду горячего воздуха сушильного барабана происходит{' '}
                                <b>испарение влаги</b>. В процессе сушки автоматика поддерживает заданную влажность
                                сырья на выходе.
                            </p>
                            <p className="hiw-text-stage-body">
                                Данный процесс <b>абсолютно пожаробезопасен</b>, так как сушильная линия полностью
                                автоматизирована. Эта система не позволит температуре сушки подняться выше
                                установленного значения.
                            </p>
                            <p className="hiw-text-stage-body">
                                В случае прекращения подачи сырья в сушку система автоматически перекроет подачу
                                дымовых газов в сушильный барабан, перенаправив их в растопочную трубу теплогенератора.
                            </p>
                            <p className="hiw-text-stage-body">
                                После сушки сырьё доизмельчается дробильной установкой и поступает в бункер-накопитель.
                            </p>
                        </div>
                        <div>
                            <h2 className="hiw-text-stage-heading"><span className="stage-num">3-й этап.</span>Прессование</h2>
                            <p className="hiw-text-stage-body">
                                Сырьё из бункера с помощью <b>шнекового дозатора</b> с определённой скоростью
                                подаётся в <b>пресс-экструдер</b>. Под воздействием высокого давления и температуры
                                (150–200&nbsp;°С) происходит прессование: лигнин — природное связующее вещество
                                древесины — плавится и скрепляет частицы без каких-либо химических добавок.
                            </p>
                            <p className="hiw-text-stage-body">
                                Брикет непрерывно выходит из матрицы пресса и поступает на <b>автомат резки</b>,
                                который калибрует его по заданной длине. Готовый брикет{' '}
                                <b>Pini&nbsp;&amp;&nbsp;Kay</b> уходит на укладку и упаковку.
                            </p>
                        </div>
                    </div>
                </div>
                <PageFooter pageNo={4} />
            </section>

            {/* === Стр. 5–7: Проектная документация (альбомный формат) === */}
            {[
                { src: '/images/kp/briket-schema-1.webp', alt: 'Схема линии брикетирования, лист 1', pageNo: 5 },
                { src: '/images/kp/briket-schema-2.webp', alt: 'Схема линии брикетирования, лист 2', pageNo: 6 },
                { src: '/images/kp/briket-schema-3.webp', alt: 'Схема линии брикетирования, лист 3', pageNo: 7 },
            ].map(({ src, alt, pageNo }) => (
                <section key={pageNo} className="kp-page kp-page--landscape">
                    <PageHeader />
                    <div className="kp-content" style={{ position: 'relative', overflow: 'hidden' }}>
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="297mm"
                            style={{ objectFit: 'contain', objectPosition: 'center center' }}
                            priority
                        />
                    </div>
                    <PageFooter pageNo={pageNo} />
                </section>
            ))}
        </div>
    );
}
