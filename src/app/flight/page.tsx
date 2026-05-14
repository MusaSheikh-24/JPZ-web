'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Flight type interface
interface Flight {
    id: number;
    airline: string;
    flightNumber: string;
    from: string;
    to: string;
    departTime: string;
    arriveTime: string;
    duration: string;
    stops: string;
    price: number;
    originalPrice: number;
    aircraft: string;
    amenities: string[];
    seatsAvailable: number;
}

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

export default function FlightPage() {
    const resultsRef = useInView();

    // Filter states
    const [selectedStops, setSelectedStops] = useState<string[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
    const [sortBy, setSortBy] = useState('recommended');

    const flights: Flight[] = [
        {
            id: 1,
            airline: 'Emirates',
            flightNumber: 'EK001',
            from: 'DXB',
            to: 'LHR',
            departTime: '08:30',
            arriveTime: '13:00',
            duration: '7h 30m',
            stops: 'Non-stop',
            price: 899,
            originalPrice: 1299,
            aircraft: 'Boeing 777-300ER',
            amenities: ['WiFi', 'Meals', 'Entertainment', 'Power'],
            seatsAvailable: 5
        },
        {
            id: 2,
            airline: 'British Airways',
            flightNumber: 'BA106',
            from: 'DXB',
            to: 'LHR',
            departTime: '14:15',
            arriveTime: '18:45',
            duration: '7h 30m',
            stops: 'Non-stop',
            price: 749,
            originalPrice: 999,
            aircraft: 'Airbus A380',
            amenities: ['WiFi', 'Meals', 'Entertainment'],
            seatsAvailable: 12
        },
        {
            id: 3,
            airline: 'Qatar Airways',
            flightNumber: 'QR003',
            from: 'DXB',
            to: 'LHR',
            departTime: '02:45',
            arriveTime: '09:30',
            duration: '9h 45m',
            stops: '1 Stop (DOH)',
            price: 649,
            originalPrice: 899,
            aircraft: 'Boeing 787-9',
            amenities: ['WiFi', 'Meals', 'Entertainment', 'Power'],
            seatsAvailable: 8
        },
        {
            id: 4,
            airline: 'Etihad Airways',
            flightNumber: 'EY011',
            from: 'DXB',
            to: 'LHR',
            departTime: '19:30',
            arriveTime: '00:15',
            duration: '7h 45m',
            stops: 'Non-stop',
            price: 799,
            originalPrice: 1099,
            aircraft: 'Boeing 787-10',
            amenities: ['WiFi', 'Meals', 'Entertainment'],
            seatsAvailable: 3
        }
    ];

    const airlines = ['Emirates', 'British Airways', 'Qatar Airways', 'Etihad Airways'];
    const stopsFilter = ['Non-stop', '1 Stop', '2+ Stops'];

    // Filter and sort flights
    const filteredFlights = flights.filter(flight => {
        // Filter by stops
        if (selectedStops.length > 0) {
            const flightStopType = flight.stops === 'Non-stop' ? 'Non-stop' :
                flight.stops.includes('1 Stop') ? '1 Stop' : '2+ Stops';
            if (!selectedStops.includes(flightStopType)) return false;
        }

        // Filter by airlines
        if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
            return false;
        }

        // Filter by price range
        if (flight.price < priceRange[0] || flight.price > priceRange[1]) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'duration':
                return parseInt(a.duration) - parseInt(b.duration);
            case 'departure':
                return a.departTime.localeCompare(b.departTime);
            default:
                return 0;
        }
    });

    // Toggle stop filter
    const toggleStop = (stop: string) => {
        setSelectedStops(prev =>
            prev.includes(stop) ? prev.filter(s => s !== stop) : [...prev, stop]
        );
    };

    // Toggle airline filter
    const toggleAirline = (airline: string) => {
        setSelectedAirlines(prev =>
            prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedStops([]);
        setSelectedAirlines([]);
        setPriceRange([0, 2000]);
    };

    return (
        <div className="w-full bg-white text-gray-700">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                        alt="Flights"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#0A192F]/85"></div>
                </div>

                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse"></div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 cursor-pointer hover:bg-white/20 transition-all duration-300">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-bold text-white">Explore Flight Options</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Discover Your Perfect
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                            Flight
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Explore flight information from leading airlines. Compare schedules, routes, and amenities
                        to plan your ideal journey with confidence.
                    </p>
                </div>
            </section>



            {/* ===== FLIGHT RESULTS ===== */}
            <section ref={resultsRef.ref} className="relative py-20 bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar - STICKY */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24 z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#0A192F]">Filters</h3>
                                    {(selectedStops.length > 0 || selectedAirlines.length > 0) && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-[#0f88c0] font-semibold hover:underline cursor-pointer"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                {/* Stops Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Stops</h4>
                                    <div className="space-y-2">
                                        {stopsFilter.map((stop) => (
                                            <label key={stop} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStops.includes(stop)}
                                                    onChange={() => toggleStop(stop)}
                                                    className="w-5 h-5 rounded border-gray-300 text-[#0f88c0] focus:ring-[#0f88c0] cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-[#0f88c0] transition-colors">{stop}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Airlines Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Airlines</h4>
                                    <div className="space-y-2">
                                        {airlines.map((airline) => (
                                            <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAirlines.includes(airline)}
                                                    onChange={() => toggleAirline(airline)}
                                                    className="w-5 h-5 rounded border-gray-300 text-[#0f88c0] focus:ring-[#0f88c0] cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-[#0f88c0] transition-colors">{airline}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Price Range</h4>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0f88c0]"
                                        />
                                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                                            <span>$0</span>
                                            <span>${priceRange[1]}+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Filters Count */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        {selectedStops.length + selectedAirlines.length} filter(s) active
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Flight Results */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[#0A192F]">
                                    {filteredFlights.length} Flight{filteredFlights.length !== 1 ? 's' : ''} Found
                                </h2>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#0f88c0] cursor-pointer"
                                >
                                    <option value="recommended">Sort by: Recommended</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="duration">Duration: Shortest</option>
                                    <option value="departure">Departure Time</option>
                                </select>
                            </div>

                            {filteredFlights.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                    <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">No flights found</h3>
                                    <p className="text-gray-500 mb-4">Try adjusting your filters to see more results</p>
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 text-white font-semibold rounded-xl cursor-pointer hover:shadow-lg transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                filteredFlights.map((flight, index) => (
                                    <div
                                        key={flight.id}
                                        className={`group bg-white rounded-2xl border-2 border-gray-100 hover:border-[#0f88c0]/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${resultsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="p-6">
                                            {/* Airline & Price Header */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0f88c0]/10 to-sky-100 flex items-center justify-center">
                                                        <svg className="w-7 h-7 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-[#0A192F]">{flight.airline}</h3>
                                                        <p className="text-sm text-gray-500">{flight.flightNumber} • {flight.aircraft}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-3xl font-black text-[#0A192F]">${flight.price}</span>
                                                        <span className="text-sm text-gray-400 line-through">${flight.originalPrice}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">per person</p>
                                                </div>
                                            </div>

                                            {/* Flight Route */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="text-center">
                                                    <p className="text-3xl font-black text-[#0A192F] mb-1">{flight.departTime}</p>
                                                    <p className="text-sm font-bold text-gray-600">{flight.from}</p>
                                                </div>

                                                <div className="flex-1 px-8">
                                                    <div className="relative">
                                                        <div className="h-0.5 bg-gray-300 w-full"></div>
                                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3">
                                                            <div className="text-center">
                                                                <p className="text-xs font-bold text-[#0f88c0]">{flight.duration}</p>
                                                                <p className="text-xs text-gray-500">{flight.stops}</p>
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-gray-400 rounded-full"></div>
                                                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 bg-[#0f88c0] rounded-full"></div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <p className="text-3xl font-black text-[#0A192F] mb-1">{flight.arriveTime}</p>
                                                    <p className="text-sm font-bold text-gray-600">{flight.to}</p>
                                                </div>
                                            </div>

                                            {/* Amenities & Seats */}
                                            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    {flight.amenities.map((amenity) => (
                                                        <div key={amenity} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                                                            <svg className="w-4 h-4 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-gray-600">{amenity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-bold ${flight.seatsAvailable <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                                                        {flight.seatsAvailable} seats left
                                                    </span>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>



            {/* ===== FEATURES SECTION ===== */}
            <section className="relative py-20 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Our Commitment to <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Excellence</span>
                        </h2>
                        <p className="text-gray-400">Providing comprehensive flight information worldwide</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '📊', title: 'Comprehensive Data', desc: 'Detailed flight information' },
                            { icon: '🔍', title: 'Easy Filtering', desc: 'Find flights that match your needs' },
                            { icon: '⏰', title: 'Real-time Updates', desc: 'Current schedules and availability' },
                            { icon: '🌍', title: 'Global Coverage', desc: 'Flights from around the world' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#0f88c0]/50 transition-all duration-300 hover:-translate-y-1 text-center">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}