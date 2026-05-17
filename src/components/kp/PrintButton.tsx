'use client';

export default function PrintButton() {
    return (
        <button
            type="button"
            className="kp-print-btn"
            onClick={() => window.print()}
        >
            <i className="ri-printer-line" />
            Скачать PDF
        </button>
    );
}
