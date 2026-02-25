'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState('');
    const t = useTranslations();

    const sections = [
        { id: t.privacy.sections.introduction.id, title: t.privacy.sections.introduction.title },
        { id: t.privacy.sections.dataCollection.id, title: t.privacy.sections.dataCollection.title },
        { id: t.privacy.sections.dataUse.id, title: t.privacy.sections.dataUse.title },
        { id: t.privacy.sections.dataSharing.id, title: t.privacy.sections.dataSharing.title },
        { id: t.privacy.sections.dataRetention.id, title: t.privacy.sections.dataRetention.title },
        { id: t.privacy.sections.yourRights.id, title: t.privacy.sections.yourRights.title },
        { id: t.privacy.sections.security.id, title: t.privacy.sections.security.title },
        { id: t.privacy.sections.cookies.id, title: t.privacy.sections.cookies.title },
        { id: t.privacy.sections.communications.id, title: t.privacy.sections.communications.title },
        { id: t.privacy.sections.changes.id, title: t.privacy.sections.changes.title },
        { id: t.privacy.sections.contact.id, title: t.privacy.sections.contact.title },
    ];

    useEffect(() => {
        setActiveSection(t.privacy.sections.introduction.id);
    }, [t.privacy.sections.introduction.id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <img
                            src="/images/light-logo.svg"
                            alt="ParkPool"
                            className="h-8 sm:h-10 w-auto"
                            style={{ filter: 'brightness(0) saturate(100%)' }}
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher variant="dark" />
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-midnight-navy hover:text-azure-blue transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t.privacy.backToHome}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar Navigation - Sticky */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <nav className="sticky top-24">
                            <h2 className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-4">
                                {t.privacy.index}
                            </h2>
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === section.id
                                                    ? 'bg-azure-blue/10 text-azure-blue border-l-2 border-azure-blue'
                                                    : 'text-midnight-navy/60 hover:text-midnight-navy hover:bg-soft-gray/50'
                                                }`}
                                        >
                                            {section.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className="lg:col-span-9">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Title */}
                            <div className="mb-12">
                                <h1 className="text-4xl sm:text-5xl font-black text-midnight-navy mb-4">
                                    {t.privacy.title}
                                </h1>
                                <p className="text-lg text-midnight-navy/60 font-medium">
                                    {t.privacy.lastUpdated}
                                </p>
                            </div>

                            {/* Section 1: Introduction */}
                            <section id={t.privacy.sections.introduction.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.introduction.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.introduction.content}</p>
                                </div>
                            </section>

                            {/* Section 2: Data Collection */}
                            <section id={t.privacy.sections.dataCollection.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.dataCollection.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.dataCollection.content}</p>
                                </div>
                            </section>

                            {/* Section 3: How We Use Your Data */}
                            <section id={t.privacy.sections.dataUse.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.dataUse.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.dataUse.content}</p>
                                </div>
                            </section>

                            {/* Section 4: Data Sharing */}
                            <section id={t.privacy.sections.dataSharing.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.dataSharing.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.dataSharing.content}</p>
                                </div>
                            </section>

                            {/* Section 5: Data Retention */}
                            <section id={t.privacy.sections.dataRetention.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.dataRetention.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.dataRetention.content}</p>
                                </div>
                            </section>

                            {/* Section 6: Your Rights */}
                            <section id={t.privacy.sections.yourRights.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.yourRights.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.yourRights.content}</p>
                                </div>
                            </section>

                            {/* Section 7: Data Security */}
                            <section id={t.privacy.sections.security.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.security.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.security.content}</p>
                                </div>
                            </section>

                            {/* Section 8: Cookies and Tracking */}
                            <section id={t.privacy.sections.cookies.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.cookies.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.cookies.content}</p>
                                </div>
                            </section>

                            {/* Section 9: Communications */}
                            <section id={t.privacy.sections.communications.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.communications.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.communications.content}</p>
                                </div>
                            </section>

                            {/* Section 10: Policy Changes */}
                            <section id={t.privacy.sections.changes.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.changes.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.privacy.sections.changes.content}</p>
                                </div>
                            </section>

                            {/* Section 11: Contact */}
                            <section id={t.privacy.sections.contact.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.privacy.sections.contact.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <div className="bg-soft-gray/50 rounded-2xl p-6 not-prose">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.privacy.sections.contact.emailLabel}
                                                </p>
                                                <a
                                                    href={`mailto:${t.privacy.sections.contact.email}`}
                                                    className="text-azure-blue hover:underline font-bold text-lg"
                                                >
                                                    {t.privacy.sections.contact.email}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.privacy.sections.contact.phoneLabel}
                                                </p>
                                                <p className="text-midnight-navy font-medium">
                                                    {t.privacy.sections.contact.phone}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.privacy.sections.contact.addressLabel}
                                                </p>
                                                <p className="text-midnight-navy font-medium">
                                                    {t.privacy.sections.contact.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Footer CTA */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-midnight-navy/60 font-medium mb-4">
                                        {t.privacy.footerCta}
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 bg-azure-blue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-azure-blue/30 hover:shadow-azure-blue/50 hover:-translate-y-1 transition-all"
                                    >
                                        {t.privacy.backToHome}
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
