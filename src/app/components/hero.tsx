'use client';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A192F] pt-16 lg:pt-24">

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1511652019870-fbd8713560bf?q=80&w=973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Masjid al-Haram, Makkah"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#0A196F]/50 via-[#0A192F]/30 to-[#0A192F]" />

                {/* Animated Theme Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                {/* Floating Particles Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">

                {/* Trust Badge - Fade In Animation */}
                <span className="inline-flex items-center justify-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/15 transition-all duration-300 animate-fade-in-up">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Trusted by 50,000+ pilgrims worldwide
                </span>

                {/* Main Heading - Pure White, No Shadow */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight animate-fade-in-up delay-100">
                    <span className="block text-white">
                        Your Spiritual Journey
                    </span>
                    <span className="inline-block mt-2 text-white">
                        To The Holy Land
                    </span>
                </h1>

                {/* Subtitle - Slide Up Animation */}
                <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                    Complete Umrah & Hajj packages with visa assistance,
                    premium hotels near Haram, and guided Ziyarat tours.
                </p>

                {/* CTA Buttons - Staggered Animation */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
                    <Link
                        href="#packages"
                        className="group px-8 py-3.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                    >
                        Explore Packages
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="#umrah-guide"
                        className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 shadow-lg hover:shadow-white/10 transition-all duration-300 active:scale-[0.98] cursor-pointer hover:-translate-y-0.5"
                    >
                        Umrah Guide
                    </Link>
                </div>

                {/* Stats Grid - Staggered Fade Animation */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { val: '15+', lbl: 'Years Experience' },
                        { val: '50K+', lbl: 'Pilgrims Served' },
                        { val: '4.9★', lbl: 'Customer Rating' },
                        { val: '24/7', lbl: 'Ground Support' },
                    ].map((s, index) => (
                        <div
                            key={s.lbl}
                            className="group text-center cursor-pointer transition-all duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${600 + index * 100}ms` }}
                        >
                            <p className="text-3xl font-bold text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent">
                                {s.val}
                            </p>
                            <p className="text-sm text-gray-400 mt-1 transition-all duration-300 group-hover:text-white">
                                {s.lbl}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Features List - Fade In Animation */}
                <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-300 animate-fade-in-up delay-700">
                    <span className="flex items-center gap-2 hover:text-white transition-colors duration-300 hover:scale-105 transform">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Visa Assistance
                    </span>
                    <span className="flex items-center gap-2 hover:text-white transition-colors duration-300 hover:scale-105 transform">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Hotels Near Haram
                    </span>
                    <span className="flex items-center gap-2 hover:text-white transition-colors duration-300 hover:scale-105 transform">
                        <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Guided Ziyarat
                    </span>
                </div>
            </div>

            {/* Scroll Indicator - Enhanced Bounce */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-slow">
                <svg className="w-6 h-6 text-emerald-400/80 hover:text-emerald-400 transition-colors cursor-pointer hover:scale-110 transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>

            {/* Custom CSS Animations - Cleaned */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.6;
                    }
                }
                
                @keyframes bounce-slow {
                    0%, 100% {
                        transform: translateX(-50%) translateY(0);
                    }
                    50% {
                        transform: translateX(-50%) translateY(10px);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-500 { animation-delay: 500ms; }
                .delay-700 { animation-delay: 700ms; }
            `}</style>
        </section>
    );
}