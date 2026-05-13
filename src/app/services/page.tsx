'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Custom hook for scroll animations
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

export default function ServicesPage() {
    const statsRef = useInView();
    const servicesRef = useInView();

    const [animatedStats, setAnimatedStats] = useState({
        countries: 0,
        airlines: 0,
        travelers: 0,
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
                    countries: Math.floor(140 * easeOut),
                    airlines: Math.floor(500 * easeOut),
                    travelers: Math.floor(2 * easeOut),
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            ),
            title: 'Flight Booking',
            desc: 'Compare and book international flights from 500+ airlines at the best prices with instant confirmation.',
            features: ['Real-time Pricing', 'Zero Hidden Fees', 'Flexible Dates', 'Multi-City Trips'],
            color: 'from-blue-500 to-cyan-400',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            link: '/search'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: 'Hotel Reservations',
            desc: 'From luxury resorts to budget stays, find the perfect accommodation for your travel needs worldwide.',
            features: ['Best Price Guarantee', 'Free Cancellation', 'Instant Confirmation', '24/7 Support'],
            color: 'from-emerald-500 to-teal-400',
            bgColor: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            link: '/hotels'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Tour Packages',
            desc: 'Curated vacation packages to 140+ countries. All-inclusive deals with flights, hotels, and activities.',
            features: ['Customizable Itineraries', 'Expert Guides', 'Group Discounts', 'All Inclusive'],
            color: 'from-purple-500 to-pink-400',
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600',
            link: '/tours'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Visa Assistance',
            desc: 'Hassle-free visa processing and documentation support for seamless international travel.',
            features: ['Document Review', 'Application Support', 'Fast Processing', 'Expert Guidance'],
            color: 'from-orange-500 to-red-400',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            link: '/visa'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            ),
            title: 'Car Rentals',
            desc: 'Rent vehicles at your destination with flexible pickup/drop-off options and competitive rates.',
            features: ['Wide Vehicle Range', 'Airport Pickup', 'Insurance Included', 'GPS Navigation'],
            color: 'from-cyan-500 to-blue-400',
            bgColor: 'bg-cyan-50',
            iconColor: 'text-cyan-600',
            link: '/cars'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Travel Insurance',
            desc: 'Comprehensive coverage for trip cancellations, medical emergencies, and lost baggage protection.',
            features: ['Medical Coverage', 'Trip Protection', '24/7 Claims', 'Global Network'],
            color: 'from-rose-500 to-pink-400',
            bgColor: 'bg-rose-50',
            iconColor: 'text-rose-600',
            link: '/insurance'
        },
    ];

    return (
        <div className="w-full bg-white text-gray-700 overflow-hidden">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1569839333583-7375336cde4b?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Premium travel services"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85"></div>
                </div>

                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-white">Premium Travel Services</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Everything You Need for
                        <br className="hidden md:block" />
                        Seamless Travel
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        From flights to visas, we handle the details so you can focus on the journey.
                    </p>
                </div>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section ref={servicesRef.ref} className="relative py-24 bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-4 text-[#0f88c0] font-semibold text-sm uppercase tracking-widest bg-[#0f88c0]/10 rounded-full">
                            What We Offer
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                            Our Expert{'  '}
                            <span className="relative inline-block">
                                <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">
                                    Services
                                </span>
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-500 max-w-xl mx-auto text-lg">
                            Tailored solutions for every step of your travel journey.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`group relative bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer ${servicesRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute -inset-1 bg-linear-to-br ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>

                                {/* Card Content */}
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 mb-6 rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <div className={service.iconColor}>
                                            {service.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#0f88c0] transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                                                <svg className="w-5 h-5 text-[#0f88c0] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="font-medium">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={service.link}
                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r ${service.color} text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#0f88c0]/30 transition-all duration-300 group-hover:gap-3`}
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

            {/* ===== TRUST / STATS SECTION ===== */}
            <section ref={statsRef.ref} className="bg-[#0A192F] py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Trusted by <span className="text-[#0f88c0]">Millions</span> Worldwide
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our commitment to excellence has made us a leading travel services provider
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { val: animatedStats.countries, suffix: '+', label: 'Countries Covered', icon: '🌍' },
                            { val: animatedStats.airlines, suffix: '+', label: 'Airline Partners', icon: '✈️' },
                            { val: animatedStats.travelers, suffix: 'M+', label: 'Happy Travelers', icon: '😊' },
                            { val: animatedStats.satisfaction, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-[#0f88c0]/50 transition-all duration-300 cursor-pointer text-center"
                            >
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <p className="text-4xl md:text-5xl font-black text-[#0f88c0] mb-2">
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

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-1.5 mb-4 text-[#0f88c0] font-semibold text-sm uppercase tracking-widest bg-[#0f88c0]/10 rounded-full">
                                Why Choose Us
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black text-[#0A192F] mb-6">
                                We Make Travel{' '}
                                <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">
                                    Simple & Safe
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                With over a decade of experience, we've perfected the art of seamless travel planning. Our expert team ensures every detail is handled with precision.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: 'Best Price Guarantee', desc: 'We match any competitor\'s price', icon: '💰' },
                                    { title: '24/7 Customer Support', desc: 'Always here when you need us', icon: '🎧' },
                                    { title: 'Secure Booking', desc: 'Your data is protected with us', icon: '🔒' },
                                    { title: 'Flexible Changes', desc: 'Free cancellation on most bookings', icon: '🔄' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-sky-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
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
                            <div className="absolute -inset-4 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-3xl opacity-20 blur-2xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                                alt="Travel services"
                                className="relative rounded-2xl shadow-2xl w-full object-cover h-150"
                            />

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#0f88c0] to-sky-400 flex items-center justify-center text-white text-2xl">
                                        🏆
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-[#0A192F]">#1 Rated</p>
                                        <p className="text-sm text-gray-600">Travel Agency 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#0f88c0] via-sky-500 to-cyan-400"></div>

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>

                    {/* Animated Blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="relative z-10 p-12 md:p-20 text-center">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                            Ready to Elevate Your<br />
                            <span className="text-sky-100">Travel Experience?</span>
                        </h2>
                        <p className="text-sky-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            Book your next adventure with confidence. Our experts are standing by to craft your perfect itinerary.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/search"
                                className="px-8 py-4 bg-white text-[#0f88c0] rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Search Flights
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white/20 text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/30 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                Talk to an Expert
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Secure Booking</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>24/7 Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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