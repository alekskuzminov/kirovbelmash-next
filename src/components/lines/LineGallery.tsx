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
            <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-transparent mb-4`}>
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
                                : 'border-transparent hover:border-gray-400'
                                }`}
                        >
                            <Image
                                src={src}
                                alt={`${title} ${i + 1}`}
                                fill
                                className="object-cover object-center"
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
