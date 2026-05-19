// app/terms/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function TermsPage() {
    const sections = [
        {
            title: '📋 Booking Terms',
            content: 'All bookings are subject to availability and confirmation. A non-refundable deposit of 30% is required to secure your package. Full payment must be completed 45 days before departure. Prices are in PKR and subject to change until confirmed.'
        },
        {
            title: '💳 Payment & Refunds',
            content: 'We accept bank transfer, credit/debit cards, and EasyPaisa/JazzCash. Refunds: Cancel 60+ days before travel = 70% refund; 30-59 days = 40% refund; <30 days = no refund. Visa rejection cases receive 90% refund (minus processing fees).'
        },
        {
            title: '🛂 Visa Responsibility',
            content: 'We assist with visa processing but final approval rests with Saudi authorities. If visa is rejected due to incomplete/incorrect documents provided by you, no refund applies. We are not liable for government policy changes or processing delays.'
        },
        {
            title: '🏨 Hotel & Transport',
            content: 'Hotel room assignments are based on availability at check-in. Room upgrades subject to extra charges. Transport schedules may change due to traffic, weather, or Saudi authorities\' instructions. We are not liable for delays beyond our control.'
        },
        {
            title: '⚠️ Health & Safety',
            content: 'Pilgrims must be physically fit for Umrah/Hajj rituals. Pre-existing medical conditions must be disclosed at booking. We recommend comprehensive travel insurance. We are not liable for illness, injury, or loss of personal belongings during the journey.'
        },
        {
            title: '🔄 Changes & Cancellations',
            content: 'Package changes (dates, hotels, flights) may incur additional charges. Name changes allowed up to 30 days before travel with documentation. Force majeure events (pandemics, natural disasters, political unrest) may result in rescheduling or partial refunds per policy.'
        },
        {
            title: '🔐 Privacy & Data',
            content: 'Personal data collected is used solely for booking, visa, and service coordination. We do not sell your information. See our Privacy Policy for full details on data handling and your rights.'
        },
        {
            title: '⚖️ Governing Law',
            content: 'These terms are governed by the laws of Pakistan. Any disputes shall be resolved in the courts of [Your City]. By booking with us, you agree to these terms and acknowledge you have read and understood them.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== COMPACT HERO ===== */}
            <section className="bg-[#0A192F] py-12 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Terms <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">& Conditions</span>
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-sm">
                    Last updated: May 2026 • Please read carefully before booking your sacred journey.
                </p>
            </section>

            {/* ===== TERMS CONTENT ===== */}
            <section className="max-w-3xl mx-auto px-4 py-10">
                <div className="space-y-8">
                    {sections.map((section, i) => (
                        <div key={i} className="group">
                            <h2 className="text-lg font-bold text-[#0A192F] mb-3 flex items-center gap-2 group-hover:text-[#0f88c0] transition-colors">
                                {section.title}
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ===== IMPORTANT NOTICE ===== */}
                <div className="mt-12 p-5 bg-yellow-50 border border-yellow-200 rounded-2xl">
                    <p className="text-sm text-yellow-800 font-medium">
                        ⚠️ <strong>Important:</strong> By proceeding with any booking, you confirm that you have read, understood, and agreed to these Terms & Conditions. For clarifications, please contact us before payment.
                    </p>
                </div>

                {/* ===== CONTACT CTA ===== */}
                <div className="mt-8 p-6 bg-linear-to-br from-[#0f88c0]/5 to-emerald-400/5 rounded-2xl border border-[#0f88c0]/20 text-center">
                    <p className="text-sm text-gray-700 mb-4">
                        Have questions about our terms? We're happy to help.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        Contact Support
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