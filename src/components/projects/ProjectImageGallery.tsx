'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectImageGalleryProps {
    images: string[];
    title: string;
}

export default function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Главное изображение */}
            <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group">
                <Image
                    src={images[activeImageIndex]}
                    alt={`${title} - Главное фото`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={true}
                />

                {/* Стрелки переключения */}
                <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Предыдущее фото"
                >
                    <i className="ri-arrow-left-s-line text-xl" />
                </button>
                <button
                    onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Следующее фото"
                >
                    <i className="ri-arrow-right-s-line text-xl" />
                </button>
            </div>

            {/* Миниатюры */}
            <div className="grid grid-cols-5 gap-3">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`aspect-video relative rounded-lg overflow-hidden border-2 transition-all bg-gray-50 cursor-pointer ${activeImageIndex === idx ? 'border-red-600' : 'border-transparent hover:border-gray-300'
                            }`}
                        aria-label={`Переключить на фото ${idx + 1}`}
                    >
                        <Image src={img} alt={`Миниатюра ${idx + 1}`} fill sizes="20vw" className="object-cover" unoptimized={true} />
                    </button>
                ))}
            </div>
        </div>
    );
}
