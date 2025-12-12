'use client';

import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    const switchLocale = (newLocale: 'es' | 'en') => {
        setLocale(newLocale);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-midnight-navy hover:text-azure-blue hover:bg-soft-gray/50 transition-all"
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
