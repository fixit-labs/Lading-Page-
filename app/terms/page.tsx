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
        { id: t.terms.sections.services.id, title: t.terms.sections.services.title },
        { id: t.terms.sections.accounts.id, title: t.terms.sections.accounts.title },
        { id: t.terms.sections.payments.id, title: t.terms.sections.payments.title },
        { id: t.terms.sections.liability.id, title: t.terms.sections.liability.title },
        { id: t.terms.sections.privacy.id, title: t.terms.sections.privacy.title },
        { id: t.terms.sections.modifications.id, title: t.terms.sections.modifications.title },
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
                                    <p>{t.terms.sections.acceptance.p1}</p>
                                    <p>{t.terms.sections.acceptance.p2}</p>
                                </div>
                            </section>

                            {/* Section 2: Services */}
                            <section id={t.terms.sections.services.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.services.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>{t.terms.sections.services.p1}</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.services.list.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>{t.terms.sections.services.p2}</p>
                                </div>
                            </section>

                            {/* Section 3: Accounts */}
                            <section id={t.terms.sections.accounts.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.accounts.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.accounts.managerTitle}</strong>{' '}
                                        {t.terms.sections.accounts.managerIntro}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.accounts.managerList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.accounts.valetTitle}</strong>{' '}
                                        {t.terms.sections.accounts.valetIntro}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.accounts.valetList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>{t.terms.sections.accounts.p1}</p>
                                </div>
                            </section>

                            {/* Section 4: Payments */}
                            <section id={t.terms.sections.payments.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.payments.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.payments.subscriptionTitle}</strong>{' '}
                                        {t.terms.sections.payments.subscriptionIntro}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.payments.subscriptionList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.payments.processingTitle}</strong>{' '}
                                        {t.terms.sections.payments.processingText}
                                    </p>
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.payments.billingTitle}</strong>{' '}
                                        {t.terms.sections.payments.billingIntro}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.payments.billingList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Section 5: Liability */}
                            <section id={t.terms.sections.liability.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.liability.titleNumbered}
                                </h2>
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg mb-6">
                                    <p className="text-amber-900 font-bold text-sm uppercase tracking-wider mb-2">
                                        {t.terms.sections.liability.warningLabel}
                                    </p>
                                    <p className="text-amber-800 font-medium">
                                        {t.terms.sections.liability.warningText}
                                    </p>
                                </div>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.liability.userAcknowledges}</strong>
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.liability.userList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>{t.terms.sections.liability.p1}</p>
                                </div>
                            </section>

                            {/* Section 6: Privacy */}
                            <section id={t.terms.sections.privacy.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.privacy.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>{t.terms.sections.privacy.p1}</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.privacy.complianceList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">{t.terms.sections.privacy.dataCollectedTitle}</strong>{' '}
                                        {t.terms.sections.privacy.dataCollectedIntro}
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.privacy.dataCollectedList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>
                                        {t.terms.sections.privacy.p2}{' '}
                                        <Link href="/privacy" className="text-azure-blue hover:underline font-bold">
                                            {t.terms.sections.privacy.privacyPolicyLink}
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </section>

                            {/* Section 7: Modifications */}
                            <section id={t.terms.sections.modifications.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.modifications.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>{t.terms.sections.modifications.p1}</p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        {t.terms.sections.modifications.notificationList.map((item: string, index: number) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                    <p>{t.terms.sections.modifications.p2}</p>
                                </div>
                            </section>

                            {/* Section 8: Contact */}
                            <section id={t.terms.sections.contact.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    {t.terms.sections.contact.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>{t.terms.sections.contact.p1}</p>
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
                                                    {t.terms.sections.contact.supportLabel}
                                                </p>
                                                <a
                                                    href={`mailto:${t.terms.sections.contact.supportEmail}`}
                                                    className="text-azure-blue hover:underline font-bold text-lg"
                                                >
                                                    {t.terms.sections.contact.supportEmail}
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    {t.terms.sections.contact.addressLabel}
                                                </p>
                                                <p className="text-midnight-navy font-medium">
                                                    {t.terms.sections.contact.addressLine1}
                                                    <br />
                                                    {t.terms.sections.contact.addressLine2}
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
