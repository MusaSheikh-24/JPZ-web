'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Twitter',
            path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
            href: 'https://twitter.com'
        },
        {
            name: 'Instagram',
            path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
            href: 'https://instagram.com'
        },
        {
            name: 'Facebook',
            path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
            href: 'https://facebook.com'
        },
        {
            name: 'YouTube',
            path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.504 3.545 12 3.545 12 3.545s-7.504 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.873.505 9.377.505 9.377.505s7.504 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
            href: 'https://youtube.com'
        },
    ];

    const footerLinks = [
        {
            title: 'Our Services',
            items: [
                { label: 'Umrah Packages', href: '/packages#umrah' },
                { label: 'Hajj Packages', href: '/packages#hajj' },
                { label: 'Visa & Ziyarat', href: '/services' },
            ]
        },
        {
            title: 'Resources',
            items: [
                { label: 'Pilgrimage Guide', href: '/guidance' },
                { label: 'Health & Safety', href: '/guidance' },
                { label: 'Packing List', href: '/guidance' },
            ]
        },
        {
            title: 'Holy Cities',
            items: [
                { label: 'Hotels', href: '/hotels' },
                { label: 'Transport', href: '/transport' },
            ]
        },
        {
            title: 'Support',
            items: [
                { label: 'Contact Us', href: '/#contact' },

                { label: 'Track Booking', href: '/guidance#track-booking' },
            ]
        },
    ];

    return (
        <footer className="bg-[#0A192F] text-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-emerald-400" />
            <div className="absolute top-20 left-10 w-32 h-32 bg-[#0f88c0]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-5">
                        <Link href="/" className="inline-block relative w-36 h-16">
                            <Image
                                src="/logo.png.png"
                                alt="Umrah Hajj Travel Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted partner for spiritually fulfilling Umrah & Hajj journeys.
                            Complete visa support, premium hotels, and guided Ziyarat.
                        </p>

                        {/* Social Links - Compact */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:border-[#0f88c0] hover:text-white hover:scale-110 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </Link>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-lg text-xs text-emerald-300">
                                ✓ Ministry Approved
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0f88c0]/10 border border-[#0f88c0]/30 rounded-lg text-xs text-[#0f88c0]">
                                🕋 50K+ Pilgrims
                            </span>
                        </div>
                    </div>

                    {/* Links Grid - Aligned & Compact */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {footerLinks.map((section) => (
                            <div key={section.title}>
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">
                                    {section.title}
                                </h4>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item.label}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-gray-400 hover:text-[#0f88c0] transition-colors duration-200 inline-block"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar - Compact */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                        © {year} Sacred Journeys. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-[#0f88c0] transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms-conditions" className="text-gray-500 hover:text-[#0f88c0] transition-colors">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                {/* Islamic Quote - Minimal */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-600 italic">
                        "And proclaim to the people the Hajj..." <span className="text-gray-500">— Quran 22:27</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}