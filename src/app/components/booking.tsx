'use client';
import Link from 'next/link';

const popularDestinations = [
    { city: 'Dubai', code: 'DXB', price: '$899', originalPrice: '$1,299', discount: '30% OFF', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', duration: '7h 30m', airline: 'Emirates' },
    { city: 'London', code: 'LHR', price: '$749', originalPrice: '$999', discount: '25% OFF', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', duration: '7h 30m', airline: 'British Airways' },
    { city: 'Paris', code: 'CDG', price: '$649', originalPrice: '$899', discount: '28% OFF', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop', duration: '8h 15m', airline: 'Air France' },
    { city: 'Tokyo', code: 'NRT', price: '$1,099', originalPrice: '$1,499', discount: '27% OFF', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', duration: '14h 20m', airline: 'Japan Airlines' },
];

export default function FlightDealsSection() {
    return (
        <section className="relative py-24 overflow-hidden bg-linear-to-b from-white via-sky-50 to-white">
            {/* Background Elements - Same Style */}
            <div className="absolute top-0 right-0 w-150 h-100 bg-[#0f88c0]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-100 h-75 bg-sky-300/10 rounded-full blur-[100px]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Same Style as Destinations */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <span className="text-xl">✈️</span>
                        <span className="text-base font-bold text-[#0f88c0]">Live Flight Deals</span>
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Exclusive <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Flight</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                        </span> Deals
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Limited-time offers on top destinations. Book now and save big on your next adventure.
                    </p>
                </div>

                {/* Flight Deals Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {popularDestinations.map((deal, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={deal.image}
                                    alt={deal.city}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                                {/* Discount Badge */}
                                <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                    {deal.discount}
                                </div>

                                {/* Airline */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                        <span className="text-lg">✈️</span>
                                    </div>
                                    <span className="text-white text-sm font-semibold">{deal.airline}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0A192F]">{deal.city}</h3>
                                        <p className="text-sm text-gray-500">{deal.code}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-[#0f88c0]">{deal.price}</p>
                                        <p className="text-xs text-gray-400 line-through">{deal.originalPrice}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {deal.duration}
                                    </span>
                                    <span className="text-green-600 font-semibold">Free Cancellation</span>
                                </div>

                                <Link
                                    href="/search"
                                    className="w-full h-12 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Book Flight
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main CTA Button */}
                <div className="text-center">
                    <Link
                        href="/flight"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold text-lg rounded-2xl shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-400/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        View All Flights
                    </Link>
                    <p className="mt-4 text-sm text-gray-500">
                        ✨ No hidden fees • Best price guarantee • 24/7 support
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {[
                        { icon: '🔒', label: 'Secure Booking', desc: '256-bit SSL' },
                        { icon: '💰', label: 'Best Price', desc: 'Price Match' },
                        { icon: '🎧', label: '24/7 Support', desc: 'Always Here' },
                        { icon: '⭐', label: '4.9/5 Rating', desc: '2M+ Reviews' },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl">
                                {badge.icon}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-[#0A192F]">{badge.label}</p>
                                <p className="text-xs text-gray-500">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}