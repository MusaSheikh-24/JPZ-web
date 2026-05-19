// app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// ================= INTERFACES =================
interface PackageDetails {
    flight: string;
    hotel: string;
    itinerary: string[];
    priceBreakdown: string;
}

interface TravelPackage {
    id: number;
    title: string;
    category: string;
    destination: string;
    duration: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    inclusions: string[];
    badge?: string;
    discount?: string;
    description: string;
    details: PackageDetails;
}

// ================= INITIAL DATA (Default packages) =================
const defaultPackages: TravelPackage[] = [
    {
        id: 1,
        title: 'Umrah Premium Package',
        category: 'Umrah',
        destination: 'Makkah & Madinah',
        duration: '10 Days / 9 Nights',
        price: 365000,
        originalPrice: 480000,
        rating: 4.9,
        reviews: 487,
        image: 'https://images.unsplash.com/photo-1591604157118-b94e2684f857?w=800&q=80',
        description: 'Premium Umrah experience with Haram view hotels, direct flights, and complete Ziyarat tours.',
        inclusions: ['Direct Flights', '5★ Haram Hotel', 'Saudi Visa', 'Ziyarat Tours', 'Ground Transport', 'Daily Meals'],
        badge: 'Best Seller',
        discount: '24% OFF',
        details: {
            flight: 'Direct Return • Free 30kg Baggage • Meal Included • Priority Boarding',
            hotel: 'Swissotel Makkah (5★) • Haram View Room • Pullman Zamzam Madinah',
            itinerary: [
                'Day 1: Arrival in Jeddah & Transfer to Makkah',
                'Day 2-4: Umrah Rituals & Ibadah at Masjid al-Haram',
                'Day 5: Transfer to Madinah via High-Speed Train',
                'Day 6-8: Ziyarat Tours & Prayers at Masjid Nabawi',
                'Day 9: Return to Makkah for Final Tawaf',
                'Day 10: Departure from Jeddah'
            ],
            priceBreakdown: 'Flights: Rs. 155,000 | Hotels: Rs. 125,000 | Visa & Services: Rs. 85,000'
        }
    },
    {
        id: 2,
        title: 'Hajj Complete Package',
        category: 'Hajj',
        destination: 'Makkah, Madinah, Mina, Arafat',
        duration: '21 Days / 20 Nights',
        price: 985000,
        originalPrice: 1200000,
        rating: 5.0,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1551041777-575d3855ca71?w=800&q=80',
        description: 'Complete Hajj pilgrimage with luxury tents in Mina, scholar guidance, and all Hajj rituals covered.',
        inclusions: ['Direct Flights', 'Luxury Tents Mina', 'All Meals', 'Scholar Guidance', 'Transport', 'Medical Support'],
        badge: 'Premium',
        discount: '19% OFF',
        details: {
            flight: 'Direct Charter Flight • Priority Boarding • Extra Baggage',
            hotel: 'Makkah: Fairmont Clock Tower | Madinah: Anwar Al Madinah',
            itinerary: [
                'Day 1-3: Arrival & Ihram Preparation',
                'Day 4-7: Umrah al-Tamattu & Stay in Makkah',
                'Day 8: Transfer to Mina & Stay in Luxury Tents',
                'Day 9: Day of Arafat - Wuquf & Dua',
                'Day 10: Muzdalifah & Rami al-Jamarat',
                'Day 11-13: Days of Tashreeq in Mina',
                'Day 14-17: Farewell Tawaf & Return to Madinah',
                'Day 18-20: Ziyarat in Madinah',
                'Day 21: Departure'
            ],
            priceBreakdown: 'Flights: Rs. 340,000 | Accommodation: Rs. 420,000 | Services & Meals: Rs. 225,000'
        }
    }
];

const formatPKR = (amount: number) => `PKR ${amount.toLocaleString('en-PK')}`;

// ================= HELPER FUNCTIONS =================
const getPackagesFromStorage = (): TravelPackage[] => {
    if (typeof window === 'undefined') return defaultPackages;
    const stored = localStorage.getItem('packages');
    if (!stored) {
        localStorage.setItem('packages', JSON.stringify(defaultPackages));
        return defaultPackages;
    }
    return JSON.parse(stored);
};

const savePackagesToStorage = (packages: TravelPackage[]) => {
    localStorage.setItem('packages', JSON.stringify(packages));
    // Dispatch custom event for real-time sync
    window.dispatchEvent(new Event('packages-updated'));
};

