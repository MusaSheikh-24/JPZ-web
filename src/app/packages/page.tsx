// app/packages/page.tsx
'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// ================= INTERFACES =================
interface PackageDetails {
    flight: string;
    hotel: string;
    itinerary: string[];
    priceBreakdown: string;
}

interface TravelPackage {
    id: number;
    title: string;
    category: string;
    destination: string;
    duration: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    inclusions: string[];
    badge?: string;
    discount?: string;
    description: string;
    details: PackageDetails;
}

// ================= DEFAULT DATA =================
const defaultPackages: TravelPackage[] = [
    {
        id: 1,
        title: 'Umrah Premium Package',
        category: 'Umrah',
        destination: 'Makkah & Madinah',
        duration: '10 Days / 9 Nights',
        price: 365000,
        originalPrice: 480000,
        rating: 4.9,
        reviews: 487,
        image: 'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=800&q=80',
        description: 'Premium Umrah experience with Haram view hotels, direct flights, and complete Ziyarat tours.',
        inclusions: ['Direct Flights', '5★ Haram Hotel', 'Saudi Visa', 'Ziyarat Tours', 'Ground Transport', 'Daily Meals'],
        badge: 'Best Seller',
        discount: '24% OFF',
        details: {
            flight: 'Direct Return • Free 30kg Baggage • Meal Included • Priority Boarding',
            hotel: 'Swissotel Makkah (5★) • Haram View Room • Pullman Zamzam Madinah',
            itinerary: [
                'Day 1: Arrival in Jeddah & Transfer to Makkah',
                'Day 2-4: Umrah Rituals & Ibadah at Masjid al-Haram',
                'Day 5: Transfer to Madinah via High-Speed Train',
                'Day 6-8: Ziyarat Tours & Prayers at Masjid Nabawi',
                'Day 9: Return to Makkah for Final Tawaf',
                'Day 10: Departure from Jeddah'
            ],
            priceBreakdown: 'Flights: Rs. 155,000 | Hotels: Rs. 125,000 | Visa & Services: Rs. 85,000'
        }
    },
    {
        id: 2,
        title: 'Hajj Complete Package',
        category: 'Hajj',
        destination: 'Makkah, Madinah, Mina, Arafat',
        duration: '21 Days / 20 Nights',
        price: 985000,
        originalPrice: 1200000,
        rating: 5.0,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=800&q=80',
        description: 'Complete Hajj pilgrimage with luxury tents in Mina, scholar guidance, and all Hajj rituals covered.',
        inclusions: ['Direct Flights', 'Luxury Tents Mina', 'All Meals', 'Scholar Guidance', 'Transport', 'Medical Support'],
        badge: 'Premium',
        discount: '19% OFF',
        details: {
            flight: 'Direct Charter Flight • Priority Boarding • Extra Baggage',
            hotel: 'Makkah: Fairmont Clock Tower | Madinah: Anwar Al Madinah',
            itinerary: [
                'Day 1-3: Arrival & Ihram Preparation',
                'Day 4-7: Umrah al-Tamattu & Stay in Makkah',
                'Day 8: Transfer to Mina & Stay in Luxury Tents',
                'Day 9: Day of Arafat - Wuquf & Dua',
                'Day 10: Muzdalifah & Rami al-Jamarat',
                'Day 11-13: Days of Tashreeq in Mina',
                'Day 14-17: Farewell Tawaf & Return to Madinah',
                'Day 18-20: Ziyarat in Madinah',
                'Day 21: Departure'
            ],
            priceBreakdown: 'Flights: Rs. 340,000 | Accommodation: Rs. 420,000 | Services & Meals: Rs. 225,000'
        }
    }
];

// ================= HOOKS =================
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
            { threshold, rootMargin: '0px 0px 100px 0px' }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

// Helper function to format PKR
const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
};

