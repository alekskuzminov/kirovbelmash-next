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
    email: 'sale@kirovbelmash.ru',
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
