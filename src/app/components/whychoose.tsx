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

export default function WhyChooseUs() {
    const { ref, isInView } = useInView();

    const features = [
        {
            title: 'Best Price Guarantee',
            desc: 'We compare 500+ airlines & hotels in real-time. Found a lower price elsewhere? We match it instantly.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-emerald-400 to-teal-500',
            bgGradient: 'bg-emerald-50'
        },
        {
            title: '24/7 Global Support',
            desc: 'Multilingual travel experts available round-the-clock. Help at every step, from booking to landing.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            gradient: 'from-blue-400 to-indigo-500',
            bgGradient: 'bg-blue-50'
        },
        {
            title: 'Secure & Transparent',
            desc: 'SSL-encrypted payments, zero hidden fees, and clear cancellation policies. Your data stays safe.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            gradient: 'from-purple-400 to-pink-500',
            bgGradient: 'bg-purple-50'
        },
        {
            title: 'Curated Experiences',
            desc: 'Handpicked hotels, vetted local guides, and exclusive access to hidden gems. Travel like a local.',
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-orange-400 to-red-500',
            bgGradient: 'bg-orange-50'
        }
    ];

    const stats = [
        { label: 'Trusted Since', value: '2015' },
        { label: 'Countries Served', value: '140+' },
        { label: 'Verified Reviews', value: '4.9/5' },
        { label: 'Customer Retention', value: '98%' },
    ];

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100/50">
                        <span className="text-xl">✨</span>
                        <span className="text-sm font-bold text-[#0f88c0]">Why Travel With Us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-4">
                        Built for <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Modern Travelers</span>
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We combine cutting-edge technology with human expertise to deliver seamless, stress-free travel experiences worldwide.
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
                            <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f88c0] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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

                {/* Stats Section */}
                <div className={`mt-20 p-8 rounded-3xl bg-linear-to-br from-[#0A192F] to-[#112240] shadow-2xl shadow-gray-900/20 relative overflow-hidden transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl"></div>

                    {/* Stats Grid */}
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="text-center group cursor-default">
                                <div className="relative inline-block">
                                    <p className="text-4xl md:text-5xl font-black text-white group-hover:text-[#0f88c0] transition-colors duration-300 group-hover:scale-105 transform">
                                        {stat.value}
                                    </p>
                                    {/* Underline Animation */}
                                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                                </div>
                                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-4 group-hover:text-gray-300 transition-colors">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}