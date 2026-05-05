'use client';

interface Props {
    url: string;
    mimeType: string | null;
    name: string;
    onClose: () => void;
}

export default function FilePreviewModal({ url, mimeType, name, onClose }: Props) {
    const isPdf = mimeType === 'application/pdf';
    const isImage = mimeType?.startsWith('image/') ?? false;

    return (
        <div
            className="fixed inset-0 z-[60] flex flex-col bg-black/80"
            onClick={onClose}
        >
            {/* Toolbar */}
            <div
                className="flex items-center justify-between gap-4 bg-gray-900 px-5 py-3 shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="text-sm text-gray-300 truncate max-w-md">{name}</span>
                <div className="flex items-center gap-3">
                    <a
                        href={url}
                        download={name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-1.5 text-xs text-gray-200 hover:bg-gray-600"
                    >
                        <i className="ri-download-line" />
                        Скачать
                    </a>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <i className="ri-close-line text-xl" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 overflow-hidden flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                {isPdf && (
                    <iframe
                        src={url}
                        className="w-full h-full rounded"
                        title={name}
                    />
                )}
                {isImage && (
                    <img
                        src={url}
                        alt={name}
                        className="max-h-full max-w-full object-contain rounded"
                    />
                )}
            </div>
        </div>
    );
}
