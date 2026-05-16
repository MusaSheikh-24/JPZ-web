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

export default function HolyDestinationsSection() {
    const { ref, isInView } = useInView();
    const [activeFilter, setActiveFilter] = useState('All');

    // Filtered to only Hajj/Umrah regions
    const filters = ['All', 'Makkah', 'Madinah'];

    const destinations = [
        {
            name: 'Makkah',
            slug: 'makkah',
            country: 'Saudi Arabia',
            region: 'Makkah',
            price: 1299,
            rating: 5.0,
            reviews: 8547,
            image: 'https://images.unsplash.com/photo-1511652019870-fbd8713560bf?q=80&w=870&auto=format&fit=crop',
            badge: 'Most Popular',
            description: 'Home of Masjid al-Haram and the Kaaba'
        },
        {
            name: 'Madinah',
            slug: 'madinah',
            country: 'Saudi Arabia',
            region: 'Madinah',
            price: 1099,
            rating: 5.0,
            reviews: 7421,
            image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=870&auto=format&fit=crop',
            badge: 'Essential',
            description: 'Masjid an-Nabawi and Rawdah Shareef'
        },
        {
            name: 'Jeddah',
            slug: 'jeddah',
            country: 'Saudi Arabia',
            region: 'Makkah',
            price: 899,
            rating: 4.8,
            reviews: 3420,
            image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            badge: 'Gateway',
            description: 'Historic port city & main arrival hub for pilgrims'
        }
    ];

    const filteredDestinations = activeFilter === 'All'
        ? destinations
        : destinations.filter(d => d.region === activeFilter || d.name === activeFilter);

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0A192F] via-[#0d1f3c] to-[#0A192F]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-150 h-100 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-2xl">🕋</span>
                        <span className="text-base font-bold text-[#0f88c0]">Holy Destinations</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-5">
                        Sacred <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Journeys</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                        </span> Await
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore the blessed cities of Makkah & Madinah for your Umrah and Hajj pilgrimage.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {filters.map((filter, i) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-3 rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${activeFilter === filter
                                ? 'bg-linear-to-r from-[#0f88c0] to-emerald-500 text-white shadow-xl shadow-emerald-500/30 transform scale-105'
                                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                                }`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((dest, index) => (
                        <div
                            key={dest.name}
                            className={`group relative bg-linear-to-br from-[#112240] to-[#0A192F] rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-3 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 300}ms` }}
                        >
                            {/* Premium Shadow Layer */}
                            <div className="absolute inset-0 rounded-3xl shadow-2xl shadow-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/50 to-transparent"></div>

                                {/* Animated Shimmer on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>

                                {/* Badge */}
                                {dest.badge && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-[#0f88c0] to-emerald-500 rounded-full shadow-lg shadow-emerald-500/30">
                                        {dest.badge}
                                    </span>
                                )}

                                {/* Price Tag */}
                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg shadow-md">
                                    <span className="text-base font-bold text-[#0A192F]">${dest.price}</span>
                                    <span className="text-xs text-gray-500">/person</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative p-8">
                                {/* Decorative Line */}
                                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[#0f88c0] transition-colors duration-300">
                                        {dest.name}
                                    </h3>
                                    <p className="text-base text-gray-400 mt-1">{dest.country}</p>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{dest.description}</p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex items-center gap-1">
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.03 4a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-lg font-bold text-white">{dest.rating}</span>
                                    </div>
                                    <span className="text-base text-gray-500">({dest.reviews.toLocaleString()} reviews)</span>
                                </div>

                                {/* View Destination Button */}
                                <Link
                                    href={`/destination/${dest.slug}`}
                                    className="w-full py-3 bg-linear-to-r from-[#0f88c0] to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group/btn"
                                >
                                    <span>View Destination</span>
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Bottom Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link
                        href="/destination"
                        className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"
                    >
                        Explore All Destinations
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}