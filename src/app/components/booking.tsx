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

export default function UmrahJourneySection() {
    const { ref, isInView } = useInView();

    // Umrah Journey Steps - Theme Updated
    const steps = [
        {
            step: '01',
            icon: '💬',
            title: 'Free Consultation',
            description: 'Speak with our Umrah experts to plan your spiritual journey based on your budget and preferences.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        },
        {
            step: '02',
            icon: '🛂',
            title: 'Visa Processing',
            description: 'We handle all Umrah visa documentation with fast, reliable processing and official approvals.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        },
        {
            step: '03',
            icon: '✈️',
            title: 'Flight Booking',
            description: 'Direct and connecting flights with top airlines, flexible dates, and competitive pricing.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        },
        {
            step: '04',
            icon: '🕌',
            title: 'Hotel Reservation',
            description: 'Premium hotels near Masjid al-Haram & Masjid an-Nabawi with verified reviews and best rates.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        },
        {
            step: '05',
            icon: '🧭',
            title: 'Ziyarat Tours',
            description: 'Guided visits to historical Islamic sites in Makkah, Madinah, and surrounding areas.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        },
        {
            step: '06',
            icon: '🤝',
            title: 'On-Ground Support',
            description: '24/7 Arabic & English speaking coordinators in Saudi Arabia for seamless assistance.',
            gradient: 'from-[#0f88c0] to-emerald-400'
        }
    ];

    return (
        <section ref={ref} className="relative py-24 overflow-hidden bg-linear-to-b from-white to-gray-50">
            {/* Background Decor - Theme Updated */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section - Theme Updated */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white border border-[#0f88c0]/20 rounded-full shadow-sm">
                        <span className="text-lg">🕋</span>
                        <span className="text-sm font-bold text-[#0f88c0] uppercase tracking-wide">Your Sacred Journey</span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-5">
                        Plan Your{' '}
                        <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Umrah Experience</span>
                            <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        A simple, step-by-step process to ensure your spiritual journey is comfortable, meaningful, and hassle-free.
                    </p>
                </div>

                {/* Journey Steps Grid - Theme Updated */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-500 hover:-translate-y-2 flex flex-col ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                            style={{ transitionDelay: `${index * 100 + 200}ms` }}
                        >
                            {/* Step Number Badge - Theme Updated */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${item.gradient} text-white font-bold text-lg mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {item.step}
                            </div>

                            {/* Icon + Title */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{item.icon}</span>
                                <h3 className="text-lg font-bold text-[#0A192F] group-hover:text-[#0f88c0] transition-colors">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed flex-1">
                                {item.description}
                            </p>

                            {/* Connector Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-linear-to-r from-[#0f88c0]/30 to-emerald-400/30"></div>
                            )}

                            {/* Bottom Hover Accent - Theme Updated */}
                            <div className={`absolute bottom-0 left-0 w-full h-1 bg-linear-to-r ${item.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        </div>
                    ))}
                </div>

                {/* CTA Section - Theme Updated */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-left">
                            <p className="text-base font-bold text-[#0A192F]">Ready to begin your sacred journey?</p>
                            <p className="text-sm text-gray-500">Our Umrah experts are here to help you every step of the way.</p>
                        </div>
                        <Link
                            href="/#contact"
                            className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                        >
                            Get Free Consultation
                        </Link>
                    </div>
                </div>

            </div>

            {/* Bottom Accent Bar - Theme Match */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0] opacity-60"></div>
        </section>
    );
}