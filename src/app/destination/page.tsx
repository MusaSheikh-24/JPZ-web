'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function DestinationsPage() {
    const gridRef = useInView();
    const [activeContinent, setActiveContinent] = useState('All');
    const continents = ['All', 'Asia', 'Europe', 'Middle East', 'Americas', 'Africa', 'Oceania'];

    const destinations = [
        {
            name: 'Dubai',
            country: 'UAE',
            continent: 'Middle East',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop',
            bestTime: 'Oct - Feb',
            tags: ['Luxury', 'Desert', 'Modern'],
            temp: '25°C - 35°C',
            description: 'Where futuristic architecture meets Arabian heritage'
        },
        {
            name: 'Bali',
            country: 'Indonesia',
            continent: 'Asia',
            image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=870&auto=format&fit=crop',
            bestTime: 'Apr - Oct',
            tags: ['Beach', 'Culture', 'Nature'],
            temp: '24°C - 30°C',
            description: 'Tropical paradise with ancient temples'
        },
        {
            name: 'Paris',
            country: 'France',
            continent: 'Europe',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop',
            bestTime: 'Mar - Jun',
            tags: ['Romance', 'Art', 'History'],
            temp: '8°C - 25°C',
            description: 'The city of love and timeless elegance'
        },
        {
            name: 'Tokyo',
            country: 'Japan',
            continent: 'Asia',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop',
            bestTime: 'Mar - May',
            tags: ['Modern', 'Culture', 'Food'],
            temp: '5°C - 30°C',
            description: 'Ancient traditions meet cutting-edge innovation'
        },
        {
            name: 'New York',
            country: 'USA',
            continent: 'Americas',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&auto=format&fit=crop',
            bestTime: 'Apr - Jun',
            tags: ['Urban', 'Culture', 'Nightlife'],
            temp: '0°C - 29°C',
            description: 'The city that never sleeps'
        },
        {
            name: 'Cape Town',
            country: 'South Africa',
            continent: 'Africa',
            image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&auto=format&fit=crop',
            bestTime: 'Nov - Mar',
            tags: ['Nature', 'Adventure', 'Wine'],
            temp: '12°C - 28°C',
            description: 'Where mountains meet the ocean'
        },
        {
            name: 'Sydney',
            country: 'Australia',
            continent: 'Oceania',
            image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            bestTime: 'Sep - Nov',
            tags: ['Beach', 'Urban', 'Nature'],
            temp: '8°C - 26°C',
            description: 'Iconic harbor city with coastal beauty'
        },
        {
            name: 'Santorini',
            country: 'Greece',
            continent: 'Europe',
            image: 'https://images.unsplash.com/photo-1687786071688-a92e6bdbefc5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            bestTime: 'Apr - Oct',
            tags: ['Romance', 'Beach', 'Views'],
            temp: '10°C - 28°C',
            description: 'Stunning sunsets and white-washed villages'
        }
    ];

    const filteredDestinations = activeContinent === 'All'
        ? destinations
        : destinations.filter(d => d.continent === activeContinent);

    return (
        <div className="w-full bg-white text-gray-700">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1569839333583-7375336cde4b?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Destinations"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85"></div>
                </div>

                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-white">140+ Destinations Worldwide</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Discover Your Next
                        <br className="hidden sm:block" />
                        Dream Destination
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        From serene beaches to vibrant cities, explore handpicked locations across 6 continents.
                        Your perfect getaway is just one click away.
                    </p>
                </div>
            </section>

            {/* ===== CONTINENT FILTER ===== */}
            <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {continents.map((continent) => (
                            <button
                                key={continent}
                                onClick={() => setActiveContinent(continent)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${activeContinent === continent
                                    ? 'bg-[#0f88c0] text-white shadow-lg shadow-sky-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {continent}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DESTINATIONS GRID - MINIMAL & AIRY ===== */}
            <section ref={gridRef.ref} className="relative py-20 overflow-hidden bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {filteredDestinations.map((dest, index) => (
                            <div
                                key={dest.name}
                                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:shadow-gray-400/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Large Image - 60% of card */}
                                <div className="relative h-80 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                                    {/* Location Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-[#0A192F]">
                                            {dest.country}
                                        </span>
                                    </div>

                                    {/* Destination Name Overlay */}
                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-3xl font-black text-white mb-1">{dest.name}</h3>
                                        <p className="text-white/90 text-sm">{dest.description}</p>
                                    </div>
                                </div>

                                {/* Info Section - Minimal & Clean */}
                                <div className="p-6">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {dest.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-[#0f88c0]/10 text-[#0f88c0] text-xs font-bold rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Best Time & Weather */}
                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 font-medium">{dest.bestTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 font-medium">{dest.temp}</span>
                                        </div>
                                    </div>

                                    {/* Explore Button */}
                                    <button className="w-full py-3.5 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-base rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group/btn">
                                        <span>Explore Destination</span>
                                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">✈️</span>
                        <span className="text-base font-bold text-[#0f88c0]">Ready to Fly?</span>
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Your Next Adventure <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Starts Today</span>
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Let our travel experts plan your dream vacation. Get a customized itinerary and exclusive deals delivered to your inbox.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/packages" className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer transition-all duration-300">
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                            Contact Experts
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}