'use client';
import { useState, useEffect, useRef } from 'react';

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

export default function DestinationsSection() {
    const { ref, isInView } = useInView();
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Asia', 'Europe', 'Americas', 'Middle East'];

    const destinations = [
        {
            name: 'Dubai',
            country: 'UAE',
            region: 'Middle East',
            price: 299,
            rating: 4.9,
            reviews: 2847,
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop',
            badge: 'Popular'
        },
        {
            name: 'Bali',
            country: 'Indonesia',
            region: 'Asia',
            price: 279,
            rating: 4.8,
            reviews: 3421,
            image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=870&auto=format&fit=crop',
            badge: 'Trending'
        },
        {
            name: 'Paris',
            country: 'France',
            region: 'Europe',
            price: 399,
            rating: 4.7,
            reviews: 4156,
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop',
            badge: null
        },
        {
            name: 'Tokyo',
            country: 'Japan',
            region: 'Asia',
            price: 599,
            rating: 4.9,
            reviews: 2934,
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop',
            badge: 'New'
        },
        {
            name: 'New York',
            country: 'USA',
            region: 'Americas',
            price: 449,
            rating: 4.6,
            reviews: 3782,
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop',
            badge: null
        },
        {
            name: 'London',
            country: 'UK',
            region: 'Europe',
            price: 349,
            rating: 4.7,
            reviews: 3298,
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop',
            badge: 'Deal'
        }
    ];

    const filteredDestinations = activeFilter === 'All'
        ? destinations
        : destinations.filter(d => d.region === activeFilter);

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-[#0A192F] via-[#0d1f3c] to-[#0A192F]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">🌍</span>
                        <span className="text-base font-bold text-[#0f88c0]">Explore Destinations</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-5">
                        Popular <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Travel</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                        </span> Destinations
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Discover handpicked destinations with exclusive deals and unforgettable experiences.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {filters.map((filter, i) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-6 py-3 rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${activeFilter === filter
                                ? 'bg-linear-to-r from-[#0f88c0] to-sky-500 text-white shadow-xl shadow-sky-500/30 transform scale-105'
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
                            className={`group relative bg-linear-to-br from-[#112240] to-[#0A192F] rounded-3xl overflow-hidden border border-white/10 hover:border-[#0f88c0]/50 transition-all duration-500 hover:-translate-y-3 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-[#0f88c0] to-sky-500 rounded-full shadow-lg shadow-sky-500/30">
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

                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#0f88c0] transition-colors duration-300">
                                            {dest.name}
                                        </h3>
                                        <p className="text-base text-gray-400 mt-1">{dest.country}</p>
                                    </div>

                                    {/* Favorite Icon */}
                                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-all duration-300 group-hover:scale-110 cursor-pointer">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
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

                                {/* CTA Button */}
                                <button className="w-full py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-base rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                                    Explore Now
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-sky-400 to-[#0f88c0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <button className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer">
                        View All Destinations
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}