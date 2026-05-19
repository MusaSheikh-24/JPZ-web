// app/transport/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const formatPKRRange = (min: number, max?: number) => {
    return max
        ? `PKR ${min.toLocaleString('en-PK')} - ${max.toLocaleString('en-PK')}`
        : `PKR ${min.toLocaleString('en-PK')}+`;
};

const transportServices = [
    {
        id: 1,
        title: 'Airport Transfers',
        icon: '✈️',
        desc: 'Pick-up & drop-off from Jeddah (JED) or Madinah (MED) directly to your hotel.',
        price: [15000, 25000]
    },
    {
        id: 2,
        title: 'Makkah ↔ Madinah Travel',
        icon: '🚆',
        desc: 'Haramain High-Speed Train booking or luxury AC coaches. Door-to-door comfort.',
        price: [12000, 35000]
    },
    {
        id: 3,
        title: 'Ziyarat Transport',
        icon: '🕌',
        desc: 'Daily guided transport for historical sites in both cities with English/Urdu speakers.',
        price: [8000, 20000]
    },
    {
        id: 4,
        title: 'Private VIP Vehicle',
        icon: '🚗',
        desc: 'Dedicated luxury car & driver for your entire stay. Flexible schedule, premium comfort.',
        price: [45000]
    }
];

export default function TransportPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== COMPACT HERO ===== */}
            <section className="bg-[#0A192F] py-14 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Reliable <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Transport Services</span>
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
                    Comfortable, halal-compliant & professional transportation for your entire pilgrimage. Airport transfers, inter-city travel & private Ziyarat tours.
                </p>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section className="max-w-5xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-5">
                    {transportServices.map((service) => (
                        <div key={service.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">{service.icon}</span>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-sm font-bold text-[#0f88c0]">
                                            {formatPKRRange(service.price[0], service.price[1])}
                                        </span>
                                        <span className="text-xs text-gray-500">per trip</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== FEATURES + CTA ===== */}
            <section className="bg-gray-50 py-10 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {['24/7 Dispatch', 'GPS Tracked', 'Professional Drivers'].map((feat, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-emerald-500 text-lg mb-1">✓</div>
                                <p className="text-xs font-bold text-gray-700">{feat}</p>
                            </div>
                        ))}
                    </div>
                    <h2 className="text-xl font-black text-[#0A192F] mb-3">Need Custom Arrangements?</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        We offer group discounts, wheelchair-accessible vehicles, and multi-city packages. Contact us for a tailored quote.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                    >
                        Contact for Transport Booking
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