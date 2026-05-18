'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">

            {/* Background Layer - About Page Exact Style */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1589827577276-65d717348780?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Masjid al-Haram, Makkah - Kaaba"
                    fill
                    priority
                    className="object-cover object-center"
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {/* Tailwind v4: bg-linear-to-* instead of bg-gradient-to-* */}
                <div className="absolute inset-0 bg-[#0A192F]/85" />
            </div>

            {/* Animated Glow Effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0f88c0]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Content - Exact About Page Layout */}
            <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/15">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-white">🕋 Trusted by 50000+ pilgrims worldwide</span>
                </div>

                {/* Heading */}``
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
                    Your Trusted Partner <br />
                    <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">
                        for Umrah & Hajj Travel
                    </span>
                </h1>

                {/* Paragraph */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-10">
                    We provide complete spiritual travel solutions with visa assistance,
                    premium accommodations near Haram, expert-guided Ziyarat, and dedicated
                    support for every pilgrim.
                </p>

                {/* Buttons - Using Next.js Link */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/packages"
                        className="px-10 py-4 bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
                    >
                        Explore Packages
                    </Link>
                    <Link
                        href="/contact"
                        className="px-10 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    );
}