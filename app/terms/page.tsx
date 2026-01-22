'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState('');
    const t = useTranslations();

    const sections = [
        { id: t.terms.sections.acceptance.id, title: t.terms.sections.acceptance.title },
        { id: t.terms.sections.scope.id, title: t.terms.sections.scope.title },
        { id: t.terms.sections.custody.id, title: t.terms.sections.custody.title },
        { id: t.terms.sections.evidence.id, title: t.terms.sections.evidence.title },
        { id: t.terms.sections.payments.id, title: t.terms.sections.payments.title },
        { id: t.terms.sections.liability.id, title: t.terms.sections.liability.title },
        { id: t.terms.sections.userObligations.id, title: t.terms.sections.userObligations.title },
        { id: t.terms.sections.clientObligations.id, title: t.terms.sections.clientObligations.title },
        { id: t.terms.sections.privacy.id, title: t.terms.sections.privacy.title },
        { id: t.terms.sections.intellectualProperty.id, title: t.terms.sections.intellectualProperty.title },
        { id: t.terms.sections.modifications.id, title: t.terms.sections.modifications.title },
        { id: t.terms.sections.jurisdiction.id, title: t.terms.sections.jurisdiction.title },
        { id: t.terms.sections.contact.id, title: t.terms.sections.contact.title },
    ];

    useEffect(() => {
        setActiveSection(t.terms.sections.acceptance.id);
    }, [t.terms.sections.acceptance.id]);

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
                            alt="ParKpool"
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
                            {t.terms.backToHome}
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
                                {t.terms.index}
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
                                    {t.terms.title}
                                </h1>
                                <p className="text-lg text-midnight-navy/60 font-medium">
                                    {t.terms.lastUpdated}
                                </p>
                            </div>

                            {/* Section 1: Acceptance */}
                            <section id={t.terms.sections.acceptance.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.acceptance.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.acceptance.content}</p>
                                </div>
                            </section>

                            {/* Section 2: Scope */}
                            <section id={t.terms.sections.scope.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.scope.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.scope.content}</p>
                                </div>
                            </section>

                            {/* Section 3: Custody */}
                            <section id={t.terms.sections.custody.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.custody.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.custody.content}</p>
                                </div>
                            </section>

                            {/* Section 4: Evidence */}
                            <section id={t.terms.sections.evidence.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.evidence.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.evidence.content}</p>
                                </div>
                            </section>

                            {/* Section 5: Payments */}
                            <section id={t.terms.sections.payments.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.payments.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.payments.content}</p>
                                </div>
                            </section>

                            {/* Section 6: Liability */}
                            <section id={t.terms.sections.liability.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.liability.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.liability.content}</p>
                                </div>
                            </section>

                            {/* Section 7: User Obligations */}
                            <section id={t.terms.sections.userObligations.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.userObligations.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.userObligations.content}</p>
                                </div>
                            </section>

                            {/* Section 8: Client Obligations */}
                            <section id={t.terms.sections.clientObligations.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.clientObligations.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.clientObligations.content}</p>
                                </div>
                            </section>

                            {/* Section 9: Privacy */}
                            <section id={t.terms.sections.privacy.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.privacy.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.privacy.content}</p>
                                </div>
                            </section>

                            {/* Section 10: Intellectual Property */}
                            <section id={t.terms.sections.intellectualProperty.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.intellectualProperty.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.intellectualProperty.content}</p>
                                </div>
                            </section>

                            {/* Section 11: Modifications */}
                            <section id={t.terms.sections.modifications.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.modifications.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.modifications.content}</p>
                                </div>
                            </section>

                            {/* Section 12: Jurisdiction */}
                            <section id={t.terms.sections.jurisdiction.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.jurisdiction.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p className="whitespace-pre-line">{t.terms.sections.jurisdiction.content}</p>
                                </div>
                            </section>

                            {/* Section 13: Contact */}
                            <section id={t.terms.sections.contact.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.contact.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <div className="bg-soft-gray/50 rounded-2xl p-6 not-prose">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.terms.sections.contact.emailLabel}
                                                </p>
                                                <a
                                                    href={`mailto:${t.terms.sections.contact.email}`}
                                                    className="text-azure-blue hover:underline font-bold text-lg"
                                                >
                                                    {t.terms.sections.contact.email}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.terms.sections.contact.phoneLabel}
                                                </p>
                                                <p className="text-midnight-navy font-medium">
                                                    {t.terms.sections.contact.phone}
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
                                        {t.terms.footerCta}
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 bg-azure-blue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-azure-blue/30 hover:shadow-azure-blue/50 hover:-translate-y-1 transition-all"
                                    >
                                        {t.terms.backToHome}
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
