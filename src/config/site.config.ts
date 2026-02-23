// Central configuration for site-wide constants.
// All contact info, social links, and branding live here.
// In Phase 1 these will be served from the API/database.

export const SITE_CONFIG = {
  company: {
    name: 'КировБелМаш',
    tagline: 'Промышленное оборудование',
    description:
      'Производство промышленного оборудования для линий брикетирования и гранулирования.',
    foundedYear: 2010,
    copyrightYear: 2025,
  },

  contacts: {
    phone: '+79005218477',
    phoneFormatted: '+7 900 521-84-77',
    email: 'sale@kirovbelmash.tw1.ru',
    workingHours: 'Пн-Пт: 7:30 — 16:30',
    address: {
      city: 'г. Белая Холуница',
      region: 'Кировская область',
      country: 'Россия',
      street: 'ул. Глазырина, 112',
    },
  },

  social: {
    telegram: 'https://t.me/kirovbelmash',
    whatsapp: 'https://wa.me/79005218477',
  },

  assets: {
    logo: '/images/logo/logo.webp',
    logoAlt: 'КировБелМаш',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
