'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();

    const socialLinks = [
        { name: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
        { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
        { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
        { name: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
    ];

    return (
        <footer className="bg-[#0A192F] text-white relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#0f88c0]/60 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

                    {/* Brand Column */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <Link href="/" className="inline-block mb-6 relative w-36 h-20">
                            <Image src="/logo.png.png" alt="Company Logo" fill className="object-contain" priority />
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-sm">
                            Premium international travel bookings. Compare flights, hotels, and curated global tours with confidence.
                        </p>

                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href="#"
                                    aria-label={social.name}
                                    className="group w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:border-transparent hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f88c0] relative overflow-hidden"
                                >
                                    {/* Gradient Background on Hover */}
                                    <span className="absolute inset-0 bg-linear-to-r from-[#0f88c0] to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {/* Icon - White on Hover */}
                                    <svg className="relative w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {['Company', 'Support', 'Destinations'].map((title, idx) => {
                            const items = title === 'Company' ? ['About Us', 'Careers', 'Press', 'Partners']
                                : title === 'Support' ? ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
                                    : ['Dubai', 'Paris', 'Tokyo', 'Bali'];
                            return (
                                <div key={title}>
                                    <h4 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wide">{title}</h4>
                                    <ul className="space-y-3.5">
                                        {items.map((item) => (
                                            <li key={item}>
                                                <Link
                                                    href="#"
                                                    className="group flex items-center gap-2 text-base text-gray-400 hover:text-transparent hover:bg-linear-to-r hover:from-[#0f88c0] hover:to-emerald-400 hover:bg-clip-text transition-all duration-200"
                                                >
                                                    <span className="w-0 group-hover:w-1.5 h-0.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 transition-all duration-200 rounded-full"></span>
                                                    {item}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-base text-gray-500">© {year} YourBrand. All rights reserved.</p>
                    <div className="flex gap-6 text-base">
                        <Link href="#" className="text-gray-500 hover:bg-linear-to-r hover:from-[#0f88c0] hover:to-emerald-400 hover:bg-clip-text hover:text-transparent transition-all duration-200">
                            Privacy
                        </Link>
                        <Link href="#" className="text-gray-500 hover:bg-linear-to-r hover:from-[#0f88c0] hover:to-emerald-400 hover:bg-clip-text hover:text-transparent transition-all duration-200">
                            Terms
                        </Link>
                        <Link href="#" className="text-gray-500 hover:bg-linear-to-r hover:from-[#0f88c0] hover:to-emerald-400 hover:bg-clip-text hover:text-transparent transition-all duration-200">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}