'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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

export default function AboutPage() {
    const statsRef = useInView();
    const introRef = useInView();
    const featuresRef = useInView();
    const storyRef = useInView();
    const teamRef = useInView();

    const stats = [
        { value: '50K+', label: 'Happy Travelers', icon: '🌍' },
        { value: '140+', label: 'Destinations', icon: '✈️' },
        { value: '10+', label: 'Years Experience', icon: '🏆' },
        { value: '4.9★', label: 'Average Rating', icon: '⭐' },
    ];

    const features = [
        {
            title: 'Best Prices Guaranteed',
            desc: 'We compare prices from 500+ providers to ensure you get the best deals without compromising quality.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-emerald-400 to-teal-500'
        },
        {
            title: 'Trusted Service',
            desc: 'Thousands of happy travelers trust our services worldwide. Your journey is in safe hands with us.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            gradient: 'from-blue-400 to-indigo-500'
        },
        {
            title: '24/7 Expert Support',
            desc: 'Our dedicated team is available round the clock to assist you at every step of your journey.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            gradient: 'from-purple-400 to-pink-500'
        },
        {
            title: 'Curated Experiences',
            desc: 'Handpicked destinations, vetted hotels, and exclusive access to hidden gems worldwide.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-orange-400 to-red-500'
        },
        {
            title: 'Easy Booking',
            desc: 'Seamless booking experience with instant confirmation and flexible payment options.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            gradient: 'from-cyan-400 to-blue-500'
        },
        {
            title: 'Secure Payments',
            desc: 'SSL-encrypted transactions with multiple payment methods and complete data protection.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            gradient: 'from-yellow-400 to-orange-500'
        },
    ];

    const timeline = [
        { year: '2014', title: 'Company Founded', desc: 'Started with a vision to revolutionize travel booking' },
        { year: '2016', title: '10,000 Customers', desc: 'Reached our first major milestone' },
        { year: '2019', title: 'Global Expansion', desc: 'Extended services to 50+ countries worldwide' },
        { year: '2022', title: '50K+ Travelers', desc: 'Serving over 50,000 happy travelers annually' },
    ];

    return (
        <div className="w-full bg-white text-gray-700">
            <Navbar />

            {/* ===== SIMPLE HERO SECTION ===== */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">

                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1525396524423-64f7b55f5b33?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Background"
                        fill
                        priority
                        className="object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">

                    {/* Small Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-semibold">About TravelCo</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
                        About Our <br />
                        Travel Agency
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">
                        We create unforgettable travel experiences with trusted service,
                        affordable packages, and destinations across the world.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                        <a
                            href="/packages"
                            className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full transition-all duration-300 shadow-lg"
                        >
                            Explore Packages
                        </a>

                        <a
                            href="/contact"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all duration-300"
                        >
                            Contact Us
                        </a>

                    </div>
                </div>
            </section>
            {/* ===== END HERO SECTION ===== */}

            {/* STATS SECTION */}
            <section ref={statsRef.ref} className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="text-center group cursor-default">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#0f88c0]/10 to-sky-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">{stat.icon}</span>
                            </div>
                            <p className="text-4xl md:text-5xl font-black text-[#0A192F] group-hover:text-[#0f88c0] transition-colors">{stat.value}</p>
                            <p className="text-base text-gray-500 mt-2 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* INTRO / STORY SECTION */}
            <section ref={storyRef.ref} className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-white to-sky-50/30"></div>
                <div className="absolute top-40 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${storyRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    {/* TEXT */}
                    <div>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-sky-100/50 border border-gray-100/50">
                            <span className="text-xl">✨</span>
                            <span className="text-base font-bold text-[#0f88c0]">Our Story</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-6 leading-tight">
                            Your Trusted <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Travel</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                            </span> Partner
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                            We are a modern travel agency dedicated to making your journeys smooth, affordable, and unforgettable.
                            From luxury vacations to spiritual Umrah trips, we provide complete travel solutions tailored to your needs.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Our mission is to help you explore the world with confidence, comfort, and peace of mind.
                            With over a decade of experience, we have connected thousands of travelers with their dream destinations.
                        </p>

                        <a href="/packages" className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/40 cursor-pointer">
                            Explore Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    {/* IMAGE STACK */}
                    <div className="relative">
                        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 group cursor-pointer">
                            <Image
                                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80"
                                alt="Travel Experience"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/60 to-transparent"></div>
                        </div>

                        <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/50 group cursor-pointer hidden md:block">
                            <Image
                                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80"
                                alt="Travel Experience"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-6 py-4 shadow-xl cursor-pointer">
                            <p className="text-3xl font-black text-[#0f88c0]">10+</p>
                            <p className="text-sm text-gray-500 font-medium">Years Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#112240_0%,#0A192F_70%)]" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                            <span className="text-xl">📅</span>
                            <span className="text-base font-bold text-[#0f88c0]">Our Journey</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-5">
                            Milestones & <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Achievements</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#0f88c0] via-sky-400 to-[#0f88c0] rounded-full hidden md:block"></div>

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div key={item.year} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="flex-1 text-center md:text-left">
                                        {i % 2 === 0 ? (
                                            <div className="bg-[#112240] rounded-2xl p-6 border border-white/10 hover:border-[#0f88c0]/50 transition-all hover:-translate-y-1 cursor-pointer">
                                                <p className="text-3xl font-black text-[#0f88c0] mb-2">{item.year}</p>
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-400">{item.desc}</p>
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Center Dot */}
                                    <div className="w-6 h-6 rounded-full bg-[#0f88c0] shadow-lg shadow-sky-500/50 z-10 shrink-0"></div>

                                    <div className="flex-1 text-center md:text-left">
                                        {i % 2 !== 0 ? (
                                            <div className="bg-[#112240] rounded-2xl p-6 border border-white/10 hover:border-[#0f88c0]/50 transition-all hover:-translate-y-1 cursor-pointer">
                                                <p className="text-3xl font-black text-[#0f88c0] mb-2">{item.year}</p>
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-400">{item.desc}</p>
                                            </div>
                                        ) : (
                                            <div className="hidden md:block"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section ref={featuresRef.ref} className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-700 ${featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-sky-100/50 border border-gray-100/50">
                            <span className="text-xl">💼</span>
                            <span className="text-base font-bold text-[#0f88c0]">What We Offer</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                            Why <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Choose</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                            </span> Us
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Discover what makes us the preferred choice for travelers worldwide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/20 hover:shadow-2xl hover:shadow-gray-400/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                                    {feature.icon}
                                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} animate-ping opacity-20`}></div>
                                </div>

                                <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-[#0f88c0] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>

                                <div className={`absolute bottom-0 left-4 right-4 h-1 bg-linear-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section ref={teamRef.ref} className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#112240_0%,#0A192F_70%)]" />
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${teamRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">🎯</span>
                        <span className="text-base font-bold text-[#0f88c0]">Our Values</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Travel With <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Confidence</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
                        We believe every journey should be extraordinary. Our commitment to excellence drives us to exceed your expectations at every step.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Excellence', desc: 'Delivering exceptional experiences consistently', emoji: '🏆' },
                            { title: 'Integrity', desc: 'Transparent and honest service always', emoji: '💎' },
                            { title: 'Innovation', desc: 'Continuously improving our platform', emoji: '🚀' },
                        ].map((value, i) => (
                            <div key={value.title} className="bg-[#112240] rounded-3xl p-8 border border-white/10 hover:border-[#0f88c0]/50 transition-all hover:-translate-y-2 cursor-pointer">
                                <span className="text-5xl mb-4 block">{value.emoji}</span>
                                <h3 className="text-2xl font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-gray-400">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-sky-100 to-white"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-xl border border-gray-100/50">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-base font-bold text-[#0f88c0]">Ready to Start?</span>
                    </span>

                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-6">
                        Ready to Start Your <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Journey?</span>
                    </h2>

                    <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
                        Let&apos;s plan your next unforgettable trip together. Explore our curated packages and start your adventure today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/packages" className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 active:scale-[0.98] flex items-center gap-2 cursor-pointer">
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="/contact" className="px-10 py-4 bg-white text-[#0A192F] font-bold text-lg rounded-full border-2 border-gray-200 hover:border-[#0f88c0] hover:text-[#0f88c0] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}