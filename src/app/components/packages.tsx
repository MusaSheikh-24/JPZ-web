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

export default function PackagesSection() {
    const { ref, isInView } = useInView();
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Adventure', 'Luxury', 'Beach', 'Cultural', 'Family'];

    const packages = [
        {
            title: 'Dubai Luxury Escape',
            category: 'Luxury',
            duration: '5 Days / 4 Nights',
            price: 899,
            originalPrice: 1299,
            rating: 4.9,
            reviews: 487,
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop',
            inclusions: ['Flights', '5★ Hotel', 'Breakfast', 'City Tour', 'Desert Safari'],
            badge: 'Best Seller',
            discount: '30% OFF'
        },
        {
            title: 'Bali Beach Paradise',
            category: 'Beach',
            duration: '7 Days / 6 Nights',
            price: 649,
            originalPrice: 899,
            rating: 4.8,
            reviews: 623,
            image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=870&auto=format&fit=crop',
            inclusions: ['Flights', 'Resort Stay', 'All Meals', 'Spa Session', 'Water Sports'],
            badge: 'Popular',
            discount: '28% OFF'
        },
        {
            title: 'Swiss Alps Adventure',
            category: 'Adventure',
            duration: '6 Days / 5 Nights',
            price: 1299,
            originalPrice: 1699,
            rating: 4.9,
            reviews: 312,
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop',
            inclusions: ['Flights', 'Chalet Stay', 'Ski Pass', 'Equipment', 'Guide'],
            badge: 'Premium',
            discount: '24% OFF'
        },
        {
            title: 'Tokyo Cultural Journey',
            category: 'Cultural',
            duration: '8 Days / 7 Nights',
            price: 1099,
            originalPrice: 1499,
            rating: 4.7,
            reviews: 541,
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop',
            inclusions: ['Flights', 'Hotel', 'JR Pass', 'Temple Tours', 'Food Experience'],
            badge: null,
            discount: '27% OFF'
        },
        {
            title: 'Maldives Honeymoon',
            category: 'Luxury',
            duration: '5 Days / 4 Nights',
            price: 1599,
            originalPrice: 2299,
            rating: 5.0,
            reviews: 892,
            image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&auto=format&fit=crop',
            inclusions: ['Flights', 'Overwater Villa', 'All Meals', 'Couples Spa', 'Sunset Cruise'],
            badge: 'Romantic',
            discount: '30% OFF'
        },
        {
            title: 'Iceland Northern Lights',
            category: 'Adventure',
            duration: '6 Days / 5 Nights',
            price: 1199,
            originalPrice: 1599,
            rating: 4.8,
            reviews: 267,
            image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&auto=format&fit=crop',
            inclusions: ['Flights', 'Hotel', 'Aurora Hunt', 'Blue Lagoon', 'Golden Circle'],
            badge: 'Limited',
            discount: '25% OFF'
        }
    ];

    const filteredPackages = activeCategory === 'All'
        ? packages
        : packages.filter(p => p.category === activeCategory);

    return (
        <section ref={ref} className="relative py-24 overflow-hidden">
            {/* Background - Original White/Sky Blue */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Original Light Theme */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-sky-100/50 border border-gray-100/50">
                        <span className="text-xl">🎒</span>
                        <span className="text-base font-bold text-[#0f88c0]">Tour Packages</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Curated <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Travel</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                        </span> Packages
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Handcrafted itineraries with best prices, handpicked hotels, and unforgettable experiences.
                    </p>
                </div>

                {/* Category Filter */}
                <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 ease-out delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-full text-base font-bold transition-all duration-300 cursor-pointer ${activeCategory === cat
                                ? 'bg-linear-to-r from-[#0f88c0] to-sky-500 text-white shadow-xl shadow-sky-500/30 transform scale-105'
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
                            key={pkg.title}
                            className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:shadow-gray-400/40 transition-all duration-500 hover:-translate-y-3 flex flex-col ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
                                    <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-[#0f88c0] to-sky-500 rounded-full shadow-lg shadow-sky-500/30">
                                        {pkg.badge}
                                    </span>
                                )}

                                {/* Discount Tag */}
                                {pkg.discount && (
                                    <span className="absolute top-4 right-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                                        {pkg.discount}
                                    </span>
                                )}

                                {/* Price Overlay */}
                                <div className="absolute bottom-4 right-4">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xs text-gray-400 line-through">${pkg.originalPrice}</span>
                                            <span className="text-lg font-bold text-[#0A192F]">${pkg.price}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">per person</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section - Flex layout ensures button always stays at bottom */}
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
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

                                {/* CTA Button - Always aligned to bottom */}
                                <button className="w-full mt-auto py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-base rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                                    <span>View Details</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bottom Accent Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-sky-400 to-[#0f88c0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className={`text-center mt-16 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <button className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 active:scale-[0.98] inline-flex items-center gap-3 cursor-pointer">
                        Explore All Packages
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}