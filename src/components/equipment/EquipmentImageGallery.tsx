"use client";

import { useState } from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';

interface EquipmentImageGalleryProps {
    mainImage: string;
    gallery?: string[];
    itemName: string;
}

const EquipmentImageGallery = ({ mainImage, gallery = [], itemName }: EquipmentImageGalleryProps) => {
    const [activeImage, setActiveImage] = useState(mainImage);

    // Объединяем основное фото и дополнительные для отображения в галерее
    const allImages = [mainImage, ...gallery];

    return (
        <div className="w-full">
            {/* Основное изображение */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-gray-100 mb-3 shadow-sm transition-all duration-500">

                <Image
                    src={activeImage}
                    alt={itemName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4 sm:p-6"
                />
            </div>

            {/* Галерея */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {allImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-white border-2 transition-all duration-200 ${activeImage === img
                                ? 'border-red-600 shadow-md scale-[0.98]'
                                : 'border-gray-100 hover:border-red-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${itemName} - фото ${idx + 1}`}
                                fill
                                sizes="(max-width: 1024px) 25vw, 15vw"
                                className="object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EquipmentImageGallery;
