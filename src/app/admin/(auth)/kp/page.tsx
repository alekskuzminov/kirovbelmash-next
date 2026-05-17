import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Каталог КП' };

type Cell = null | 'planned' | { href: string };

type Row = {
    code: string;   // маркировка без мощности, напр. «Б О ТГК»
    label: string;  // человекочитаемое описание
    c500:  Cell;
    c1000: Cell;
    c1200: Cell;
    c2000: Cell;
};

type Group = {
    title:    string;
    subtitle: string;
    accent:   string;
    icon:     string;
    rows:     Row[];
};

/* ─── Брикеты Pini Kay ─────────────────────────────────────── */
const BP: Row[] = [
    { code: 'Б О',      label: 'Опил',                    c500:'planned', c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'Б О ТГК',  label: 'Опил + ТГК (дровяной)',   c500:'planned', c1000:{ href:'/admin/kp/liniya-briketirovaniya-1000' }, c1200:'planned', c2000: null },
    { code: 'Б Щ ТГК',  label: 'Щепа + ТГК',             c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'Б ЩГ ТГК', label: 'Щепа + Горбыль + ТГК',   c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'Б ОГ ТГК', label: 'Опил + Горбыль + ТГК',   c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'Б О ТГН',  label: 'Опил + ТГН (сыпучее)',    c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'Б Щ ТГН',  label: 'Щепа + ТГН',             c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'Б ЩГ ТГН', label: 'Щепа + Горбыль + ТГН',   c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
];

/* ─── Брикеты RUF ──────────────────────────────────────────── */
const BR: Row[] = [
    { code: 'Б RUF О',      label: 'Опил',                  c500:'planned', c1000:'planned', c1200: null,     c2000: null },
    { code: 'Б RUF О ТГК',  label: 'Опил + ТГК (дровяной)', c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'Б RUF Щ ТГК',  label: 'Щепа + ТГК',           c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'Б RUF ЩГ ТГК', label: 'Щепа + Горбыль + ТГК', c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'Б RUF ОГ ТГК', label: 'Опил + Горбыль + ТГК', c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'Б RUF Щ ТГН',  label: 'Щепа + ТГН (сыпучее)', c500: null,     c1000:'planned', c1200: null,     c2000: null },
    { code: 'Б RUF ЩГ ТГН', label: 'Щепа + Горбыль + ТГН', c500: null,    c1000:'planned', c1200: null,     c2000: null },
];

/* ─── Пеллеты ──────────────────────────────────────────────── */
const PE: Row[] = [
    { code: 'П О',      label: 'Опил',                    c500:'planned', c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'П О ТГК',  label: 'Опил + ТГК (дровяной)',   c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'П Щ ТГК',  label: 'Щепа + ТГК',             c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'П ЩГ ТГК', label: 'Щепа + Горбыль + ТГК',   c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'П ОГ ТГК', label: 'Опил + Горбыль + ТГК',   c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'П О ТГН',  label: 'Опил + ТГН (сыпучее)',    c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'П Щ ТГН',  label: 'Щепа + ТГН',             c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'П ЩГ ТГН', label: 'Щепа + Горбыль + ТГН',   c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
];

/* ─── Сушка ────────────────────────────────────────────────── */
const SU: Row[] = [
    { code: 'С О ТГК',  label: 'Опил + ТГК (дровяной)',   c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'С Щ ТГК',  label: 'Щепа + ТГК',             c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'С ЩГ ТГК', label: 'Щепа + Горбыль + ТГК',   c500:'planned', c1000:'planned', c1200:'planned', c2000: null },
    { code: 'С ОГ ТГК', label: 'Опил + Горбыль + ТГК',   c500:'planned', c1000: null,     c1200: null,     c2000: null },
    { code: 'С О ТГН',  label: 'Опил + ТГН (сыпучее)',    c500: null,     c1000:'planned', c1200:'planned', c2000: null },
    { code: 'С Щ ТГН',  label: 'Щепа + ТГН',             c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
    { code: 'С ЩГ ТГН', label: 'Щепа + Горбыль + ТГН',   c500: null,     c1000:'planned', c1200:'planned', c2000:'planned' },
];

const GROUPS: Group[] = [
    { title:'Брикеты Pini Kay', subtitle:'Плотный брикет октагональной формы, экспортный стандарт', accent:'#dc2626', icon:'ri-artboard-2-line',    rows: BP },
    { title:'Брикеты RUF',      subtitle:'Прямоугольный брикет, подходит для паллетирования',       accent:'#ea580c', icon:'ri-layout-2-line',       rows: BR },
    { title:'Пеллеты',          subtitle:'Топливные гранулы диаметром 6–8 мм, стандарт ENplus',     accent:'#16a34a', icon:'ri-bubble-chart-line',    rows: PE },
    { title:'Сушильные линии',  subtitle:'Барабанные сушилки под ключ, без стадии прессования',     accent:'#2563eb', icon:'ri-temp-hot-line',        rows: SU },
];

const CAPS: { key: keyof Omit<Row,'code'|'label'>; label: string }[] = [
    { key: 'c500',  label: '500 кг/ч'  },
    { key: 'c1000', label: '1000 кг/ч' },
    { key: 'c1200', label: '1200 кг/ч' },
    { key: 'c2000', label: '2000 кг/ч' },
];

function countReady(rows: Row[]) {
    return rows.flatMap(r => CAPS.map(c => r[c.key])).filter(c => c !== null && c !== 'planned').length;
}
function countTotal(rows: Row[]) {
    return rows.flatMap(r => CAPS.map(c => r[c.key])).filter(c => c !== null).length;
}

function CellView({ cell }: { cell: Cell }) {
    if (cell === null) return <span className="text-gray-200 text-sm select-none">—</span>;
    if (cell === 'planned') return (
        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-400 font-medium">
            Планируется
        </span>
    );
    return (
        <Link
            href={cell.href}
            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-700 hover:bg-green-100 transition-colors"
        >
            <i className="ri-checkbox-circle-fill text-green-500" />
            Открыть
        </Link>
    );
}

export default function KpCatalogPage() {
    const totalReady = GROUPS.reduce((s, g) => s + countReady(g.rows), 0);
    const totalAll   = GROUPS.reduce((s, g) => s + countTotal(g.rows), 0);

    return (
        <div className="p-6" style={{ maxWidth: 1100 }}>

            {/* Шапка */}
            <div className="flex items-end gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Каталог КП</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Коммерческие предложения по линиям оборудования</p>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-xs text-gray-400">Готово</div>
                        <div className="text-lg font-bold text-gray-900">
                            {totalReady} <span className="text-gray-300 font-normal">/</span> {totalAll}
                        </div>
                    </div>
                    <div
                        className="h-12 w-12 rounded-full flex items-center justify-center"
                        style={{ background: `conic-gradient(#16a34a ${(totalReady/totalAll)*360}deg, #e5e7eb 0deg)` }}
                    >
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-gray-900 text-xs font-bold">
                            {Math.round((totalReady/totalAll)*100)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Группы */}
            <div className="flex flex-col gap-6">
                {GROUPS.map(group => {
                    const ready = countReady(group.rows);
                    const total = countTotal(group.rows);
                    return (
                        <div key={group.title} className="rounded-xl border border-gray-200 bg-white overflow-hidden">

                            {/* Заголовок */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white text-lg"
                                    style={{ background: group.accent }}>
                                    <i className={group.icon} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900">{group.title}</div>
                                    <div className="text-xs text-gray-400 truncate">{group.subtitle}</div>
                                </div>
                                <div className="flex-shrink-0 text-sm text-gray-400">
                                    {ready > 0 && <span className="text-green-600 font-medium">{ready} готово</span>}
                                    {ready > 0 && <span className="mx-1 text-gray-300">/</span>}
                                    <span>{total} в каталоге</span>
                                </div>
                            </div>

                            {/* Таблица */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left font-medium text-gray-400 px-4 py-2.5 text-xs uppercase tracking-wide w-28">
                                                Маркировка
                                            </th>
                                            <th className="text-left font-medium text-gray-500 px-4 py-2.5">
                                                Конфигурация
                                            </th>
                                            {CAPS.map(cap => (
                                                <th key={cap.key} className="text-center font-medium text-gray-500 px-3 py-2.5 w-32 whitespace-nowrap">
                                                    {cap.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {group.rows.map(row => (
                                            <tr key={row.code} className="hover:bg-gray-50/60 transition-colors">
                                                <td className="px-4 py-2.5">
                                                    <span className="font-mono text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 whitespace-nowrap">
                                                        {row.code}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2.5 text-gray-700">{row.label}</td>
                                                {CAPS.map(cap => (
                                                    <td key={cap.key} className="px-3 py-2.5 text-center">
                                                        <CellView cell={row[cap.key]} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Легенда */}
            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                    <i className="ri-checkbox-circle-fill text-green-500" />
                    Готово — КП открывается и выводится на печать
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-gray-400">Планируется</span>
                    В каталоге, не разработано
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="text-gray-200">—</span>
                    Такой конфигурации не существует
                </span>
            </div>
        </div>
    );
}
