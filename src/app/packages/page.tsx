'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    details: PackageDetails;
}

// ================= DATA =================
const packages: TravelPackage[] = [
    {
        id: 1,
        title: 'Dubai Luxury Escape',
        category: 'Luxury',
        destination: 'Dubai, UAE',
        duration: '5 Days / 4 Nights',
        price: 899,
        originalPrice: 1299,
        rating: 4.9,
        reviews: 487,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop',
        inclusions: ['Flights', '5★ Hotel', 'Breakfast', 'City Tour', 'Desert Safari'],
        badge: 'Best Seller',
        discount: '30% OFF',
        details: {
            flight: 'Non-stop Return (Economy Plus) • Free 30kg Baggage',
            hotel: 'JW Marriott Marquis Dubai (5★) • Ocean View Suite',
            itinerary: ['Day 1: Arrival & Premium Desert Safari', 'Day 2: Burj Khalifa & City Highlights', 'Day 3: Leisure & Spa Access', 'Day 4: Shopping & Departure'],
            priceBreakdown: 'Flights: $400 | Hotel: $350 | Tours & Meals: $149'
        }
    },
    {
        id: 2,
        title: 'Bali Beach Paradise',
        category: 'Beach',
        destination: 'Bali, Indonesia',
        duration: '7 Days / 6 Nights',
        price: 649,
        originalPrice: 899,
        rating: 4.8,
        reviews: 623,
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=870&auto=format&fit=crop',
        inclusions: ['Flights', 'Resort Stay', 'All Meals', 'Spa Session', 'Water Sports'],
        badge: 'Popular',
        discount: '28% OFF',
        details: {
            flight: '1 Stop via KUL • Standard Economy',
            hotel: 'Ayana Resort & Spa (5★) • Private Pool Villa',
            itinerary: ['Day 1: Arrival & Welcome Dinner', 'Day 2: Ubud Cultural Tour', 'Day 3: Nusa Penida Island Hopping', 'Day 4-6: Beach Relaxation & Spa', 'Day 7: Departure'],
            priceBreakdown: 'Flights: $320 | Resort: $280 | Activities & Meals: $49'
        }
    },
    {
        id: 3,
        title: 'Swiss Alps Adventure',
        category: 'Adventure',
        destination: 'Interlaken, Switzerland',
        duration: '6 Days / 5 Nights',
        price: 1299,
        originalPrice: 1699,
        rating: 4.9,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&auto=format&fit=crop',
        inclusions: ['Flights', 'Chalet Stay', 'Ski Pass', 'Equipment', 'Guide'],
        badge: 'Premium',
        discount: '24% OFF',
        details: {
            flight: 'Direct Return • Priority Boarding',
            hotel: 'Victoria-Jungfrau Grand Hotel (5★) • Mountain View Room',
            itinerary: ['Day 1: Arrival & Gear Setup', 'Day 2: Jungfraujoch Snow Excursion', 'Day 3: Paragliding & Lake Cruise', 'Day 4: Advanced Ski Session', 'Day 5: Free Exploration', 'Day 6: Departure'],
            priceBreakdown: 'Flights: $550 | Chalet: $450 | Equipment & Passes: $299'
        }
    },
    {
        id: 4,
        title: 'Tokyo Cultural Journey',
        category: 'Cultural',
        destination: 'Tokyo, Japan',
        duration: '8 Days / 7 Nights',
        price: 1099,
        originalPrice: 1499,
        rating: 4.7,
        reviews: 541,
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop',
        inclusions: ['Flights', 'Hotel', 'JR Pass', 'Temple Tours', 'Food Experience'],
        discount: '27% OFF',
        details: {
            flight: 'Non-stop Return • Window Seat Guarantee',
            hotel: 'Park Hyatt Tokyo (5★) • City Skyline View',
            itinerary: ['Day 1: Arrival & Shinjuku Night Walk', 'Day 2: Asakusa & Senso-ji Temple', 'Day 3: Akihabara Tech Tour', 'Day 4: Mt. Fuji Day Trip', 'Day 5: Kyoto Heritage (Shinkansen)', 'Day 6-7: Free Exploration & Food Markets', 'Day 8: Departure'],
            priceBreakdown: 'Flights: $480 | Hotel: $420 | JR Pass & Tours: $199'
        }
    },
    {
        id: 5,
        title: 'Maldives Honeymoon',
        category: 'Luxury',
        destination: 'Malé Atoll, Maldives',
        duration: '5 Days / 4 Nights',
        price: 1599,
        originalPrice: 2299,
        rating: 5.0,
        reviews: 892,
        image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&auto=format&fit=crop',
        inclusions: ['Flights', 'Overwater Villa', 'All Meals', 'Couples Spa', 'Sunset Cruise'],
        badge: 'Romantic',
        discount: '30% OFF',
        details: {
            flight: 'Direct Seaplane Transfer Included',
            hotel: 'Soneva Jani (5★) • Private Overwater Villa with Slide',
            itinerary: ['Day 1: Seaplane Arrival & Sunset Cruise', 'Day 2: Private Beach Dinner', 'Day 3: Dolphin Watching & Spa', 'Day 4: Snorkeling & Free Day', 'Day 5: Departure'],
            priceBreakdown: 'Flights: $650 | Villa: $750 | Dining & Activities: $199'
        }
    },
    {
        id: 6,
        title: 'Iceland Northern Lights',
        category: 'Adventure',
        destination: 'Reykjavik, Iceland',
        duration: '6 Days / 5 Nights',
        price: 1199,
        originalPrice: 1599,
        rating: 4.8,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&auto=format&fit=crop',
        inclusions: ['Flights', 'Hotel', 'Aurora Hunt', 'Blue Lagoon', 'Golden Circle'],
        badge: 'Limited',
        discount: '25% OFF',
        details: {
            flight: '1 Stop via Reykjavik • Checked Baggage Included',
            hotel: 'Hotel Borg by Keahotels (4★) • Downtown Location',
            itinerary: ['Day 1: Arrival & City Orientation', 'Day 2: Golden Circle & Geysir', 'Day 3: Blue Lagoon & Lava Fields', 'Day 4: Glacier Hiking', 'Day 5: Northern Lights Chase', 'Day 6: Departure'],
            priceBreakdown: 'Flights: $420 | Hotel: $380 | Tours & Entry: $399'
        }
    }
];