// ================= MAIN COMPONENT =================
export default function AdminPage() {
    const [packages, setPackages] = useState<TravelPackage[]>(defaultPackages);
    const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'add'>('overview');
    const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    // Form State with details
    const [formData, setFormData] = useState<Partial<TravelPackage & { details: PackageDetails }>>({
        title: '',
        category: 'Umrah',
        destination: '',
        duration: '',
        price: 0,
        originalPrice: 0,
        rating: 5.0,
        reviews: 0,
        image: '',
        description: '',
        inclusions: [],
        badge: '',
        discount: '',
        details: {
            flight: '',
            hotel: '',
            itinerary: [''],
            priceBreakdown: ''
        }
    });
    const [inclusionInput, setInclusionInput] = useState('');
    const [itineraryInput, setItineraryInput] = useState('');

    // Load packages from localStorage on mount
    useEffect(() => {
        const loadedPackages = getPackagesFromStorage();
        setPackages(loadedPackages);
    }, []);

    // Listen for updates from other tabs/windows
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedPackages = getPackagesFromStorage();
            setPackages(updatedPackages);
        };

        window.addEventListener('packages-updated', handleStorageChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('packages-updated', handleStorageChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const categories = ['All', 'Umrah', 'Hajj', 'Madinah', 'Ramadan', 'Budget'];

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || pkg.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddInclusion = () => {
        if (inclusionInput.trim() && !formData.inclusions?.includes(inclusionInput.trim())) {
            setFormData({
                ...formData,
                inclusions: [...(formData.inclusions || []), inclusionInput.trim()]
            });
            setInclusionInput('');
        }
    };

    const handleRemoveInclusion = (index: number) => {
        setFormData({
            ...formData,
            inclusions: formData.inclusions?.filter((_, i) => i !== index) || []
        });
    };

    const handleAddItinerary = () => {
        if (itineraryInput.trim()) {
            setFormData({
                ...formData,
                details: {
                    ...formData.details!,
                    itinerary: [...(formData.details?.itinerary || []), itineraryInput.trim()]
                }
            });
            setItineraryInput('');
        }
    };

    const handleRemoveItinerary = (index: number) => {
        setFormData({
            ...formData,
            details: {
                ...formData.details!,
                itinerary: formData.details?.itinerary.filter((_, i) => i !== index) || []
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPackage) {
            // Update existing package
            const updatedPackages = packages.map(pkg =>
                pkg.id === editingPackage.id
                    ? { ...formData, id: pkg.id } as TravelPackage
                    : pkg
            );
            setPackages(updatedPackages);
            savePackagesToStorage(updatedPackages);
        } else {
            // Add new package
            const newPackage: TravelPackage = {
                ...formData as TravelPackage,
                id: Date.now()
            };
            const updatedPackages = [...packages, newPackage];
            setPackages(updatedPackages);
            savePackagesToStorage(updatedPackages);
        }

        resetForm();
        setActiveTab('packages');
    };

    const handleEdit = (pkg: TravelPackage) => {
        setEditingPackage(pkg);
        setFormData(pkg);
        setActiveTab('add');
    };

    const handleDelete = (id: number) => {
        const updatedPackages = packages.filter(pkg => pkg.id !== id);
        setPackages(updatedPackages);
        savePackagesToStorage(updatedPackages);
        setShowDeleteConfirm(null);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: 'Umrah',
            destination: '',
            duration: '',
            price: 0,
            originalPrice: 0,
            rating: 5.0,
            reviews: 0,
            image: '',
            description: '',
            inclusions: [],
            badge: '',
            discount: '',
            details: {
                flight: '',
                hotel: '',
                itinerary: [''],
                priceBreakdown: ''
            }
        });
        setEditingPackage(null);
        setInclusionInput('');
        setItineraryInput('');
    };

    const stats = {
        total: packages.length,
        umrah: packages.filter(p => p.category === 'Umrah').length,
        hajj: packages.filter(p => p.category === 'Hajj').length,
        revenue: packages.reduce((acc, pkg) => acc + pkg.price, 0)
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* ===== ADMIN HEADER ===== */}
            <section className="bg-[#0A192F] py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                        Admin <span className="bg-linear-to-r from-[#0f88c0] to-emerald-400 bg-clip-text text-transparent">Dashboard</span>
                    </h1>
                    <p className="text-white/80 text-sm">Manage your pilgrimage packages with real-time sync</p>
                </div>
            </section>

            {/* ===== ADMIN CONTENT ===== */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1 space-y-3">
                        <button
                            onClick={() => { setActiveTab('overview'); resetForm(); }}
                            className={`w-full px-5 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-3 ${activeTab === 'overview'
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Overview
                        </button>
                        <button
                            onClick={() => { setActiveTab('packages'); resetForm(); }}
                            className={`w-full px-5 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-3 ${activeTab === 'packages'
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            All Packages
                        </button>
                        <button
                            onClick={() => { setActiveTab('add'); resetForm(); }}
                            className={`w-full px-5 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-3 ${activeTab === 'add'
                                    ? 'bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Package
                        </button>
                        <Link
                            href="/packages"
                            target="_blank"
                            className="w-full px-5 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-3 bg-white text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Public Site
                        </Link>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">

                        {/* ===== OVERVIEW TAB ===== */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Packages</p>
                                        <p className="text-3xl font-black text-[#0A192F]">{stats.total}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Umrah</p>
                                        <p className="text-3xl font-black text-[#0f88c0]">{stats.umrah}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Hajj</p>
                                        <p className="text-3xl font-black text-emerald-500">{stats.hajj}</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 font-bold uppercase mb-1">Total Value</p>
                                        <p className="text-xl font-black text-[#0A192F]">{formatPKR(stats.revenue)}</p>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-[#0A192F] mb-4">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <span className="text-sm text-gray-600">Active Categories</span>
                                            <span className="text-sm font-bold text-[#0f88c0]">
                                                {new Set(packages.map(p => p.category)).size}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <span className="text-sm text-gray-600">Average Price</span>
                                            <span className="text-sm font-bold text-[#0f88c0]">
                                                {formatPKR(Math.round(stats.revenue / stats.total))}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                            <span className="text-sm text-gray-600">Total Reviews</span>
                                            <span className="text-sm font-bold text-[#0f88c0]">
                                                {packages.reduce((acc, pkg) => acc + pkg.reviews, 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ===== PACKAGES LIST TAB ===== */}
                        {activeTab === 'packages' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            placeholder="Search packages..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        />
                                        <select
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Package</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Rating</th>
                                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {filteredPackages.map((pkg) => (
                                                <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                                <Image src={pkg.image} alt={pkg.title} width={48} height={48} className="object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-[#0A192F] line-clamp-1">{pkg.title}</p>
                                                                <p className="text-xs text-gray-500">{pkg.duration}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-[#0f88c0]/10 text-[#0f88c0] text-xs font-bold rounded-lg">
                                                            {pkg.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-bold text-[#0A192F]">{formatPKR(pkg.price)}</p>
                                                        {pkg.discount && (
                                                            <p className="text-xs text-green-600">{pkg.discount}</p>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <span className="text-sm font-bold">{pkg.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEdit(pkg)}
                                                                className="p-2 text-[#0f88c0] hover:bg-[#0f88c0]/10 rounded-lg transition-colors"
                                                                title="Edit"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => setShowDeleteConfirm(pkg.id)}
                                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* ===== ADD/EDIT PACKAGE TAB ===== */}
                        {activeTab === 'add' && (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-[#0A192F]">
                                        {editingPackage ? 'Edit Package' : 'Add New Package'}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => { resetForm(); setActiveTab('packages'); }}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Package Title *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="e.g., Premium Umrah Package"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                                            <select
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                            >
                                                {categories.filter(c => c !== 'All').map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Destination *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.destination}
                                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="e.g., Makkah & Madinah"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="e.g., 10 Days / 9 Nights"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Price (PKR) *</label>
                                            <input
                                                type="number"
                                                required
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="365000"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (PKR)</label>
                                            <input
                                                type="number"
                                                value={formData.originalPrice}
                                                onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="480000"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL *</label>
                                            <input
                                                type="url"
                                                required
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Badge (Optional)</label>
                                            <input
                                                type="text"
                                                value={formData.badge || ''}
                                                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                                placeholder="e.g., Best Seller, Premium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        placeholder="Brief description of the package..."
                                    />
                                </div>

                                {/* Flight Details */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Flight Details *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.details?.flight || ''}
                                        onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, flight: e.target.value } })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        placeholder="e.g., Direct Return • Free 30kg Baggage"
                                    />
                                </div>

                                {/* Hotel Details */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hotel Details *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.details?.hotel || ''}
                                        onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, hotel: e.target.value } })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        placeholder="e.g., Swissotel Makkah (5★) • Haram View Room"
                                    />
                                </div>

                                {/* Itinerary */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Itinerary</label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={itineraryInput}
                                            onChange={(e) => setItineraryInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItinerary())}
                                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                            placeholder="e.g., Day 1: Arrival in Jeddah & Transfer"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddItinerary}
                                            className="px-4 py-2.5 bg-[#0f88c0] text-white font-bold rounded-xl hover:bg-[#0f88c0]/90 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {formData.details?.itinerary?.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                                                <span className="text-xs text-gray-600 font-medium">{index + 1}.</span>
                                                <span className="flex-1 text-sm text-gray-700">{item}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveItinerary(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Price Breakdown *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.details?.priceBreakdown || ''}
                                        onChange={(e) => setFormData({ ...formData, details: { ...formData.details!, priceBreakdown: e.target.value } })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                        placeholder="e.g., Flights: Rs. 155,000 | Hotels: Rs. 125,000"
                                    />
                                </div>

                                {/* Inclusions */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Inclusions</label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={inclusionInput}
                                            onChange={(e) => setInclusionInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInclusion())}
                                            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0f88c0] outline-none text-sm"
                                            placeholder="Add inclusion item..."
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddInclusion}
                                            className="px-4 py-2.5 bg-[#0f88c0] text-white font-bold rounded-xl hover:bg-[#0f88c0]/90 transition-colors"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.inclusions?.map((item, index) => (
                                            <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-xl">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveInclusion(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => { resetForm(); setActiveTab('packages'); }}
                                        className="px-6 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 bg-linear-to-r from-[#0f88c0] to-emerald-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        {editingPackage ? 'Update Package' : 'Add Package'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== DELETE CONFIRMATION MODAL ===== */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-[#0A192F] mb-3">Confirm Delete</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this package? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-5 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteConfirm)}
                                className="px-5 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}