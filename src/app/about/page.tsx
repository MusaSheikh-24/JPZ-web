'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useInView } from '../hooks/useInView';

export default function AboutPage() {
    const statsRef = useInView();
    const introRef = useInView();
    const featuresRef = useInView();
    const storyRef = useInView();
    const teamRef = useInView();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const stats = [
        { value: '50K+', label: 'Pilgrims Served', icon: '🕋' },
        { value: '100%', label: 'Visa Success Rate', icon: '🛂' },
        { value: '10+', label: 'Years Experience', icon: '📿' },
        { value: '4.9★', label: 'Pilgrim Rating', icon: '⭐' },
    ];

    const features = [
        {
            title: 'Visa & Documentation',
            desc: 'Hassle-free visa processing with complete documentation support for Umrah & Hajj.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: 'Haram Proximity Hotels',
            desc: 'Premium 5-star & 4-star accommodations within walking distance of Masjid al-Haram & Nabawi.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
            )
        },
        {
            title: 'Guided Ziyarat Tours',
            desc: 'Expert-guided historical & spiritual tours in Makkah & Madinah following authentic Sunnah.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: 'Sunnah-Compliant Packages',
            desc: 'Carefully curated itineraries that align with Islamic teachings & scholarly guidance.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            title: '24/7 Ground Support',
            desc: 'Dedicated on-ground team available round the clock for assistance, transport & emergencies.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            )
        },
        {
            title: 'Secure & Flexible Payments',
            desc: 'SSL-encrypted booking with EMI options & complete financial transparency.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
    ];

    const timeline = [
        { year: '2014', title: 'Service Established', desc: 'Founded with a mission to simplify sacred travel' },
        { year: '2017', title: 'First Hajj Caravan', desc: 'Successfully managed our first large-scale Hajj group' },
        { year: '2020', title: 'Digital Transformation', desc: 'Launched seamless online booking & real-time tracking' },
        { year: '2024', title: '50K+ Pilgrims Served', desc: 'Becoming a trusted name in Umrah & Hajj services' },
    ];

    return (
        <div className="w-full">
            <Navbar />

            {/* ===== HERO SECTION - Dark with Umrah Image ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1591604157118-b94e2684f857?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Masjid al-Haram, Makkah - Kaaba"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        quality={80}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85" />
                </div>

                {/* Animated Glow Effects */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />

                <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-white">About Our Pilgrimage Services</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        About Our
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Umrah & Hajj Services</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto ">
                        We provide complete spiritual travel solutions with visa assistance, premium accommodations near Haram, expert-guided Ziyarat, and dedicated support for every pilgrim.
                    </p>

                </div>
            </section>

            {/* ===== STATS SECTION - WHITE BACKGROUND ===== */}
            <section ref={statsRef.ref} className="relative py-20 overflow-hidden bg-white">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${statsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center group cursor-default">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#0f88c0]/10 to-emerald-400/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">{stat.icon}</span>
                            </div>
                            <p className="text-4xl md:text-5xl font-black text-[#0A192F] group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{stat.value}</p>
                            <p className="text-base text-gray-500 mt-2 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== STORY SECTION - BLUE BACKGROUND ===== */}
            <section ref={storyRef.ref} className="relative py-24 overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-linear-to-b from-[#0A192F] to-[#112240]"></div>
                <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${storyRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/5 rounded-full border border-white/10">
                            <span className="text-xl">✨</span>
                            <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Our Story</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Your Trusted <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Pilgrimage</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                            </span> Partner
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            We are a dedicated Islamic travel agency focused on making your sacred journeys smooth, spiritually fulfilling, and worry-free. From Umrah to Hajj, we provide end-to-end services tailored to your needs.
                        </p>

                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                            Our mission is to help you perform your Ibadah with peace of mind, comfort, and authentic guidance. With over a decade of experience, we have connected thousands of pilgrims with their dream of visiting the Holy Cities.
                        </p>

                        <a href="/packages" className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 cursor-pointer">
                            Explore Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="relative">
                        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 group cursor-pointer border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1551041777-575d3855ca71?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Masjid an-Nabawi, Madinah"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/70 to-transparent"></div>
                        </div>

                        <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/20 group cursor-pointer hidden md:block border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1639574326077-6cc1d8749395?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG1ha2thaHxlbnwwfDB8MHx8fDI%3D"
                                alt="Pilgrim Praying"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="absolute -top-4 -right-4 bg-[#112240] rounded-2xl px-6 py-4 shadow-xl border border-white/10 cursor-pointer">
                            <p className="text-3xl font-black bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">10+</p>
                            <p className="text-sm text-gray-400 font-medium">Years Serving Pilgrims</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE SECTION - WHITE BACKGROUND ===== */}
            <section className="relative py-24 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f0f9ff_0%,#ffffff_70%)]" />
                <div className="absolute top-20 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                            <span className="text-xl">📅</span>
                            <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Our Journey</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                            Milestones & <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Achievements</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#0f88c0] via-emerald-400 to-[#0f88c0] rounded-full hidden md:block"></div>

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div key={item.year} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                    <div className="flex-1 text-center md:text-left">
                                        {i % 2 === 0 ? (
                                            <div className="bg-[#0A192F] rounded-2xl p-6 border border-white/10 hover:border-emerald-400/50 transition-all hover:-translate-y-1 cursor-pointer">
                                                <p className="text-3xl font-black bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent mb-2">{item.year}</p>
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-400">{item.desc}</p>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="w-6 h-6 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/30 z-10 shrink-0 border-4 border-white"></div>

                                    <div className="flex-1 text-center md:text-left">
                                        {i % 2 !== 0 ? (
                                            <div className="bg-[#0A192F] rounded-2xl p-6 border border-white/10 hover:border-emerald-400/50 transition-all hover:-translate-y-1 cursor-pointer">
                                                <p className="text-3xl font-black bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent mb-2">{item.year}</p>
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

            {/* ===== FEATURES SECTION - BLUE BACKGROUND ===== */}
            <section ref={featuresRef.ref} className="relative py-24 overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#112240_0%,#0A192F_70%)]"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-700 ${featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/5 rounded-full border border-white/10">
                            <span className="text-xl">💼</span>
                            <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">What We Offer</span>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-5">
                            Why <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Choose</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                            </span> Us
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Discover what makes us the preferred choice for pilgrims worldwide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`group relative bg-[#112240] rounded-3xl p-8 border border-white/10 shadow-lg shadow-emerald-900/10 hover:border-emerald-400/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${featuresRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                <div className={`absolute inset-0 rounded-3xl bg-linear-to-r from-[#0f88c0] to-emerald-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                <div className={`relative w-16 h-16 mb-6 rounded-2xl bg-linear-to-r from-[#0f88c0] to-emerald-400 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300`}>
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>

                                <div className={`absolute bottom-0 left-4 right-4 h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VALUES SECTION - WHITE BACKGROUND ===== */}
            <section ref={teamRef.ref} className="relative py-24 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#f0f9ff_0%,#ffffff_70%)]" />
                <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

                <div className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${teamRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                        <span className="text-xl">🎯</span>
                        <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Our Values</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-6">
                        Travel With <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Confidence</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                        We believe every pilgrimage should be spiritually uplifting and logistically seamless. Our commitment to excellence drives us to serve you with sincerity and care.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Spiritual Excellence', desc: 'Ensuring every step aligns with Islamic principles & Sunnah', emoji: '🕋' },
                            { title: 'Trust & Transparency', desc: 'Clear pricing, honest guidance & no hidden fees', emoji: '💎' },
                            { title: 'Care & Compassion', desc: 'Treating every pilgrim like family, with dedicated support', emoji: '🤲' },
                        ].map((value, i) => (
                            <div key={value.title} className="bg-[#0A192F] rounded-3xl p-8 border border-white/10 hover:border-emerald-400/50 transition-all hover:-translate-y-2 cursor-pointer group">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">{value.emoji}</span>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{value.title}</h3>
                                <p className="text-gray-400">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION - BLUE BACKGROUND ===== */}
            <section className="relative py-24 overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f88c0/10_0%,#0A192F_60%)]"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/5 rounded-full border border-white/10">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Ready to Start?</span>
                    </span>

                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                        Begin Your <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Sacred Journey</span>
                    </h2>

                    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                        Let us guide you to the Holy Cities with premium packages, expert scholars, and complete peace of mind. Book your Umrah or Hajj today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="/packages" className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-400/50 active:scale-[0.98] flex items-center gap-2 cursor-pointer">
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="/contact" className="px-10 py-4 bg-white/5 text-white font-bold text-lg rounded-full border border-white/20 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer">
                            Contact Our Team
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}