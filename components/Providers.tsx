'use client';

import { LocaleProvider } from '@/contexts/LocaleContext';
import { LangUpdater } from './HtmlWrapper';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LocaleProvider>
            <LangUpdater />
            {children}
        </LocaleProvider>
    );
}
