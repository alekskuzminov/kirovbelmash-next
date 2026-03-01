'use client';

import { SITE_CONFIG } from '@/config/site.config';
import Image from 'next/image';

interface ProjectVideoProps {
    videoUrl: string;
    title: string;
    poster?: string;
}

export default function ProjectVideo({ videoUrl, title, poster }: ProjectVideoProps) {
    // Если путь начинается с /images/projects, значит это старый локальный путь.
    // В будущем здесь можно добавить логику преобразования путей в S3 URL, 
    // если они не заданы полностью в данных.

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Видео работы линии
            </h3>
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-black aspect-video">
                {/* Logo watermark */}
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

                <video
                    controls
                    muted
                    autoPlay
                    preload="metadata"
                    poster={poster}
                    className="w-full h-full block"
                    playsInline
                >
                    <source src={videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает встроенные видео.
                </video>
            </div>
        </div>
    );
}
