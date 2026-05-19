'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ================= HELPER FUNCTIONS =================
const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
};

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

export default function HajjUmrahPackagesSection() {
    const router = useRouter();
    const { ref, isInView } = useInView();
    const [activeCategory, setActiveCategory] = useState('All');

    const filters = ['All', 'Umrah', 'Hajj', 'Madinah', 'Ramadan'];

    const packages = [
        {
            id: 1,
            title: 'Premium Umrah Package',
            category: 'Umrah',
            duration: '10 Days / 9 Nights',
            price: 365000,
            originalPrice: 480000,
            rating: 4.9,
            reviews: 842,
            image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
            inclusions: ['Flights', '5★ Hotel', 'Visa', 'Transport', 'Ziyarat'],
            badge: 'Best Seller',
            discount: '24% OFF'
        },
        {
            id: 2,
            title: 'Hajj Essential Package',
            category: 'Hajj',
            duration: '21 Days / 20 Nights',
            price: 985000,
            originalPrice: 1200000,
            rating: 5.0,
            reviews: 615,
            image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
            inclusions: ['Flights', 'Makkah/Madinah Stay', 'Guided Manasik', 'Transport', 'Meals'],
            badge: 'Limited Seats',
            discount: '18% OFF'
        },
        {
            id: 3,
            title: 'Madinah Extension Stay',
            category: 'Madinah',
            duration: '5 Days / 4 Nights',
            price: 250000,
            originalPrice: 340000,
            rating: 4.8,
            reviews: 423,
            image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop',
            inclusions: ['Hotel', 'Rawdah Booking', 'Ziyarat Tours', 'Transport', 'Breakfast'],
            badge: 'Popular',
            discount: '26% OFF'
        },
        {
            id: 4,
            title: 'Ramadan Umrah Special',
            category: 'Ramadan',
            duration: '14 Days / 13 Nights',
            price: 530000,
            originalPrice: 700000,
            rating: 4.9,
            reviews: 587,
            image: 'https://images.unsplash.com/photo-1720549973451-018d3623b55a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg5fHxoYWpqfGVufDB8fDB8fHww',
            inclusions: ['Flights', 'Iftar/Suhoor', '5★ Hotel', 'Visa', 'Daily Transport'],
            badge: 'Spiritual',
            discount: '24% OFF'
        },
        {
            id: 5,
            title: 'Family Umrah Deal',
            category: 'Umrah',
            duration: '8 Days / 7 Nights',
            price: 305000,
            originalPrice: 420000,
            rating: 4.7,
            reviews: 391,
            image: 'https://images.unsplash.com/photo-1579305796153-ab71ce202953?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTgzfHxoYWpqfGVufDB8fDB8fHww',
            inclusions: ['Flights', 'Connecting Rooms', 'Kids Discount', 'Visa', 'Airport Transfers'],
            badge: 'Family',
            discount: '27% OFF'
        },
        {
            id: 6,
            title: 'VIP Hajj Luxury',
            category: 'Hajj',
            duration: '18 Days / 17 Nights',
            price: 1250000,
            originalPrice: 1550000,
            rating: 5.0,
            reviews: 214,
            image: 'https://images.unsplash.com/photo-1589827577276-65d717348780?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFqanxlbnwwfHwwfHx8MA%3D%3D',
            inclusions: ['Business Class', '5★ Suites', 'Private Guide', 'VIP Tents', 'Full Board'],
            badge: 'Premium',
            discount: '19% OFF'
        }
    ];

    const filteredPackages = activeCategory === 'All'
        ? packages
        : packages.filter(p => p.category === activeCategory);

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background - Clean White/Sky */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/40 to-white"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-[#0f88c0]/10 rounded-full border border-[#0f88c0]/20">
                        <span className="text-2xl">🕋</span>
                        <span className="text-base font-bold text-[#0f88c0]">Pilgrimage Packages</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Curated <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-500 bg-clip-text text-transparent">Hajj & Umrah</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-500 rounded-full"></span>
                        </span> Journeys
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Handcrafted itineraries with premium hotels in Makkah & Madinah, guided Manasik, and complete spiritual support.
                    </p>
                </div>

                {/* Category Filter */}
                <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {filters.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${activeCategory === cat
                                ? 'bg-linear-to-r from-[#0f88c0] to-emerald-500 text-white shadow-xl shadow-emerald-500/30 transform scale-105'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0f88c0] hover:text-[#0f88c0] hover:shadow-lg'
                                }`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPackages.map((pkg, index) => (
                        <div
                            key={pkg.id}
                            className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500 hover:-translate-y-3 flex flex-col ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100 + 300}ms` }}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>

                                {/* Badge */}
                                {pkg.badge && (
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-[#0f88c0] to-emerald-500 rounded-full shadow-lg shadow-emerald-500/30">
                                        {pkg.badge}
                                    </span>
                                )}

                                {/* Discount Tag */}
                                {pkg.discount && (
                                    <span className="absolute top-4 right-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                                        {pkg.discount}
                                    </span>
                                )}

                                {/* Price Overlay - UPDATED TO PKR */}
                                <div className="absolute bottom-4 right-4">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs text-gray-400 line-through">{formatPKR(pkg.originalPrice)}</span>
                                            <span className="text-lg font-bold text-[#0A192F]">{formatPKR(pkg.price)}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">per person</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="relative p-8 flex flex-col flex-1">
                                {/* Category & Duration */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-[#0f88c0] bg-[#0f88c0]/10 px-4 py-1.5 rounded-full">
                                        {pkg.category}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {pkg.duration}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-[#0A192F] mb-4 group-hover:text-[#0f88c0] transition-colors duration-300 line-clamp-2">
                                    {pkg.title}
                                </h3>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.03 4a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-base font-bold text-[#0A192F]">{pkg.rating}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">({pkg.reviews} reviews)</span>
                                </div>

                                {/* Inclusions */}
                                <div className="mb-6 flex-1">
                                    <p className="text-sm text-gray-500 mb-3 font-semibold">What's included:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {pkg.inclusions.slice(0, 3).map((item, i) => (
                                            <span key={i} className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">
                                                {item}
                                            </span>
                                        ))}
                                        {pkg.inclusions.length > 3 && (
                                            <span className="text-sm text-[#0f88c0] bg-[#0f88c0]/10 px-3 py-1.5 rounded-lg font-semibold">
                                                +{pkg.inclusions.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => router.push('/packages')}  // ✅ Changed: Ab sirf /packages par jayega
                                    className="w-full mt-auto py-3 bg-linear-to-r from-[#0f88c0] to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>View Package</span>
                                    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Link
                        href="/packages"
                        className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer"
                    >
                        Explore All Packages
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}