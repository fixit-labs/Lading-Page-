'use client';

import { useState } from 'react';
import { ArrowLeft, Loader2, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type RequestType = 'webIssue' | 'mobileIssue' | 'suggestion' | 'paymentIssue' | 'other';

export default function SupportPage() {
    const t = useTranslations();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        requestType: '' as RequestType | '',
        description: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const requestTypes: { value: RequestType; label: string }[] = [
        { value: 'webIssue', label: t.support.typeOptions.webIssue },
        { value: 'mobileIssue', label: t.support.typeOptions.mobileIssue },
        { value: 'suggestion', label: t.support.typeOptions.suggestion },
        { value: 'paymentIssue', label: t.support.typeOptions.paymentIssue },
        { value: 'other', label: t.support.typeOptions.other },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/v1/public/support', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    requestTypeLabel: requestTypes.find(rt => rt.value === formData.requestType)?.label || formData.requestType,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', requestType: '', description: '' });
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || t.support.errorGeneric);
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(t.support.errorConnection);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                            {t.support.backToHome}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-xl mx-auto px-4 sm:px-6 pt-24 pb-16">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-azure-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-8 h-8 text-azure-blue" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-midnight-navy mb-2">
                        {t.support.title}
                    </h1>
                    <p className="text-midnight-navy/60 text-lg font-medium">
                        {t.support.subtitle}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-soft-gray/30 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                    {/* Success State */}
                    {submitStatus === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-black text-midnight-navy mb-2">
                                {t.support.successTitle}
                            </h2>
                            <p className="text-midnight-navy/60 mb-6">
                                {t.support.successMessage}
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-azure-blue text-white rounded-xl font-bold hover:shadow-lg hover:shadow-azure-blue/30 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {t.support.backToHome}
                            </Link>
                        </div>
                    )}

                    {/* Error State */}
                    {submitStatus === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-700 text-sm text-center font-medium">
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    {submitStatus !== 'success' && (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-bold text-midnight-navy mb-2"
                                >
                                    {t.support.nameLabel} *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.support.namePlaceholder}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-azure-blue/50 focus:border-azure-blue transition-all"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-midnight-navy mb-2"
                                >
                                    {t.support.emailLabel} *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t.support.emailPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-azure-blue/50 focus:border-azure-blue transition-all"
                                />
                            </div>

                            {/* Request Type Field */}
                            <div>
                                <label
                                    htmlFor="requestType"
                                    className="block text-sm font-bold text-midnight-navy mb-2"
                                >
                                    {t.support.typeLabel} *
                                </label>
                                <select
                                    id="requestType"
                                    name="requestType"
                                    required
                                    value={formData.requestType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-azure-blue/50 focus:border-azure-blue transition-all"
                                >
                                    <option value="" disabled>
                                        {t.support.typePlaceholder}
                                    </option>
                                    {requestTypes.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description Field */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-bold text-midnight-navy mb-2"
                                >
                                    {t.support.descriptionLabel} *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder={t.support.descriptionPlaceholder}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-azure-blue/50 focus:border-azure-blue transition-all"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 bg-azure-blue text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base shadow-lg shadow-azure-blue/30 hover:shadow-azure-blue/50 hover:-translate-y-0.5 transition-all ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {t.support.submitting}
                                    </>
                                ) : (
                                    t.support.submitButton
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
