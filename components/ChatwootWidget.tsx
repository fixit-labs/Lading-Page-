'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        chatwootSDK: {
            run: (config: { websiteToken: string; baseUrl: string }) => void;
        };
    }
}

export default function ChatwootWidget() {
    useEffect(() => {
        const BASE_URL = 'https://chatwoot-production-6798.up.railway.app';

        const script = document.createElement('script');
        script.src = `${BASE_URL}/packs/js/sdk.js`;
        script.async = true;
        script.onload = () => {
            window.chatwootSDK.run({
                websiteToken: 'zDjGT1Rj7Axe31L1o76WNYV3',
                baseUrl: BASE_URL,
            });
        };

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return null;
}
