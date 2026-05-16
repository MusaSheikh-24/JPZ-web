'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

export default function WhyChooseUsUmrah() {
    const { ref, isInView } = useInView();

    const features = [
        {
            title: 'Hassle-Free Visa & Flights',
            desc: 'Complete Umrah visa processing, official documentation, and verified flight bookings handled end-to-end.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            gradient: 'from-[#0f88c0] to-emerald-400',
            bgGradient: 'bg-emerald-50'
        },
        {
            title: '24/7 On-Ground Support',
            desc: 'Dedicated Arabic & English speaking coordinators in Makkah & Madinah available round-the-clock for assistance.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            gradient: 'from-[#0f88c0] to-emerald-400',
            bgGradient: 'bg-emerald-50'
        },
        {
            title: 'Certified Manasik & Guidance',
            desc: 'Scholar-led Hajj & Umrah training sessions to ensure your rituals are performed with complete confidence & purity.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            gradient: 'from-[#0f88c0] to-emerald-400',
            bgGradient: 'bg-emerald-50'
        },
        {
            title: 'Premium Haram Proximity Hotels',
            desc: 'Handpicked 4★ & 5★ accommodations within walking distance of Masjid al-Haram and Masjid an-Nabawi.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            gradient: 'from-[#0f88c0] to-emerald-400',
            bgGradient: 'bg-emerald-50'
        }
    ];

    const stats = [
        { label: 'YEARS OF SERVICE', value: '12+' },
        { label: 'HAPPY PILGRIMS', value: '50K+' },
        { label: 'HOTEL PARTNERS', value: '100+' },
        { label: 'SATISFACTION RATE', value: '99%' },
    ];

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background - Exact Original */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header - Matches Destinations Layout */}
                <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100/50">
                        <span className="text-xl"></span>
                        <span className="text-sm font-bold text-[#0f88c0]">Why Choose Our Umrah Services</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-4">
                        Your Trusted Partner for{' '}
                        <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Sacred Journeys</span>
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We combine spiritual expertise with premium logistics to ensure a seamless, worry-free Umrah & Hajj experience from booking to return.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative backdrop-blur-sm bg-white/70 border border-white/50 rounded-3xl p-8 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 200}ms` }}
                        >
                            {/* Background Gradient Circle */}
                            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-500`}></div>

                            {/* Animated Border */}
                            <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} style={{ padding: '2px' }}>
                                <div className="w-full h-full bg-white rounded-3xl"></div>
                            </div>

                            {/* Icon Container */}
                            <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                                <div className="text-white">
                                    {feature.icon}
                                </div>
                                {/* Pulse Animation */}
                                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} animate-ping opacity-20`}></div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-[#0f88c0] transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm mb-4">
                                {feature.desc}
                            </p>

                            {/* Learn More Link */}
                            <Link href="#features" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f88c0] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                Learn More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            {/* Bottom Accent Line */}
                            <div className={`absolute bottom-0 left-4 right-4 h-1 bg-linear-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                        </div>
                    ))}
                </div>

                {/* Stats Section - Updated to Match Theme */}
                <div
                    className={`mt-20 mx-auto max-w-6xl rounded-3xl shadow-2xl shadow-gray-900/15 relative overflow-hidden transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{
                        background: 'linear-gradient(135deg, #0B1C33 0%, #0F2A4A 50%, #0A192F 100%)'
                    }}
                >
                    {/* Subtle Inner Glow */}
                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* Stats Grid */}
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 py-10 md:py-12 px-6 md:px-10">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="text-center group cursor-default relative"
                                style={{ transitionDelay: `${i * 100 + 600}ms` }}
                            >
                                {/* Divider Line (Hidden on last item) */}
                                {i !== stats.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 w-px h-12 bg-white/10"></div>
                                )}

                                <div className="relative inline-block">
                                    <p className="text-4xl md:text-5xl font-black text-white tracking-tight group-hover:text-[#0f88c0] via-emerald-400 to-[#0f88c0] transition-colors duration-300 group-hover:scale-105 transform">
                                        {stat.value}
                                    </p>
                                    {/* Subtle Underline Animation - Theme Match */}
                                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#0f88c0]/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                                </div>
                                <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-widest mt-5 group-hover:text-gray-300 transition-colors duration-300">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Theme Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0] opacity-60"></div>
                </div>

            </div>
        </section>
    );
}