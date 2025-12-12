'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface DemoRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/v1/public/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', companyName: '', phone: '' });

                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                }, 2500);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Error al enviar la solicitud');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Error de conexión. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - SIN animación */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 99999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                }}
            >
                {/* Modal - SIN animación */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '28rem',
                        backgroundColor: 'white',
                        borderRadius: '1rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0B2848', marginBottom: '0.25rem' }}>
                                    Agenda tu Demo
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                    Descubre cómo ParKpool moderniza tu operación
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                type="button"
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                <X style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.5rem' }}>
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
                                <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#0B2848', marginBottom: '0.5rem' }}>
                                    ¡Solicitud Recibida!
                                </h4>
                                <p style={{ color: '#6b7280' }}>
                                    Nuestro equipo te contactará pronto
                                </p>
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
                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#0B2848', marginBottom: '0.5rem' }}>
                                        Nombre completo *
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Juan Pérez"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.75rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="companyName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#0B2848', marginBottom: '0.5rem' }}>
                                        Empresa / Parking *
                                    </label>
                                    <input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        placeholder="JV Parking Logistic"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.75rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#0B2848', marginBottom: '0.5rem' }}>
                                        Email corporativo *
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="juan@empresa.com"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.75rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#0B2848', marginBottom: '0.5rem' }}>
                                        Teléfono (opcional)
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+57 300 123 4567"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '0.75rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                {/* Terms Checkbox */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            style={{
                                                width: '1.25rem',
                                                height: '1.25rem',
                                                marginTop: '0.125rem',
                                                cursor: 'pointer',
                                                accentColor: '#0A62F8',
                                            }}
                                        />
                                        <span style={{ fontSize: '0.875rem', color: '#0B2848', lineHeight: '1.5' }}>
                                            He leído y acepto los{' '}
                                            <a
                                                href="/terms"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: '#0A62F8',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'none',
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Términos y Condiciones
                                            </a>
                                            {' '}y la Política de Privacidad
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !termsAccepted}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        backgroundColor: '#0A62F8',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        borderRadius: '0.75rem',
                                        border: 'none',
                                        cursor: (isSubmitting || !termsAccepted) ? 'not-allowed' : 'pointer',
                                        opacity: (isSubmitting || !termsAccepted) ? 0.5 : 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 style={{ width: '1.25rem', height: '1.25rem', animation: 'spin 1s linear infinite' }} />
                                            Enviando...
                                        </>
                                    ) : (
                                        'Solicitar Demo Gratuita'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
