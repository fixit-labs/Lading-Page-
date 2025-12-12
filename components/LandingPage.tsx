'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Shield,
    DollarSign,
    FileText,
    Camera,
    MessageSquare,
    Search
} from 'lucide-react';
import DemoRequestModal from './DemoRequestModal';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};


const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // DEBUG: Log state changes
    useEffect(() => {
        console.log('🟢 ESTADO DEL MODAL CAMBIÓ:', isModalOpen);
    }, [isModalOpen]);

    return (
        <div className="bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl sm:text-3xl font-black text-midnight-navy">
                                ParKpool
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#soluciones" className="text-midnight-navy hover:text-azure-blue transition-colors font-medium">
                                Soluciones
                            </a>
                            <a href="#seguridad" className="text-midnight-navy hover:text-azure-blue transition-colors font-medium">
                                Seguridad
                            </a>
                            <a href="#precios" className="text-midnight-navy hover:text-azure-blue transition-colors font-medium">
                                Precios
                            </a>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-azure-blue text-white px-6 py-3 rounded-2xl font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:shadow-azure-blue/30"
                            >
                                Agendar Demo
                            </button>
                        </div>

                        {/* Mobile CTA */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-azure-blue text-white px-4 py-2 rounded-2xl font-medium text-sm shadow-lg"
                            >
                                Agendar Demo
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-soft-gray/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-midnight-navy leading-tight mb-6">
                                El Sistema Operativo para Empresas de Valet Parking.
                            </h1>
                            <p className="text-lg sm:text-xl text-midnight-navy/70 font-medium mb-8 leading-relaxed">
                                Digitaliza tu operación, elimina el fraude de efectivo y reduce tiempos de entrega en un 40%. Control total desde el celular.
                            </p>
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-azure-blue text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-azure-blue/40 hover:shadow-azure-blue/60 transition-all"
                            >
                                Empezar Ahora
                            </motion.button>
                        </motion.div>

                        {/* Right Mockup */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
                            >
                                {/* Dashboard Mockup */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 w-32 bg-midnight-navy rounded-lg"></div>
                                        <div className="h-8 w-8 bg-azure-blue rounded-full"></div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-soft-gray rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-midnight-navy/30 rounded"></div>
                                            <div className="h-5 w-12 bg-midnight-navy rounded"></div>
                                        </div>
                                        <div className="bg-soft-gray rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-midnight-navy/30 rounded"></div>
                                            <div className="h-5 w-12 bg-midnight-navy rounded"></div>
                                        </div>
                                        <div className="bg-soft-gray rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-midnight-navy/30 rounded"></div>
                                            <div className="h-5 w-12 bg-midnight-navy rounded"></div>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-azure-blue to-blue-500 rounded-2xl p-6 text-white">
                                        <div className="h-4 w-24 bg-white/30 rounded mb-2"></div>
                                        <div className="h-8 w-32 bg-white rounded mb-4"></div>
                                        <div className="flex gap-2">
                                            <div className="h-3 w-20 bg-white/50 rounded"></div>
                                            <div className="h-3 w-16 bg-white/50 rounded"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Valet App Card */}
                                <motion.div
                                    animate={{
                                        y: [0, 10, 0],
                                        x: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                    className="absolute -right-4 -bottom-4 bg-midnight-navy rounded-2xl shadow-2xl p-4 w-40 sm:w-48"
                                >
                                    <div className="text-white space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 bg-azure-blue rounded-full"></div>
                                            <div>
                                                <div className="h-2 w-16 bg-white/30 rounded mb-1"></div>
                                                <div className="h-2 w-12 bg-white/20 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="bg-azure-blue rounded-xl p-3 space-y-2">
                                            <div className="h-2 w-full bg-white/40 rounded"></div>
                                            <div className="h-2 w-3/4 bg-white/40 rounded"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section id="soluciones" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-midnight-navy mb-4">
                            La Solución Completa para Valet Parking
                        </h2>
                        <p className="text-lg text-midnight-navy/60 font-medium max-w-2xl mx-auto">
                            Controla cada aspecto de tu operación desde una plataforma centralizada
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <AnimatedSection>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border border-soft-gray/50"
                            >
                                <div className="bg-azure-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <DollarSign className="w-8 h-8 text-azure-blue" />
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Control Financiero
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    Cierres de caja automáticos y auditoría en tiempo real. Elimina el fraude de efectivo y obtén visibilidad total de tus ingresos.
                                </p>
                            </motion.div>
                        </AnimatedSection>

                        {/* Card 2 */}
                        <AnimatedSection>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border border-soft-gray/50"
                            >
                                <div className="bg-azure-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <Shield className="w-8 h-8 text-azure-blue" />
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Seguridad Total
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    Registro fotográfico de daños y tracking de valets. Protege a tus clientes y reduce reclamos con evidencia digital.
                                </p>
                            </motion.div>
                        </AnimatedSection>

                        {/* Card 3 */}
                        <AnimatedSection>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border border-soft-gray/50"
                            >
                                <div className="bg-azure-blue/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                    <FileText className="w-8 h-8 text-azure-blue" />
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Operación sin Papel
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    Tickets digitales vía SMS/WhatsApp. Reduce costos operativos y ofrece una experiencia moderna a tus clientes.
                                </p>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection>
                        <p className="text-center text-midnight-navy/60 font-medium mb-8 text-sm uppercase tracking-wider">
                            Confían en nosotros
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                            <div className="text-midnight-navy/40 font-black text-xl sm:text-2xl">
                                JV Parking Logistic
                            </div>
                            <div className="text-midnight-navy/40 font-black text-xl sm:text-2xl">
                                Hacienda Martina
                            </div>
                            <div className="text-midnight-navy/40 font-black text-xl sm:text-2xl">
                                Elite Valet Services
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* How it Works */}
            <section id="seguridad" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-midnight-navy mb-4">
                            ¿Cómo Funciona?
                        </h2>
                        <p className="text-lg text-midnight-navy/60 font-medium max-w-2xl mx-auto">
                            Proceso simple en 3 pasos que transforma tu operación
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Step 1 */}
                        <AnimatedSection>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-azure-blue to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-midnight-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg">
                                    1
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Recepción del Vehículo
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    El valet recibe el auto, toma fotos del estado y envía un ticket digital al cliente vía SMS o WhatsApp.
                                </p>
                            </div>
                        </AnimatedSection>

                        {/* Step 2 */}
                        <AnimatedSection>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-azure-blue to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-midnight-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg">
                                    2
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Solicitud y Pago
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    El cliente pide su vehículo y paga desde su celular. El manager recibe la notificación en tiempo real.
                                </p>
                            </div>
                        </AnimatedSection>

                        {/* Step 3 */}
                        <AnimatedSection>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-azure-blue to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <Search className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 bg-midnight-navy text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-lg">
                                    3
                                </div>
                                <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                    Asignación y Entrega
                                </h3>
                                <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                    El manager asigna la orden al valet disponible. El valet recibe la ubicación y entrega el auto en tiempo récord.
                                </p>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
                            ¿Listo para modernizar tu parking?
                        </h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            Únete a las empresas líderes que ya están transformando su operación con ParKpool
                        </p>
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-azure-blue px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-white/20 transition-all"
                        >
                            Contactar Ventas
                        </motion.button>
                    </AnimatedSection>

                    {/* Footer Links */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
                            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                            <a href="#" className="hover:text-white transition-colors">Contacto</a>
                        </div>
                        <p className="mt-6 text-white/50 text-sm">
                            © 2025 ParKpool. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </section>

            {/* Demo Request Modal */}
            <DemoRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default LandingPage;
