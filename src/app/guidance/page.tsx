// app/guidance/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// ================= GUIDANCE DATA =================
const guidanceCategories = [
    {
        id: 'pre-travel',
        title: '📋 Pre-Travel Preparation',
        items: [
            'Passport validity must be 6+ months from travel date',
            'Complete Saudi visa application 15-30 days before departure',
            'Get mandatory Meningitis ACWY vaccination certificate',
            'Book only through verified portal or authorized agents',
            'Carry PKR cards (Visa/Mastercard) or exchange SAR/USD',
            'Download offline maps, prayer times & translation apps'
        ]
    },
    {
        id: 'ihram',
        title: '🤲 Ihram & Ritual Guidelines',
        items: [
            'Enter Ihram strictly at designated Miqat points',
            'Men: 2 unstitched white cloths, no stitched garments or shoes above ankle',
            'Women: Modest Islamic dress, face uncovered in Ihram state',
            'Make Niyyah & recite Talbiyah before crossing Miqat',
            'Avoid cutting hair/nails, using perfume, or marital relations in Ihram',
            'Follow certified guide for Tawaf & Sa\'i sequences'
        ]
    },
    {
        id: 'health',
        title: '🏥 Health & Safety Tips',
        items: [
            'Carry 30-day supply of personal medications + prescriptions',
            'Drink only sealed bottled water; stay hydrated constantly',
            'Use breathable, cushioned walking shoes for Haram circuits',
            'Avoid peak sun hours (11 AM - 4 PM); carry compact umbrella',
            'Save emergency numbers: 997 (Police), 998 (Civil Defense), 999 (Ambulance)',
            'Travel insurance covers medical evacuation & hospital visits'
        ]
    },
    {
        id: 'etiquette',
        title: '🕌 Etiquette & Rules',
        items: [
            'Maintain silence & lower voice in Haram & Rawdah zones',
            'No photography of security personnel or restricted government areas',
            'Follow gender-segregated prayer & walking areas strictly',
            'Keep luggage minimal; use hotel lockers for extra items',
            'Respect local prayer times & Friday Jumu\'ah closures',
            'Children & elderly must be supervised at all times in crowds'
        ]
    },
    {
        id: 'pilgrimage',
        title: '🕋 Complete Pilgrimage Guide',
        items: [
            'Umrah can be performed any time except during Hajj days (8th-13th Dhul Hijjah)',
            'Hajj occurs annually from 8th to 12th/13th of Dhul Hijjah (Islamic month)',
            'Tawaf: 7 circuits around Kaaba starting & ending at Hajr-e-Aswad',
            'Sa\'i: 7 rounds between Safa & Marwah (2.5km total distance)',
            'For Hajj: Wuquf at Arafat (9th Dhul Hijjah) is the most essential pillar',
            'Rami al-Jamarat: Stoning of 3 pillars in Mina (10th-12th Dhul Hijjah)',
            'Qurbani: Sacrifice an animal on 10th Dhul Hijjah (Eid al-Adha)',
            'Halq/Taqsir: Shave or trim hair to exit Ihram state'
        ]
    },
    {
        id: 'duas',
        title: '📿 Essential Dua & Prayers',
        items: [
            'Talbiyah: "Labbayk Allahumma Labbayk..." (recite constantly in Ihram)',
            'Tawaf Dua: Read between Rukn Yamani & Hajr-e-Aswad: "Rabbana atina..."',
            'Sa\'i Starting: "Inna as-Safa wal-Marwata min sha\'a\'irillah..."',
            'At Multazam: Make personal duas after completing Tawaf',
            'In Rawdah: "Allahumma salli \'ala Muhammad..." (prayers accepted here)',
            'At Arafat: Recite Quran, dhikr, and personal supplications extensively',
            'Daily Adhkar: Morning/evening remembrances for protection & blessings'
        ]
    },
    {
        id: 'packing',
        title: '✈️ Packing Checklist',
        items: [
            '📄 Documents: Passport, Visa, Flight tickets, Hotel vouchers, Insurance',
            '👔 Clothing: Ihram sheets (men), Modest dresses (women), Comfortable shoes',
            '💊 Medications: Prescription drugs, First-aid kit, Vitamins, Pain relievers',
            '🧴 Toiletries: Unscented soap, Toothbrush, Towels, Sunscreen (SPF 50+)',
            '📱 Electronics: Phone charger, Power bank, Universal adapter, Camera',
            '💰 Money: Saudi Riyals (SAR), International debit/credit cards',
            '🎒 Essentials: Umbrella, Water bottle, Snacks, Backpack, Ziplock bags',
            '📿 Spiritual: Tasbih, Quran (pocket size), Dua book, Prayer mat (optional)'
        ]
    }
];

