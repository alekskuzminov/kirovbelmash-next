'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SITE_CONFIG } from '@/config/site.config';
import { equipmentCategories } from '@/mocks/equipment';

interface SiteNavbarProps {
    variant?: 'transparent' | 'solid';
}

const linesSubMenu = [
    { label: 'Линии брикетирования', href: '/linii-briketirovaniya' },
    { label: 'Линии гранулирования', href: '/linii-granulirovaniya' },
    { label: 'Сушильные линии', href: '/sushilnie-linii' },
];

// Reuse categories from the single source of truth in mocks/equipment.ts
const equipmentSubMenu = equipmentCategories
    .filter((c) => c !== 'Все')
    .map((category) => ({ label: category, category }));

type DropdownId = 'lines' | 'equipment' | null;

const navLinks = [
    { href: '/', label: 'Главная', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/#production-lines', label: 'Производственные линии', isAnchor: true, dropdownId: 'lines' as DropdownId },
    { href: '/oborudovanie', label: 'Каталог оборудования', isAnchor: false, dropdownId: 'equipment' as DropdownId },
    { href: '/calculator', label: 'Калькулятор', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/projects', label: 'Проекты', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/services', label: 'Услуги', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/blog', label: 'Блог', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/about', label: 'О компании', isAnchor: false, dropdownId: null as DropdownId },
    { href: '/contacts', label: 'Контакты', isAnchor: false, dropdownId: null as DropdownId },
];

// ── Shared dropdown item styles ──────────────────────────────────────────────
const dropdownItemCls =
    'block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap';

export default function SiteNavbar({ variant = 'transparent' }: SiteNavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
    const [mobileOpenSub, setMobileOpenSub] = useState<DropdownId>(null);
    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setMobileOpenSub(null);
    }, [pathname]);

    // Страницы с темным блоком hero, где шапка должна быть прозрачной до скролла
    const transparentPaths = ['/', '/about', '/calculator'];
    const transparentPrefixes = ['/linii-', '/sushilnie-', '/production-lines', '/services', '/projects', '/blog'];

    const isTransparentPage =
        transparentPaths.includes(pathname || '') ||
        transparentPrefixes.some(prefix => pathname?.startsWith(prefix));

    const isSolid = variant === 'solid' || isScrolled || !isTransparentPage;

    const isActive = (path: string) => !path.includes('#') && pathname === path;

    const handleDropdownEnter = (id: DropdownId) => {
        if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
        setOpenDropdown(id);
    };

    const handleDropdownLeave = () => {
        dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
    };

    const handleLinesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (pathname === '/') {
            document.getElementById('production-lines')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/#production-lines');
        }
        setOpenDropdown(null);
    };

    const handleEquipmentCategoryClick = (category: string) => {
        router.push(`/oborudovanie?category=${encodeURIComponent(category)}`);
        setOpenDropdown(null);
    };

    // ── Desktop nav link text style helper ──
    const desktopLinkCls = (path: string) =>
        `text-sm font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-1 ${isActive(path)
            ? 'text-red-600'
            : isSolid
                ? 'text-gray-700 hover:text-red-600'
                : 'text-gray-100 hover:text-white'
        }`;

    const simpleLinkCls = `text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${isSolid ? 'text-gray-700 hover:text-red-600' : 'text-gray-100 hover:text-white'
        }`;

    const arrowCls = (id: DropdownId) =>
        `ri-arrow-down-s-line text-xs transition-transform duration-200 ${openDropdown === id ? 'rotate-180' : ''}`;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'bg-white shadow-md' : 'bg-transparent'
                }`}
        >
            {/* Row 1: Logo + Contacts + CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center space-x-3 cursor-pointer"
                    >
                        <div className="w-10 h-10 flex items-center justify-center">
                            <Image
                                src={SITE_CONFIG.assets.logo}
                                alt={SITE_CONFIG.assets.logoAlt}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div>
                            <div className={`text-xl font-bold ${isSolid ? 'text-gray-900' : 'text-white'}`}>
                                {SITE_CONFIG.company.name}
                            </div>
                            <div className={`text-xs ${isSolid ? 'text-gray-500' : 'text-gray-300'}`}>
                                {SITE_CONFIG.company.tagline}
                            </div>
                        </div>
                    </Link>

                    {/* Desktop: Messengers + Email + Phone + CTA */}
                    <div className="hidden lg:flex items-center space-x-5">
                        {/* Messengers */}
                        <div className="flex items-center space-x-2">
                            <a
                                href={SITE_CONFIG.social.telegram}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${isSolid ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                title="Telegram"
                            >
                                <i className="ri-telegram-fill text-base"></i>
                            </a>
                            <a
                                href={SITE_CONFIG.social.whatsapp}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${isSolid ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/15 text-white hover:bg-white/25'
                                    }`}
                                title="WhatsApp"
                            >
                                <i className="ri-whatsapp-fill text-base"></i>
                            </a>
                        </div>

                        <div className={`w-px h-6 ${isSolid ? 'bg-gray-200' : 'bg-white/20'}`}></div>

                        <a
                            href={`mailto:${SITE_CONFIG.contacts.email}`}
                            className={`flex items-center space-x-2 text-sm hover:text-red-500 transition-colors cursor-pointer ${isSolid ? 'text-gray-600' : 'text-gray-200'
                                }`}
                        >
                            <i className="ri-mail-line text-base"></i>
                            <span className="whitespace-nowrap">{SITE_CONFIG.contacts.email}</span>
                        </a>

                        <div className={`w-px h-6 ${isSolid ? 'bg-gray-200' : 'bg-white/20'}`}></div>

                        <a
                            href={`tel:${SITE_CONFIG.contacts.phone}`}
                            className={`flex items-center space-x-2 font-medium text-sm hover:text-red-500 transition-colors cursor-pointer ${isSolid ? 'text-gray-800' : 'text-white'
                                }`}
                        >
                            <i className="ri-phone-line text-base"></i>
                            <span className="whitespace-nowrap">{SITE_CONFIG.contacts.phoneFormatted}</span>
                        </a>

                        <Link
                            href="/contacts"
                            className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                        >
                            Получить КП
                        </Link>
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden w-10 h-10 flex items-center justify-center ${isSolid ? 'text-gray-900' : 'text-white'}`}
                        aria-label="Меню"
                    >
                        <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
                    </button>
                </div>
            </div>

            {/* Row 2: Navigation menu (desktop) */}
            <div className={`hidden lg:block border-t ${isSolid ? 'border-gray-100' : 'border-white/10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-8 h-11">
                        {navLinks.map((link) => {
                            if (link.dropdownId === 'lines') {
                                return (
                                    <div
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={() => handleDropdownEnter('lines')}
                                        onMouseLeave={handleDropdownLeave}
                                    >
                                        <a href={link.href} onClick={handleLinesClick} className={simpleLinkCls + ' flex items-center space-x-1'}>
                                            <span>{link.label}</span>
                                            <i className={arrowCls('lines')}></i>
                                        </a>
                                        {openDropdown === 'lines' && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                                                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[220px]">
                                                    {linesSubMenu.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={sub.href}
                                                            onClick={() => setOpenDropdown(null)}
                                                            className={dropdownItemCls}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.dropdownId === 'equipment') {
                                return (
                                    <div
                                        key={link.href}
                                        className="relative"
                                        onMouseEnter={() => handleDropdownEnter('equipment')}
                                        onMouseLeave={handleDropdownLeave}
                                    >
                                        <Link href="/oborudovanie" className={desktopLinkCls('/oborudovanie')}>
                                            <span>{link.label}</span>
                                            <i className={arrowCls('equipment')}></i>
                                        </Link>
                                        {openDropdown === 'equipment' && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                                                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[300px] max-h-[70vh] overflow-y-auto">
                                                    {equipmentSubMenu.map((sub) => (
                                                        <a
                                                            key={sub.category}
                                                            href={`/oborudovanie?category=${encodeURIComponent(sub.category)}`}
                                                            onClick={(e) => { e.preventDefault(); handleEquipmentCategoryClick(sub.category); }}
                                                            className={dropdownItemCls}
                                                        >
                                                            {sub.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.isAnchor) {
                                return (
                                    <a key={link.href} href={link.href} className={simpleLinkCls}>
                                        {link.label}
                                    </a>
                                );
                            }

                            return (
                                <Link key={link.href} href={link.href} className={desktopLinkCls(link.href)}>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-64px)] overflow-y-auto">
                    <div className="px-4 py-3 space-y-0.5">
                        {navLinks.map((link) => {
                            if (link.dropdownId === 'lines') {
                                return (
                                    <div key={link.href}>
                                        <button
                                            onClick={() => setMobileOpenSub(mobileOpenSub === 'lines' ? null : 'lines')}
                                            className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                        >
                                            <span>{link.label}</span>
                                            <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileOpenSub === 'lines' ? 'rotate-180' : ''}`}></i>
                                        </button>
                                        {mobileOpenSub === 'lines' && (
                                            <div className="ml-4 space-y-0.5">
                                                <a
                                                    href="/#production-lines"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setIsMobileMenuOpen(false);
                                                        if (pathname === '/') {
                                                            document.getElementById('production-lines')?.scrollIntoView({ behavior: 'smooth' });
                                                        } else {
                                                            router.push('/#production-lines');
                                                        }
                                                    }}
                                                    className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                                >
                                                    Все линии
                                                </a>
                                                {linesSubMenu.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.dropdownId === 'equipment') {
                                return (
                                    <div key={link.href}>
                                        <button
                                            onClick={() => setMobileOpenSub(mobileOpenSub === 'equipment' ? null : 'equipment')}
                                            className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                        >
                                            <span>{link.label}</span>
                                            <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileOpenSub === 'equipment' ? 'rotate-180' : ''}`}></i>
                                        </button>
                                        {mobileOpenSub === 'equipment' && (
                                            <div className="ml-4 space-y-0.5">
                                                <Link
                                                    href="/oborudovanie"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                                >
                                                    Всё оборудование
                                                </Link>
                                                {equipmentSubMenu.map((sub) => (
                                                    <a
                                                        key={sub.category}
                                                        href={`/oborudovanie?category=${encodeURIComponent(sub.category)}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsMobileMenuOpen(false);
                                                            handleEquipmentCategoryClick(sub.category);
                                                        }}
                                                        className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        {sub.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (link.isAnchor) {
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block py-2.5 px-3 text-sm font-medium rounded-lg cursor-pointer transition-colors ${isActive(link.href) ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* Mobile contact section */}
                        <div className="pt-3 mt-2 border-t border-gray-200 space-y-3">
                            <div className="flex items-center space-x-2">
                                <a
                                    href={SITE_CONFIG.social.telegram}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center bg-sky-500 rounded-full text-white cursor-pointer"
                                >
                                    <i className="ri-telegram-fill text-base"></i>
                                </a>
                                <a
                                    href={SITE_CONFIG.social.whatsapp}
                                    target="_blank"
                                    rel="nofollow noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center bg-green-500 rounded-full text-white cursor-pointer"
                                >
                                    <i className="ri-whatsapp-fill text-base"></i>
                                </a>
                            </div>
                            <a href={`mailto:${SITE_CONFIG.contacts.email}`} className="flex items-center space-x-2 text-gray-600 text-sm">
                                <i className="ri-mail-line text-base"></i>
                                <span>{SITE_CONFIG.contacts.email}</span>
                            </a>
                            <a href={`tel:${SITE_CONFIG.contacts.phone}`} className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
                                <i className="ri-phone-line text-base"></i>
                                <span>{SITE_CONFIG.contacts.phoneFormatted}</span>
                            </a>
                            <Link
                                href="/contacts"
                                className="block w-full px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors text-center cursor-pointer whitespace-nowrap"
                            >
                                Получить КП
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
