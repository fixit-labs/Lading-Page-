'use client';

import LandingPage from '@/components/LandingPage';
import { LocaleProvider } from '@/contexts/LocaleContext';

export default function Home() {
    return (
        <LocaleProvider>
            <LandingPage />
        </LocaleProvider>
    );
}
