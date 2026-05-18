'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// 🔹 Optimized IntersectionObserver Hook
const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '0px 0px 100px 0px' // Cards 100px pehle trigger
            }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

export default function DestinationsPage() {
    const gridRef = useInView();
    const [activeCategory, setActiveCategory] = useState('All');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const categories = ['All', 'Holy Cities', 'Historical Sites', 'Ziyarat Locations', 'Nearby Cities'];

    // ✅ FIXED: Pexels images optimized with quality & format
    const destinations = [
        {
            name: 'Makkah',
            subtitle: 'Masjid al-Haram',
            category: 'Holy Cities',
            image: 'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=800&q=80&auto=format&fit=crop',
            bestTime: 'Year Round',
            tags: ['Kaaba', 'Hajj', 'Umrah'],
            distance: 'Center',
            description: 'The holiest city in Islam'
        },
        {
            name: 'Madinah',
            subtitle: 'Masjid an-Nabawi',
            category: 'Holy Cities',
            image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=800&q=80&auto=format&fit=crop',
            bestTime: 'Year Round',
            tags: ["Prophet's Mosque", 'Ziyarat', 'Peace'],
            distance: '340 km from Makkah',
            description: 'City of the Prophet ﷺ'
        },
        {
            name: 'Jeddah',
            subtitle: 'Gateway to Makkah',
            category: 'Nearby Cities',
            image: 'https://images.unsplash.com/photo-1586715065342-98d1f6016fd1?w=800&q=80&auto=format&fit=crop',
            bestTime: 'Nov - Mar',
            tags: ['Airport', 'Shopping', 'Red Sea'],
            distance: '80 km from Makkah',
            description: 'Main entry point for pilgrims'
        },
        {
            name: 'Jabal al-Nour',
            subtitle: 'Cave of Hira',
            category: 'Historical Sites',
            // ✅ Pexels optimized - reduced quality & added format
            image: 'https://images.pexels.com/photos/12613484/pexels-photo-12613484.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Early Morning',
            tags: ['First Revelation', 'Mountain', 'Spiritual'],
            distance: '4 km from Makkah',
            description: 'Where Prophet Muhammad ﷺ received first revelation'
        },
        {
            name: 'Jabal Thawr',
            subtitle: 'Cave of Thawr',
            category: 'Historical Sites',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/32727335/pexels-photo-32727335.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Morning',
            tags: ['Hijrah', 'Historic Cave', 'Mountain'],
            distance: 'South of Makkah',
            description: 'Where Prophet ﷺ took refuge during Hijrah'
        },
        {
            name: 'Mina',
            subtitle: 'City of Tents',
            category: 'Ziyarat Locations',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/8865389/pexels-photo-8865389.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Hajj Season',
            tags: ['Hajj Rites', 'Jamarat', 'Tents'],
            distance: '8 km from Makkah',
            description: 'Essential Hajj site'
        },
        {
            name: 'Arafat',
            subtitle: 'Mount of Mercy',
            category: 'Ziyarat Locations',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/12765598/pexels-photo-12765598.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: '9th Dhul Hijjah',
            tags: ['Day of Arafah', 'Hajj Peak', 'Dua'],
            distance: '20 km from Makkah',
            description: 'Most important Hajj site'
        },
        {
            name: 'Muzdalifah',
            subtitle: 'Open-Air Sanctuary',
            category: 'Ziyarat Locations',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/12364274/pexels-photo-12364274.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Night of 10th Dhul Hijjah',
            tags: ['Overnight Stay', 'Pebbles Collection', 'Hajj'],
            distance: 'Between Mina & Arafat',
            description: 'Where pilgrims collect pebbles'
        },
        {
            name: 'Quba Mosque',
            subtitle: 'First Mosque in Islam',
            category: 'Historical Sites',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Saturday Morning',
            tags: ['Sunnah Prayer', 'Historic', 'Madinah'],
            distance: '3 km from Masjid Nabawi',
            description: 'First mosque built by Prophet ﷺ'
        },
        {
            name: 'Mount Uhud',
            subtitle: 'Battle of Uhud Site',
            category: 'Historical Sites',
            // ✅ Pexels optimized
            image: 'https://images.pexels.com/photos/12607980/pexels-photo-12607980.jpeg?auto=compress&cs=tinysrgb&w=800&q=60',
            bestTime: 'Morning',
            tags: ['Martyrs', 'Battle Site', 'History'],
            distance: '4 km from Madinah',
            description: 'Site of Battle of Uhud'
        },
        {
            name: 'Taif',
            subtitle: 'City of Roses',
            category: 'Nearby Cities',
            image: 'https://images.unsplash.com/photo-1729817901796-11a32e72bba3?w=800&q=80&auto=format&fit=crop',
            bestTime: 'Summer',
            tags: ['Cool Climate', 'Roses', 'Fruits'],
            distance: '88 km from Makkah',
            description: 'Mountain retreat with cool climate'
        },
        {
            name: 'Yanbu',
            subtitle: 'Red Sea Coast',
            category: 'Nearby Cities',
            image: 'https://images.unsplash.com/photo-1674979724846-d650cba04a11?w=800&q=80&auto=format&fit=crop',
            bestTime: 'Oct - Apr',
            tags: ['Beach', 'History', 'Peaceful'],
            distance: '300 km from Madinah',
            description: 'Historic port city on Red Sea'
        }
    ];

    const filteredDestinations = useMemo(() => {
        return activeCategory === 'All'
            ? destinations
            : destinations.filter(d => d.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="w-full bg-white text-gray-700">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=1200&q=80&auto=format&fit=crop"
                        alt="Masjid al-Haram, Makkah"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        quality={80}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85" />
                </div>

                {/* ✅ Fixed: Using standard Tailwind sizes */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />

                <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-white">🕋 Sacred Destinations</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Explore Holy Sites &
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Ziyarat Locations
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Discover the blessed cities of Makkah and Madinah,
                        historical Islamic sites, and essential pilgrimage
                        locations for a spiritually enriching journey.
                    </p>
                </div>
            </section>

            {/* ===== CATEGORY FILTER ===== */}
            <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${activeCategory === category
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    } hover:scale-105 active:scale-95`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DESTINATIONS GRID ===== */}
            <section ref={gridRef.ref} className="relative py-20 overflow-hidden bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {filteredDestinations.map((dest, index) => (
                            <div
                                key={dest.name}
                                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer will-change-transform ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                    }`}
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
                                }}
                            >
                                {/* ✅ FIXED: Optimized image container */}
                                <div className="relative h-72 overflow-hidden bg-gray-100">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading={index < 3 ? 'eager' : 'lazy'}
                                        priority={index === 0}
                                        quality={dest.image.includes('pexels.com') ? 60 : 80} // Pexels ko kam quality
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-[#0A192F]">
                                            {dest.category}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-4 left-6 right-6">
                                        <h3 className="text-2xl font-black text-white mb-1">{dest.name}</h3>
                                        <p className="text-white/90 text-sm">{dest.subtitle}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {dest.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 bg-[#0f88c0]/10 text-[#0f88c0] text-xs font-bold rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 font-medium">{dest.bestTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 font-medium">{dest.distance}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/destination/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="w-full py-3.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-base rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        <span>Explore Location</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#0f88c0]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">🕋</span>
                        <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Ready for Your Journey?
                        </span>
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Begin Your Sacred
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            {' '}Pilgrimage
                        </span>
                    </h2>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Let us guide you to these blessed destinations with
                        complete visa support, premium accommodations, and
                        expert-guided Ziyarat tours.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/packages"
                            className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] flex items-center justify-center gap-3 transition-all duration-300"
                        >
                            View Packages
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300"
                        >
                            Contact Experts
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}