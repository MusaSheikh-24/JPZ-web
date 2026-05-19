// app/ziyarat/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface ZiyaratSite {
    id: number;
    city: 'Makkah' | 'Madinah';
    name: string;
    description: string;
    significance: string;
    image: string;
    distance?: string;
}

const ziyaratSites: ZiyaratSite[] = [
    {
        id: 1,
        city: 'Makkah',
        name: 'Cave of Hira (Ghar-e-Hira)',
        description: 'The sacred cave where Prophet Muhammad (PBUH) received the first revelation of the Quran.',
        significance: 'Site of First Revelation',
        image: 'https://images.pexels.com/photos/17846450/pexels-photo-17846450.jpeg',
        distance: '5 km from Haram'
    },
    {
        id: 2,
        city: 'Makkah',
        name: 'Mount Arafat (Jabal al-Rahmah)',
        description: 'The plain where Prophet Muhammad (PBUH) delivered his farewell sermon. Essential for Hajj.',
        significance: 'Day of Arafat - Pillar of Hajj',
        image: 'https://images.pexels.com/photos/12765598/pexels-photo-12765598.jpeg?w=1200&q=80&auto=format&fit=crop',
        distance: '22 km from Makkah'
    },
    {
        id: 3,
        city: 'Makkah',
        name: 'Mina',
        description: 'The valley where pilgrims stay during Hajj and perform Rami al-Jamarat (stoning of Satan).',
        significance: 'Tent City & Jamarat',
        image: 'https://images.pexels.com/photos/8865389/pexels-photo-8865389.jpeg?w=1200&q=80&auto=format&fit=crop',
        distance: '8 km from Haram'
    },
    {
        id: 4,
        city: 'Makkah',
        name: 'Jannat al-Mu\'alla',
        description: 'Ancient cemetery where many companions and relatives of the Prophet (PBUH) are buried.',
        significance: 'Historic Cemetery',
        image: '/jannatul-mualla-old.jpg',
        distance: 'Near Haram'
    },
    {
        id: 5,
        city: 'Madinah',
        name: 'Masjid Quba',
        description: 'The first mosque built in Islam. Praying here equals the reward of one Umrah.',
        significance: 'First Mosque in Islam',
        image: 'https://images.pexels.com/photos/30651382/pexels-photo-30651382.jpeg',
        distance: '5 km from Nabawi'
    },
    {
        id: 6,
        city: 'Madinah',
        name: 'Mount Uhud',
        description: 'Site of the Battle of Uhud. The mountain loved by Prophet Muhammad (PBUH).',
        significance: 'Historic Battle Site',
        image: 'https://images.unsplash.com/photo-1736240713478-00d2d3043d7d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        distance: '4 km from Madinah'
    },
    {
        id: 7,
        city: 'Madinah',
        name: 'Jannat al-Baqi',
        description: 'The cemetery where many companions and family members of the Prophet (PBUH) are buried.',
        significance: 'Companions\' Resting Place',
        image: '/janat-al-baqi.jpg',
        distance: 'Adjacent to Nabawi'

    },
    {
        id: 8,
        city: 'Madinah',
        name: 'Seven Mosques (Sab\'a Masajid)',
        description: 'Historic site of the Battle of the Trench with multiple small mosques.',
        significance: 'Battle of the Trench Site',
        image: '/seven-mosque.jpg',
        distance: 'Near Mount Sala'
    }
];

export default function ZiyaratPage() {
    const [activeCity, setActiveCity] = useState<'All' | 'Makkah' | 'Madinah'>('All');

    const filteredSites = activeCity === 'All'
        ? ziyaratSites
        : ziyaratSites.filter(site => site.city === activeCity);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative bg-[#0A192F] py-16 text-center px-4">
                <div className="absolute inset-0 overflow-hidden">

                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                        Sacred <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Ziyarat Sites</span>
                    </h1>
                    <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
                        Visit the blessed historical and religious landmarks of Makkah and Madinah. Walk in the footsteps of prophets and companions.
                    </p>
                </div>
            </section>

            {/* ===== FILTER TABS ===== */}
            <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="flex justify-center gap-3">
                        {['All', 'Makkah', 'Madinah'].map((city) => (
                            <button
                                key={city}
                                onClick={() => setActiveCity(city as any)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${activeCity === city
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {city === 'All' ? 'All Cities' : city}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ZIYARAT SITES GRID ===== */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredSites.map((site, index) => (
                        <div
                            key={site.id}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-emerald-400/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Image */}
                                <div className="relative h-48 sm:h-auto sm:w-48 overflow-hidden shrink-0">
                                    <Image
                                        src={site.image}
                                        alt={site.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-lg ${site.city === 'Makkah'
                                            ? 'bg-[#0f88c0] text-white'
                                            : 'bg-emerald-500 text-white'
                                            }`}>
                                            {site.city}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1">
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-2 group-hover:text-[#0f88c0] transition-colors">
                                        {site.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                        {site.description}
                                    </p>

                                    <div className="flex items-start gap-2 mb-3">
                                        <svg className="w-4 h-4 text-[#0f88c0] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-xs text-gray-500 font-medium">
                                            <span className="text-[#0f88c0] font-bold">Significance:</span> {site.significance}
                                        </p>
                                    </div>

                                    {site.distance && (
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {site.distance}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="bg-gray-50 py-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-5xl mb-4">🕋</div>
                    <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] mb-3">
                        Guided Ziyarat <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Tours Available</span>
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Our expert guides will take you to these blessed sites with detailed historical and spiritual insights. Transportation included in all packages.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Book Ziyarat Tour
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