'use client';

import { useEffect } from 'react';
import { captureVisitParams } from '@/lib/tracking';

/**
 * Invisible component that captures UTM parameters and Yandex ClientID
 * on every page load. Must be rendered inside the site layout.
 */
export default function TrackingCapture() {
    useEffect(() => {
        captureVisitParams();
    }, []);
    return null;
}
