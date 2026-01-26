"use client"

import { useCart } from "@/context/CartContext"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import {
  Package,
  Heart,
  Calendar,
  MapPin,
  ShoppingBag,
  CreditCard,
  UserCircle,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function AccountOverview() {
  const { wishlist } = useCart()
  const { user } = useSelector((state: RootState) => state.auth)

  if (!user) return null

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif text-gray-900 leading-tight">Welcome, {user.firstName}</h1>
          <p className="text-gray-500 mt-1">Here's a summary of your Ritzin experience.</p>
        </div>
      </div>

      {/* Dashboard Summary Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">2</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">In Wishlist</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{wishlist.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow hidden sm:flex sm:flex-col lg:flex lg:flex-col">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Member Since</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">Oct 2024</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-serif text-xl sm:text-2xl text-gray-900">Recent Orders</h3>
          <Link href="/account/orders" className="text-[10px] font-bold text-[#163E3E] uppercase tracking-widest border border-[#163E3E]/20 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">View All</Link>
        </div>

        <div className="divide-y divide-gray-50">
          {[1, 2].map((order, i) => (
            <div key={i} className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 hover:bg-gray-50/50 transition-colors">
              <div className="w-full md:w-32 h-44 md:h-40 bg-gray-50 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                <img
                  src={`https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=300`}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  alt="Product"
                />
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order #RZ-${10200 + i}</p>
                    <h4 className="font-serif text-xl text-gray-900 mt-1">Classic Solitaire Engagement Ring</h4>
                    <p className="text-sm text-gray-500 mt-1 font-light italic">18K Yellow Gold • 1.5ct Emerald Cut</p>
                  </div>
                  <span className="self-start px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-100">
                    Shipped
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-50">
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Date</span>
                    </div>
                    <p className="text-sm font-semibold">Oct 12, 2024</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <CreditCard className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Total</span>
                    </div>
                    <p className="text-sm font-semibold text-[#163E3E]">$2,450.00</p>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                      <MapPin className="w-3 h-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Ship To</span>
                    </div>
                    <p className="text-sm font-semibold truncate">New York, NY</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 sm:flex-none px-6 py-2.5 bg-[#163E3E] text-white text-xs font-bold rounded-xl hover:bg-black transition-all shadow-md">Track Order</button>
                  <button className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-50 transition-all">Order Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Virtual Consultation Banner */}
      <div className="bg-gradient-to-br from-[#163E3E] to-[#1a1a1a] p-8 sm:p-12 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 max-w-md space-y-4">
          <h4 className="font-serif text-3xl sm:text-4xl italic">Need some expert help?</h4>
          <p className="text-sm text-white/70 leading-relaxed font-light">Our jewelry specialists are ready to help you find or create your dream piece via a virtual consultation.</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/appointment" className="bg-white text-[#163E3E] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-xl hover:bg-gray-100">
              Book Appointment
            </Link>
            <div className="flex items-center gap-4 text-sm font-medium text-white/60 px-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Experts Online Now
            </div>
          </div>
        </div>
        <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white/10 rounded-full p-4 relative z-10 flex-shrink-0 border border-white/20">
          <div className="w-full h-full bg-[#c2a26d] rounded-full flex items-center justify-center shadow-inner">
            <UserCircle className="w-24 h-24 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
