// app/hotels/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface Hotel {
    id: number;
    name: string;
    city: 'Makkah' | 'Madinah';
    stars: number;
    distance: string;
    image: string;
    description: string;
    amenities: string[];
    price: number;
}

const hotels: Hotel[] = [
    {
        id: 1,
        name: 'Swissotel Makkah',
        city: 'Makkah',
        stars: 5,
        distance: '50m from Haram',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        description: 'Luxury hotel with direct Haram view, premium suites, and world-class amenities. Perfect for pilgrims seeking comfort and proximity to Masjid al-Haram.',
        amenities: ['Haram View Rooms', 'Free WiFi', 'Restaurant & Buffet', 'Spa & Wellness', '24/7 Room Service', 'Prayer Area', 'Concierge'],
        price: 185000
    },
    {
        id: 2,
        name: 'Fairmont Clock Tower',
        city: 'Makkah',
        stars: 5,
        distance: '100m from Haram',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
        description: 'Iconic clock tower hotel offering breathtaking views and unparalleled luxury. Experience the finest hospitality in the heart of Makkah.',
        amenities: ['Clock Tower View', 'Business Center', 'Fitness Center', 'Valet Parking', 'Multiple Restaurants', 'Luxury Spa'],
        price: 225000
    },
    {
        id: 3,
        name: 'Pullman Zamzam Madinah',
        city: 'Madinah',
        stars: 5,
        distance: '200m from Masjid Nabawi',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
        description: 'Premium hotel steps away from Prophet\'s Mosque with exceptional service and modern facilities for a peaceful spiritual retreat.',
        amenities: ['Nabawi View', 'Free Breakfast', 'High-Speed WiFi', 'Shuttle Service', 'Family Rooms', 'Cafe & Restaurant'],
        price: 145000
    },
    {
        id: 4,
        name: 'Anwar Al Madinah',
        city: 'Madinah',
        stars: 5,
        distance: '150m from Nabawi',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
        description: 'Elegant accommodation with modern facilities near the Holy Mosque. Ideal for families and groups seeking comfort and convenience.',
        amenities: ['Mosque View', 'Fine Dining', '24/7 Room Service', 'Laundry Service', 'Airport Transfer', 'Free WiFi'],
        price: 125000
    },
    {
        id: 5,
        name: 'Hilton Convention',
        city: 'Makkah',
        stars: 4,
        distance: '300m from Haram',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        description: 'Comfortable stay with excellent connectivity to Masjid al-Haram. Great value for money with quality service and amenities.',
        amenities: ['Conference Facilities', 'Dining Options', 'Free WiFi', 'Parking Available', 'Travel Desk', 'AC Rooms'],
        price: 95000
    },
    {
        id: 6,
        name: 'Dar Al Taqwa',
        city: 'Madinah',
        stars: 4,
        distance: '400m from Nabawi',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        description: 'Value-for-money hotel with clean rooms and friendly staff. Perfect for budget-conscious pilgrims without compromising on comfort.',
        amenities: ['Budget Friendly', 'Complimentary Breakfast', 'WiFi', '24/7 Reception', 'Prayer Mats Provided', 'Elevator'],
        price: 75000
    }
];

const formatPKR = (amount: number) => `PKR ${amount.toLocaleString('en-PK')}`;

export default function HotelsPage() {
    const [activeCity, setActiveCity] = useState('All');

    const filteredHotels = activeCity === 'All'
        ? hotels
        : hotels.filter(hotel => hotel.city === activeCity);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="bg-[#0A192F] py-16 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Our Partner <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Hotels</span>
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
                    Handpicked 5-star & 4-star hotels near Haram in Makkah & Masjid Nabawi in Madinah for your comfortable stay.
                </p>
            </section>

            {/* ===== FILTER TABS ===== */}
            <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="flex justify-center gap-3">
                        {['All', 'Makkah', 'Madinah'].map((city) => (
                            <button
                                key={city}
                                onClick={() => setActiveCity(city)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${activeCity === city
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {city === 'All' ? 'All Hotels' : city}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOTELS LIST ===== */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="space-y-12">
                    {filteredHotels.map((hotel) => (
                        <div key={hotel.id} className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Image */}
                            <div className="relative h-80 rounded-2xl overflow-hidden">
                                <Image
                                    src={hotel.image}
                                    alt={hotel.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-4 py-2 bg-[#0f88c0] text-white text-sm font-bold rounded-xl">
                                        {'★'.repeat(hotel.stars)}
                                    </span>
                                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-[#0A192F] text-sm font-bold rounded-xl">
                                        {hotel.city}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] mb-2">
                                        {hotel.name}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {hotel.distance}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    {hotel.description}
                                </p>

                                <div>
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-3">Amenities & Facilities:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.map((amenity, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 font-bold mb-1">Starting From</p>
                                            <p className="text-3xl font-black text-[#0A192F]">
                                                {formatPKR(hotel.price)}
                                            </p>
                                            <p className="text-xs text-gray-500">per person</p>
                                        </div>
                                        {/* <Link
                                            href="/contact"
                                            className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
                                        >
                                            Book This Hotel
                                        </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="bg-gray-50 py-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] mb-3">
                        Need Custom Hotel <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Booking?</span>
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        We offer group bookings, extended stays, and special rates for families. Contact our hotel specialists.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Contact for Rates
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}