const serviceTips = [
    { icon: '🛂', title: 'Visa Process', desc: 'Apply early. Keep passport copies. We handle portal submission, tracking & delivery.' },
    { icon: '🏨', title: 'Hotel Check-in', desc: 'Carry booking confirmation & ID. Rooms ready after 2 PM. Early check-in may incur fee.' },
    { icon: '🚌', title: 'Transport', desc: 'Meet at designated lobby points. Keep guide contact saved. Buses run on fixed schedules.' },
    { icon: '🕌', title: 'Ziyarat Tours', desc: 'Wear comfortable shoes. Carry water. Follow group leader. Sites have peak-hour restrictions.' }
];

const faqs = [
    { q: 'What if my visa is delayed or rejected?', a: 'We monitor all applications daily. If delayed past 10 days, we offer free rescheduling. If rejected due to agency error, full refund is processed per policy.' },
    { q: 'Can I change my hotel or room type after booking?', a: 'Yes, subject to availability & price difference. Contact support at least 7 days before travel for smooth processing.' },
    { q: 'Is Zamzam water allowed on international flights?', a: 'Yes. Saudi airlines permit 1 sealed 5L bottle in checked luggage. Keep it properly sealed to avoid leakage.' },
    { q: 'What should I do if I lose my passport in Saudi Arabia?', a: 'Report immediately to nearest police station & our 24/7 helpline. We assist with temporary travel documents, embassy coordination & replacement.' },
    { q: 'How do I track my booking status?', a: 'Login to your account on our website or use the "Track Booking" feature with your booking reference number. You\'ll receive SMS/email updates at every stage.' },
    { q: 'Are there any age restrictions for Umrah/Hajj?', a: 'Children under 12 must be accompanied by a Mahram. For Hajj, Saudi government sets annual quotas & age guidelines. Check current year requirements with our team.' }
];

// ================= MAIN COMPONENT =================
export default function GuidancePage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="bg-[#0A192F] py-14 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Complete Pilgrim <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Guidance</span>
                </h1>
                <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
                    Step-by-step instructions, essential rules, health tips, duas, packing list & FAQs to ensure a smooth, blessed journey from booking to return.
                </p>
            </section>

            {/* ===== MAIN GUIDANCE GRID ===== */}
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {guidanceCategories.map((section) => (
                        <div key={section.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
                            <h3 className="text-xl font-bold text-[#0A192F] mb-4 group-hover:text-[#0f88c0] transition-colors">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 cursor-pointer">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-[#0f88c0] rounded-full shrink-0"></span>
                                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SERVICE-SPECIFIC TIPS ===== */}
            <section className="bg-gray-50 py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-black text-[#0A192F] text-center mb-8">
                        Service-Specific <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Guidance</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {serviceTips.map((tip, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1">
                                <div className="text-3xl mb-3">{tip.icon}</div>
                                <h4 className="font-bold text-[#0A192F] mb-2">{tip.title}</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TRACK BOOKING SECTION ===== */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-linear-to-br from-[#0f88c0]/5 to-emerald-400/5 rounded-3xl p-8 border border-[#0f88c0]/20 text-center cursor-pointer hover:shadow-xl transition-all">
                    <div className="text-5xl mb-4">📍</div>
                    <h2 className="text-2xl font-black text-[#0A192F] mb-3">
                        Track Your <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Booking</span>
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Enter your booking reference number to check real-time status of your visa, flights, hotel confirmation & more.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                        Track Booking Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ===== FAQ ACCORDION ===== */}
            <section className="max-w-3xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-black text-[#0A192F] text-center mb-8">
                    Frequently Asked <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Questions</span>
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm cursor-pointer">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left font-bold text-[#0A192F] hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                {faq.q}
                                <svg className={`w-5 h-5 text-[#0f88c0] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="bg-[#0A192F] py-12 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="text-4xl mb-4">🤝</div>
                    <h2 className="text-2xl font-black text-white mb-3">Need Personalized Guidance?</h2>
                    <p className="text-white/70 text-sm mb-6">
                        Our travel experts are available 24/7 to answer your questions, help with bookings, or provide step-by-step support.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/#contact" className="px-8 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer">
                            Contact Support Team
                        </Link>
                        <Link href="/packages" className="px-8 py-3 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                            View Available Packages
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}