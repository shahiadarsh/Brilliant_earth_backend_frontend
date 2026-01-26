"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Gem,
    Diamond,
    Settings,
    ShoppingBag,
    FileText,
    Users,
    ChevronDown,
    Bell,
    Search,
    Menu,
    X,
    LogOut,
    PlusCircle,
    UserCircle,
    Globe,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/lib/redux/slices/authSlice"
import { RootState } from "@/lib/redux/store"
import { toast } from "sonner"

const sidebarItems = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
        href: "/admin",
    },
    {
        title: "Rings & Settings",
        icon: <ShoppingBag className="w-5 h-5" />,
        href: "/admin/catalog/rings",
    },
    {
        title: "Diamonds",
        icon: <Diamond className="w-5 h-5" />,
        href: "/admin/catalog/diamonds",
    },
    {
        title: "Gemstones",
        icon: <Gem className="w-5 h-5" />,
        href: "/admin/catalog/gemstones",
    },
    {
        title: "Other Jewelry",
        icon: <ShoppingBag className="w-5 h-5 opacity-50" />,
        href: "/admin/catalog/jewelry",
    },
    {
        title: "Blog Posts",
        icon: <FileText className="w-5 h-5" />,
        href: "/admin/content/blog",
    },
    {
        title: "Promo Banners",
        icon: <ShoppingBag className="w-5 h-5 text-orange-400" />,
        href: "/admin/content/promos",
    },
    {
        title: "Navigation Menu",
        icon: <Menu className="w-5 h-5" />,
        href: "/admin/content/navigation",
    },
    {
        title: "Orders",
        icon: <ShoppingBag className="w-5 h-5 text-blue-400" />,
        href: "/admin/orders",
    },
    {
        title: "Settings",
        icon: <Settings className="w-5 h-5" />,
        href: "/admin/settings",
    },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth)

    // Handle auto-closing sidebar on mobile
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false)
        }
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 overflow-x-hidden">
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Desktop & Mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-[70] bg-[#1e293b] text-white transition-all duration-300 ease-in-out border-r border-slate-700
                ${sidebarOpen ? "lg:w-72" : "lg:w-20"}
                w-72
                ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700/50 flex-shrink-0">
                        {(sidebarOpen || mobileMenuOpen) && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#163E3E] rounded-md flex items-center justify-center text-white font-bold text-sm">
                                    R
                                </div>
                                <span className="text-lg font-bold tracking-tight">
                                    Ritzin <span className="text-slate-400 font-normal">Admin</span>
                                </span>
                            </div>
                        )}
                        {!sidebarOpen && !mobileMenuOpen && (
                            <div className="w-8 h-8 bg-[#163E3E] rounded-md flex items-center justify-center text-white mx-auto">R</div>
                        )}
                        {mobileMenuOpen && (
                            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 hover:bg-slate-800 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 overflow-y-auto py-6 no-scrollbar">
                        <ul className="space-y-1.5 px-3">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href

                                return (
                                    <li key={item.title}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group
                                            ${isActive ? "bg-[#163E3E] text-white shadow-lg shadow-[#163E3E]/20" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}
                                            ${!sidebarOpen && !mobileMenuOpen ? "justify-center" : ""}
                                            `}
                                        >
                                            <span className={`${isActive ? "text-white" : "group-hover:text-white transition-colors"}`}>
                                                {item.icon}
                                            </span>
                                            {(sidebarOpen || mobileMenuOpen) && (
                                                <span className="flex-1 text-sm font-medium tracking-wide">{item.title}</span>
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-slate-700/50 space-y-2 flex-shrink-0">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                        >
                            <Globe className="w-5 h-5 flex-shrink-0" />
                            {(sidebarOpen || mobileMenuOpen) && <span className="text-sm font-medium">Main Website</span>}
                        </Link>

                        <button
                            onClick={() => {
                                dispatch(logout())
                                router.push("/")
                                toast.success("Logged out successfully")
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            {(sidebarOpen || mobileMenuOpen) && <span className="text-sm font-medium">Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out min-h-screen flex flex-col w-full
                ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}
                ml-0
                `}
            >
                {/* Header (Top Bar) */}
                <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-sm flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => (window.innerWidth < 1024 ? setMobileMenuOpen(true) : setSidebarOpen(!sidebarOpen))}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search inventory, orders..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-48 xl:w-80 focus:ring-2 focus:ring-[#163E3E]/20 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 hidden xs:block"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right hidden xs:block">
                                <p className="text-sm font-bold text-slate-800 leading-none">
                                    {user ? `${user.firstName} ${user.lastName}` : "Admin User"}
                                </p>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                                    {user?.role || "Admin"}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-[#163E3E]/5 rounded-full flex items-center justify-center text-[#163E3E] border border-[#163E3E]/10 flex-shrink-0 group-hover:bg-[#163E3E] group-hover:text-white transition-all">
                                <UserCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <div className="p-4 sm:p-8 flex-1 overflow-x-hidden">{children}</div>
            </main>
        </div>
    )
}
