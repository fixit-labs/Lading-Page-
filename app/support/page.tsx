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
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e5e7eb',
                padding: '1rem 1.5rem',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Link
                        href="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#0A62F8',
                            textDecoration: 'none',
                            fontWeight: '500',
                        }}
                    >
                        <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
                        {t.support.backToHome}
                    </Link>
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem 1.5rem',
            }}>
                {/* Title Section */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '4rem',
                        height: '4rem',
                        backgroundColor: '#dbeafe',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                    }}>
                        <HelpCircle style={{ width: '2rem', height: '2rem', color: '#0A62F8' }} />
                    </div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: '#0B2848',
                        marginBottom: '0.5rem',
                    }}>
                        {t.support.title}
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                        {t.support.subtitle}
                    </p>
                </div>

                {/* Form Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    padding: '2rem',
                }}>
                    {/* Success State */}
                    {submitStatus === 'success' && (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{
                                width: '4rem',
                                height: '4rem',
                                backgroundColor: '#dcfce7',
                                borderRadius: '9999px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem',
                            }}>
                                <CheckCircle style={{ width: '2rem', height: '2rem', color: '#16a34a' }} />
                            </div>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#0B2848',
                                marginBottom: '0.5rem',
                            }}>
                                {t.support.successTitle}
                            </h2>
                            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                                {t.support.successMessage}
                            </p>
                            <Link
                                href="/"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#0A62F8',
                                    color: 'white',
                                    borderRadius: '0.75rem',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                }}
                            >
                                <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
                                {t.support.backToHome}
                            </Link>
                        </div>
                    )}

                    {/* Error State */}
                    {submitStatus === 'error' && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                        }}>
                            <p style={{ color: '#991b1b', fontSize: '0.875rem', textAlign: 'center', fontWeight: '500' }}>
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    {submitStatus !== 'success' && (
                        <form onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label
                                    htmlFor="name"
                                    style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        color: '#0B2848',
                                        marginBottom: '0.5rem',
                                    }}
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
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Email Field */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label
                                    htmlFor="email"
                                    style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        color: '#0B2848',
                                        marginBottom: '0.5rem',
                                    }}
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
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Request Type Field */}
                            <div style={{ marginBottom: '1.25rem' }}>
                                <label
                                    htmlFor="requestType"
                                    style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        color: '#0B2848',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {t.support.typeLabel} *
                                </label>
                                <select
                                    id="requestType"
                                    name="requestType"
                                    required
                                    value={formData.requestType}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        backgroundColor: 'white',
                                        cursor: 'pointer',
                                        boxSizing: 'border-box',
                                    }}
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
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label
                                    htmlFor="description"
                                    style={{
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        color: '#0B2848',
                                        marginBottom: '0.5rem',
                                    }}
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
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.75rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        minHeight: '120px',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    backgroundColor: '#0A62F8',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '0.75rem',
                                    border: 'none',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    opacity: isSubmitting ? 0.5 : 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    fontSize: '1rem',
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
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