// ================= HOOKS =================
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

// ================= MAIN COMPONENT =================
export default function PackagesPage() {
    const gridRef = useInView(0.1);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = ['All', 'Adventure', 'Luxury', 'Beach', 'Cultural', 'Family'];

    const filteredPackages = useMemo(() => {
        return activeCategory === 'All' ? packages : packages.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

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

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
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
                        src="https://images.unsplash.com/photo-1569839333583-7375336cde4b?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Travel Packages"
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
                        <span className="text-sm font-bold text-white">Exclusive Travel Packages</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Curated Packages for<br className="hidden sm:block" />Every Traveler
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        From luxury escapes to budget-friendly adventures, find your perfect package with flights, stays, and experiences included.
                    </p>
                </div>
            </section>

            {/* ===== PACKAGES GRID SECTION ===== */}
            <section ref={gridRef.ref} className="relative py-24 overflow-hidden bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

                    {/* Packages Grid - FIXED HEIGHT & PROFESSIONAL LAYOUT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, index) => (
                            <div
                                key={pkg.id}
                                className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:shadow-gray-400/40 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full cursor-pointer ${gridRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    }`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden shrink-0">
                                    <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    {pkg.badge && (
                                        <span className="absolute top-4 left-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-[#0f88c0] to-sky-500 rounded-full shadow-lg shadow-sky-500/30">
                                            {pkg.badge}
                                        </span>
                                    )}
                                    {pkg.discount && (
                                        <span className="absolute top-4 right-4 px-4 py-1.5 text-sm font-bold text-white bg-linear-to-r from-red-500 to-red-600 rounded-full shadow-lg">
                                            {pkg.discount}
                                        </span>
                                    )}
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

                                {/* Content Section - FLEX GROW TO FILL SPACE */}
                                <div className="relative p-7 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-bold text-[#0f88c0] bg-[#0f88c0]/10 px-4 py-1.5 rounded-full">{pkg.category}</span>
                                        <span className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {pkg.duration}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#0A192F] group-hover:text-[#0f88c0] transition-colors duration-300 line-clamp-2 min-h-12 mb-3">{pkg.title}</h3>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                            <span className="text-base font-bold text-[#0A192F]">{pkg.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({pkg.reviews} reviews)</span>
                                    </div>

                                    <div className="mb-6 flex-1">
                                        <p className="text-sm text-gray-500 mb-3 font-semibold">What's included:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {pkg.inclusions.slice(0, 3).map((item, i) => (
                                                <span key={i} className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">{item}</span>
                                            ))}
                                            {pkg.inclusions.length > 3 && (
                                                <span className="text-sm text-[#0f88c0] bg-[#0f88c0]/10 px-3 py-1.5 rounded-lg font-semibold">+{pkg.inclusions.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* BUTTON - ALWAYS AT BOTTOM */}
                                    <button
                                        onClick={() => openModal(pkg)}
                                        className="w-full mt-auto py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-base rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group/btn"
                                    >
                                        <span>View Information</span>
                                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#0f88c0] via-sky-400 to-[#0f88c0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== MODAL - PACKAGE INFORMATION ===== */}
            {isModalOpen && selectedPackage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={closeModal}>
                    <div
                        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative h-56 shrink-0">
                            <Image src={selectedPackage.image} alt={selectedPackage.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                            <button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <div className="absolute bottom-6 left-6">
                                <h2 className="text-3xl font-black text-white">{selectedPackage.title}</h2>
                                <p className="text-white/90 font-medium">{selectedPackage.destination} • {selectedPackage.duration}</p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 space-y-8">
                            {/* Price & Booking CTA */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 bg-sky-50 rounded-2xl border border-sky-100">
                                <div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl font-black text-[#0A192F]">${selectedPackage.price}</span>
                                        <span className="text-lg text-gray-400 line-through">${selectedPackage.originalPrice}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Per person • All taxes included</p>
                                </div>
                                <button className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                                    Book Now
                                </button>
                            </div>

                            {/* Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#0f88c0] rounded-full"></span> Flight Details
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{selectedPackage.details.flight}</p>
                                </div>
                                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#0f88c0] rounded-full"></span> Accommodation
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{selectedPackage.details.hotel}</p>
                                </div>
                            </div>

                            {/* Itinerary */}
                            <div>
                                <h3 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#0f88c0] rounded-full"></span> Day-by-Day Itinerary
                                </h3>
                                <div className="space-y-3">
                                    {selectedPackage.details.itinerary.map((day, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <span className="shrink-0 w-8 h-8 rounded-full bg-[#0f88c0]/10 text-[#0f88c0] font-bold flex items-center justify-center text-sm">{i + 1}</span>
                                            <p className="text-gray-700 pt-1">{day}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inclusions & Price Breakdown */}
                            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                                <div>
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-3">What's Included</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPackage.inclusions.map((item, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-100">✓ {item}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-3">Price Breakdown</h3>
                                    <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm leading-relaxed">{selectedPackage.details.priceBreakdown}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CTA SECTION ===== */}
            <section className="relative py-24 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">✈️</span>
                        <span className="text-base font-bold text-[#0f88c0]">Ready to Book?</span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Start Your Journey <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Today</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Let our travel experts customize a package just for you. Get exclusive deals and personalized support.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-full shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer transition-all duration-300">
                            Contact Experts
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                        <Link href="/destinations" className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                            Browse Destinations
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}