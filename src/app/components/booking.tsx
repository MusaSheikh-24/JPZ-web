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

export default function BookingSection() {
    const { ref, isInView } = useInView();
    const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
    const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages'>('flights');
    const [isSwapAnimating, setIsSwapAnimating] = useState(false);

    const handleSwap = () => {
        setIsSwapAnimating(true);
        setTimeout(() => setIsSwapAnimating(false), 300);
    };

    return (
        <section ref={ref} className="relative py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-linear-to-b from-sky-100 via-white to-white"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-800px h-400px bg-linear-to-b from-[#0f88c0]/5 to-transparent rounded-full blur-3xl"></div>

            <div className="relative max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-sky-100/50 border border-gray-100/50">
                        <span className="text-xl">✈️</span>
                        <span className="text-base font-bold text-[#0f88c0]">Flight Search</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Search <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Flights</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-sky-400 rounded-full"></span>
                        </span> with Ease
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Compare 500+ airlines and find the cheapest flights to your dream destination.
                    </p>
                </div>

                {/* Main Booking Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100/50">

                    {/* Top Gradient Border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-transparent"></div>

                    {/* Card Content */}
                    <div className="p-8 lg:p-10">

                        {/* Service Tabs */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="inline-flex items-center bg-gray-50/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200/50">
                                {[
                                    { id: 'flights', label: 'Flights', icon: '✈️' },
                                    { id: 'hotels', label: 'Hotels', icon: '🏨' },
                                    { id: 'packages', label: 'Packages', icon: '🎁' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${activeTab === tab.id
                                            ? 'bg-white text-[#0A192F] shadow-md ring-2 ring-[#0f88c0]/20'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                                            }`}
                                    >
                                        <span>{tab.icon}</span> {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trip Type */}
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="trip"
                                    checked={tripType === 'roundtrip'}
                                    onChange={() => setTripType('roundtrip')}
                                    className="w-5 h-5 text-[#0f88c0] focus:ring-[#0f88c0]"
                                />
                                <span className={`text-sm font-semibold transition-colors ${tripType === 'roundtrip' ? 'text-[#0A192F]' : 'text-gray-400'}`}>
                                    Round Trip
                                </span>
                            </label>
                            <div className="w-px h-5 bg-gray-200"></div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="trip"
                                    checked={tripType === 'oneway'}
                                    onChange={() => setTripType('oneway')}
                                    className="w-5 h-5 text-[#0f88c0] focus:ring-[#0f88c0]"
                                />
                                <span className={`text-sm font-semibold transition-colors ${tripType === 'oneway' ? 'text-[#0A192F]' : 'text-gray-400'}`}>
                                    One Way
                                </span>
                            </label>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">

                            {/* From Field */}
                            <div className="md:col-span-3 group">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Departing From
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-sky-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        className="w-full h-14 pl-16 pr-4 rounded-2xl bg-gray-50/80 border-2 border-gray-100 text-[#0A192F] placeholder-gray-300 focus:outline-none focus:border-[#0f88c0] focus:bg-white focus:shadow-lg focus:shadow-sky-100/30 transition-all font-medium placeholder:text-sm"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                                        JFK
                                    </div>
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="md:col-span-1 flex items-center justify-center">
                                <button
                                    onClick={handleSwap}
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0f88c0] to-sky-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-sky-300/40 transition-all duration-300 hover:scale-110 cursor-pointer ${isSwapAnimating ? 'rotate-180' : ''}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </button>
                            </div>

                            {/* To Field */}
                            <div className="md:col-span-3 group">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Arriving At
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-sky-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Destination"
                                        className="w-full h-14 pl-16 pr-4 rounded-2xl bg-gray-50/80 border-2 border-gray-100 text-[#0A192F] placeholder-gray-300 focus:outline-none focus:border-[#0f88c0] focus:bg-white focus:shadow-lg focus:shadow-sky-100/30 transition-all font-medium placeholder:text-sm"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
                                        DXB
                                    </div>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Departure
                                </label>
                                <input
                                    type="date"
                                    className="w-full h-14 px-4 rounded-2xl bg-gray-50/80 border-2 border-gray-100 text-[#0A192F] focus:outline-none focus:border-[#0f88c0] focus:bg-white focus:shadow-lg focus:shadow-sky-100/30 transition-all font-medium cursor-pointer text-sm"
                                />
                            </div>

                            {tripType === 'roundtrip' && (
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                        Return
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full h-14 px-4 rounded-2xl bg-gray-50/80 border-2 border-gray-100 text-[#0A192F] focus:outline-none focus:border-[#0f88c0] focus:bg-white focus:shadow-lg focus:shadow-sky-100/30 transition-all font-medium cursor-pointer text-sm"
                                    />
                                </div>
                            )}

                            {/* Search Button */}
                            <div className={tripType === 'oneway' ? 'md:col-span-4' : 'md:col-span-1'}>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1 opacity-0">
                                    Search
                                </label>
                                <button className="w-full h-14 rounded-full bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-base shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Options Row */}
                        <div className="flex flex-wrap items-center justify-between gap-6 mt-8 pt-8 border-t border-gray-100/80">

                            {/* Travelers & Class */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <select className="bg-transparent text-sm font-bold text-[#0A192F] focus:outline-none cursor-pointer">
                                            <option>1 Adult</option>
                                            <option>2 Adults</option>
                                            <option>3 Adults</option>
                                            <option>4 Adults</option>
                                        </select>
                                        <p className="text-xs text-gray-400">Travelers</p>
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-gray-200"></div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <select className="bg-transparent text-sm font-bold text-[#0A192F] focus:outline-none cursor-pointer">
                                            <option>Economy</option>
                                            <option>Premium Economy</option>
                                            <option>Business</option>
                                            <option>First Class</option>
                                        </select>
                                        <p className="text-xs text-gray-400">Class</p>
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Link */}
                            <a href="#" className="group flex items-center gap-2 text-sm font-bold text-[#0f88c0] hover:text-sky-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                Advanced Search
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>

                    </div>

                    {/* Bottom Accent */}
                    <div className="h-1 bg-linear-to-r from-[#0f88c0] via-sky-400 to-[#0f88c0]"></div>
                </div>

                {/* Trust Badges */}
                <div className="mt-10 flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {[
                        { icon: '🔒', label: 'SSL Encrypted' },
                        { icon: '💰', label: 'Best Price Guarantee' },
                        { icon: '🎧', label: '24/7 Support' },
                        { icon: '⭐', label: '4.9/5 Rating' },
                        { icon: '✅', label: 'Free Cancellation' },
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-gray-500 hover:text-[#0f88c0] transition-colors cursor-default">
                            <span className="text-lg">{badge.icon}</span>
                            <span className="text-sm font-semibold">{badge.label}</span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}