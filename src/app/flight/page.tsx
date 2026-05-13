'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Flight type interface define करें
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
    const [searchParams, setSearchParams] = useState({
        from: 'Dubai',
        to: 'London',
        departDate: '2024-06-15',
        returnDate: '2024-06-22',
        passengers: 1,
        class: 'Economy'
    });
    const [tripType, setTripType] = useState('round');
    // यहाँ type fix किया - Flight | null
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [showBooking, setShowBooking] = useState(false);

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
                        <span className="text-sm font-bold text-white">Book Your Flight Now</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                        Find Your Perfect
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-r from-[#0f88c0] via-sky-400 to-cyan-300 bg-clip-text text-transparent">
                            Flight
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Compare prices from 500+ airlines and find the best deals for your journey.
                        Book with confidence and travel with comfort.
                    </p>
                </div>
            </section>

            {/* ===== FLIGHT SEARCH FORM ===== */}
            <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-6 md:p-8 border border-gray-100">
                    {/* Trip Type */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setTripType('round')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${tripType === 'round'
                                ? 'bg-linear-to-r from-[#0f88c0] to-sky-500 text-white shadow-lg shadow-sky-500/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Round Trip
                        </button>
                        <button
                            onClick={() => setTripType('one')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${tripType === 'one'
                                ? 'bg-linear-to-r from-[#0f88c0] to-sky-500 text-white shadow-lg shadow-sky-500/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            One Way
                        </button>
                        <button
                            onClick={() => setTripType('multi')}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${tripType === 'multi'
                                ? 'bg-linear-to-r from-[#0f88c0] to-sky-500 text-white shadow-lg shadow-sky-500/30'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Multi-City
                        </button>
                    </div>

                    {/* Search Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">From</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchParams.from}
                                    onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                                    className="w-full h-14 px-4 pl-12 rounded-xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] font-semibold focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all"
                                    placeholder="Departure"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">To</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchParams.to}
                                    onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                                    className="w-full h-14 px-4 pl-12 rounded-xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] font-semibold focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all"
                                    placeholder="Destination"
                                />
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Departure</label>
                            <input
                                type="date"
                                value={searchParams.departDate}
                                onChange={(e) => setSearchParams({ ...searchParams, departDate: e.target.value })}
                                className="w-full h-14 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] font-semibold focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Passengers</label>
                            <select
                                value={searchParams.passengers}
                                onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
                                className="w-full h-14 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] font-semibold focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all cursor-pointer"
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button className="w-full h-14 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-xl shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        Search Flights
                    </button>
                </div>
            </section>

            {/* ===== FLIGHT RESULTS ===== */}
            <section ref={resultsRef.ref} className="relative py-20 overflow-hidden bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-[#0A192F] mb-6">Filters</h3>

                                {/* Stops Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Stops</h4>
                                    <div className="space-y-2">
                                        {stopsFilter.map((stop) => (
                                            <label key={stop} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#0f88c0] focus:ring-[#0f88c0] cursor-pointer" />
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
                                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#0f88c0] focus:ring-[#0f88c0] cursor-pointer" />
                                                <span className="text-sm text-gray-600 group-hover:text-[#0f88c0] transition-colors">{airline}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-700 mb-3">Price Range</h4>
                                    <div className="px-2">
                                        <input type="range" min="0" max="2000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0f88c0]" />
                                        <div className="flex justify-between mt-2 text-sm text-gray-600">
                                            <span>$0</span>
                                            <span>$2000+</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flight Results */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[#0A192F]">
                                    {flights.length} Flights Found
                                </h2>
                                <select className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#0f88c0] cursor-pointer">
                                    <option>Sort by: Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Duration: Shortest</option>
                                    <option>Departure Time</option>
                                </select>
                            </div>

                            {flights.map((flight, index) => (
                                <div
                                    key={flight.id}
                                    className={`group bg-white rounded-2xl border-2 border-gray-100 hover:border-[#0f88c0]/40 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer ${resultsRef.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                    onClick={() => { setSelectedFlight(flight); setShowBooking(true); }}
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

                                    {/* Book Button */}
                                    <div className="px-6 pb-6">
                                        <button className="w-full h-12 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                                            Select Flight
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BOOKING MODAL ===== */}
            {showBooking && selectedFlight && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-black text-[#0A192F]">Confirm Booking</h2>
                                <button
                                    onClick={() => setShowBooking(false)}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Flight Summary */}
                            <div className="bg-linear-to-br from-[#0f88c0]/5 to-sky-100/50 rounded-2xl p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-lg font-bold text-[#0A192F]">{selectedFlight.airline}</p>
                                        <p className="text-sm text-gray-600">{selectedFlight.flightNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-black text-[#0f88c0]">${selectedFlight.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#0A192F]">{selectedFlight.departTime}</p>
                                        <p className="text-sm text-gray-600">{selectedFlight.from}</p>
                                    </div>
                                    <div className="flex-1 px-4">
                                        <div className="h-0.5 bg-gray-300 w-full"></div>
                                        <p className="text-center text-xs text-gray-500 mt-1">{selectedFlight.duration}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#0A192F]">{selectedFlight.arriveTime}</p>
                                        <p className="text-sm text-gray-600">{selectedFlight.to}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Form */}
                            <div className="space-y-4 mb-6">
                                <h3 className="text-lg font-bold text-[#0A192F] mb-4">Passenger Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-[#0f88c0] transition-all" />
                                    <input type="text" placeholder="Last Name" className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-[#0f88c0] transition-all" />
                                    <input type="email" placeholder="Email" className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-[#0f88c0] transition-all" />
                                    <input type="tel" placeholder="Phone" className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:outline-none focus:border-[#0f88c0] transition-all" />
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Base Fare</span>
                                        <span className="font-semibold text-[#0A192F]">${selectedFlight.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Taxes & Fees</span>
                                        <span className="font-semibold text-[#0A192F]">$89</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                                        <span className="font-bold text-[#0A192F]">Total</span>
                                        <span className="text-2xl font-black text-[#0f88c0]">${selectedFlight.price + 89}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Confirm Button */}
                            <button className="w-full h-14 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-lg rounded-xl shadow-xl shadow-sky-500/30 hover:shadow-2xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== FEATURES SECTION ===== */}
            <section className="relative py-20 bg-[#0A192F] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#112240_0%,#0A192F_70%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-[#0f88c0]/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            Why Book With <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Us</span>
                        </h2>
                        <p className="text-gray-400">Trusted by millions of travelers worldwide</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: '💰', title: 'Best Price', desc: 'Guaranteed lowest fares' },
                            { icon: '🔒', title: 'Secure Booking', desc: '100% safe payments' },
                            { icon: '🎯', title: 'No Hidden Fees', desc: 'Transparent pricing' },
                            { icon: '📞', title: '24/7 Support', desc: 'Always here to help' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#0f88c0]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center">
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