'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import {
    Shield,
    DollarSign,
    FileText,
    CircleDot,
    ArrowUpRight
} from 'lucide-react';
import DemoRequestModal from './DemoRequestModal';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

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
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useTranslations();

    // DEBUG: Log state changes
    useEffect(() => {
        console.log('🟢 ESTADO DEL MODAL CAMBIÓ:', isModalOpen);
    }, [isModalOpen]);

    // Detect scroll for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-gradient-to-r from-black to-[#082340] backdrop-blur-md shadow-lg'
                    : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24 sm:h-28">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <img
                                src="/images/light-logo.svg"
                                alt="ParKpool"
                                className={`w-auto transition-all duration-300 ${
                                    isScrolled ? 'h-8 sm:h-10' : 'h-10 sm:h-12'
                                }`}
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#soluciones" className="text-white hover:text-azure-blue transition-colors font-medium">
                                {t.navbar.solutions}
                            </a>
                            <a href="#seguridad" className="text-white hover:text-azure-blue transition-colors font-medium">
                                {t.navbar.security}
                            </a>
                            <a href="#precios" className="text-white hover:text-azure-blue transition-colors font-medium">
                                {t.navbar.pricing}
                            </a>
                            <LanguageSwitcher />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:shadow-azure-blue/30"
                            >
                                {t.navbar.cta}
                            </button>
                        </div>

                        {/* Mobile CTA */}
                        <div className="md:hidden flex items-center gap-2">
                            <LanguageSwitcher />
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-azure-blue text-white px-3 py-1.5 rounded-xl font-medium text-xs shadow-lg"
                            >
                                {t.navbar.cta}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Mobile Only */}
            <section className="sm:hidden min-h-screen flex flex-col justify-start px-4 bg-gradient-to-b from-black to-[#082340] pt-28 pb-8 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-left z-10"
                >
                    <h1 className="text-3xl font-black text-white leading-tight mb-4">
                        {t.hero.title}
                    </h1>
                    <p className="text-base text-white/80 font-medium mb-6 leading-relaxed">
                        {t.hero.subtitle}
                    </p>
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        whileTap={{ scale: 0.98 }}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-base shadow-xl shadow-azure-blue/40 transition-all"
                    >
                        {t.hero.cta}
                    </motion.button>
                </motion.div>

                {/* Dashboard Mockup - Mobile */}
                <motion.div
                    animate={{
                        y: [0, -6, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-24 left-10 bg-white rounded-xl shadow-xl p-3 w-80 h-44 border border-gray-200 z-5 pointer-events-none"
                >
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-16 bg-gray-500 rounded"></div>
                            <div className="h-4 w-4 bg-azure-blue rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="bg-gray-200 rounded-lg p-1.5 space-y-1">
                                <div className="h-3 w-3 bg-azure-blue rounded"></div>
                                <div className="h-3 w-6 bg-gray-400 rounded"></div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-1.5 space-y-1">
                                <div className="h-3 w-3 bg-azure-blue rounded"></div>
                                <div className="h-3 w-6 bg-gray-400 rounded"></div>
                            </div>
                            <div className="bg-gray-200 rounded-lg p-1.5 space-y-1">
                                <div className="h-3 w-3 bg-azure-blue rounded"></div>
                                <div className="h-3 w-6 bg-gray-400 rounded"></div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-azure-blue to-blue-500 rounded-lg p-2 text-white">
                            <div className="h-4 w-10 bg-white/30 rounded mb-1"></div>
                            <div className="h-6 w-14 bg-white rounded"></div>
                        </div>
                    </div>
                </motion.div>

                {/* White Car Image - Mobile */}
                <img
                    src="/images/white-hero-car.webp"
                    alt="White car"
                    className="absolute bottom-0 left-5 w-60 z-20 pointer-events-none"
                />

                {/* Chatting Man Image - Mobile */}
                <img
                    src="/images/hero-chating-man.webp"
                    alt="Man using phone"
                    className="absolute bottom-0 left-20 h-[45%] w-auto z-30 pointer-events-none object-contain object-bottom"
                />
            </section>

            {/* Hero Section - Desktop/Tablet */}
            <section className="hidden sm:flex min-h-screen items-center px-6 lg:px-8 bg-gradient-to-b from-black to-[#082340] pt-28 pb-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto w-full py-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-block bg-white rounded-lg px-4 py-1.5 mb-4">
                                <span className="text-azure-blue text-sm font-bold mx-4 uppercase tracking-wide">
                                    {t.hero.badge}
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                {t.hero.title}
                            </h1>
                            <p className="text-xl text-white/80 font-medium mb-8 leading-relaxed">
                                {t.hero.subtitle}
                            </p>
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-2xl shadow-azure-blue/40 hover:shadow-azure-blue/60 transition-all"
                            >
                                {t.hero.cta}
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
                                className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200"
                            >
                                {/* Dashboard Mockup */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-8 w-32 bg-gray-500 rounded-lg"></div>
                                        <div className="h-8 w-8 bg-azure-blue rounded-full"></div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-gray-200 rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-gray-400 rounded"></div>
                                            <div className="h-5 w-12 bg-gray-500 rounded"></div>
                                        </div>
                                        <div className="bg-gray-200 rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-gray-400 rounded"></div>
                                            <div className="h-5 w-12 bg-gray-500 rounded"></div>
                                        </div>
                                        <div className="bg-gray-200 rounded-xl p-4 space-y-2">
                                            <div className="h-6 w-6 bg-azure-blue rounded"></div>
                                            <div className="h-3 w-16 bg-gray-400 rounded"></div>
                                            <div className="h-5 w-12 bg-gray-500 rounded"></div>
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

                                {/* White Car Image - Overlaid */}
                                <img
                                    src="/images/white-hero-car.webp"
                                    alt="White car"
                                    className="absolute -bottom-[12rem] -left-20 w-80 lg:w-[32rem] z-20 pointer-events-none"
                                />

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
                                    className="absolute -right-4 -bottom-4 bg-gradient-to-br from-azure-blue to-blue-600 rounded-2xl shadow-2xl p-4 w-48 border border-white/20"
                                >
                                    <div className="text-white space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 bg-white/20 rounded-full"></div>
                                            <div>
                                                <div className="h-2 w-16 bg-white/40 rounded mb-1"></div>
                                                <div className="h-2 w-12 bg-white/30 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 space-y-2">
                                            <div className="h-2 w-full bg-white/50 rounded"></div>
                                            <div className="h-2 w-3/4 bg-white/50 rounded"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>

                {/* Chatting Man Image - Desktop/Tablet */}
                <img
                    src="/images/hero-chating-man.webp"
                    alt="Man using phone"
                    className="absolute bottom-0 right-[5%] lg:right-[10%] xl:right-[6%] h-[60%] lg:h-[80%] w-auto z-30 pointer-events-none object-contain object-bottom"
                />
            </section>

            {/* Problem/Solution Section */}
            <section id="soluciones" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-midnight-navy mb-4">
                            {t.solutions.title}
                        </h2>
                        <p className="text-lg text-midnight-navy/60 font-medium max-w-2xl mx-auto">
                            {t.solutions.subtitle}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 - Ocupa toda la altura de la columna izquierda */}
                        <AnimatedSection>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full min-h-[340px] sm:min-h-[480px] border border-soft-gray/50 flex flex-col justify-end overflow-hidden"
                                style={{
                                    backgroundImage: 'url(/images/card1-solutions-bg.webp)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                {/* Degradado en la parte inferior */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#092746] via-[#092746]/10 to-transparent"></div>

                                {/* Icono */}
                                <div className="absolute top-8 right-8 bg-azure-blue w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg z-10">
                                    <DollarSign className="w-8 h-8 text-white" />
                                </div>

                                {/* Contenido */}
                                <div className="pr-0 sm:pr-24 relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4">
                                        {t.solutions.card1Title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                                        {t.solutions.card1Description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatedSection>

                        {/* Columna derecha con Cards 2 y 3 apiladas */}
                        <div className="flex flex-col gap-8">
                            {/* Card 2 */}
                            <AnimatedSection>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative bg-[#e6e6e6] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-soft-gray/50 min-h-[220px] flex items-center"
                                >
                                    <div className="absolute top-8 right-8 bg-azure-blue w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Shield className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="pr-0 sm:pr-24 mt-16 sm:mt-0">
                                        <h3 className="text-xl sm:text-2xl font-black text-midnight-navy mb-3 sm:mb-4">
                                            {t.solutions.card2Title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-midnight-navy/70 font-medium leading-relaxed">
                                            {t.solutions.card2Description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatedSection>

                            {/* Card 3 */}
                            <AnimatedSection>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative bg-[#092746] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-soft-gray/50 min-h-[220px] flex items-center"
                                >
                                    <div className="absolute top-8 right-8 bg-azure-blue w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                                        <FileText className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="pr-0 sm:pr-24 mt-16 sm:mt-0">
                                        <h3 className="text-xl sm:text-2xl font-black text-white mb-3 sm:mb-4">
                                            {t.solutions.card3Title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed">
                                            {t.solutions.card3Description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof - Mobile */}
            <section className="sm:hidden py-12 bg-black">
                <div className="px-4">
                    <AnimatedSection>
                        <h2 className="text-center text-white font-bold mb-8 text-xl uppercase tracking-wide">
                            {t.socialProof.title}
                        </h2>
                        <div className="flex items-center justify-center gap-6">
                            {/* Icono del volante - izquierda */}
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center p-3">
                                <img src="/images/wheel-icon.svg" alt="Wheel icon" className="w-full h-full" style={{ filter: 'invert(30%) sepia(99%) saturate(4000%) hue-rotate(205deg) brightness(99%) contrast(99%)' }} />
                            </div>
                            {/* Lista vertical de parqueaderos */}
                            <div className="flex flex-col gap-3 text-white font-bold text-sm">
                                <span>• JV Parking Logistic</span>
                                <span>• Hacienda Martina</span>
                                <span>• Elite Valet Services</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Social Proof - Desktop */}
            <section className="hidden sm:block py-16 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection>
                        <h2 className="text-center text-midnight-navy font-bold mb-12 text-2xl sm:text-3xl uppercase tracking-wide">
                            {t.socialProof.title}
                        </h2>
                        <div className="bg-[#085ef8] rounded-full px-8 py-4 flex items-center shadow-lg w-full">
                            {/* Icono del volante - izquierda */}
                            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 p-2 -ml-4">
                                <img src="/images/wheel-icon.svg" alt="Wheel icon" className="w-full h-full" style={{ filter: 'invert(30%) sepia(99%) saturate(4000%) hue-rotate(205deg) brightness(99%) contrast(99%)' }} />
                            </div>

                            {/* Nombres de parqueaderos - distribuidos */}
                            <div className="flex-1 flex items-center justify-around text-white font-bold text-sm sm:text-base ml-4">
                                <span><span className="mr-2">•</span>JV Parking Logistic</span>
                                <span><span className="mr-2">•</span>Hacienda Martina</span>
                                <span><span className="mr-2">•</span>Elite Valet Services</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Statistics Section - Mobile */}
            <section className="sm:hidden py-12 px-4 bg-white">
                <AnimatedSection>
                    <div className="flex flex-col gap-4">
                        {/* Row 1: Card 1 (60%) + Card 2 (40%) */}
                        <div className="flex gap-3">
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="w-[60%] bg-[#1d59f7] rounded-2xl p-5 shadow-lg relative"
                            >
                                <div className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4 text-[#1d59f7]" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-3xl font-black text-white mb-2">
                                        {t.stats.stat1Title}
                                    </h3>
                                    <p className="text-xs text-white/90">
                                        {t.stats.stat1Subtitle}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="w-[40%] bg-[#092746] rounded-2xl p-5 shadow-lg"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        {t.stats.stat2Title}
                                    </h3>
                                    <p className="text-xs text-white/90">
                                        {t.stats.stat2Subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                        {/* Row 2: Card 3 (50%) + Card 4 (50%) */}
                        <div className="flex gap-3">
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="w-1/2 bg-[#092746] rounded-2xl p-5 shadow-lg"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        {t.stats.stat3Title}
                                    </h3>
                                    <p className="text-xs text-white/90">
                                        {t.stats.stat3Subtitle}
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileTap={{ scale: 0.98 }}
                                className="w-1/2 bg-[#092746] rounded-2xl p-5 shadow-lg"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-black text-white mb-2">
                                        {t.stats.stat4Title}
                                    </h3>
                                    <p className="text-xs text-white/90">
                                        {t.stats.stat4Subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* Statistics Section - Desktop */}
            <section className="hidden sm:block py-16 px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection>
                        <div className="bg-[#e6e6e6] rounded-3xl p-12 sm:p-16 shadow-lg relative overflow-visible">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                {/* Card 1 - Wider */}
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="md:col-span-2 bg-[#1d59f7] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all relative"
                                >
                                    {/* Icono de flecha - esquina superior derecha */}
                                    <div className="absolute top-6 right-6 bg-white rounded-full w-10 h-10 flex items-center justify-center">
                                        <ArrowUpRight className="w-5 h-5 text-[#1d59f7]" />
                                    </div>

                                    <div className="text-left">
                                        <h3 className="text-5xl sm:text-6xl font-black text-white mb-3">
                                            {t.stats.stat1Title}
                                        </h3>
                                        <p className="text-base sm:text-sm text-white/90">
                                            {t.stats.stat1Subtitle}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Statistics Car Image - Between Card 1 and Card 2 */}
                                <img
                                    src="/images/statistics-car.webp"
                                    alt="Statistics car"
                                    className="hidden md:block absolute -bottom-24 left-[25%] w-72 lg:w-80 z-20 pointer-events-none"
                                />

                                {/* Card 2 */}
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-[#092746] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className="text-center">
                                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-3">
                                            {t.stats.stat2Title}
                                        </h3>
                                        <p className="text-base sm:text-sm text-white/90">
                                            {t.stats.stat2Subtitle}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Card 3 */}
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-[#092746] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className="text-center">
                                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-3">
                                            {t.stats.stat3Title}
                                        </h3>
                                        <p className="text-base sm:text-sm text-white/90">
                                            {t.stats.stat3Subtitle}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Card 4 */}
                                <motion.div
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-[#092746] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className="text-center">
                                        <h3 className="text-4xl sm:text-5xl font-black text-white mb-3">
                                            {t.stats.stat4Title}
                                        </h3>
                                        <p className="text-base sm:text-sm text-white/90">
                                            {t.stats.stat4Subtitle}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* How it Works */}
            <section id="seguridad" className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-midnight-navy mb-4">
                            {t.howItWorks.title}
                        </h2>
                        <p className="text-lg text-midnight-navy/60 font-medium max-w-2xl mx-auto">
                            {t.howItWorks.subtitle}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Step 1 */}
                        <AnimatedSection>
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-300 overflow-visible hover:shadow-xl transition-all">
                                {/* Imagen con número */}
                                <div className="relative mx-4 mt-4">
                                    <img
                                        src="/images/card1-howworks.webp"
                                        alt={t.howItWorks.step1Title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <div className="absolute -bottom-7 right-5 bg-azure-blue text-white w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl border-4 border-white z-30">
                                        1
                                    </div>
                                </div>
                                {/* Contenido */}
                                <div className="p-6 pt-10">
                                    <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                        {t.howItWorks.step1Title}
                                    </h3>
                                    <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                        {t.howItWorks.step1Description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Step 2 */}
                        <AnimatedSection>
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-300 overflow-visible hover:shadow-xl transition-all">
                                {/* Imagen con número */}
                                <div className="relative mx-4 mt-4">
                                    <img
                                        src="/images/card2-howworks.webp"
                                        alt={t.howItWorks.step2Title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <div className="absolute -bottom-7 right-5 bg-azure-blue text-white w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl border-4 border-white z-30">
                                        2
                                    </div>
                                </div>
                                {/* Contenido */}
                                <div className="p-6 pt-10">
                                    <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                        {t.howItWorks.step2Title}
                                    </h3>
                                    <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                        {t.howItWorks.step2Description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Step 3 */}
                        <AnimatedSection>
                            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-300 overflow-visible hover:shadow-xl transition-all">
                                {/* Imagen con número */}
                                <div className="relative mx-4 mt-4">
                                    <img
                                        src="/images/card3-howworks.webp"
                                        alt={t.howItWorks.step3Title}
                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                    <div className="absolute -bottom-7 right-5 bg-azure-blue text-white w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl border-4 border-white z-30">
                                        3
                                    </div>
                                </div>
                                {/* Contenido */}
                                <div className="p-6 pt-10">
                                    <h3 className="text-2xl font-black text-midnight-navy mb-4">
                                        {t.howItWorks.step3Title}
                                    </h3>
                                    <p className="text-midnight-navy/70 font-medium leading-relaxed">
                                        {t.howItWorks.step3Description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section id="precios" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#151515]">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
                            {t.finalCta.title}
                        </h2>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            {t.finalCta.subtitle}
                        </p>
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-azure-blue/30 transition-all"
                        >
                            {t.finalCta.cta}
                        </motion.button>
                    </AnimatedSection>

                    {/* Footer Links */}
                    <div className="mt-16 pt-8 border-t border-white/10">
                        <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm font-medium">
                            <a href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</a>
                            <a href={`/terms#${t.terms.sections.privacy.id}`} className="hover:text-white transition-colors">{t.footer.privacy}</a>
                            <a href="#" className="hover:text-white transition-colors">{t.footer.contact}</a>
                        </div>
                        <p className="mt-6 text-white/50 text-sm">
                            {t.footer.copyright}
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
