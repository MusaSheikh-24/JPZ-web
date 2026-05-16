'use client';
import { useState, useEffect, useRef } from 'react';

const useInView = (threshold = 0.1) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
};

export default function ContactSection() {
    const { ref, isInView } = useInView();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        packageType: '',
        travelDate: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Umrah Inquiry Submitted:', formData);
        setFormData({ name: '', email: '', phone: '', packageType: '', travelDate: '', message: '' });
    };

    return (
        <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
            {/* Background - White Theme */}
            <div className="absolute inset-0 bg-linear-to-b from-white via-sky-50/50 to-white"></div>
            <div className="absolute top-40 left-20 w-72 h-72 bg-[#0f88c0]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Contact Us & Theme Updated */}
                <div className={`text-center mb-16 transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-white rounded-full shadow-lg shadow-emerald-100/50 border border-gray-100/50">
                        <span className="text-xl">🕋</span>
                        <span className="text-base font-bold text-[#0f88c0]">Contact Us</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-5">
                        Get In <span className="relative inline-block">
                            <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Touch</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-[#0f88c0] to-emerald-400 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Ready to plan your Umrah or Hajj journey? Fill out the form below and our specialists will contact you within 24 hours with a personalized package.
                    </p>
                </div>

                {/* Contact Card - Theme Updated */}
                <div className={`relative bg-white rounded-3xl shadow-2xl shadow-gray-200/30 overflow-hidden border border-gray-100 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Top Gradient Border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0f88c0] to-transparent"></div>

                    <div className="p-8 md:p-12">

                        {/* Form - Umrah Focused Fields */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] placeholder-gray-400 focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all font-medium cursor-text"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] placeholder-gray-400 focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all font-medium cursor-text"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    WhatsApp / Phone
                                </label>
                                <input
                                    type="tel"
                                    placeholder="+1 (234) 567-8900"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] placeholder-gray-400 focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all font-medium cursor-text"
                                    required
                                />
                            </div>

                            {/* Package Type Dropdown */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Preferred Package
                                </label>
                                <select
                                    value={formData.packageType}
                                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all font-medium cursor-pointer appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select your journey type</option>
                                    <option value="umrah-economy">Umrah Economy</option>
                                    <option value="umrah-premium">Umrah Premium</option>
                                    <option value="hajj-group">Hajj Group</option>
                                    <option value="hajj-vip">Hajj VIP</option>
                                    <option value="ramadan-special">Ramadan Special</option>
                                    <option value="custom">Custom Package</option>
                                </select>
                            </div>

                            {/* Travel Date */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Preferred Travel Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.travelDate}
                                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all font-medium cursor-pointer"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                                    Special Requests / Questions
                                </label>
                                <textarea
                                    placeholder="e.g., Preferred hotel proximity, family size, wheelchair assistance needed..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={5}
                                    className="w-full p-5 rounded-2xl bg-gray-50 border-2 border-gray-100 text-[#0A192F] placeholder-gray-400 focus:outline-none focus:border-[#0f88c0] focus:bg-white transition-all resize-none font-medium cursor-text"
                                />
                            </div>

                            {/* Button - Theme Updated */}
                            <button
                                type="submit"
                                className="w-full h-14 rounded-full bg-linear-to-r from-[#0f88c0] to-emerald-400 hover:from-emerald-400 hover:to-[#0f88c0] text-white font-bold text-lg shadow-xl shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-400/50 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Send Inquiry
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>

                        {/* Footer Info - Umrah Context & Theme Updated */}
                        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-6 text-base text-gray-500">
                            <span className="flex items-center gap-2 cursor-pointer hover:text-[#0f88c0] transition-colors">
                                📧 umrah@travelco.com
                            </span>
                            <span className="flex items-center gap-2 cursor-pointer hover:text-emerald-500 transition-colors">
                                +966 12 345 6789
                            </span>
                            <span className="flex items-center gap-2 cursor-pointer hover:text-[#0f88c0] transition-colors">
                                🕋 24/7 Makkah Support
                            </span>
                        </div>
                    </div>

                    {/* Bottom Accent - Theme Updated */}
                    <div className="h-1 bg-linear-to-r from-[#0f88c0] via-emerald-400 to-[#0f88c0]"></div>
                </div>

            </div>
        </section>
    );
}