'use client';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A192F]">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                    alt="International flight view"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#0A196F]/70 via-[#0A192F]/60 to-[#0A192F]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">

                {/* Trust Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-[#0797da] bg-white/10 border border-white/20 rounded-full backdrop-blur">
                    ✓ Trusted by 100,000+ travelers
                </span>

                {/* Title - Changed & Professional */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Explore the World <br />
                    <span className="bg-linear-to-r from-[#ffffff] to-white bg-clip-text text-transparent">
                        With Confidence
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
                    Premium international flights at the best prices.
                    Simple booking, zero hidden fees.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="#search" className="px-8 py-3.5 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold rounded-full shadow-xl shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98] cursor-pointer">
                        Search Flights
                    </Link>
                    <Link href="#deals" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 shadow-lg hover:shadow-white/10 transition-all duration-300 active:scale-[0.98] cursor-pointer">
                        View Deals
                    </Link>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { val: '140+', lbl: 'Countries' },
                        { val: '500+', lbl: 'Airlines' },
                        { val: '4.9★', lbl: 'Rating' },
                        { val: '24/7', lbl: 'Support' },
                    ].map(s => (
                        <div key={s.lbl} className="text-center cursor-pointer">
                            <p className="text-3xl font-bold text-[#0f88c0]">{s.val}</p>
                            <p className="text-sm text-gray-400">{s.lbl}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}