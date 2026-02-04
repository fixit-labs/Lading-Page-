'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Phone, Mail, Shield, HelpCircle, Bell, XCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

export default function SmsPolicy() {
    const [activeSection, setActiveSection] = useState('');
    const t = useTranslations();

    const sections = [
        { id: t.smsPolicy.sections.consent.id, title: t.smsPolicy.sections.consent.title, icon: Phone },
        { id: t.smsPolicy.sections.messageTypes.id, title: t.smsPolicy.sections.messageTypes.title, icon: MessageSquare },
        { id: t.smsPolicy.sections.frequency.id, title: t.smsPolicy.sections.frequency.title, icon: Bell },
        { id: t.smsPolicy.sections.optOut.id, title: t.smsPolicy.sections.optOut.title, icon: XCircle },
        { id: t.smsPolicy.sections.help.id, title: t.smsPolicy.sections.help.title, icon: HelpCircle },
        { id: t.smsPolicy.sections.additionalInfo.id, title: t.smsPolicy.sections.additionalInfo.title, icon: Shield },
        { id: t.smsPolicy.sections.privacy.id, title: t.smsPolicy.sections.privacy.title, icon: Lock },
        { id: t.smsPolicy.sections.contact.id, title: t.smsPolicy.sections.contact.title, icon: Mail },
    ];

    useEffect(() => {
        setActiveSection(t.smsPolicy.sections.consent.id);
    }, [t.smsPolicy.sections.consent.id]);

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
                            {t.smsPolicy.backToHome}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <nav className="sticky top-24">
                            <h2 className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-4">
                                {t.smsPolicy.index}
                            </h2>
                            <ul className="space-y-2">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeSection === section.id
                                                ? 'bg-azure-blue/10 text-azure-blue border-l-2 border-azure-blue'
                                                : 'text-midnight-navy/60 hover:text-midnight-navy hover:bg-soft-gray/50'
                                                }`}
                                        >
                                            <section.icon className="w-4 h-4" />
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
                                <div className="inline-flex items-center gap-2 bg-azure-blue/10 text-azure-blue px-4 py-2 rounded-full text-sm font-bold mb-4">
                                    <MessageSquare className="w-4 h-4" />
                                    {t.smsPolicy.badge}
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-midnight-navy mb-4">
                                    {t.smsPolicy.title}
                                </h1>
                                <p className="text-lg text-midnight-navy/60 font-medium">
                                    {t.smsPolicy.lastUpdated}
                                </p>
                            </div>

                            {/* Section 1: Consent */}
                            <section id={t.smsPolicy.sections.consent.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <Phone className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.consent.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>{t.smsPolicy.sections.consent.intro}</p>

                                    {/* Staff Script Box */}
                                    <div className="bg-azure-blue/5 border-l-4 border-azure-blue rounded-r-2xl p-6 my-6">
                                        <p className="text-sm font-bold text-azure-blue uppercase tracking-wider mb-3">
                                            {t.smsPolicy.sections.consent.scriptLabel}
                                        </p>
                                        <p className="text-midnight-navy italic text-lg leading-relaxed">
                                            &ldquo;{t.smsPolicy.sections.consent.script}&rdquo;
                                        </p>
                                    </div>

                                    <p>{t.smsPolicy.sections.consent.conclusion}</p>
                                </div>
                            </section>

                            {/* Section 2: Message Types */}
                            <section id={t.smsPolicy.sections.messageTypes.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <MessageSquare className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.messageTypes.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed">
                                    <p className="mb-4">{t.smsPolicy.sections.messageTypes.intro}</p>
                                    <ul className="space-y-3 list-none pl-0">
                                        {t.smsPolicy.sections.messageTypes.items.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="w-2 h-2 bg-azure-blue rounded-full mt-2.5 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3: Frequency */}
                            <section id={t.smsPolicy.sections.frequency.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <Bell className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.frequency.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed">
                                    <div className="bg-soft-gray/50 rounded-2xl p-6">
                                        <p className="text-2xl font-black text-midnight-navy mb-2">
                                            {t.smsPolicy.sections.frequency.typical}
                                        </p>
                                        <p className="text-midnight-navy/60">
                                            {t.smsPolicy.sections.frequency.note}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4: Opt-Out */}
                            <section id={t.smsPolicy.sections.optOut.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <XCircle className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.optOut.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                        <p className="font-bold text-midnight-navy mb-2">
                                            {t.smsPolicy.sections.optOut.instruction}
                                        </p>
                                        <p className="text-midnight-navy/70">
                                            {t.smsPolicy.sections.optOut.confirmation}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5: Help */}
                            <section id={t.smsPolicy.sections.help.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <HelpCircle className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.help.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed">
                                    <p>{t.smsPolicy.sections.help.instruction}</p>
                                    <div className="mt-4 inline-flex items-center gap-2 bg-azure-blue/10 text-azure-blue px-4 py-2 rounded-lg font-bold">
                                        <Mail className="w-4 h-4" />
                                        {t.smsPolicy.sections.help.email}
                                    </div>
                                </div>
                            </section>

                            {/* Section 6: Additional Info */}
                            <section id={t.smsPolicy.sections.additionalInfo.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <Shield className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.additionalInfo.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed">
                                    <ul className="space-y-3 list-none pl-0">
                                        {t.smsPolicy.sections.additionalInfo.items.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="w-2 h-2 bg-azure-blue rounded-full mt-2.5 flex-shrink-0"></span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-6 p-4 bg-soft-gray/50 rounded-xl">
                                        {t.smsPolicy.sections.additionalInfo.agreement}
                                    </p>
                                </div>
                            </section>

                            {/* Section 7: Privacy & Data Sharing */}
                            <section id={t.smsPolicy.sections.privacy.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <Lock className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.privacy.titleNumbered}
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                                        <p className="font-bold text-midnight-navy mb-3">
                                            {t.smsPolicy.sections.privacy.content}
                                        </p>
                                        <p className="text-midnight-navy/70 mb-4">
                                            {t.smsPolicy.sections.privacy.usage}
                                        </p>
                                        <p className="text-midnight-navy/70">
                                            {t.smsPolicy.sections.privacy.linkText}{' '}
                                            <Link
                                                href={`/terms#${t.terms.sections.privacy.id}`}
                                                className="text-azure-blue hover:underline font-bold"
                                            >
                                                {t.smsPolicy.privacyLink}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 8: Contact */}
                            <section id={t.smsPolicy.sections.contact.id} className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6 flex items-center gap-3">
                                    <Mail className="w-8 h-8 text-azure-blue" />
                                    {t.smsPolicy.sections.contact.titleNumbered}
                                </h2>
                                <div className="bg-soft-gray/50 rounded-2xl p-6">
                                    <p className="font-bold text-midnight-navy text-lg mb-4">
                                        {t.smsPolicy.sections.contact.company}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-azure-blue" />
                                            <a
                                                href={`mailto:${t.smsPolicy.sections.contact.email}`}
                                                className="text-azure-blue hover:underline font-medium"
                                            >
                                                {t.smsPolicy.sections.contact.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-midnight-navy/60">{t.smsPolicy.sections.contact.websiteLabel}:</span>
                                            <a
                                                href="https://www.parkpool.tech"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-azure-blue hover:underline font-medium"
                                            >
                                                www.parkpool.tech
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Related Links */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-4">
                                    {t.smsPolicy.relatedLinks}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/terms#privacidad"
                                        className="inline-flex items-center gap-2 text-azure-blue hover:underline font-medium"
                                    >
                                        {t.smsPolicy.privacyLink}
                                    </Link>
                                    <Link
                                        href="/terms"
                                        className="inline-flex items-center gap-2 text-azure-blue hover:underline font-medium"
                                    >
                                        {t.smsPolicy.termsLink}
                                    </Link>
                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="mt-16 pt-8 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-midnight-navy/60 font-medium mb-4">
                                        {t.smsPolicy.footerCta}
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 bg-azure-blue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-azure-blue/30 hover:shadow-azure-blue/50 hover:-translate-y-1 transition-all"
                                    >
                                        {t.smsPolicy.backToHome}
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
