'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';

interface LineGalleryProps {
    images: string[];
    title?: string;
    icon?: string;
    showLogo?: boolean;
    aspectClass?: string;
}

export default function LineGallery({
    images,
    title,
    icon = 'ri-image-line',
    showLogo = true,
    aspectClass = 'aspect-[4/3]',
}: LineGalleryProps) {
    const [active, setActive] = useState(0);

    if (!images.length) return null;

    return (
        <div>
            {title && (
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i className={`${icon} text-red-600`} />
                    {title}
                </h2>
            )}

            {/* Main image */}
            <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-white border border-gray-200 mb-3`}>
                {/* Logo watermark */}
                {showLogo && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10 bg-white/80 p-1.5 pr-2.5 rounded-lg backdrop-blur-sm shadow-sm pointer-events-none">
                        <Image
                            src={SITE_CONFIG.assets.logo}
                            alt={SITE_CONFIG.assets.logoAlt}
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        <span className="text-xs font-bold text-gray-900">{SITE_CONFIG.company.name}</span>
                    </div>
                )}
                <Image
                    src={images[active]}
                    alt={`${title} ${active + 1}`}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 100vw"
                    unoptimized={true}
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 w-full">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative flex-1 ${aspectClass} rounded-lg overflow-hidden border-2 transition-all ${i === active
                                ? 'border-red-600 shadow-md'
                                : 'border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-contain object-center"
                                sizes="80px"
                                unoptimized={true}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
