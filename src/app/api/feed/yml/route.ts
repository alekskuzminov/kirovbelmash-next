import { NextResponse } from 'next/server';
import { lineVariants, type LineVariant } from '@/components/lines/linesData';

const SITE_URL = 'https://kirovbelmash.ru';
const COMPANY = 'КировБелМаш';
const VENDOR_FULL = 'ООО «КировБелМаш»';
const SALES_NOTES_ON_REQUEST = 'Цена по запросу';

/**
 * Категории фида. ID-ы стабильные — на них завязываются кампании в Я.Директе,
 * поэтому менять/переиспользовать существующие нельзя. Новые добавлять с новыми id.
 *
 * Сейчас в фид идут только производственные линии. Оборудование (отдельные агрегаты)
 * пока вынесено за пределы фида — у позиций не проставлены цены, а Я.Директ отказывается
 * принимать офферы с `price=0`. Когда появятся цены, для оборудования сделаем отдельный
 * роут (например, `/api/feed/yml-equipment`).
 */
const LINE_CATEGORIES = [
    { id: 1, name: 'Линии брикетирования' },
    { id: 2, name: 'Линии гранулирования' },
    { id: 3, name: 'Сушильные линии' },
] as const;

const lineCategoryMap: Record<keyof typeof lineVariants, number> = {
    briquetting: 1,
    granulation: 2,
    drying: 3,
};

/**
 * Короткие имена для офферов в фиде. Используются вместо полных названий с сайта,
 * чтобы в смарт-объявлениях / товарной галерее Я.Директа показывалось лаконичное
 * «Линия брикетирования 1000 кг/час» вместо «Линия по производству топливных брикетов…».
 */
const lineShortNameMap: Record<keyof typeof lineVariants, string> = {
    briquetting: 'Линия брикетирования',
    granulation: 'Линия гранулирования',
    drying: 'Сушильная линия',
};

function parsePrice(priceStr: string | undefined | null): number | null {
    if (!priceStr) return null;
    const digits = priceStr.replace(/[^\d]/g, '');
    if (!digits) return null;
    const value = parseInt(digits, 10);
    return Number.isFinite(value) && value > 0 ? value : null;
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/** Превращает относительный путь (`/images/...`) в абсолютный URL. Абсолютные ссылки на CDN не трогаем. */
function absoluteUrl(path: string): string {
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path}`;
}

/**
 * Поля, связанные с ценой и доступностью.
 *
 * Если цены нет — оффер уходит с available="false", price=0 и sales_notes="Цена по запросу".
 * Это сознательный выбор (вариант B): такой оффер остаётся в фиде для полноты витрины,
 * но Я.Директ его не покажет в смарт-баннере / товарной галерее и не сольёт на него бюджет.
 */
function priceFields(rawPrice: string | undefined): {
    available: boolean;
    priceTag: string;
    salesNotesTag: string;
} {
    const parsed = parsePrice(rawPrice);
    if (parsed === null) {
        return {
            available: false,
            priceTag: '      <price>0</price>',
            salesNotesTag: `      <sales_notes>${escapeXml(SALES_NOTES_ON_REQUEST)}</sales_notes>`,
        };
    }
    return {
        available: true,
        priceTag: `      <price from="true">${parsed}</price>`,
        salesNotesTag: '',
    };
}

function buildParamLines(params: Array<[string, string | undefined | null]>): string {
    return params
        .filter(([, value]) => value && value.trim().length > 0)
        .map(
            ([name, value]) =>
                `      <param name="${escapeXml(name)}">${escapeXml(value!.trim())}</param>`
        )
        .join('\n');
}

function buildPictureTags(images: string[]): string {
    return images
        .filter(Boolean)
        .map((src) => `      <picture>${escapeXml(absoluteUrl(src))}</picture>`)
        .join('\n');
}

function compact(lines: string[]): string {
    return lines.filter((l) => l.length > 0).join('\n');
}

function buildLineOffer(
    variant: LineVariant,
    categoryId: number,
    shortNameBase: string
): string {
    const url = `${SITE_URL}/production-lines/${variant.id}`;
    const { available, priceTag, salesNotesTag } = priceFields(variant.price);
    // Для имени оффера схлопываем диапазон производительности до верхней границы:
    // «800-1000 кг/час» → «1000 кг/час». Поле variant.capacity на сайте не меняется.
    const capacityForName = variant.capacity?.replace(/\d+\s*-\s*/g, '').trim();
    const shortName = capacityForName
        ? `${shortNameBase} ${capacityForName}`
        : shortNameBase;

    const pictures: string[] = [];
    if (variant.renders.length > 0) {
        pictures.push(...variant.renders);
    } else if (variant.image) {
        pictures.push(variant.image);
    }

    const params: Array<[string, string | undefined | null]> = [
        ['Производительность', variant.capacity],
        ['Установленная мощность', variant.installedPower],
        ['Потребляемая мощность', variant.consumedPower],
        ['Тип сырья', variant.rawMaterial],
        ['Влажность сырья', variant.rawMoisture],
        ['Готовый продукт', variant.product],
        ['Обслуживающий персонал', variant.staff],
        ['Площадь для установки', variant.installationArea],
        ['Высота потолков', variant.ceilingHeight],
        ['Срок изготовления', variant.deliveryWeeks],
        ['Комплектация РФ', variant.rfComplect],
    ];

    return compact([
        `    <offer id="line-${escapeXml(variant.id)}" available="${available}">`,
        `      <url>${escapeXml(url)}</url>`,
        priceTag,
        '      <currencyId>RUR</currencyId>',
        `      <categoryId>${categoryId}</categoryId>`,
        buildPictureTags(pictures),
        `      <vendor>${escapeXml(COMPANY)}</vendor>`,
        `      <name>${escapeXml(shortName)}</name>`,
        `      <description>${escapeXml(variant.description)}</description>`,
        salesNotesTag,
        buildParamLines(params),
        '    </offer>',
    ]);
}

function generateYml(): string {
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, '+03:00');

    const categoriesXml = LINE_CATEGORIES.map(
        (c) => `      <category id="${c.id}">${escapeXml(c.name)}</category>`
    ).join('\n');

    const offersXml = (Object.keys(lineVariants) as Array<keyof typeof lineVariants>)
        .flatMap((type) =>
            lineVariants[type].map((variant) =>
                buildLineOffer(variant, lineCategoryMap[type], lineShortNameMap[type])
            )
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${now}">
  <shop>
    <name>${escapeXml(COMPANY)}</name>
    <company>${escapeXml(VENDOR_FULL)}</company>
    <url>${SITE_URL}</url>
    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>
    <categories>
${categoriesXml}
    </categories>
    <offers>
${offersXml}
    </offers>
  </shop>
</yml_catalog>`;
}

export async function GET() {
    const xml = generateYml();

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
