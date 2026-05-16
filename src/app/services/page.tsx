'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useInView } from '../hooks/useInView';

export default function ServicesPage() {
    const statsRef = useInView();
    const servicesRef = useInView();
    const [animatedStats, setAnimatedStats] = useState({
        pilgrims: 0,
        visas: 0,
        hotels: 0,
        satisfaction: 0
    });

    // Animate stats on scroll
    useEffect(() => {
        if (statsRef.isInView) {
            const duration = 2000;
            const steps = 60;
            const interval = duration / steps;

            let step = 0;
            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);

                setAnimatedStats({
                    pilgrims: Math.floor(50000 * easeOut),
                    visas: Math.floor(100 * easeOut),
                    hotels: Math.floor(150 * easeOut),
                    satisfaction: Math.floor(99 * easeOut)
                });

                if (step >= steps) clearInterval(timer);
            }, interval);

            return () => clearInterval(timer);
        }
    }, [statsRef.isInView]);

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Umrah & Hajj Visa',
            desc: 'Complete visa processing with documentation support for Umrah and Hajj pilgrimages.',
            features: ['Fast Processing', 'Document Review', 'Expert Guidance', '100% Success Rate'],
            color: 'from-[#0f88c0] to-emerald-400',
            bgColor: 'bg-[#0f88c0]/10',
            iconColor: 'text-[#0f88c0]',
            link: '/visa'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: 'Haram Hotels',
            desc: 'Premium 5-star & 4-star hotels within walking distance of Masjid al-Haram & Nabawi.',
            features: ['Best Locations', 'Luxury Amenities', 'Haram View Rooms', 'Halal Dining'],
            color: 'from-emerald-400 to-teal-500',
            bgColor: 'bg-emerald-400/10',
            iconColor: 'text-emerald-600',
            link: '/hotels'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Ziyarat Tours',
            desc: 'Guided historical and spiritual tours of sacred sites in Makkah and Madinah.',
            features: ['Expert Guides', 'Historical Sites', 'Sunnah Routes', 'Group & Private'],
            color: 'from-purple-500 to-pink-400',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            link: '/ziyarat'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Complete Packages',
            desc: 'All-inclusive Umrah & Hajj packages with flights, hotels, transport, and guidance.',
            features: ['Budget to Luxury', 'Group Discounts', 'Family Packages', 'Customizable'],
            color: 'from-orange-500 to-red-400',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            link: '/packages'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            title: 'Transport Services',
            desc: 'Comfortable AC vehicles for airport transfers, Ziyarat tours, and local transport.',
            features: ['Luxury Buses', 'Private Cars', '24/7 Availability', 'Experienced Drivers'],
            color: 'from-cyan-500 to-blue-400',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            link: '/transport'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'Scholar Guidance',
            desc: 'Learn rituals and Islamic practices from qualified scholars and experienced guides.',
            features: ['Ritual Training', 'Q&A Sessions', 'Spiritual Support', 'Multilingual'],
            color: 'from-rose-500 to-pink-400',
            bgColor: 'bg-rose-50',
            iconColor: 'text-rose-600',
            link: '/guidance'
        },
    ];

    return (
        <div className="w-full">
            <Navbar />

            {/* ===== HERO SECTION - Dark with Umrah Image ===== */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Masjid al-Haram, Makkah - Kaaba"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-[#0A196F]/70 via-[#0A192F]/50 to-[#0A192F]" />
                </div>

                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-white">Premium Pilgrimage Services</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Everything You Need for
                        <br className="hidden md:block" />
                        Sacred Journey
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                        Complete Umrah & Hajj services with visa assistance, premium hotels, guided Ziyarat, and 24/7 support.
                    </p>
                </div>
            </section>

            {/* ===== SERVICES GRID - WHITE BACKGROUND ===== */}
            <section ref={servicesRef.ref} className="relative py-24 bg-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                            <span className="text-xl">💼</span>
                            <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">What We Offer</span>
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                            Our{'  '}
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Services
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
                            Comprehensive pilgrimage services for a spiritually fulfilling journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`group relative bg-[#0A192F] rounded-2xl border border-white/10 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer ${servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute -inset-1 bg-linear-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>

                                {/* Card Content */}
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <div className="text-white">
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={service.link}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r ${service.color} text-white font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 group-hover:gap-3`}
                                    >
                                        Explore Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRUST / STATS SECTION - BLUE BACKGROUND ===== */}
            <section ref={statsRef.ref} className="bg-[#0A192F] py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Trusted by <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Thousands</span> of Pilgrims
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our commitment to excellence has made us a leading Umrah & Hajj services provider
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { val: animatedStats.pilgrims, suffix: '+', label: 'Pilgrims Served', icon: '🕋' },
                            { val: animatedStats.visas, suffix: '%', label: 'Visa Success Rate', icon: '🛂' },
                            { val: animatedStats.hotels, suffix: '+', label: 'Partner Hotels', icon: '🏨' },
                            { val: animatedStats.satisfaction, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300 cursor-pointer text-center"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <p className="text-4xl md:text-5xl font-black text-white group-hover:bg-linear-to-r group-hover:from-[#0f88c0] group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                                    {stat.val}{stat.suffix}
                                </p>
                                <p className="text-sm text-gray-400 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US - WHITE BACKGROUND ===== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0A192F]/5 rounded-full border border-[#0A192F]/10">
                                <span className="text-xl">✨</span>
                                <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Why Choose Us</span>
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-[#0A192F] mb-6">
                                We Make Your{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                                    Pilgrimage
                                </span>{' '}
                                Simple & Spiritual
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                With over a decade of experience in Umrah and Hajj services, we ensure every pilgrim receives personalized care, spiritual guidance, and seamless logistics.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Sunnah-Compliant Services', desc: 'All services follow authentic Islamic teachings', icon: '📿' },
                                    { title: '24/7 Ground Support', desc: 'Always here when you need us in Makkah & Madinah', icon: '🎧' },
                                    { title: 'Transparent Pricing', desc: 'No hidden fees, complete financial clarity', icon: '💎' },
                                    { title: 'Expert Scholars', desc: 'Learn rituals from qualified Islamic scholars', icon: '🤲' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-emerald-400/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#0A192F] mb-1">{item.title}</h4>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-3xl opacity-20 blur-2xl"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1673716636063-78fea250658a?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Masjid al-Haram"
                                width={800}
                                height={600}
                                className="relative rounded-2xl shadow-2xl w-full object-cover h-150"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-8 bg-[#0A192F] rounded-2xl shadow-2xl p-6 border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#0f88c0] to-emerald-400 flex items-center justify-center text-white text-2xl">
                                        🏆
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white">#1 Rated</p>
                                        <p className="text-sm text-gray-400">Umrah Services 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION - BLUE BACKGROUND ===== */}
            <section className="py-24 px-4 relative overflow-hidden bg-[#0A192F]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0f88c0/10_0%,#0A192F_60%)]" />

                <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden">
                    {/* Animated Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            <span className="text-base font-bold text-white">Begin Your Journey</span>
                        </span>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Ready to Perform Your <br />
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Sacred Pilgrimage?</span>
                        </h2>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Book your Umrah or Hajj with confidence. Our expert team is ready to guide you every step of the way.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/packages"
                                className="px-8 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                View Packages
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Talk to an Expert
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Visa Guaranteed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Best Price Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}