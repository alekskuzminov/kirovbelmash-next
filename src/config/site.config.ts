// Central configuration for site-wide constants.
// All contact info, social links, and branding live here.
// In Phase 1 these will be served from the API/database.

export const SITE_CONFIG = {
  company: {
    name: 'КировБелМаш',
    tagline: 'Промышленное оборудование',
    description:
      'Завод-производитель промышленного оборудования для переработки древесных отходов.',
    foundedYear: 2011,
    copyrightYear: new Date().getFullYear(),
  },

  contacts: {
    phone: '+79005218477',
    phoneFormatted: '+7 900 521-84-77',
    email: 'sale@kirovbelmash.ru',
    workingHours: 'Пн-Пт: 8:00 — 17:00',
    address: {
      city: 'г. Белая Холуница',
      region: 'Кировская область',
      country: 'Россия',
      street: 'ул. Глазырина, 112',
    },
    departments: {
      sales: {
        phone: '+79005218477',
        phoneFormatted: '+7-900-521-84-77',
        email: 'sale@kirovbelmash.ru',
      },
      supply: {
        phone: '+79195263341',
        phoneFormatted: '+7-919-526-33-41',
        email: 'snab@kirovbelmash.ru',
      },
      general: {
        phone: '+78336441850',
        phoneFormatted: '+7-833-644-18-50',
        email: 'brike@kirovbelmash.ru',
      },
      accounting: {
        phone: '+79513474534',
        phoneFormatted: '+7-951-347-45-34',
        email: 'mail@kirovbelmash.ru',
      },
      engineering: {
        email: 'ogk@kirovbelmash.ru',
      },
    },
  },

  social: {
    telegram: 'https://t.me/kirovbelmash',
    viber: 'viber://chat?number=79005218477',
    whatsapp: 'https://wa.me/79005218477',
    vk: 'https://vk.com/kirovbelmash',
    max: 'https://max.ru/kirovbelmash',
  },

  assets: {
    logo: '/images/logo/logo.webp',
    logoAlt: 'КировБелМаш',
    icons: {
      telegram: '/icons/telegram-logo.svg',
      viber: '/icons/viber-sign-logo.svg',
      whatsapp: '/icons/whatsapp-sign-logo.svg',
      vk: '/icons/vk-logo.svg',
      max: '/icons/max-messenger-sign-logo.svg',
    },
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
