'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { useEffect } from 'react';

export function LangUpdater() {
    const { locale } = useLocale();

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return null;
}
