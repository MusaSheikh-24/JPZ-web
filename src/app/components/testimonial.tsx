'use client';
import { useState } from 'react';

export default function HajjUmrahTestimonials() {
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = [
        {
            name: "Yusuf Ahmed",
            location: "London, UK",
            role: "Umrah Pilgrim",
            text: "Visa processed in 3 days. Hotel was steps from Masjid al-Haram. The 24/7 Madinah coordinator made our stay incredibly peaceful.",
            trips: "2 pilgrimages",
            avatar: "YA",
            verified: true
        },
        {
            name: "Aisha Rahman",
            location: "Toronto, Canada",
            role: "Hajj Group Leader",
            text: "Managed our entire group of 40 flawlessly. Manasik training was thorough, and transportation in Mina was seamless. Highly recommended!",
            trips: "5 pilgrimages",
            avatar: "AR",
            verified: true
        },
        {
            name: "Omar Hassan",
            location: "Dubai, UAE",
            role: "Family Traveler",
            text: "Took my elderly parents for Umrah. The wheelchair assistance and Rawdah booking service were a blessing. Truly stress-free spiritual journey.",
            trips: "3 pilgrimages",
            avatar: "OH",
            verified: true
        },
        {
            name: "Fatima Zahra",
            location: "Kuala Lumpur, MY",
            role: "First-Time Pilgrim",
            text: "I was nervous about my first Umrah, but the guided Ziyarat tours and scholar-led sessions gave me complete confidence and peace of mind.",
            trips: "1 pilgrimage",
            avatar: "FZ",
            verified: true
        },
        {
            name: "Ibrahim Ali",
            location: "Chicago, USA",
            role: "Business Pilgrim",
            text: "Needed a quick Umrah trip between work. They arranged express visa, flexible flights, and a quiet hotel near the Haram. Exceptional service.",
            trips: "4 pilgrimages",
            avatar: "IA",
            verified: true
        },
        {
            name: "Sana Khan",
            location: "Karachi, Pakistan",
            role: "Ramadan Umrah",
            text: "Performing Umrah in Ramadan was a dream. The package included daily Iftar near the Haram and excellent transport. Will book again next year!",
            trips: "2 pilgrimages",
            avatar: "SK",
            verified: true
        }
    ];

    // Duplicate array for seamless infinite loop
    const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

    return (
        <section className="relative py-20 overflow-hidden bg-[#0A192F]">
            {/* Background Effects - Updated with Emerald Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-emerald-500/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-100 h-50 bg-[#0f88c0]/10 rounded-full blur-[80px]"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.03 4a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-white">Trusted by 50,000+ Pilgrims</span>
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        What Our <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Pilgrims Say</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">Real experiences from families and individuals who completed their sacred journeys with us</p>
                </div>

                {/* Infinite Scroll Container */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Scrolling Track */}
                    <div
                        className="flex gap-6 animate-scroll"
                        style={{
                            width: 'fit-content',
                            animationPlayState: isPaused ? 'paused' : 'running'
                        }}
                    >
                        {allTestimonials.map((t, index) => (
                            <div
                                key={`${index}-${t.avatar}`}
                                className="shrink-0 w-70 sm:w-75 lg:w-85 bg-linear-to-br from-[#112240] to-[#0A192F] rounded-2xl p-5 border border-white/5 shadow-lg hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300"
                            >
                                {/* Top: Avatar + Verified */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0f88c0] to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                            {t.avatar}
                                        </div>
                                        {t.verified && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-[#112240]">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                        <p className="text-gray-500 text-xs">{t.role}</p>
                                    </div>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.03 4a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                    "{t.text}"
                                </p>

                                {/* Footer: Location + Trips */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {t.location.split(',')[0]}
                                    </div>
                                    <span className="text-emerald-400 text-xs font-semibold">{t.trips}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fade Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#0A192F] to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#0A192F] to-transparent pointer-events-none z-10"></div>
                </div>

            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
            `}</style>
        </section>
    );
}