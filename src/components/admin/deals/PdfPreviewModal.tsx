'use client';

interface Props {
    url: string;
    onClose: () => void;
}

export default function PdfPreviewModal({ url, onClose }: Props) {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="flex w-full max-w-4xl flex-col rounded-xl bg-gray-900 shadow-2xl"
                style={{ height: '80vh' }}>
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-3">
                    <span className="text-sm font-medium text-gray-200">
                        <i className="ri-file-pdf-line mr-2 text-red-400" />
                        КП.pdf
                    </span>
                    <div className="flex items-center gap-3">
                        <a
                            href={url}
                            download
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
                <iframe
                    src={url}
                    className="flex-1 rounded-b-xl"
                    title="PDF preview"
                />
            </div>
        </div>
    );
}
