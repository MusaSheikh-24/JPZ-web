// app/visa/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const formatPKR = (amount: number) => `PKR ${amount.toLocaleString('en-PK')}`;

export default function VisaPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ===== COMPACT HERO ===== */}
            <section className="bg-[#0A192F] py-14 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                    Fast & Reliable <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Visa Services</span>
                </h1>
                <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
                    Hassle-free Umrah, Hajj & Saudi tourist visa processing with 99% approval rate. Documents verified • Transparent pricing • 24/7 support
                </p>
            </section>

            {/* ===== VISA PACKAGES ===== */}
            <section className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid md:grid-cols-3 gap-5">
                    {[
                        { type: 'Umrah Visa', price: 12500, original: 18000 },
                        { type: 'Hajj Visa', price: 25000, original: 35000 },
                        { type: 'Saudi Tourist', price: 8500, original: 12000 }
                    ].map((v, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <h3 className="font-bold text-lg text-[#0A192F]">{v.type}</h3>
                            <div className="mt-3">
                                <span className="text-2xl font-black text-[#0f88c0]">{formatPKR(v.price)}</span>
                                <span className="text-xs text-gray-400 line-through ml-2">{formatPKR(v.original)}</span>
                            </div>
                            <ul className="mt-4 text-sm text-gray-600 space-y-2">
                                <li className="flex items-center gap-2">✓ Saudi Portal Submission</li>
                                <li className="flex items-center gap-2">✓ Document Verification</li>
                                <li className="flex items-center gap-2">✓ Free Re-application Support</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== REQUIREMENTS + CONTACT CTA ===== */}
            <section className="bg-gray-50 py-10 px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-center">
                    {/* Left: Documents */}
                    <div>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">Required Documents</h2>
                        <div className="space-y-3">
                            {['📄 Valid Passport (6+ months)', '📸 2 Photos (White Background)', '✈️ Flight & Hotel Confirmation', '💉 Meningitis Vaccination'].map((doc, i) => (
                                <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 text-sm text-gray-700 font-medium">
                                    {doc}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact CTA Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
                        <div className="text-4xl mb-3">🤝</div>
                        <h3 className="text-lg font-bold text-[#0A192F] mb-2">Need Help?</h3>
                        <p className="text-sm text-gray-600 mb-5">
                            Our visa experts are ready to guide you. Get personalized assistance for your sacred journey.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        >
                            For More Information, Please Contact
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <p className="text-xs text-gray-500 mt-4">Response within 2 hours • Free consultation</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}