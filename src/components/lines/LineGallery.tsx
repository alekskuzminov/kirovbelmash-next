'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LineGalleryProps {
    images: string[];
    title: string;
    icon?: string;
}

export default function LineGallery({ images, title, icon = 'ri-image-line' }: LineGalleryProps) {
    const [active, setActive] = useState(0);

    if (!images.length) return null;

    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className={`${icon} text-red-600`} />
                {title}
            </h2>

            {/* Main image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                <Image
                    src={images[active]}
                    alt={`${title} ${active + 1}`}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === active
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
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
