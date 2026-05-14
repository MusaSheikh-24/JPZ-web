'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// Mock data for ALL destinations
const destinationsData: Record<string, any> = {
    dubai: {
        name: 'Dubai',
        country: 'United Arab Emirates',
        code: 'DXB',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
        description: 'Where futuristic architecture meets Arabian heritage. Experience luxury shopping, ultramodern architecture, and a lively nightlife scene in this desert metropolis.',
        bestTime: 'October - February',
        temperature: '25°C - 35°C',
        currency: 'AED (Dirham)',
        language: 'Arabic, English',
        tags: ['Luxury', 'Desert', 'Modern', 'Shopping', 'Nightlife'],
        rating: 4.9,
        reviews: 2847,
        highlights: [
            { icon: '🏙️', title: 'Burj Khalifa', desc: 'World\'s tallest building with observation decks' },
            { icon: '🏝️', title: 'Palm Jumeirah', desc: 'Iconic palm-shaped artificial archipelago' },
            { icon: '🛍️', title: 'Dubai Mall', desc: 'Largest mall in the world with 1,200+ stores' },
            { icon: '🏜️', title: 'Desert Safari', desc: 'Dune bashing, camel rides & traditional dinner' },
        ],
        hotels: [
            {
                name: 'Burj Al Arab',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 1299,
                amenities: ['Pool', 'Spa', 'Beach', 'Fine Dining'],
                badge: 'Luxury'
            },
            {
                name: 'Atlantis The Palm',
                image: 'https://images.unsplash.com/photo-1520257165368-420f856c6f6b?q=80&w=600',
                rating: 5,
                price: 899,
                amenities: ['Waterpark', 'Aquarium', 'Pool', 'Kids Club'],
                badge: 'Family'
            },
            {
                name: 'Rove Downtown',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600',
                rating: 4,
                price: 199,
                amenities: ['WiFi', 'Gym', 'Restaurant', 'Parking'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Skydiving over Palm Jumeirah', price: '$499', duration: '3 hours', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400' },
            { name: 'Dhow Cruise Dinner', price: '$89', duration: '2 hours', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400' },
            { name: 'Hot Air Balloon Ride', price: '$299', duration: '4 hours', image: 'https://images.unsplash.com/photo-1464822759085-2f36642c55d4?w=400' },
            { name: 'Gold Souk Shopping Tour', price: '$49', duration: '2 hours', image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400' },
        ]
    },
    bali: {
        name: 'Bali',
        country: 'Indonesia',
        code: 'DPS',
        image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=1200&auto=format&fit=crop',
        description: 'Tropical paradise with ancient temples, lush rice terraces, and stunning beaches. A perfect blend of culture, nature, and relaxation.',
        bestTime: 'April - October',
        temperature: '24°C - 30°C',
        currency: 'IDR (Rupiah)',
        language: 'Indonesian, Balinese',
        tags: ['Beach', 'Culture', 'Nature', 'Temples', 'Wellness'],
        rating: 4.8,
        reviews: 3421,
        highlights: [
            { icon: '🛕', title: 'Uluwatu Temple', desc: 'Clifftop temple with stunning sunset views' },
            { icon: '🌾', title: 'Tegalalang Rice Terrace', desc: 'Iconic emerald green rice paddies' },
            { icon: '🏖️', title: 'Seminyak Beach', desc: 'Trendy beach with cafes and water sports' },
            { icon: '🧘', title: 'Ubud Wellness', desc: 'Yoga retreats and traditional spa treatments' },
        ],
        hotels: [
            {
                name: 'Four Seasons Resort',
                image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600',
                rating: 5,
                price: 799,
                amenities: ['Pool', 'Spa', 'Beach', 'Yoga'],
                badge: 'Luxury'
            },
            {
                name: 'The Kayon Jungle Resort',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 5,
                price: 449,
                amenities: ['Infinity Pool', 'Jungle View', 'Spa', 'Restaurant'],
                badge: 'Romantic'
            },
            {
                name: 'Capsule Pod Hostel',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 29,
                amenities: ['WiFi', 'Common Area', 'Kitchen', 'Lockers'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Mount Batur Sunrise Trek', price: '$45', duration: '6 hours', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400' },
            { name: 'Traditional Cooking Class', price: '$35', duration: '4 hours', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400' },
            { name: 'White Water Rafting', price: '$55', duration: '3 hours', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
            { name: 'Balinese Dance Performance', price: '$25', duration: '2 hours', image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400' },
        ]
    },
    paris: {
        name: 'Paris',
        country: 'France',
        code: 'CDG',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
        description: 'The City of Light enchants visitors with iconic landmarks, world-class museums, charming cafes, and timeless romance around every corner.',
        bestTime: 'March - June',
        temperature: '8°C - 25°C',
        currency: 'EUR (Euro)',
        language: 'French',
        tags: ['Romance', 'Art', 'History', 'Food', 'Fashion'],
        rating: 4.7,
        reviews: 4156,
        highlights: [
            { icon: '🗼', title: 'Eiffel Tower', desc: 'Iconic iron lattice tower with city views' },
            { icon: '🎨', title: 'Louvre Museum', desc: 'World\'s largest art museum' },
            { icon: '⛪', title: 'Notre-Dame', desc: 'Medieval Catholic cathedral' },
            { icon: '🛍️', title: 'Champs-Élysées', desc: 'Famous avenue for shopping' },
        ],
        hotels: [
            {
                name: 'The Ritz Paris',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 1499,
                amenities: ['Pool', 'Spa', 'Fine Dining', 'Concierge'],
                badge: 'Luxury'
            },
            {
                name: 'Hotel Le Marais',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 4,
                price: 349,
                amenities: ['WiFi', 'Bar', 'Restaurant', 'Central Location'],
                badge: 'Boutique'
            },
            {
                name: 'Generator Paris',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 89,
                amenities: ['WiFi', 'Bar', 'Common Area', 'Lockers'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Seine River Cruise', price: '$35', duration: '1.5 hours', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400' },
            { name: 'Wine Tasting Tour', price: '$75', duration: '2 hours', image: 'https://images.unsplash.com/photo-1516594915697-87eb88149525?w=400' },
            { name: 'Versailles Palace Tour', price: '$95', duration: '5 hours', image: 'https://images.unsplash.com/photo-1533052885453-2e87f3f87a54?w=400' },
            { name: 'French Cooking Class', price: '$120', duration: '3 hours', image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400' },
        ]
    },
    tokyo: {
        name: 'Tokyo',
        country: 'Japan',
        code: 'NRT',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
        description: 'Ancient traditions meet cutting-edge innovation in this vibrant metropolis. Experience world-class cuisine, historic temples, and neon-lit streets.',
        bestTime: 'March - May',
        temperature: '5°C - 30°C',
        currency: 'JPY (Yen)',
        language: 'Japanese',
        tags: ['Modern', 'Culture', 'Food', 'Technology', 'Shopping'],
        rating: 4.9,
        reviews: 2934,
        highlights: [
            { icon: '⛩️', title: 'Senso-ji Temple', desc: 'Tokyo\'s oldest Buddhist temple' },
            { icon: '🗾', title: 'Tokyo Skytree', desc: 'Broadcasting tower with observation decks' },
            { icon: '🎌', title: 'Meiji Shrine', desc: 'Shinto shrine in Shibuya' },
            { icon: '🐟', title: 'Tsukiji Market', desc: 'Famous fish market and food stalls' },
        ],
        hotels: [
            {
                name: 'Aman Tokyo',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 1199,
                amenities: ['Spa', 'Pool', 'Fine Dining', 'City View'],
                badge: 'Luxury'
            },
            {
                name: 'Shibuya Granbell',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 4,
                price: 299,
                amenities: ['WiFi', 'Bar', 'Restaurant', 'Modern Design'],
                badge: 'Trendy'
            },
            {
                name: 'Khaosan Tokyo',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 45,
                amenities: ['WiFi', 'Common Area', 'Kitchen', 'Lockers'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Tokyo Food Tour', price: '$89', duration: '3 hours', image: 'https://images.unsplash.com/photo-1553603227-2350a3528b7e?w=400' },
            { name: 'Sumo Wrestling Match', price: '$65', duration: '3 hours', image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?w=400' },
            { name: 'Day Trip to Mt. Fuji', price: '$120', duration: '10 hours', image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400' },
            { name: 'Robot Restaurant Show', price: '$55', duration: '1.5 hours', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400' },
        ]
    },
    'new-york': {
        name: 'New York',
        country: 'USA',
        code: 'JFK',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1200&auto=format&fit=crop',
        description: 'The city that never sleeps offers iconic landmarks, world-class dining, Broadway shows, and an energy like no other place on Earth.',
        bestTime: 'April - June',
        temperature: '0°C - 29°C',
        currency: 'USD (Dollar)',
        language: 'English',
        tags: ['Urban', 'Culture', 'Nightlife', 'Shopping', 'Food'],
        rating: 4.6,
        reviews: 3782,
        highlights: [
            { icon: '🗽', title: 'Statue of Liberty', desc: 'Iconic symbol of freedom' },
            { icon: '🏙️', title: 'Times Square', desc: 'Bustling entertainment hub' },
            { icon: '🌳', title: 'Central Park', desc: 'Urban oasis in Manhattan' },
            { icon: '🎭', title: 'Broadway Shows', desc: 'World-famous theater district' },
        ],
        hotels: [
            {
                name: 'The Plaza Hotel',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 899,
                amenities: ['Spa', 'Fine Dining', 'Concierge', 'Central Park View'],
                badge: 'Luxury'
            },
            {
                name: 'The Standard High Line',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 4,
                price: 399,
                amenities: ['Rooftop Bar', 'WiFi', 'Modern Design', 'City View'],
                badge: 'Trendy'
            },
            {
                name: 'Pod Hotels',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 129,
                amenities: ['WiFi', 'Rooftop', 'Modern', 'Central Location'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Empire State Building', price: '$44', duration: '2 hours', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
            { name: 'Statue of Liberty Tour', price: '$24', duration: '3 hours', image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=400' },
            { name: 'Broadway Show Tickets', price: '$150', duration: '3 hours', image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400' },
            { name: 'Food Tour', price: '$75', duration: '3 hours', image: 'https://images.unsplash.com/photo-1470338745628-171cf53de3a7?w=400' },
        ]
    },
    'cape-town': {
        name: 'Cape Town',
        country: 'South Africa',
        code: 'CPT',
        image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1200&auto=format&fit=crop',
        description: 'Where mountains meet the ocean. Experience stunning landscapes, rich history, world-class wines, and incredible wildlife.',
        bestTime: 'November - March',
        temperature: '12°C - 28°C',
        currency: 'ZAR (Rand)',
        language: 'English, Afrikaans',
        tags: ['Nature', 'Adventure', 'Wine', 'Wildlife', 'Beach'],
        rating: 4.8,
        reviews: 2156,
        highlights: [
            { icon: '⛰️', title: 'Table Mountain', desc: 'Iconic flat-topped mountain' },
            { icon: '🦴', title: 'Robben Island', desc: 'Historic prison museum' },
            { icon: '🍷', title: 'Cape Winelands', desc: 'World-class wine region' },
            { icon: '🐧', title: 'Boulders Beach', desc: 'Penguin colony beach' },
        ],
        hotels: [
            {
                name: 'Belmond Mount Nelson',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 599,
                amenities: ['Pool', 'Spa', 'Garden', 'Fine Dining'],
                badge: 'Luxury'
            },
            {
                name: 'The Silo Hotel',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 5,
                price: 799,
                amenities: ['Rooftop Pool', 'Art Gallery', 'Spa', 'Views'],
                badge: 'Luxury'
            },
            {
                name: 'Cape Town Lodge',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 149,
                amenities: ['WiFi', 'Pool', 'Parking', 'Breakfast'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Table Mountain Cable Car', price: '$25', duration: '3 hours', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400' },
            { name: 'Wine Tasting Tour', price: '$65', duration: '6 hours', image: 'https://images.unsplash.com/photo-1516594915697-87eb88149525?w=400' },
            { name: 'Shark Cage Diving', price: '$150', duration: '8 hours', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400' },
            { name: 'Penguin Beach Visit', price: '$15', duration: '2 hours', image: 'https://images.unsplash.com/photo-155189499-2996e95883b0?w=400' },
        ]
    },
    sydney: {
        name: 'Sydney',
        country: 'Australia',
        code: 'SYD',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
        description: 'Iconic harbor city with stunning beaches, world-famous Opera House, and a perfect blend of urban sophistication and coastal lifestyle.',
        bestTime: 'September - November',
        temperature: '8°C - 26°C',
        currency: 'AUD (Dollar)',
        language: 'English',
        tags: ['Beach', 'Urban', 'Nature', 'Harbor', 'Surfing'],
        rating: 4.7,
        reviews: 2891,
        highlights: [
            { icon: '🎭', title: 'Sydney Opera House', desc: 'Iconic performing arts center' },
            { icon: '🌉', title: 'Harbour Bridge', desc: 'Climb for panoramic views' },
            { icon: '🏖️', title: 'Bondi Beach', desc: 'World-famous surf beach' },
            { icon: '🦘', title: 'Taronga Zoo', desc: 'Native Australian wildlife' },
        ],
        hotels: [
            {
                name: 'Park Hyatt Sydney',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 899,
                amenities: ['Harbor View', 'Pool', 'Spa', 'Fine Dining'],
                badge: 'Luxury'
            },
            {
                name: 'QT Sydney',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 4,
                price: 349,
                amenities: ['Boutique', 'Bar', 'Restaurant', 'Central'],
                badge: 'Boutique'
            },
            {
                name: 'YHA Sydney Central',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 45,
                amenities: ['WiFi', 'Kitchen', 'Common Area', 'Lockers'],
                badge: 'Budget'
            },
        ],
        activities: [
            { name: 'Harbour Bridge Climb', price: '$180', duration: '3.5 hours', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400' },
            { name: 'Opera House Tour', price: '$43', duration: '1 hour', image: 'https://images.unsplash.com/photo-1624138784181-dc7f5b75e52e?w=400' },
            { name: 'Bondi to Coogee Walk', price: 'Free', duration: '2 hours', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
            { name: 'Blue Mountains Day Trip', price: '$95', duration: '10 hours', image: 'https://images.unsplash.com/photo-1518182170543-37269876a603?w=400' },
        ]
    },
    santorini: {
        name: 'Santorini',
        country: 'Greece',
        code: 'JTR',
        image: 'https://images.unsplash.com/photo-1687786071688-a92e6bdbefc5?q=80&w=1200&auto=format&fit=crop',
        description: 'Stunning sunsets, white-washed villages with blue domes, crystal-clear waters, and romantic atmosphere make this a dream destination.',
        bestTime: 'April - October',
        temperature: '10°C - 28°C',
        currency: 'EUR (Euro)',
        language: 'Greek',
        tags: ['Romance', 'Beach', 'Views', 'Sunset', 'Wine'],
        rating: 4.9,
        reviews: 3124,
        highlights: [
            { icon: '🌅', title: 'Oia Sunset', desc: 'World\'s most famous sunset' },
            { icon: '🏛️', title: 'Ancient Akrotiri', desc: 'Preserved Minoan city' },
            { icon: '🍷', title: 'Wine Tasting', desc: 'Unique volcanic wines' },
            { icon: '🏖️', title: 'Red Beach', desc: 'Stunning volcanic beach' },
        ],
        hotels: [
            {
                name: 'Canaves Oia Suites',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                rating: 5,
                price: 1299,
                amenities: ['Infinity Pool', 'Caldera View', 'Spa', 'Fine Dining'],
                badge: 'Luxury'
            },
            {
                name: 'Mystique Hotel',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600',
                rating: 5,
                price: 899,
                amenities: ['Cave Pool', 'Sunset View', 'Spa', 'Restaurant'],
                badge: 'Romantic'
            },
            {
                name: 'Aqua Luxury Suites',
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600',
                rating: 4,
                price: 299,
                amenities: ['Pool', 'WiFi', 'Breakfast', 'Sea View'],
                badge: 'Mid-Range'
            },
        ],
        activities: [
            { name: 'Sunset Cruise', price: '$89', duration: '5 hours', image: 'https://images.unsplash.com/photo-1687786071688-a92e6bdbefc5?w=400' },
            { name: 'Wine Tasting Tour', price: '$65', duration: '4 hours', image: 'https://images.unsplash.com/photo-1516594915697-87eb88149525?w=400' },
            { name: 'Catamaran Sailing', price: '$120', duration: '5 hours', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400' },
            { name: 'Ancient Ruins Tour', price: '$45', duration: '3 hours', image: 'https://images.unsplash.com/photo-1533052885453-2e87f3f87a54?w=400' },
        ]
    },
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

export default function DestinationDetailPage() {
    const params = useParams();
    const { ref, isInView } = useInView();

    const destinationSlug = params?.slug as string;
    const destination = destinationsData[destinationSlug];

    if (!destination) {
        notFound();
    }

    return (
        <div className="w-full bg-white text-gray-700">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[70vh] flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/95 via-[#0A192F]/60 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
                        <span>/</span>
                        <span className="text-white">{destination.name}</span>
                    </nav>

                    {/* Destination Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-[#0f88c0] text-white text-sm font-bold rounded-full">
                                    {destination.code}
                                </span>
                                <span className="text-white/80">{destination.country}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                                {destination.name}
                            </h1>
                            <p className="text-lg text-white/90 max-w-2xl mb-6">
                                {destination.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {destination.tags.map((tag: string, i: number) => (
                                    <span key={i} className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xl font-bold text-white">{destination.rating}</span>
                                </div>
                                <span className="text-white/70">({destination.reviews.toLocaleString()} reviews)</span>
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1">Best Time</p>
                                <p className="text-white font-bold">{destination.bestTime}</p>
                            </div>
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1">Temperature</p>
                                <p className="text-white font-bold">{destination.temperature}</p>
                            </div>
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1">Currency</p>
                                <p className="text-white font-bold">{destination.currency}</p>
                            </div>
                            <div className="px-5 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <p className="text-white/60 text-sm mb-1">Language</p>
                                <p className="text-white font-bold">{destination.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HIGHLIGHTS SECTION ===== */}
            <section ref={ref} className="py-20 bg-linear-to-b from-white via-sky-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Must-See <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Highlights</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience the best of {destination.name} with these iconic attractions
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {destination.highlights.map((highlight: any, index: number) => (
                            <div
                                key={index}
                                className={`group p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {highlight.icon}
                                </div>
                                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{highlight.title}</h3>
                                <p className="text-sm text-gray-600">{highlight.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== HOTELS SECTION - INFO ONLY ===== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-2">
                            Recommended <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Hotels</span>
                        </h2>
                        <p className="text-gray-600">Handpicked accommodations for every budget</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destination.hotels.map((hotel: any, index: number) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Hotel Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={hotel.image}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>

                                    {/* Badge */}
                                    {hotel.badge && (
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-[#0f88c0] text-white text-xs font-bold rounded-full">
                                            {hotel.badge}
                                        </span>
                                    )}

                                    {/* Rating */}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-lg">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-sm font-bold text-[#0A192F]">{hotel.rating}.0</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hotel Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#0A192F] mb-2">{hotel.name}</h3>

                                    {/* Amenities */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {hotel.amenities.map((amenity: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-black text-[#0f88c0]">${hotel.price}</span>
                                            <span className="text-sm text-gray-500">/night</span>
                                        </div>
                                        <button className="px-6 py-2 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-md">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ACTIVITIES SECTION ===== */}
            <section className="py-20 bg-linear-to-b from-sky-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Popular <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Activities</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Unforgettable experiences to make your trip memorable
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {destination.activities.map((activity: any, index: number) => (
                            <div
                                key={index}
                                className="group flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={activity.image}
                                        alt={activity.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="100px"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#0A192F] mb-1">{activity.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {activity.duration}
                                        </span>
                                        <span className="text-[#0f88c0] font-bold">{activity.price}</span>
                                    </div>
                                    <button className="w-full px-4 py-2 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-cyan-400 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-md">
                                        Book Activity
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY SECTION ===== */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Explore <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">{destination.name}</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover the beauty and culture through stunning visuals
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400',
                            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
                            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
                            'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400',
                            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
                            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
                            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400'
                        ].map((image, index) => (
                            <div
                                key={index}
                                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== REVIEWS SECTION ===== */}
            <section className="py-20 bg-linear-to-b from-sky-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">
                            Traveler <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Reviews</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real experiences from visitors who explored {destination.name}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Sarah Johnson',
                                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
                                rating: 5,
                                review: 'Absolutely incredible experience! The culture, food, and people made this trip unforgettable.',
                                date: '2 weeks ago'
                            },
                            {
                                name: 'Mike Chen',
                                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                                rating: 5,
                                review: 'Perfect destination for adventure seekers. Every activity was well-organized and amazing.',
                                date: '1 month ago'
                            },
                            {
                                name: 'Emma Davis',
                                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
                                rating: 4,
                                review: 'Beautiful place with rich history. The local guides were knowledgeable and friendly.',
                                date: '3 weeks ago'
                            }
                        ].map((review, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Image
                                        src={review.avatar}
                                        alt={review.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-bold text-[#0A192F]">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-white border-2 border-[#0f88c0] text-[#0f88c0] font-bold rounded-xl hover:bg-[#0f88c0] hover:text-white transition-all duration-300">
                            Read All Reviews
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== BACK TO DESTINATIONS BUTTON ===== */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-cyan-400 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Destinations
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        Explore more amazing destinations around the world
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}