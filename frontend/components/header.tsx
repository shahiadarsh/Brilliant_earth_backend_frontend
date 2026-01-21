"use client"

import Link from "next/link"
import {
  ShoppingBag, Heart, Search, User, Menu, X, Monitor,
  Diamond, Gem, Circle, Square, Triangle, Hexagon,
  Octagon, Heart as HeartShape, Droplet, Sparkles,
  Crown, ChevronRight, ChevronLeft, LogOut, LayoutDashboard
} from "lucide-react"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { logout, setCredentials } from "@/lib/redux/slices/authSlice"
import { RootState } from "@/lib/redux/store"
import { useState, useRef, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { useSelection } from "@/context/SelectionContext"
import { useRouter } from "next/navigation"

const menuData: any = {
  "ENGAGEMENT RINGS": {
    columns: [
      {
        groups: [
          {
            title: "DESIGN YOUR OWN ENGAGEMENT RING",
            type: "icon-list",
            items: [
              { label: "Start with a Setting", icon: <Diamond strokeWidth={1} className="w-8 h-8" />, href: "/design/setting" },
              { label: "Start with a Natural Diamond", icon: <Gem strokeWidth={1} className="w-8 h-8" />, href: "/design/diamond?type=natural" },
              { label: "Start with a Lab Grown Diamond", icon: <Sparkles strokeWidth={1} className="w-8 h-8" />, href: "/design/diamond?type=lab" },
              { label: "Start with a Gemstone", icon: <Gem strokeWidth={1} className="w-8 h-8 text-blue-300" />, href: "/design/gemstone" },
              { label: "Start with a Bridal Set", icon: <Crown strokeWidth={1} className="w-8 h-8" />, href: "/design/bridal" },
            ]
          },
          {
            title: "SHOP BY SHAPE",
            type: "grid-icons",
            items: [
              { label: "Oval", icon: <div className="w-5 h-7 border-2 border-gray-300 rounded-[50%] flex-shrink-0" /> },
              { label: "Emerald", icon: <div className="w-5 h-7 border-2 border-gray-300 rounded-[2px] flex-shrink-0" /> },
              { label: "Round", icon: <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0" /> },
              { label: "Pear", icon: <div className="w-5 h-7 border-2 border-gray-300 rounded-b-full rounded-t-[70%] flex-shrink-0" /> },
              { label: "Asscher", icon: <div className="w-6 h-6 border-2 border-gray-300 rounded-[4px] rotate-45 flex-shrink-0" /> },
              { label: "Marquise", icon: <div className="w-4 h-8 border-2 border-gray-300 rounded-[50%] flex-shrink-0" /> },
              { label: "Radiant", icon: <div className="w-5 h-7 border-2 border-gray-300 rounded-[4px] flex-shrink-0" /> },
              { label: "Cushion", icon: <div className="w-6 h-6 border-2 border-gray-300 rounded-[8px] flex-shrink-0" /> },
              { label: "Princess", icon: <div className="w-6 h-6 border-2 border-gray-300 rounded-[1px] flex-shrink-0 rotate-45" /> },
              { label: "Heart", icon: <HeartShape className="w-6 h-6 text-gray-300" /> },
            ],
            bottomLink: "Shop All Engagement Rings >"
          }
        ]
      },
      {
        groups: [
          {
            title: "ENGAGEMENT RING STYLES",
            type: "list",
            items: ["Solitaire", "Three Stone", "Nature-Inspired", "Hidden Halo", "Antique & Vintage", "Halo"]
          },
          {
            title: "GEMSTONE ENGAGEMENT RINGS",
            type: "list",
            items: ["Moissanite", "Sapphire", "Emerald", "Aquamarine", "Morganite"]
          }
        ]
      },
      {
        groups: [
          {
            title: "FEATURED",
            type: "list",
            items: ["Ready to Ship Engagement Rings", "Top 20 Engagement Rings", "Signature Collections", "Men's Engagement Rings", "Custom Engagement Rings", "20th Anniversary Collection", "Tacori Collection"]
          }
        ]
      },
      {
        groups: [
          {
            title: "THE Ritzin DIFFERENCE",
            type: "list",
            items: [
              { label: "We've Got You Covered", href: "/info/warranty" },
              { label: "Diamond Transparency", href: "/info/diamond-transparency" },
              { label: "Repurposed Gold", href: "/info/repurposed-gold" },
              { label: "20 Years of Diamond Innovation", href: "/about" },
              { label: "Our Mission", href: "/info/our-mission" }
            ]
          },
          {
            title: "ENGAGEMENT RING GUIDES",
            type: "list",
            items: [
              { label: "Engagement Ring Styles & Setting Types", href: "/guides/engagement-ring-styles" },
              { label: "How Much to Spend on an Engagement Ring", href: "/guides/how-much-to-spend" },
              { label: "Platinum vs. Gold", href: "/guides/platinum-vs-gold" },
              { label: "Free Ring Sizer", href: "/guides/ring-sizer" },
              { label: "Engagement Ring Trends 2026", href: "/guides/trends-2026" }
            ]
          }
        ]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1620138478149-6bb627b0b8c6?auto=format&fit=crop&q=80&w=400&h=500",
      title: "ENDS SOON!",
      text: "1/4 CARAT LAB DIAMOND STUDS WITH PURCHASE OVER $1,000.",
      code: "USE CODE STUDS IN CART.*",
      linkText: "Shop Now"
    }
  },
  "WEDDING RINGS": {
    columns: [
      {
        groups: [
          {
            title: "WOMEN",
            type: "list",
            items: ["Women's Wedding Rings", "Design Your Own Stack", "Find My Matching Ring", "Diamond Rings", "Wedding Ring Sets", "Eternity Rings", "Anniversary Rings", "Curved Rings", "Bezel Rings"],
            bottomLink: "Shop All Wedding Rings >"
          }
        ]
      },
      {
        groups: [
          {
            title: "MEN",
            type: "list",
            items: ["Men's Wedding Bands", "Classic Bands", "Men's Engagement Rings", "Customize Your Own Ring", "Diamond Bands", "Matte Bands", "Hammered Bands", "Men's Jewelry"]
          }
        ]
      },
      {
        groups: [
          {
            title: "WOMEN'S BY METAL",
            type: "list",
            items: ["Platinum", "Yellow Gold", "White Gold", "Rose Gold"]
          },
          {
            title: "MEN'S BY METAL",
            type: "list",
            items: ["Platinum", "Yellow Gold", "Tungsten", "Meteorite", "White Gold"]
          }
        ]
      },
      {
        groups: [
          {
            title: "FEATURED",
            type: "list",
            items: ["Top 20 Women's Rings", "Top 20 Men's Bands", "Couple Rings", "Gender Neutral Rings", "Signature Collections"]
          },
          {
            title: "WEDDING BAND GUIDES",
            type: "list",
            items: [
              { label: "How to Pick a Wedding Band", href: "/guides/how-to-pick" },
              { label: "Ring Engraving Ideas", href: "/guides/engraving-ideas" },
              { label: "Wedding Ring Trends 2026", href: "/guides/wedding-trends" },
              { label: "Wedding Ring Cost Guide", href: "/guides/wedding-cost" }
            ]
          }
        ]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Bold Bezels",
      linkText: "Shop Now"
    }
  },
  "DIAMONDS": {
    columns: [
      {
        groups: [
          {
            title: "SHOP DIAMONDS",
            type: "list",
            items: [],
            topLinks: ["Shop Natural Diamonds >", "Shop Lab Grown Diamonds >"]
          },
          {
            title: "DESIGN YOUR OWN RING",
            type: "icon-list",
            items: [
              { label: "Start with a Natural Diamond", icon: <Gem strokeWidth={1.2} className="w-7 h-7" />, href: "/design/diamond?type=natural" },
              { label: "Start with a Lab Diamond", icon: <Sparkles strokeWidth={1.2} className="w-7 h-7" />, href: "/design/diamond?type=lab" },
              { label: "Start with a Setting", icon: <Diamond strokeWidth={1.2} className="w-7 h-7" />, href: "/design/setting" },
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: "SHOP DIAMONDS BY SHAPE",
            type: "grid-icons",
            items: [
              { label: "Round", icon: <Circle className="w-3.5 h-3.5" /> },
              { label: "Oval", icon: <Circle className="w-3.5 h-3.5 scale-y-75" /> },
              { label: "Cushion", icon: <Square className="w-3.5 h-3.5 rounded-sm" /> },
              { label: "Pear", icon: <Droplet className="w-3.5 h-3.5" /> },
              { label: "Princess", icon: <Square className="w-3.5 h-3.5 rotate-45" /> },
              { label: "Emerald", icon: <Square className="w-3.5 h-3.5 scale-x-75" /> },
              { label: "Marquise", icon: <Triangle className="w-3.5 h-3.5 scale-x-50" /> },
              { label: "Radiant", icon: <Octagon className="w-3.5 h-3.5" /> },
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: "DIAMOND COLLECTIONS",
            type: "list",
            items: ["Flawless Diamonds", "Pacific Green Lab Diamonds", "Carbon Capture Lab Diamonds", "Renewable Energy Diamonds", "Blockchain Diamonds"]
          }
        ]
      },
      {
        groups: [
          {
            title: "DIAMOND JEWELRY",
            type: "list",
            items: ["Diamond Earrings", "Diamond Necklaces", "Design Your Own Necklace", "Design Your Own Earrings", "Diamond Bracelets"]
          },
          {
            title: "DIAMOND GUIDES",
            type: "list",
            items: [
              { label: "Diamond Cut Guide", href: "/guides/diamond-cut" },
              { label: "Diamond Color Guide", href: "/guides/diamond-color" },
              { label: "Diamond Clarity Guide", href: "/guides/diamond-clarity" },
              { label: "Diamond Carat Guide", href: "/guides/diamond-carat" }
            ]
          }
        ]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Pacific Green",
      text: "LAB DIAMONDS",
      linkText: "Shop Now"
    }
  },
  "GEMSTONES": {
    columns: [
      {
        groups: [
          {
            title: "DESIGN YOUR OWN",
            type: "icon-list",
            items: [
              { label: "Start with a Gemstone", icon: <Gem strokeWidth={1.2} className="w-7 h-7" />, href: "/design/gemstone" },
              { label: "Start with a Setting", icon: <Diamond strokeWidth={1.2} className="w-7 h-7" />, href: "/design/setting" },
              { label: "Sapphire", icon: <Gem strokeWidth={1.2} className="w-7 h-7 text-blue-600/30" />, href: "/gemstones?type=sapphire" },
              { label: "Emerald", icon: <Gem strokeWidth={1.2} className="w-7 h-7 text-green-600/30" />, href: "/gemstones?type=emerald" },
              { label: "Moissanite", icon: <Gem strokeWidth={1.2} className="w-7 h-7 text-gray-400/30" />, href: "/gemstones?type=moissanite" },
              { label: "Ruby", icon: <Gem strokeWidth={1.2} className="w-7 h-7 text-red-600/30" />, href: "/gemstones?type=ruby" },
            ],
            bottomLink: "Shop All Gemstones >"
          }
        ]
      },
      {
        groups: [
          {
            title: "SHOP BY COLOR",
            type: "list",
            items: ["Blue", "Green", "Pink", "Purple", "Bi-color", "Teal", "Peach"]
          },
          {
            title: "SHOP BY SHAPE",
            type: "grid-icons",
            items: [
              { label: "Oval", icon: <Circle className="w-3.5 h-3.5 scale-y-75" /> },
              { label: "Round", icon: <Circle className="w-3.5 h-3.5" /> },
              { label: "Cushion", icon: <Square className="w-3.5 h-3.5 rounded-sm" /> },
              { label: "Emerald", icon: <Square className="w-3.5 h-3.5 scale-x-75" /> },
            ]
          }
        ]
      },
      {
        groups: [
          {
            title: "PRESET RINGS",
            type: "list",
            items: ["Moissanite Engagement Rings", "Sapphire Engagement Rings", "Aquamarine Engagement Rings", "Morganite Engagement Rings"]
          }
        ]
      },
      {
        groups: [
          {
            title: "GEMSTONE JEWELRY",
            type: "list",
            items: ["Birthstone Jewelry", "Cocktail Rings", "Gemstone Necklaces", "Gemstone Earrings", "Gemstone Rings", "All Gemstone Jewelry"]
          }
        ]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1600003014608-c2ccc1570a65?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Bi-Color Gems",
      linkText: "Shop Now"
    }
  },
  "JEWELRY": {
    columns: [
      {
        groups: [{
          title: "JEWELRY",
          type: "list",
          items: ["Earrings", "Necklaces", "Rings", "Bracelets", "Men's Jewelry", "Lab Diamond Jewelry", "Birthstone Jewelry", "Gemstone Jewelry"],
          bottomLink: "Shop All Jewelry >"
        }]
      },
      {
        groups: [{
          title: "SHOP BY STYLE",
          type: "list",
          items: ["Tennis Bracelets", "Diamond Studs", "Stacking Rings", "Fashion Rings", "Cocktail Rings", "Tennis Necklaces", "Diamond Necklaces", "Promise Rings"]
        }]
      },
      {
        groups: [{
          title: "BEST SELLERS",
          type: "list",
          items: ["Best Selling Jewelry", "Best Selling Necklaces", "Best Selling Earrings", "Best Selling Bracelets"]
        }]
      },
      {
        groups: [{
          title: "DESIGN YOUR OWN",
          type: "list",
          items: ["Diamond Earrings", "Diamond Necklace", "Gemstone Necklace", "Gemstone Ring", "Diamond Ring"]
        }]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1576158187530-98633e8b858c?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Medallions",
      linkText: "Shop Now"
    }
  },
  "GIFTS": {
    columns: [
      {
        groups: [{
          title: "TOP GIFTS",
          type: "list",
          items: ["Gifts Under $250", "Gifts Under $500", "Stacking Rings", "Best Selling Gifts", "Tennis Bracelets", "Gemstone Rings", "Gold Jewelry"],
          bottomLink: "Shop All Gifts >"
        }]
      },
      {
        groups: [
          { title: "BY RECIPIENT", type: "list", items: ["Gifts For Her", "Gifts For Him"] },
          { title: "BY OCCASION", type: "list", items: ["Valentine's Day", "Anniversary", "Birthday", "Bridal Party"] }
        ]
      },
      {
        groups: [{
          title: "BIRTHSTONES",
          type: "colors",
          items: [
            { label: "Jan - Garnet", color: "#7f1d1d" },
            { label: "Feb - Amethyst", color: "#7e22ce" },
            { label: "Mar - Aquamarine", color: "#67e8f9" },
            { label: "Apr - Diamond", color: "#e5e7eb" },
            { label: "May - Emerald", color: "#15803d" },
            { label: "Jun - Pearl", color: "#f3f4f6" },
            { label: "Jul - Ruby", color: "#991b1b" },
            { label: "Aug - Peridot", color: "#a3e635" },
          ]
        }]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Birthstones",
      linkText: "Shop Now"
    }
  },
  "ABOUT": {
    columns: [
      {
        groups: [{
          title: "ABOUT US",
          type: "list",
          items: [
            { label: "Our Story", href: "/about" },
            { label: "Our Mission", href: "/info/our-mission" },
            { label: "Responsible Sourcing", href: "/info/responsible-sourcing" },
            { label: "Repurposed Gold", href: "/info/repurposed-gold" },
            { label: "2024 Mission Report", href: "/info/mission-report-2024" },
            { label: "How We Give Back", href: "/info/give-back" },
            { label: "Blog", href: "/blog" }
          ]
        }]
      },
      {
        groups: [
          {
            title: "CAREERS",
            type: "list",
            items: [
              { label: "Open Jobs", href: "/careers" },
              { label: "Inclusivity", href: "/info/inclusivity" }
            ]
          },
          {
            title: "OUR STORES",
            type: "list",
            items: [
              { label: "Store Locations", href: "/stores" },
              { label: "Virtual Appointment", href: "/appointment" }
            ]
          }
        ]
      },
      {
        groups: [{
          title: "FEATURED GUIDES",
          type: "list",
          items: [
            { label: "Marriage Compatibility", href: "/guides/marriage-compatibility" },
            { label: "Engagement Captions", href: "/guides/engagement-captions" },
            { label: "Angel Numbers", href: "/guides/angel-numbers" },
            { label: "Capsule Jewelry", href: "/guides/capsule-jewelry" },
            { label: "Jewelry Essentials", href: "/guides/jewelry-essentials" }
          ]
        }]
      }
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400&h=500",
      title: "Jewelry Redefined",
      linkText: "Shop Now"
    }
  }
}

function IconItem({ icon, label, href }: { icon: any, label: string, href?: string }) {
  const { clearSelection, setCurrentStep, setStartType } = useSelection()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (href?.startsWith('/design')) {
      e.preventDefault()
      clearSelection()
      if (href.includes('setting')) {
        setCurrentStep('setting')
        setStartType('setting')
      } else if (href.includes('diamond')) {
        setCurrentStep('diamond')
        setStartType('diamond')
      } else if (href.includes('gemstone')) {
        setCurrentStep('gemstone')
        setStartType('gemstone')
      }
      router.push(href)
    }
  }

  return (
    <Link href={href || "#"} onClick={handleClick} className="flex items-center gap-4 py-2 group/item">
      <span className="text-[#333] group-hover/item:text-[#163E3E] transition-colors">{icon}</span>
      <span className="text-[15px] text-[#333] font-normal group-hover/item:text-[#163E3E] transition-all leading-snug">
        {label}
      </span>
    </Link>
  )
}

function ShapeItem({ icon, label, activeMenu }: { icon: any, label: string, activeMenu: string | null }) {
  const slug = label.toLowerCase().replace(/ /g, '-');
  const parentSlug = activeMenu?.toLowerCase().replace(/ /g, '-');
  const href = `/${parentSlug}/${slug}`;

  return (
    <Link href={href} className="flex items-center gap-3 py-1.5 hover:bg-gray-50 rounded transition-colors group">
      <span className="text-gray-400 group-hover:text-[#163E3E] transition-colors scale-75 transform origin-left">{icon}</span>
      <span className="text-[13px] text-gray-600 font-normal group-hover:text-[#163E3E] capitalize tracking-normal">{label}</span>
    </Link>
  )
}

const pathMap: Record<string, string> = {
  "ENGAGEMENT RINGS": "/engagement-rings",
  "WEDDING RINGS": "/wedding-rings",
  "DIAMONDS": "/diamonds",
  "GEMSTONES": "/gemstones",
  "JEWELRY": "/jewelry",
  "GIFTS": "/gifts",
  "ABOUT": "/about"
}

export function Header() {
  const { cartCount, wishlist } = useCart()
  const { clearSelection, setCurrentStep, setStartType } = useSelection()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isAuthenticated: isLoggedIn } = useSelector((state: RootState) => state.auth)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  const handleMouseEnter = (menuName: string) => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setActiveMenu(menuName)
    }
  }

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null)
      }, 100)
    }
  }

  return (
    <div className="w-full font-sans bg-white relative">
      <div className="bg-[#163E3E] text-white text-[10px] sm:text-[11px] tracking-wide py-2.5 px-4 text-center cursor-pointer hover:bg-[#123333] transition-colors relative z-[60]">
        <span className="font-medium">ENDS SOON!</span> Receive a Natural Diamond Necklace With Purchase Over $1,000. <span className="hidden sm:inline">Use Code </span><span className="font-bold">DIAMOND</span><span className="inline sm:hidden"> Code</span>. &gt;
      </div>

      <header className="relative bg-white border-b border-gray-200 z-[50]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-2 sm:py-4 lg:pt-5 lg:pb-0">
          <div className="flex items-center justify-between">

            {/* Mobile Burger - Left on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Desktop Left Nav */}
            <div className="hidden lg:flex items-center gap-4 text-xs xl:text-sm text-gray-700">
              <span className="tracking-wide cursor-text">800.691.0952</span>
              <Link href="/stores" className="hover:text-[#163E3E] hover:underline underline-offset-4 transition-all">
                Stores
              </Link>
              <Link href="/virtual-appointment" className="flex items-center gap-1.5 hover:text-[#163E3E] hover:underline underline-offset-4 transition-all group">
                <div className="relative">
                  <Monitor strokeWidth={1.5} className="w-4 h-4" />
                  <div className="absolute bottom-[2px] left-[3px] w-2 h-1 bg-gray-700 rounded-t-full group-hover:bg-[#163E3E] transition-colors"></div>
                </div>
                <span>Virtual Appointment</span>
              </Link>
            </div>

            {/* Logo - Centered on Mobile and Tablet, Left-ish on Desktop */}
            <div className="flex-1 flex justify-center lg:flex-none">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="font-serif text-lg sm:text-xl md:text-2xl xl:text-[26px] tracking-[0.1em] sm:tracking-[0.15em] text-gray-900 group-hover:opacity-80 transition-opacity whitespace-nowrap">
                  Ritzin<sup className="text-[7px] sm:text-[9px] align-top top-[-4px] sm:top-[-8px] relative">®</sup>
                </div>
                <div className="hidden xl:flex items-center">
                  <div className="h-5 w-px bg-gray-300 mx-2"></div>
                  <span className="font-serif italic text-xl text-gray-600">20 Years of Yes</span>
                </div>
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 xl:gap-2 text-gray-700">
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer sm:block">
                <Search strokeWidth={1.5} className="w-5 h-5" />
              </button>
              <div className="relative z-[60]">
                {isLoggedIn ? (
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer hidden sm:block focus:outline-none"
                  >
                    <User strokeWidth={1.5} className={`w-5 h-5 ${showProfileMenu ? "text-[#163E3E]" : "text-gray-700"}`} />
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#163E3E] rounded-full transition-opacity ${showProfileMenu ? "opacity-100" : "opacity-0"}`} />
                  </button>
                ) : (
                  <Link href="/login" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer hidden sm:block">
                    <User strokeWidth={1.5} className="w-5 h-5 text-gray-700" />
                  </Link>
                )}

                {isLoggedIn && showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-[65] cursor-default" onClick={() => setShowProfileMenu(false)} />
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden z-[70] animate-in fade-in zoom-in-95 duration-200">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100 bg-[#F8FAFC]">
                          <p className="text-sm font-bold text-[#163E3E] truncate">{user?.firstName} {user?.lastName}</p>
                          <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setShowProfileMenu(false)
                            dispatch(logout())
                            router.push("/")
                            toast.success("Logged out successfully")
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Link href="/wishlist" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors hidden md:block cursor-pointer relative">
                <Heart strokeWidth={1.5} className={`w-5 h-5 ${wishlist.length > 0 ? "fill-red-500 text-red-500" : ""}`} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1 bg-red-500 text-white text-[7px] w-3 h-3 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative cursor-pointer">
                <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1 bg-[#163E3E] text-white px-1 text-[8px] min-w-[12px] h-3 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button className="hidden sm:flex items-center gap-1 p-1.5 hover:bg-gray-100 rounded-md transition-colors ml-1 cursor-pointer">
                <span className="text-base sm:text-lg leading-none">🇺🇸</span>
                <span className="text-[10px] sm:text-xs font-medium">USD</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 h-10 mt-2">
            {Object.keys(menuData).map((key) => (
              <div
                key={key}
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
                className="h-full flex items-center"
              >
                <Link
                  href={pathMap[key] || "#"}
                  className={`text-[12px] xl:text-[13px] tracking-[0.05em] font-medium relative py-3 transition-colors uppercase
                    ${activeMenu === key ? "text-[#163E3E]" : "text-gray-700 hover:text-[#163E3E]"}
                  `}
                >
                  {key}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#163E3E] transition-all duration-300
                    ${activeMenu === key ? "w-full" : "w-0"}
                  `}></span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Mega Menu Overlay (Desktop Only) */}
        <div
          className={`hidden lg:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out z-50
                ${activeMenu ? "max-h-[650px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
            `}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setActiveMenu(activeMenu)
          }}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu && menuData[activeMenu] && (
            <div className="max-w-[1400px] mx-auto px-6 py-8">
              <div className="flex gap-6 justify-between">

                <div className="flex-1 grid grid-cols-4 xl:grid-cols-5 gap-6">
                  {menuData[activeMenu].columns.map((col: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-6">
                      {col.groups.map((group: any, gIdx: number) => (
                        <div key={gIdx}>
                          <h3 className={`font-bold tracking-wider text-gray-900 uppercase mb-4 ${group.type === "icon-list" ? "text-[16px] leading-[1.3] font-serif max-w-[200px]" : "text-[11px]"
                            }`}>
                            {group.title}
                          </h3>

                          {group.topLinks && (
                            <div className="flex flex-col gap-1.5 mb-3">
                              {group.topLinks.map((link: string, i: number) => (
                                <Link key={i} href="#" className="text-[13px] font-medium text-gray-900 hover:text-[#163E3E] hover:underline">{link}</Link>
                              ))}
                            </div>
                          )}

                          {group.type === "icon-list" && (
                            <div className="flex flex-col gap-1">
                              {group.items.map((item: any, i: number) => (
                                <IconItem key={i} {...item} />
                              ))}
                            </div>
                          )}

                          {group.type === "grid-icons" && (
                            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                              {group.items.map((item: any, i: number) => (
                                <ShapeItem key={i} {...item} activeMenu={activeMenu} />
                              ))}
                            </div>
                          )}

                          {group.type === "list" && (
                            <ul className="flex flex-col gap-2">
                              {group.items.map((item: any, i: number) => {
                                const label = typeof item === 'string' ? item : item.label;
                                // Generate a slug-friendly URL
                                const slug = label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/'/g, '');
                                const parentSlug = activeMenu?.toLowerCase().replace(/ /g, '-');
                                const href = typeof item === 'object' && item.href ? item.href : `/${parentSlug}/${slug}`;

                                return (
                                  <li key={i}>
                                    <Link href={href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline underline-offset-2 decoration-[#163E3E] transition-all block leading-snug">
                                      {label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}

                          {group.type === "colors" && (
                            <ul className="flex flex-col gap-2">
                              {group.items.map((item: any, i: number) => (
                                <li key={i}>
                                  <Link href="#" className="flex items-center gap-2.5 text-[13px] text-gray-600 hover:text-[#163E3E] group">
                                    <span
                                      className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                                      style={{ backgroundColor: item.color }}
                                    ></span>
                                    <span className="group-hover:underline underline-offset-2">{item.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}

                          {group.bottomLink && (
                            <div className="mt-4">
                              <Link href={`/${activeMenu?.toLowerCase().replace(/ /g, '-')}`} className="text-[13px] font-bold text-gray-900 hover:text-[#163E3E] hover:underline decoration-2 underline-offset-4">
                                {group.bottomLink}
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {menuData[activeMenu].promo && (
                  <div className="w-[280px] xl:w-[320px] flex-shrink-0">
                    <div className="relative group cursor-pointer overflow-hidden bg-[#163E3E] h-full flex flex-col items-center justify-center p-8 text-center text-white">
                      <div className="border border-white/20 w-full h-full absolute inset-2 pointer-events-none" />

                      <div className="relative z-10 py-6 px-4 border border-white/30 bg-[#163E3E]/50 backdrop-blur-sm">
                        <h4 className="text-[14px] font-bold tracking-[0.2em] mb-4 uppercase">ENDS SOON!</h4>
                        <p className="text-[18px] font-serif leading-tight mb-6">
                          {menuData[activeMenu].promo.text}
                        </p>
                        <p className="text-[10px] font-bold tracking-widest mb-8 opacity-90">
                          {menuData[activeMenu].promo.code}
                        </p>
                        <span className="inline-block text-[11px] font-bold border-b-2 border-white pb-0.5 hover:opacity-80 transition-opacity uppercase tracking-widest">
                          {menuData[activeMenu].promo.linkText}
                        </span>
                      </div>

                      <div className="mt-6 text-[9px] uppercase tracking-[0.1em] opacity-60">
                        *See Terms for Details
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Background Overlay for Desktop Mega Menu */}
        <div
          className={`hidden lg:block fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 top-[145px]
            ${activeMenu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
          onMouseEnter={handleMouseLeave}
        ></div>

        {/* --- MOBILE DRAWER MENU --- */}
        <div
          className={`fixed inset-0 z-[100] transform transition-transform duration-300 ease-in-out lg:hidden
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-full max-w-[320px] h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {mobileActiveCategory && (
                  <button
                    onClick={() => setMobileActiveCategory(null)}
                    className="p-1 -ml-1 text-[#163E3E] hover:bg-gray-50 rounded transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <span className="font-serif text-lg sm:text-xl tracking-wider text-gray-900 uppercase">
                  {mobileActiveCategory ? mobileActiveCategory : "Menu"}
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setMobileActiveCategory(null)
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4">
              {!mobileActiveCategory ? (
                // --- Top Level Categories ---
                <div className="flex flex-col">
                  {Object.keys(menuData).map((key) => (
                    <button
                      key={key}
                      onClick={() => setMobileActiveCategory(key)}
                      className="px-4 py-4 text-sm font-medium text-gray-800 hover:bg-gray-50 flex justify-between items-center group border-b border-gray-50"
                    >
                      <span className="tracking-wide">{key}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#163E3E]" />
                    </button>
                  ))}
                  <div className="mt-8 px-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                      <Link href="/appointment" className="text-sm font-medium text-gray-700 flex items-center gap-3">
                        <Monitor className="w-4 h-4" /> Virtual Appointment
                      </Link>
                      <Link href={isLoggedIn ? "/account" : "/login"} className="text-sm font-medium text-gray-700 flex items-center gap-3">
                        <User className="w-4 h-4" /> {isLoggedIn ? `Account (${user?.name})` : "Sign In / Register"}
                      </Link>
                      <Link href="/wishlist" className="text-sm font-medium text-gray-700 flex items-center gap-3">
                        <Heart className="w-4 h-4" /> Wishlist
                      </Link>
                      <Link href="/cart" className="text-sm font-medium text-gray-700 flex items-center gap-3">
                        <ShoppingBag className="w-4 h-4" /> Shopping Bag
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                // --- Sub Category View ---
                <div className="flex flex-col gap-8 px-4 pb-12 animate-in slide-in-from-right-4 duration-300">
                  <button
                    onClick={() => setMobileActiveCategory(null)}
                    className="flex items-center gap-2 py-3 text-[#163E3E] font-bold text-[11px] uppercase tracking-[0.2em] border-b border-[#163E3E]/10 mb-2 w-full text-left"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to All Categories
                  </button>
                  {menuData[mobileActiveCategory].columns.map((col: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-8">
                      {col.groups.map((group: any, gIdx: number) => (
                        <div key={gIdx} className="flex flex-col gap-4">
                          <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#163E3E] uppercase border-b border-[#163E3E]/10 pb-2">
                            {group.title}
                          </h4>
                          <div className="flex flex-col gap-3">
                            {group.topLinks && group.topLinks.map((link: any, i: number) => (
                              <Link key={i} href="#" className="text-sm font-semibold text-gray-900">{link}</Link>
                            ))}
                            {group.type === "icon-list" && group.items.map((item: any, i: number) => (
                              <Link
                                key={i}
                                href={item.href || "#"}
                                onClick={(e) => {
                                  if (item.href?.startsWith('/design')) {
                                    e.preventDefault()
                                    clearSelection()
                                    if (item.href.includes('setting')) {
                                      setCurrentStep('setting')
                                      setStartType('setting')
                                    } else if (item.href.includes('diamond')) {
                                      setCurrentStep('diamond')
                                      setStartType('diamond')
                                    } else if (item.href.includes('gemstone')) {
                                      setCurrentStep('gemstone')
                                      setStartType('gemstone')
                                    }
                                    router.push(item.href)
                                    setMobileMenuOpen(false)
                                  }
                                }}
                                className="flex items-center gap-3 text-sm text-gray-600"
                              >
                                {item.icon} {item.label}
                              </Link>
                            ))}
                            {group.type === "grid-icons" && (
                              <div className="grid grid-cols-2 gap-4">
                                {group.items.map((item: any, i: number) => (
                                  <Link key={i} href="#" className="flex items-center gap-2 text-[12px] text-gray-600 bg-gray-50 p-2 rounded">
                                    {item.icon} {item.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                            {group.type === "list" && group.items.map((item: string, i: number) => (
                              <Link key={i} href="#" className="text-sm text-gray-600 hover:text-[#163E3E]">{item}</Link>
                            ))}
                            {group.bottomLink && (
                              <Link href="#" className="text-sm font-bold text-[#163E3E] mt-2">{group.bottomLink}</Link>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Category Promo on Mobile */}
                  {menuData[mobileActiveCategory].promo && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm mt-4">
                      <img src={menuData[mobileActiveCategory].promo.image} alt="promo" className="w-full h-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/40 p-4 text-white text-center">
                        <p className="text-lg font-serif">{menuData[mobileActiveCategory].promo.title}</p>
                        <Link href="#" className="text-xs underline mt-1 block">Shop Now</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sticky Footer in Mobile Menu */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <p className="text-[11px] text-gray-500 text-center uppercase tracking-widest mb-1">Assistance</p>
              <p className="text-center font-bold text-[#163E3E]">800.691.0952</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
