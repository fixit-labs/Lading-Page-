'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'es' | 'en';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'parkpool-locale';

function getInitialLocale(): Locale {
    // Default to 'es' during SSR
    if (typeof window === 'undefined') {
        return 'es';
    }

    // Check localStorage first (user preference)
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale === 'es' || savedLocale === 'en') {
        return savedLocale;
    }

    // Detect browser language
    const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'es';
    const langCode = browserLang.split('-')[0].toLowerCase();

    // Return 'en' if browser is English, otherwise default to 'es'
    return langCode === 'en' ? 'en' : 'es';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('es');
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize locale on client side
    useEffect(() => {
        const initialLocale = getInitialLocale();
        setLocaleState(initialLocale);
        setIsInitialized(true);
    }, []);

    // Persist locale changes to localStorage
    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        }
    };

    // Prevent flash of wrong language during hydration
    if (!isInitialized) {
        return (
            <LocaleContext.Provider value={{ locale: 'es', setLocale }}>
                {children}
            </LocaleContext.Provider>
        );
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
