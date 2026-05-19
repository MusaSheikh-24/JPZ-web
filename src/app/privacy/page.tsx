// app/privacy/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function PrivacyPage() {
    const sections = [
        {
            title: '📋 Information We Collect',
            content: 'We collect basic information you provide: name, contact details, passport information, and travel preferences. This data is used solely for visa processing, hotel bookings, and pilgrimage coordination.'
        },
        {
            title: '🔒 How We Use Your Data',
            content: 'Your information is used to: process visa applications, confirm hotel & flight bookings, arrange transport & Ziyarat tours, and provide 24/7 support during your journey. We never sell or share your data with third parties.'
        },
        {
            title: '🍪 Cookies & Tracking',
            content: 'Our website uses minimal cookies for functionality (login, cart, preferences). No tracking pixels or advertising cookies are used. You can disable cookies in browser settings.'
        },
        {
            title: '🛡️ Data Security',
            content: 'All sensitive data (passport, payment) is encrypted in transit (SSL/TLS) and stored securely. Access is restricted to authorized personnel only. Regular security audits are conducted.'
        },
        {
            title: '✉️ Your Rights',
            content: 'You may request access, correction, or deletion of your personal data anytime via contact@sacredjourneys.com. We respond within 48 hours. You can also unsubscribe from communications anytime.'
        },
        {
            title: '🌍 International Transfers',
            content: 'As a pilgrimage service, some data may be shared with Saudi authorities for visa/Hajj compliance. All transfers follow applicable data protection laws.'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== COMPACT HERO ===== */}
            <section className="bg-[#0A192F] py-12 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Privacy <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Policy</span>
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-sm">
                    Last updated: May 2026 • We respect your privacy and protect your sacred journey data.
                </p>
            </section>

            {/* ===== PRIVACY CONTENT ===== */}
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

                {/* ===== CONTACT CTA ===== */}
                <div className="mt-12 p-6 bg-linear-to-br from-[#0f88c0]/5 to-emerald-400/5 rounded-2xl border border-[#0f88c0]/20 text-center">
                    <p className="text-sm text-gray-700 mb-4">
                        Have questions about our privacy practices? We're here to help.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        Contact Privacy Team
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