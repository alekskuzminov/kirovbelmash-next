import { NextResponse } from 'next/server';
import { lineVariants, type LineVariant } from '@/components/lines/linesData';

const SITE_URL = 'https://kirovbelmash.ru';
const COMPANY = 'КировБелМаш';

const categories = [
    { id: 1, name: 'Линии брикетирования', parentId: null },
    { id: 2, name: 'Линии гранулирования', parentId: null },
    { id: 3, name: 'Сушильные линии', parentId: null },
] as const;

const categoryMap: Record<string, number> = {
    briquetting: 1,
    granulation: 2,
    drying: 3,
};

function parsePrice(priceStr: string): number | null {
    const digits = priceStr.replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : null;
}

function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function buildOffer(variant: LineVariant, categoryId: number): string {
    const price = parsePrice(variant.price);
    const url = `${SITE_URL}/production-lines/${variant.id}`;
    const picture = variant.renders[0]
        ? `${SITE_URL}${variant.renders[0]}`
        : `${SITE_URL}${variant.image}`;

    const params: [string, string | undefined][] = [
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

    const paramLines = params
        .filter(([, value]) => value)
        .map(([name, value]) => `      <param name="${escapeXml(name)}">${escapeXml(value!)}</param>`)
        .join('\n');

    const additionalPictures = variant.renders
        .slice(1)
        .map((r) => `      <picture>${SITE_URL}${r}</picture>`)
        .join('\n');

    return `    <offer id="${variant.id}" type="vendor.model" available="true">
      <url>${url}</url>
      <price>${price ?? 0}</price>
      <currencyId>RUR</currencyId>
      <categoryId>${categoryId}</categoryId>
      <picture>${picture}</picture>
${additionalPictures}
      <vendor>${COMPANY}</vendor>
      <model>${escapeXml(variant.capacity)}</model>
      <name>${escapeXml(variant.name)}</name>
      <description>${escapeXml(variant.description)}</description>
${paramLines}
    </offer>`;
}

function generateYml(): string {
    const now = new Date().toISOString().replace(/\.\d{3}Z$/, '+03:00');

    const categoriesXml = categories
        .map((c) => `      <category id="${c.id}">${escapeXml(c.name)}</category>`)
        .join('\n');

    const offersXml = (Object.keys(lineVariants) as Array<keyof typeof lineVariants>)
        .flatMap((type) =>
            lineVariants[type].map((variant) => buildOffer(variant, categoryMap[type]))
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE yml_catalog SYSTEM "shops.dtd">
<yml_catalog date="${now}">
  <shop>
    <name>${COMPANY}</name>
    <company>ООО «КировБелМаш»</company>
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
