'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const sections = [
    { id: 'aceptacion', title: 'Aceptación de Términos' },
    { id: 'servicios', title: 'Descripción de Servicios' },
    { id: 'cuentas', title: 'Cuentas y Responsabilidad' },
    { id: 'pagos', title: 'Pagos y Facturación' },
    { id: 'responsabilidad', title: 'Limitación de Responsabilidad' },
    { id: 'privacidad', title: 'Privacidad y Datos' },
    { id: 'modificaciones', title: 'Modificaciones' },
    { id: 'contacto', title: 'Contacto' },
];

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState('aceptacion');

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
    }, []);

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
                    <Link href="/" className="text-2xl font-black text-midnight-navy hover:text-azure-blue transition-colors">
                        ParKpool
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-midnight-navy hover:text-azure-blue transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Inicio
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar Navigation - Sticky */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <nav className="sticky top-24">
                            <h2 className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-4">
                                Índice
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
                                    Términos y Condiciones
                                </h1>
                                <p className="text-lg text-midnight-navy/60 font-medium">
                                    Última actualización: 12 de diciembre de 2025
                                </p>
                            </div>

                            {/* Section 1: Aceptación */}
                            <section id="aceptacion" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    1. Aceptación de Términos
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        Al acceder y utilizar la plataforma ParKpool ("el Servicio"), usted acepta cumplir
                                        y estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna
                                        parte de estos términos, no debe utilizar nuestro servicio.
                                    </p>
                                    <p>
                                        ParKpool es un software como servicio (SaaS) diseñado para empresas de valet parking
                                        que buscan digitalizar y optimizar sus operaciones. El uso del servicio está destinado
                                        exclusivamente a empresas registradas y sus empleados autorizados.
                                    </p>
                                </div>
                            </section>

                            {/* Section 2: Servicios */}
                            <section id="servicios" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    2. Descripción de Servicios
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        ParKpool proporciona las siguientes funcionalidades principales:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Sistema de gestión operativa para valet parking</li>
                                        <li>Registro digital de vehículos con evidencia fotográfica</li>
                                        <li>Tickets digitales vía SMS y WhatsApp</li>
                                        <li>Procesamiento de pagos y cierres de caja automáticos</li>
                                        <li>Dashboard de analytics y reportes en tiempo real</li>
                                        <li>Asignación y tracking de valets</li>
                                    </ul>
                                    <p>
                                        Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto
                                        del Servicio en cualquier momento, con previo aviso de 30 días a los usuarios activos.
                                    </p>
                                </div>
                            </section>

                            {/* Section 3: Cuentas */}
                            <section id="cuentas" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    3. Cuentas y Responsabilidad
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">Cuenta de Manager:</strong> El usuario que
                                        crea la cuenta principal es responsable de:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Mantener la confidencialidad de las credenciales de acceso</li>
                                        <li>Todas las actividades realizadas bajo su cuenta</li>
                                        <li>La gestión y supervisión de los usuarios Valet asociados</li>
                                        <li>El cumplimiento de las leyes locales aplicables al servicio de valet parking</li>
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">Cuenta de Valet:</strong> Los empleados con
                                        acceso de valet deben:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Usar el sistema únicamente para fines laborales autorizados</li>
                                        <li>Registrar con precisión el estado de cada vehículo</li>
                                        <li>Reportar inmediatamente cualquier incidente o irregularidad</li>
                                    </ul>
                                    <p>
                                        Usted es responsable de notificarnos inmediatamente sobre cualquier uso no autorizado
                                        de su cuenta o cualquier otra violación de seguridad.
                                    </p>
                                </div>
                            </section>

                            {/* Section 4: Pagos */}
                            <section id="pagos" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    4. Pagos y Facturación
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">Modelo de Suscripción:</strong> ParKpool opera
                                        bajo un modelo SaaS de suscripción mensual. Los planes disponibles incluyen:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Plan Starter: Hasta 5 valets y 1 ubicación</li>
                                        <li>Plan Pro: Hasta 15 valets y 3 ubicaciones</li>
                                        <li>Plan Enterprise: Valets y ubicaciones ilimitadas</li>
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">Procesamiento de Pagos:</strong> Todos los
                                        pagos de clientes finales son procesados a través de Stripe. ParKpool cobra una
                                        comisión del 2.5% + $500 COP por transacción procesada.
                                    </p>
                                    <p>
                                        <strong className="text-midnight-navy">Facturación:</strong> Las suscripciones se
                                        facturan el primer día de cada mes. El cliente acepta que:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Los cargos son no reembolsables excepto según lo requerido por ley</li>
                                        <li>La no renovación debe notificarse con 15 días de anticipación</li>
                                        <li>Los retrasos en pagos pueden resultar en suspensión del servicio</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 5: Responsabilidad */}
                            <section id="responsabilidad" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    5. Limitación de Responsabilidad
                                </h2>
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg mb-6">
                                    <p className="text-amber-900 font-bold text-sm uppercase tracking-wider mb-2">
                                        ⚠️ Importante para Servicios de Valet Parking
                                    </p>
                                    <p className="text-amber-800 font-medium">
                                        ParKpool es únicamente un software de gestión operativa. No asumimos responsabilidad
                                        alguna sobre daños, pérdidas o robos de vehículos bajo su custodia.
                                    </p>
                                </div>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-midnight-navy">El Usuario reconoce que:</strong>
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>
                                            ParKpool es una herramienta tecnológica y no un proveedor de servicios de valet
                                        </li>
                                        <li>
                                            La responsabilidad legal sobre los vehículos recae en la empresa de valet parking
                                            usuaria del sistema
                                        </li>
                                        <li>
                                            El registro fotográfico en la plataforma es una evidencia de apoyo, no una garantía
                                            o póliza de seguro
                                        </li>
                                        <li>
                                            El Usuario debe mantener pólizas de seguro adecuadas para su operación de valet
                                            parking
                                        </li>
                                    </ul>
                                    <p>
                                        En ningún caso ParKpool será responsable por daños indirectos, incidentales,
                                        especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos o uso,
                                        incluso si hemos sido advertidos de la posibilidad de tales daños.
                                    </p>
                                </div>
                            </section>

                            {/* Section 6: Privacidad */}
                            <section id="privacidad" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    6. Privacidad y Protección de Datos
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        ParKpool está comprometido con la protección de datos personales de acuerdo con:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Ley 1581 de 2012 de Habeas Data (Colombia)</li>
                                        <li>GDPR (para clientes en la Unión Europea)</li>
                                        <li>Mejores prácticas internacionales de seguridad de la información</li>
                                    </ul>
                                    <p>
                                        <strong className="text-midnight-navy">Datos Recopilados:</strong> Recopilamos y
                                        procesamos:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Información de contacto de Managers y Valets</li>
                                        <li>Datos operativos (registros de vehículos, tickets, transacciones)</li>
                                        <li>Fotografías de vehículos para registro de estado</li>
                                        <li>Datos de ubicación para tracking de valets (con consentimiento)</li>
                                    </ul>
                                    <p>
                                        Para información detallada sobre cómo procesamos, almacenamos y protegemos sus datos,
                                        consulte nuestra{' '}
                                        <Link href="/privacy" className="text-azure-blue hover:underline font-bold">
                                            Política de Privacidad
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </section>

                            {/* Section 7: Modificaciones */}
                            <section id="modificaciones" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    7. Modificaciones a los Términos
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier
                                        momento. Los cambios sustanciales serán notificados a través de:
                                    </p>
                                    <ul className="list-disc ml-6 space-y-2">
                                        <li>Correo electrónico a la cuenta registrada del Manager</li>
                                        <li>Notificación destacada en el dashboard de la plataforma</li>
                                        <li>Actualización de la fecha "Última actualización" en esta página</li>
                                    </ul>
                                    <p>
                                        El uso continuado del Servicio después de la publicación de cambios constituye su
                                        aceptación de dichos cambios. Si no está de acuerdo con los términos modificados,
                                        debe discontinuar el uso del Servicio.
                                    </p>
                                </div>
                            </section>

                            {/* Section 8: Contacto */}
                            <section id="contacto" className="mb-16 scroll-mt-24">
                                <h2 className="text-2xl sm:text-3xl font-black text-midnight-navy mb-6">
                                    8. Contacto
                                </h2>
                                <div className="prose prose-lg max-w-none text-midnight-navy/80 font-medium leading-relaxed space-y-4">
                                    <p>
                                        Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
                                    </p>
                                    <div className="bg-soft-gray/50 rounded-2xl p-6 not-prose">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    Email
                                                </p>
                                                <a
                                                    href="mailto:legal@parkpool.co"
                                                    className="text-azure-blue hover:underline font-bold text-lg"
                                                >
                                                    legal@parkpool.co
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    Soporte Técnico
                                                </p>
                                                <a
                                                    href="mailto:soporte@parkpool.co"
                                                    className="text-azure-blue hover:underline font-bold text-lg"
                                                >
                                                    soporte@parkpool.co
                                                </a>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-midnight-navy/60 uppercase tracking-wider mb-1">
                                                    Dirección
                                                </p>
                                                <p className="text-midnight-navy font-medium">
                                                    Calle 100 #18A-30, Oficina 501
                                                    <br />
                                                    Bogotá, Colombia
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
                                        ¿Listo para modernizar tu operación de valet parking?
                                    </p>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 bg-azure-blue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-azure-blue/30 hover:shadow-azure-blue/50 hover:-translate-y-1 transition-all"
                                    >
                                        Volver al Inicio
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