// ================= MAIN COMPONENT =================
export default function PackagesPage() {
    const gridRef = useInView();
    const [packages, setPackages] = useState<TravelPackage[]>(defaultPackages);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('none');
    const [packageTypeFilter, setPackageTypeFilter] = useState('all');
    const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const filterRef = useInView();

    // Load packages from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('packages');
        if (stored) {
            setPackages(JSON.parse(stored));
        } else {
            // Initialize with default packages if none exist
            localStorage.setItem('packages', JSON.stringify(defaultPackages));
            setPackages(defaultPackages);
        }
    }, []);

    // Listen for real-time updates from admin
    useEffect(() => {
        const handlePackagesUpdate = () => {
            const stored = localStorage.getItem('packages');
            if (stored) {
                setPackages(JSON.parse(stored));
            }
        };

        window.addEventListener('packages-updated', handlePackagesUpdate);
        window.addEventListener('storage', handlePackagesUpdate);

        return () => {
            window.removeEventListener('packages-updated', handlePackagesUpdate);
            window.removeEventListener('storage', handlePackagesUpdate);
        };
    }, []);

    const categories = ['All', 'Umrah', 'Hajj', 'Madinah', 'Ramadan', 'Budget'];

    const filteredPackages = useMemo(() => {
        let currentPackages = packages;

        // 1. Filter by Category
        if (activeCategory !== 'All') {
            currentPackages = currentPackages.filter((p) => p.category === activeCategory);
        }

        // 2. Filter by Package Type
        if (packageTypeFilter === 'premium') {
            currentPackages = currentPackages.filter((p) =>
                p.category === 'Hajj' ||
                p.category === 'Ramadan' ||
                p.badge === 'Premium' ||
                p.badge === 'Best Seller' ||
                p.badge === 'Ramadan Special'
            );
        } else if (packageTypeFilter === 'budget') {
            currentPackages = currentPackages.filter((p) => p.category === 'Budget');
        } else if (packageTypeFilter === 'family') {
            currentPackages = currentPackages.filter((p) => p.badge === 'Family Friendly');
        }

        // 3. Sort
        if (sortOrder === 'priceAsc') {
            currentPackages = [...currentPackages].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'priceDesc') {
            currentPackages = [...currentPackages].sort((a, b) => b.price - a.price);
        }

        return currentPackages;
    }, [packages, activeCategory, sortOrder, packageTypeFilter]);

    const openModal = (pkg: TravelPackage) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedPackage(null), 300);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

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
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85" />
                </div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-bold text-white">🕋 Umrah & Hajj Packages</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Sacred Journeys <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Made Simple</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Complete Umrah, Hajj & Madinah packages with visa, hotels, transport & spiritual guidance. Your blessed journey starts here.
                    </p>
                </div>
            </section>

            {/* ===== CATEGORY FILTER ===== */}
            <section ref={filterRef.ref} className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 ease-out delay-200 ${filterRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Category Buttons */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide grow">
                            {categories.map((category, i) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-3 rounded-full text-base font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${activeCategory === category
                                            ? 'bg-linear-to-r from-[#0f88c0] to-emerald-500 text-white shadow-xl shadow-emerald-500/30 transform scale-105'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0f88c0] hover:text-[#0f88c0] hover:shadow-lg'
                                        }`}
                                    style={{ transitionDelay: `${i * 50}ms` }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Dropdowns */}
                        <div className="flex items-center gap-3">
                            {/* Sort Order Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-[#0f88c0] text-sm font-bold transition-all duration-300 cursor-pointer"
                                >
                                    <option value="none">Sort By</option>
                                    <option value="priceAsc">Price: Low to High</option>
                                    <option value="priceDesc">Price: High to Low</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Package Type Dropdown */}
                            <div className="relative">
                                <select
                                    value={packageTypeFilter}
                                    onChange={(e) => setPackageTypeFilter(e.target.value)}
                                    className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-[#0f88c0] text-sm font-bold transition-all duration-300 cursor-pointer"
                                >
                                    <option value="all">Package Type</option>
                                    <option value="premium">Premium</option>
                                    <option value="budget">Budget</option>
                                    <option value="family">Family</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PACKAGES GRID ===== */}
            <section ref={gridRef.ref} className="relative py-20 overflow-hidden bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {filteredPackages.map((pkg, index) => (
                            <div
                                key={pkg.id}
                                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer will-change-transform flex flex-col h-full ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 50}ms`, transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden bg-gray-100 shrink-0">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        loading={index < 3 ? 'eager' : 'lazy'}
                                        priority={index === 0}
                                        quality={80}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                                    {pkg.badge && (
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/30">
                                                {pkg.badge}
                                            </span>
                                        </div>
                                    )}
                                    {pkg.discount && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-xl">
                                                {pkg.discount}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl text-xs font-bold text-[#0A192F]">
                                            {pkg.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-[#0A192F] mb-2 group-hover:text-[#0f88c0] transition-colors duration-300 line-clamp-2 min-h-12">
                                        {pkg.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-10">
                                        {pkg.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-gray-600 font-medium">{pkg.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm font-bold text-[#0A192F]">{pkg.rating}</span>
                                            <span className="text-xs text-gray-500">({pkg.reviews})</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 flex-1">
                                        <p className="text-xs text-gray-500 font-semibold mb-2">What's included:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pkg.inclusions.slice(0, 3).map((item, i) => (
                                                <span key={i} className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-xl font-medium">
                                                    {item}
                                                </span>
                                            ))}
                                            {pkg.inclusions.length > 3 && (
                                                <span className="text-xs text-[#0f88c0] bg-[#0f88c0]/10 px-3 py-1 rounded-xl font-semibold">
                                                    +{pkg.inclusions.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price & Button */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-400 line-through">{formatPKR(pkg.originalPrice)}</span>
                                                <span className="text-2xl font-black text-[#0A192F]">{formatPKR(pkg.price)}</span>
                                            </div>
                                            <span className="text-xs text-gray-500">per person</span>
                                        </div>
                                        <button
                                            onClick={() => openModal(pkg)}
                                            className="px-6 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center gap-2"
                                        >
                                            <span>View Details</span>
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPackages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No packages found. Add some packages from the admin panel.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== MODAL ===== */}
            {isModalOpen && selectedPackage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={closeModal}>
                    <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 max-h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 z-60 p-2.5 bg-black/20 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:rotate-90 group"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="overflow-y-auto flex-1 custom-scrollbar">
                            <div className="relative h-72 shrink-0">
                                <Image src={selectedPackage.image} alt={selectedPackage.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white text-xs font-bold rounded-md uppercase tracking-wider">
                                            {selectedPackage.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm font-bold text-white">{selectedPackage.rating}</span>
                                        </div>
                                    </div>
                                    <h2 className="text-4xl font-black text-white mb-2 leading-tight">{selectedPackage.title}</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {selectedPackage.destination}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {selectedPackage.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-10">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-linear-to-br from-emerald-50 to-white rounded-3xl border border-emerald-100 shadow-sm">
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">Starting From</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-3">
                                            <span className="text-3xl sm:text-4xl font-black text-[#0A192F] tracking-tighter">
                                                {formatPKR(selectedPackage.price)}
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-400 line-through leading-none mb-1">
                                                    {formatPKR(selectedPackage.originalPrice)}
                                                </span>
                                                <span className="text-xs text-green-600 font-bold">SAVE {selectedPackage.discount}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full sm:w-auto px-12 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-black text-lg rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer">
                                        Book Now
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#0f88c0]/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2.5 bg-emerald-50 text-[#0f88c0] rounded-xl group-hover:bg-[#0f88c0] group-hover:text-white transition-colors">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0A192F]">Flight Details</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed font-medium">{selectedPackage.details.flight}</p>
                                    </div>
                                    <div className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#0f88c0]/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2.5 bg-emerald-50 text-[#0f88c0] rounded-xl group-hover:bg-[#0f88c0] group-hover:text-white transition-colors">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0A192F]">Premium Stay</h3>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed font-medium">{selectedPackage.details.hotel}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-[#0A192F] mb-8 flex items-center gap-3">
                                        <svg className="w-7 h-7 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                        Curated Itinerary
                                    </h3>
                                    <div className="relative ml-4 pl-8 border-l-2 border-dashed border-emerald-200 space-y-8">
                                        {selectedPackage.details.itinerary.map((day, i) => (
                                            <div key={i} className="relative group">
                                                <span className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white border-4 border-[#0f88c0] text-[#0f88c0] font-black flex items-center justify-center text-xs shadow-md transition-transform group-hover:scale-110 z-10">
                                                    {i + 1}
                                                </span>
                                                <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 group-hover:bg-emerald-50/30 group-hover:border-emerald-100 transition-all">
                                                    <p className="text-gray-800 font-bold text-lg mb-1">{day.split(':')[0]}</p>
                                                    <p className="text-gray-600 leading-relaxed">{day.split(':')[1] || ''}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10 pt-10 border-t border-gray-100">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0A192F] mb-5">Premium Inclusions</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {selectedPackage.inclusions.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 p-3 bg-green-50/50 rounded-xl border border-green-100/50">
                                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700 font-semibold text-sm">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0A192F] mb-5">Package Transparency</h3>
                                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Cost Analysis</p>
                                            <p className="text-gray-700 font-medium leading-relaxed">{selectedPackage.details.priceBreakdown}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#0f88c0]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">🕋</span>
                        <span className="text-base font-bold bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                            Ready for Your Sacred Journey?
                        </span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Begin Your Sacred <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent"> Pilgrimage</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Let us guide you to these blessed destinations with complete visa support, premium accommodations, and expert-guided Ziyarat tours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg rounded-xl shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 active:scale-[0.98] flex items-center justify-center gap-3 transition-all duration-300"
                        >
                            Contact Experts
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/packages"
                            className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300"
                        >
                            View All Packages
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}