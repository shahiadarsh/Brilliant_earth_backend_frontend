"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Package, Heart, Settings, LogOut, ChevronRight, User, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { logout, setCredentials } from "@/lib/redux/slices/authSlice"

export default function AccountPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated: isLoggedIn } = useSelector((state: RootState) => state.auth)
  const { wishlist } = useCart()

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token && savedUser && !isLoggedIn) {
      try {
        const parsedUser = JSON.parse(savedUser)
        dispatch(setCredentials({ user: parsedUser, token }))
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
      }
    }
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    // Only redirect if we are sure we are not logged in and hydration attempt is done
    // Basic check: if no token in local storage and not logged in state
    const token = localStorage.getItem('token')
    if (!token && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) return null

  return (
    <main className="min-h-screen bg-[#F9F9F9] py-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-[350px] space-y-8">
            <div className="bg-white p-12 shadow-sm rounded-sm space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#163E3E]/5 rounded-full flex items-center justify-center text-[#163E3E]">
                  <User className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl text-gray-900">{user.firstName} {user.lastName}</h2>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {[
                  { name: "My Orders", icon: <Package className="w-5 h-5" />, active: true },
                  { name: "My Wishlist", icon: <Heart className="w-5 h-5" />, count: wishlist.length, href: "/wishlist" },
                  { name: "Account Settings", icon: <Settings className="w-5 h-5" /> },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href || "#"}
                    className={`flex items-center justify-between p-4 rounded-sm transition-all group ${item.active ? 'bg-[#163E3E]/5 text-[#163E3E]' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className="text-[10px] font-bold bg-[#163E3E] text-white px-2 py-0.5 rounded-full">{item.count}</span>
                    )}
                    <ChevronRight className={`w-4 h-4 opacity-0 transition-opacity ${item.active ? '' : 'group-hover:opacity-100'}`} />
                  </Link>
                ))}
                <button
                  onClick={() => {
                    dispatch(logout())
                    router.push("/")
                  }}
                  className="flex items-center gap-4 p-4 text-red-400 hover:bg-red-50 transition-all rounded-sm mt-8"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </nav>
            </div>

            <div className="bg-[#163E3E] p-10 text-white rounded-sm space-y-6 shadow-2xl">
              <h4 className="font-serif text-xl italic">Need Expert Advice?</h4>
              <p className="text-xs opacity-70 leading-relaxed font-light">Schedule a virtual consultation with our jewelry experts to find the perfect piece.</p>
              <Link href="/appointment" className="block text-center border border-white/30 py-4 uppercase text-[10px] font-bold tracking-widest hover:bg-white hover:text-[#163E3E] transition-all">
                Book Now
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <section className="bg-white p-12 shadow-sm rounded-sm space-y-12">
              <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                <h3 className="font-serif text-3xl text-gray-900">Recent Orders</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#163E3E]">View All Orders</span>
              </div>

              {/* Mock Orders List */}
              <div className="space-y-8">
                {[1, 2].map((order, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-8 pb-8 border-b border-gray-50 last:border-0">
                    <div className="w-32 h-40 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0 relative">
                      <img src={`/ring${i + 1}.jfif`} className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Order #RZ-1020{i}</p>
                          <h4 className="font-serif text-xl text-gray-900">Classic Solitaire Engagement Ring</h4>
                        </div>
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Shipped</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 flex items-center gap-2"><Calendar className="w-3 h-3" /> Date</p>
                          <p className="text-sm font-medium">Oct 12, 2024</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Total</p>
                          <p className="text-sm font-medium">$2,450.00</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1 flex items-center gap-2"><MapPin className="w-3 h-3" /> Ship To</p>
                          <p className="text-sm font-medium">New York, NY</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
