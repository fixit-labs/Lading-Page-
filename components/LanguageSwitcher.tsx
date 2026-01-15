'use client';

import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';

interface LanguageSwitcherProps {
    variant?: 'light' | 'dark';
}

export default function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
    const { locale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    const switchLocale = (newLocale: 'es' | 'en') => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    const buttonStyles = variant === 'light'
        ? 'text-white hover:text-azure-blue hover:bg-white/10'
        : 'text-midnight-navy hover:text-azure-blue hover:bg-midnight-navy/10';

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${buttonStyles}`}
                aria-label="Change language"
            >
                <Globe className="w-4 h-4" />
                <span className="font-bold uppercase">{locale}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-20">
                        <button
                            onClick={() => switchLocale('es')}
                            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${locale === 'es'
                                    ? 'bg-azure-blue text-white'
                                    : 'text-midnight-navy hover:bg-soft-gray/50'
                                }`}
                        >
                            🇪🇸 Español
                        </button>
                        <button
                            onClick={() => switchLocale('en')}
                            className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${locale === 'en'
                                    ? 'bg-azure-blue text-white'
                                    : 'text-midnight-navy hover:bg-soft-gray/50'
                                }`}
                        >
                            🇺🇸 English
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
