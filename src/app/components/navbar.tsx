'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavLink {
    name: string;
    href: string;
}

const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Destination', href: '/destination' },
    { name: 'Packages', href: '/packages' },
    { name: 'Flights', href: '/flight' },
    { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Current Route
    const pathname = usePathname();

    return (
        <nav
            className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-md"
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Full Width Container */}
            <div className="w-full px-4 md:px-8 lg:px-12">

                {/* Navbar Content */}
                <div className="flex items-center h-20 md:h-24">

                    {/* Logo */}
                    <div className="flex-1 flex items-center">
                        <Link
                            href="/"
                            className="relative w-32 h-20 md:w-44 md:h-24"
                        >
                            <Image
                                src="/logo.png.png"
                                alt="Company Logo"
                                fill
                                priority
                                sizes="(max-width: 768px) 128px, 176px"
                                className="object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 justify-center items-center">

                        <div className="flex items-center gap-2">

                            {navLinks.map((link) => {

                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2 rounded-full text-[17px] font-medium transition-all duration-300
                                            
                                            ${isActive
                                                ? 'bg-sky-500 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-sky-500 hover:text-white'
                                            }
                                            
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                        </div>
                    </div>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex flex-1 justify-end">
                        <Link
                            href="/packages"
                            className="px-6 py-3 bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-sm font-bold rounded-full shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-400/50 transition-all duration-300 active:scale-[0.98]"
                        >
                            Book Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-sky-500 p-2 rounded-md transition-all duration-300"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (

                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">

                    <div className="px-4 py-4 space-y-2">

                        {navLinks.map((link) => {

                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                                        
                                        ${isActive
                                            ? 'bg-sky-500 text-white'
                                            : 'text-gray-700 hover:bg-sky-500 hover:text-white'
                                        }
                                        
                                    `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        {/* Mobile CTA Button */}
                        <div className="pt-3">

                            <Link
                                href="#book-now"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-linear-to-r from-[#0f88c0] to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white px-5 py-3 rounded-full text-base font-bold shadow-lg shadow-sky-500/30 transition-all duration-300"
                            >
                                Book Now
                            </Link>

                        </div>

                    </div>
                </div>
            )}
        </nav>
    );
}