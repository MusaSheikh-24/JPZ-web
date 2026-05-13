'use client';

import { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); }
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

export default function Testimonials() {
    const { ref, isInView } = useInView();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = [
        {
            name: "Sarah Mitchell",
            location: "New York, USA",
            role: "Travel Blogger",
            text: "Absolutely incredible experience! Found flights at 40% less than other platforms. The 2 AM support team actually replied within minutes. This is now my go-to travel booking site.",
            rating: 5,
            trips: "47 trips booked",
            verified: true
        },
        {
            name: "Ahmed Khan",
            location: "Dubai, UAE",
            role: "Business Executive",
            text: "I manage travel for my entire team. This platform has saved us thousands with transparent pricing and instant rebooking options. Zero hidden fees ever - I love it!",
            rating: 5,
            trips: "124 trips booked",
            verified: true
        },
        {
            name: "Elena Rossi",
            location: "Rome, Italy",
            role: "Family Traveler",
            text: "Traveled across 3 countries with kids. Their curated packages made everything stress-free. The real-time itinerary tracking is a game changer for family vacations.",
            rating: 5,
            trips: "28 trips booked",
            verified: true
        },
        {
            name: "James Chen",
            location: "Singapore",
            role: "Adventure Seeker",
            text: "Best travel site I've ever used. The curated experiences feature helped me discover hidden gems I would've never found on my own. Absolutely phenomenal service!",
            rating: 5,
            trips: "63 trips booked",
            verified: true
        },
        {
            name: "Maria Santos",
            location: "Barcelona, Spain",
            role: "Luxury Traveler",
            text: "From honeymoon planning to solo adventures - they've handled everything perfectly. The attention to detail and personal touch sets them apart from any other platform.",
            rating: 5,
            trips: "35 trips booked",
            verified: true
        }
    ];

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused, testimonials.length]);

    return (
        <section ref={ref} className="relative py-28 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/30 to-[#0A192F]"></div>
            <div className="absolute inset-0 bg-[#0A192F]/95"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-[#0f88c0]/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-white">Trusted by 50,000+ Travelers</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Real Stories, <span className="bg-linear-to-r from-[#0f88c0] to-sky-400 bg-clip-text text-transparent">Real Journeys</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        See what our travelers have to say about their experiences
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className={`relative max-w-4xl mx-auto transition-all duration-700 ease-out delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >

                    {/* Main Testimonial Card */}
                    <div className="relative bg-linear-to-br from-[#112240] to-[#0A192F] rounded-3xl p-10 md:p-14 border border-white/5 shadow-2xl shadow-black/30 overflow-hidden">

                        {/* Decorative Quote */}
                        <div className="absolute top-8 right-8 text-[#0f88c0]/10">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.314c0-2.565 1.15-4.346 3.443-5.344C19.39 7.03 20.833 5.05 20.833 2h-2.833c-2.368 0-4.283 1.85-5.166 4.15C9.95 8.15 7.5 10.5 7.5 13v8h6.517zm-14.017 0v-7.314c0-2.565 1.15-4.346 3.443-5.344C5.39 7.03 6.833 5.05 6.833 2h-2.833C1.632 2 .5 4.15 .5 6.85 1.45 8.85 0 10.5 0 13v8h6.517z" />
                            </svg>
                        </div>

                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-transparent"></div>

                        <div className="relative">
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-8">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-xl md:text-2xl text-white leading-relaxed mb-10 font-medium">
                                "{testimonials[activeIndex].text}"
                            </p>

                            {/* Author Section */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                                {/* Avatar & Info */}
                                <div className="flex items-center gap-5">
                                    {/* Big Avatar */}
                                    <div className="relative">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-[#0f88c0] to-sky-400 flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-xl shadow-sky-500/30">
                                            {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {/* Verified Badge */}
                                        {testimonials[activeIndex].verified && (
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-[#112240]">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h4>
                                        </div>
                                        <p className="text-gray-400 font-medium">{testimonials[activeIndex].role}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {testimonials[activeIndex].location}
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Count */}
                                <div className="flex items-center gap-2 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
                                    <svg className="w-5 h-5 text-[#0f88c0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span className="text-white font-semibold">{testimonials[activeIndex].trips}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#0A192F] hover:bg-gray-50 hover:scale-110 transition-all cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-[#0A192F] hover:bg-gray-50 hover:scale-110 transition-all cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex items-center justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-3 rounded-full transition-all duration-500 cursor-pointer ${index === activeIndex ? 'w-10 bg-[#0f88c0]' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                        ></button>
                    ))}
                </div>

                {/* Thumbnail Strip */}
                <div className={`mt-16 flex justify-center gap-4 transition-all duration-700 ease-out delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {testimonials.map((t, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`relative transition-all duration-300 cursor-pointer ${index === activeIndex ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <div className={`w-14 h-14 rounded-xl bg-linear-to-br from-[#0f88c0] to-sky-400 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${index === activeIndex ? 'shadow-lg shadow-sky-500/40 ring-2 ring-white' : ''}`}>
                                {t.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {t.verified && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}