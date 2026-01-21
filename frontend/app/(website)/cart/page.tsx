"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Trash2, ArrowRight, ShieldCheck, Sparkles, MoveRight } from "lucide-react"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function CartPage() {
  const { cart, removeFromCart, totalAmount, clearCart } = useCart()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      router.push("/checkout")
    }, 1000)
  }

  const subtotal = totalAmount
  const shipping = 0
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400">
              <Link href="/" className="hover:text-black">Home</Link>
              <span className="text-gray-200">/</span>
              <span className="text-black">Shopping Bag</span>
            </nav>
            <h1 className="text-[48px] font-serif text-gray-900 leading-tight">Your Shopping Bag</h1>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#163E3E]">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'} in Bag
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-40 bg-[#FAFAFA] border border-dashed border-gray-200 rounded-sm animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-10">
              <Sparkles className="w-8 h-8 text-[#163E3E] opacity-20" />
            </div>
            <h2 className="text-2xl font-serif text-gray-400 mb-8 font-light">Your bag is currently empty</h2>
            <Link
              href="/engagement-rings"
              className="inline-flex items-center gap-6 bg-[#163E3E] text-white px-12 py-6 uppercase font-bold tracking-[0.3em] text-[11px] hover:bg-black transition-all shadow-xl group"
            >
              Start Designing
              <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-10">
              {cart.map((item) => (
                <div key={item.id} className="group border-b border-gray-100 pb-10 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex gap-10">
                    <div className="w-32 h-40 bg-[#FAFAFA] overflow-hidden flex-shrink-0 relative group-hover:shadow-lg transition-all duration-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover transition-all duration-[2000ms] group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-serif text-2xl text-gray-900 group-hover:text-[#163E3E] transition-colors">{item.name}</h3>
                          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-gray-400">{item.metal}</span>
                            {item.carat && <span className="w-1 h-1 bg-gray-200 rounded-full"></span>}
                            {item.carat && <span className="text-gray-400">{item.carat} Carat</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:border-red-100 transition-all"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#163E3E]/60">
                            <ShieldCheck className="w-3 h-3" /> Lifetime Warranty
                          </div>
                          <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-[#163E3E]/60">
                            <Sparkles className="w-3 h-3" /> Ethical Stone
                          </div>
                        </div>
                        <p className="text-2xl font-serif text-[#163E3E]">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#FAFAFA] p-12 sticky top-32 border border-gray-100 rounded-sm">
                <h2 className="font-serif text-3xl text-gray-900 mb-10">Order Summary</h2>

                <div className="space-y-6 mb-10 text-[11px] font-bold uppercase tracking-[0.2em]">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-[10px]">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-[10px]">Estimated Shipping</span>
                    <span className="text-green-600">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-[10px]">Estimated Tax</span>
                    <span className="text-gray-900">${tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8 mb-12 flex justify-between items-end">
                  <span className="font-serif text-2xl text-gray-900">Total</span>
                  <span className="text-4xl font-serif text-[#163E3E] font-light">${total.toLocaleString()}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-[#163E3E] text-white py-7 uppercase font-bold tracking-[0.3em] text-[12px] hover:bg-black transition-all shadow-2xl mb-6 disabled:opacity-50"
                >
                  {isCheckingOut ? "Processing..." : "Secure Checkout"}
                </button>

                <div className="space-y-3">
                  <p className="text-[10px] text-gray-400 italic text-center leading-relaxed">
                    Tax and shipping estimated for United States. <br /> International options available at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
