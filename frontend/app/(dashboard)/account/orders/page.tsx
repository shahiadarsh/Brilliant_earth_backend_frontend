"use client"

import {
    Package,
    Search,
    Calendar,
    CreditCard,
    MapPin,
    ChevronRight,
    ExternalLink,
    Filter
} from "lucide-react"

export default function MyOrdersPage() {
    const orders = [
        {
            id: "RZ-10200",
            date: "Oct 12, 2024",
            total: 2450.00,
            status: "Shipped",
            items: [
                {
                    name: "Classic Solitaire Engagement Ring",
                    specs: "18K Yellow Gold • 1.5ct Emerald Cut",
                    image: "https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=200"
                }
            ]
        },
        {
            id: "RZ-10185",
            date: "Sep 28, 2024",
            total: 120.00,
            status: "Delivered",
            items: [
                {
                    name: "Diamond Stud Earrings",
                    specs: "14K White Gold • 0.5ctw",
                    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=200"
                }
            ]
        }
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 leading-tight">My Orders</h1>
                    <p className="text-gray-500 mt-1">Track and manage your Ritzin purchases.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#163E3E]/10 outline-none w-full sm:w-64 shadow-sm"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-500 hover:text-[#163E3E] transition-colors shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                        <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-gray-50 bg-gray-50/30 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Number</p>
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#163E3E] transition-colors">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date Placed</p>
                                    <p className="text-sm font-medium text-gray-600">{order.date}</p>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                                    <p className="text-sm font-bold text-[#163E3E]">${order.total.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border
                    ${order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}
                `}>
                                    {order.status}
                                </span>
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-24 h-28 sm:w-20 sm:h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div>
                                                <h4 className="font-serif text-lg text-gray-900 leading-tight">{item.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1 italic font-light">{item.specs}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3 pt-2">
                                            <button className="px-5 py-2 bg-[#163E3E] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-md">
                                                Track Shipment
                                            </button>
                                            <button className="px-5 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
                                                Order Details <ExternalLink className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State Help */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl">Can't find an order?</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">If you made a purchase as a guest or don't see your order here, please use our global tracking tool.</p>
                <div className="pt-4">
                    <button className="text-[10px] font-bold text-[#163E3E] uppercase tracking-[0.2em] border-b-2 border-[#163E3E] pb-1 hover:text-black hover:border-black transition-all">
                        Access Guest Tracking
                    </button>
                </div>
            </div>
        </div>
    )
}
