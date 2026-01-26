"use client"

import React, { useState } from 'react'
import { ShoppingBag, Eye, Search, Mail, MapPin, X, Clock, CheckCircle2 } from 'lucide-react'

const initialOrders = [
    { id: "RZ-10201", customer: "Vikrant Sharma", email: "vikrant@example.com", total: "$2,450", status: "Shipped", date: "Jan 12, 11:24 AM" },
    { id: "RZ-10202", customer: "Anita Desai", email: "anita.d@gmail.com", total: "$890", status: "Processing", date: "Jan 12, 10:15 AM" },
    { id: "RZ-10203", customer: "Rohan Khanna", email: "rohan@outlook.com", total: "$3,120", status: "Delivered", date: "Jan 11, 04:30 PM" },
]

import {
    useGetOrdersQuery,
    useUpdateOrderStatusMutation
} from '@/lib/redux/slices/ordersApiSlice'
import { toast } from 'sonner'

export default function OrdersManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)

    // API Hooks
    const { data: ordersData, isLoading } = useGetOrdersQuery({
        search: searchTerm || undefined,
        sort: '-createdAt'
    })
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    const orders = ordersData?.data?.orders || []

    // Filtering (Local as fallback/search refinement)
    const filteredOrders = orders.filter((order: any) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus({ id, status: newStatus }).unwrap()
            toast.success(`Order status updated to ${newStatus}`)
            if (selectedOrder?._id === id) {
                setSelectedOrder({ ...selectedOrder, status: newStatus })
            }
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to update status")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-slate-900 leading-tight">Order Management</h1>
                    <p className="text-slate-500 mt-1 text-sm">Track shipments, verify payments, and manage customer fulfillment.</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="search"
                        placeholder="Search by Order ID or customer name..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 italic">Loading orders...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Order ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Customer</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Total</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold">Status</th>
                                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5 font-bold text-[#163E3E] text-sm truncate max-w-[120px]">
                                            #{order._id.substring(order._id.length - 8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-bold text-slate-800 leading-tight">{order.user?.name || 'Guest User'}</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{order.user?.email || 'No email'}</p>
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-900 text-sm">${order.totalPrice?.toLocaleString()}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                    order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex items-center gap-2 px-4 py-2 mx-auto bg-slate-50 text-slate-600 hover:text-[#163E3E] hover:bg-[#163E3E]/5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 text-sm italic">No orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-serif text-slate-900">Order #{selectedOrder._id.substring(selectedOrder._id.length - 8).toUpperCase()}</h2>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest leading-none font-bold">
                                    Placed on: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Customer Info</label>
                                    <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <Mail className="w-4 h-4 text-slate-400" /> <span className="text-sm font-medium">{selectedOrder.user?.email || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-700">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span className="text-sm font-medium text-slate-600 leading-relaxed">
                                                {selectedOrder.shippingAddress?.fullName}<br />
                                                {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}<br />
                                                {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Order Items ({selectedOrder.orderItems?.length || 0})</label>
                                    <div className="space-y-3">
                                        {selectedOrder.orderItems?.map((item: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                                                <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
                                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-bold text-slate-900 truncate">{item.name}</p>
                                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Financial Breakdown</label>
                                    <div className="p-6 bg-[#163E3E] text-white rounded-[2rem] shadow-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                        <div className="space-y-3 relative z-10">
                                            <div className="flex justify-between text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                                <span>Subtotal</span>
                                                <span>${selectedOrder.itemsPrice?.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] opacity-60 uppercase font-bold tracking-widest">
                                                <span>Shipping</span>
                                                <span>${selectedOrder.shippingPrice === 0 ? 'FREE' : selectedOrder.shippingPrice?.toLocaleString()}</span>
                                            </div>
                                            <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                                                <span className="text-xs font-serif italic">Total Collected</span>
                                                <span className="text-2xl font-bold">${selectedOrder.totalPrice?.toLocaleString()}</span>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] bg-white/10 w-fit px-3 py-1.5 rounded-lg">
                                                <CheckCircle2 className={`w-3 h-3 ${selectedOrder.isPaid ? 'text-emerald-400' : 'text-amber-400'}`} />
                                                {selectedOrder.isPaid ? `PAYMENT VERIFIED· ${new Date(selectedOrder.paidAt).toLocaleDateString()}` : 'PAYMENT PENDING'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-1">Operational Protocol</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                                                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border
                                                    ${selectedOrder.status === status
                                                        ? 'bg-white border-[#163E3E] text-[#163E3E] shadow-lg'
                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}
                                                `}
                                            >
                                                <span>{status}</span>
                                                {selectedOrder.status === status && <div className="w-2 h-2 bg-[#163E3E] rounded-full"></div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                            <button onClick={() => setSelectedOrder(null)} className="px-8 py-3 bg-[#163E3E] text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg">Close Window</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
