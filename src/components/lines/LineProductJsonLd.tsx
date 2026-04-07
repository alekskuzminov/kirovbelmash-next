import { LineVariant } from './linesData';

interface LineProductJsonLdProps {
    variant: LineVariant;
    categoryName: string;
}

function parsePrice(priceStr: string): number | null {
    const digits = priceStr.replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : null;
}

const SITE_URL = 'https://kirovbelmash.ru';

export default function LineProductJsonLd({ variant, categoryName }: LineProductJsonLdProps) {
    const price = parsePrice(variant.price);
    const images = variant.renders.map((r) => `${SITE_URL}${r}`);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: variant.name,
        description: variant.description,
        image: images,
        url: `${SITE_URL}/production-lines/${variant.id}`,
        brand: {
            '@type': 'Brand',
            name: 'КировБелМаш',
        },
        manufacturer: {
            '@type': 'Organization',
            name: 'КировБелМаш',
            url: SITE_URL,
        },
        category: categoryName,
        sku: variant.id,
        ...(price
            ? {
                  offers: {
                      '@type': 'Offer',
                      url: `${SITE_URL}/production-lines/${variant.id}`,
                      priceCurrency: 'RUB',
                      price,
                      priceSpecification: {
                          '@type': 'PriceSpecification',
                          price,
                          priceCurrency: 'RUB',
                          valueAddedTaxIncluded: true,
                      },
                      availability: 'https://schema.org/InStock',
                      itemCondition: 'https://schema.org/NewCondition',
                      seller: {
                          '@type': 'Organization',
                          name: 'КировБелМаш',
                      },
                      hasMerchantReturnPolicy: {
                          '@type': 'MerchantReturnPolicy',
                          applicableCountry: 'RU',
                          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                      },
                      shippingDetails: {
                          '@type': 'OfferShippingDetails',
                          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'RUB' },
                          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'RU' },
                          deliveryTime: {
                              '@type': 'ShippingDeliveryTime',
                              handlingTime: {
                                  '@type': 'QuantitativeValue',
                                  minValue: (parseInt(variant.deliveryWeeks) || 8) * 7,
                                  maxValue: ((parseInt(variant.deliveryWeeks) || 8) + 4) * 7,
                                  unitCode: 'DAY',
                              },
                          },
                      },
                      deliveryLeadTime: {
                          '@type': 'QuantitativeValue',
                          minValue: (parseInt(variant.deliveryWeeks) || 8) * 7,
                          maxValue: (parseInt(variant.deliveryWeeks) || 8) * 7,
                          unitCode: 'DAY',
                      },
                      priceValidUntil: `${new Date().getFullYear()}-12-31`,
                  },
              }
            : {}),
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Производительность',
                value: variant.capacity,
            },
            ...(variant.installedPower
                ? [{ '@type': 'PropertyValue', name: 'Установленная мощность', value: variant.installedPower }]
                : []),
            ...(variant.consumedPower
                ? [{ '@type': 'PropertyValue', name: 'Потребляемая мощность', value: variant.consumedPower }]
                : []),
            {
                '@type': 'PropertyValue',
                name: 'Тип сырья',
                value: variant.rawMaterial,
            },
            {
                '@type': 'PropertyValue',
                name: 'Готовый продукт',
                value: variant.product,
            },
            ...(variant.installationArea
                ? [{ '@type': 'PropertyValue', name: 'Площадь для установки', value: variant.installationArea }]
                : []),
            ...(variant.staff
                ? [{ '@type': 'PropertyValue', name: 'Обслуживающий персонал', value: variant.staff }]
                : []),
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
