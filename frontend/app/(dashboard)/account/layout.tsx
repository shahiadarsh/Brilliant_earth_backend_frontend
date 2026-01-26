"use client"

import { useCart } from "@/context/CartContext"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
    Package,
    Heart,
    Settings,
    LogOut,
    UserCircle,
    Bell,
    Menu,
    ShoppingBag,
    CreditCard,
    Home
} from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { logout, setCredentials } from "@/lib/redux/slices/authSlice"
import { toast } from "sonner"

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const dispatch = useDispatch()
    const { user, isAuthenticated: isLoggedIn } = useSelector((state: RootState) => state.auth)
    const { wishlist, cartCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Hydrate auth state from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('userToken')
        const savedUser = localStorage.getItem('userInfo')

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
        const token = localStorage.getItem('userToken')
        if (!token && !isLoggedIn) {
            router.push("/auth/login")
        }
    }, [isLoggedIn, router])

    // Close mobile menu on path change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    if (!isLoggedIn || !user) return null

    const navigationItems = [
        { id: "overview", name: "Overview", icon: <UserCircle className="w-5 h-5" />, href: "/account" },
        { id: "orders", name: "My Orders", icon: <Package className="w-5 h-5" />, href: "/account/orders" },
        { id: "wishlist", name: "My Wishlist", icon: <Heart className="w-5 h-5" />, count: wishlist.length, href: "/wishlist" },
        { id: "payments", name: "Saved Payments", icon: <CreditCard className="w-5 h-5" />, href: "#" },
        { id: "settings", name: "Account Settings", icon: <Settings className="w-5 h-5" />, href: "#" },
    ]

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            {/* --- SIDEBAR (Desktop Fixed / Mobile Drawer) --- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#163E3E] text-white transition-transform duration-300 ease-in-out border-r border-white/5
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
            >
                <div className="flex flex-col h-full overflow-y-auto no-scrollbar">
                    <div className="p-8 border-b border-white/10 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white font-serif text-xl border border-white/20">R</div>
                            <span className="font-serif text-2xl tracking-widest uppercase text-balance">Ritzin</span>
                        </Link>
                    </div>

                    <div className="p-8 flex items-center gap-4 flex-shrink-0">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20 flex-shrink-0">
                            <UserCircle className="w-6 h-6" />
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="font-serif text-lg leading-tight truncate">{user.firstName} {user.lastName}</h2>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest truncate">{user.email}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 mt-4">
                        {navigationItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group
                    ${isActive ? 'bg-white text-[#163E3E] shadow-xl' : 'text-white/70 hover:bg-white/5 hover:text-white'}
                  `}
                                >
                                    <div className="flex items-center gap-4">
                                        {item.icon}
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </div>
                                    {item.count !== undefined && item.count > 0 && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#163E3E] text-white' : 'bg-white/20 text-white'}`}>
                                            {item.count}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-8 border-t border-white/10 space-y-4 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-4 p-4 text-white/50 hover:text-white transition-all rounded-xl hover:bg-white/5">
                            <Home className="w-5 h-5" />
                            <span className="text-sm font-medium">Back to Shop</span>
                        </Link>
                        <button
                            onClick={() => {
                                dispatch(logout())
                                router.push("/")
                                toast.success("Successfully logged out")
                            }}
                            className="w-full flex items-center gap-4 p-4 text-rose-300 hover:text-rose-100 transition-all rounded-xl hover:bg-rose-500/10"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="text-sm font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-72 relative">
                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                {/* Top Navbar (Dashboard Only) */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end gap-6 shadow-sm">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100 shadow-sm"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </div>
                        <Link href="/cart" className="relative cursor-pointer hover:bg-gray-50 p-2 rounded-full transition-colors">
                            <ShoppingBag className="w-5 h-5 text-gray-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#163E3E] text-white text-[8px] min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </header>

                <main className="p-4 sm:p-8 lg:p-12 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    )
}
