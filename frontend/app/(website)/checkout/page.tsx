"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { ShieldCheck, Lock, CreditCard, Truck, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CheckoutPage() {
    const { cart, totalAmount, clearCart } = useCart()
    const router = useRouter()
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Processing
    const [isProcessing, setIsProcessing] = useState(false)

    const subtotal = totalAmount
    const tax = Math.round(subtotal * 0.08)
    const total = subtotal + tax

    useEffect(() => {
        if (cart.length === 0 && step !== 3) {
            router.push("/cart")
        }
    }, [cart, router, step])

    const handleNext = () => {
        if (step === 2) {
            setIsProcessing(true)
            setStep(3)
            // Simulate Payment Processing
            setTimeout(() => {
                clearCart()
                router.push("/order-success")
            }, 3000)
        } else {
            setStep(step + 1)
        }
    }

    if (cart.length === 0 && step !== 3) return null

    return (
        <main className="min-h-screen bg-gray-50/50 py-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/cart" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft className="w-3 h-3" /> Back to Bag
                    </Link>
                    <div className="flex items-center gap-4">
                        <Lock className="w-4 h-4 text-[#163E3E]" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Secure Checkout</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Side: Forms */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Progress Steps */}
                        <div className="flex items-center gap-4 mb-4">
                            {[1, 2].map((s) => (
                                <div key={s} className="flex items-center gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= s ? 'bg-[#163E3E] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {s}
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold tracking-widest ${step >= s ? 'text-black' : 'text-gray-400'}`}>
                                        {s === 1 ? 'Shipping' : 'Payment'}
                                    </span>
                                    {s === 1 && <div className={`w-12 h-[1px] ${step > 1 ? 'bg-[#163E3E]' : 'bg-gray-200'}`} />}
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-8 md:p-12 shadow-sm rounded-sm">
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="font-serif text-3xl text-gray-900 border-b border-gray-50 pb-6">Shipping Address</h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">First Name</label>
                                            <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="Jane" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Last Name</label>
                                            <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="Doe" />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Address</label>
                                            <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="123 Ritzin Lane" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">City</label>
                                            <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="New York" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Zip Code</label>
                                            <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="10001" />
                                        </div>
                                    </div>
                                    <button onClick={handleNext} className="w-full bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all">
                                        Continue to Payment
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <h2 className="font-serif text-3xl text-gray-900 border-b border-gray-50 pb-6">Payment</h2>
                                    <div className="space-y-6">
                                        <div className="p-6 border border-[#163E3E] bg-[#163E3E]/5 flex items-center justify-between rounded-sm">
                                            <div className="flex items-center gap-4">
                                                <CreditCard className="w-5 h-5 text-[#163E3E]" />
                                                <span className="text-sm font-medium">Credit Card</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-8 h-5 bg-gray-200 rounded-sm" />
                                                <div className="w-8 h-5 bg-gray-200 rounded-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Card Number</label>
                                                <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="•••• •••• •••• ••••" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">Expiry Date</label>
                                                    <input type="text" className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="MM/YY" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block mb-2">CVV</label>
                                                    <input type="password" size={3} className="w-full border border-gray-100 p-4 text-sm outline-none focus:border-[#163E3E] transition-colors" placeholder="•••" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleNext} className="w-full bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all">
                                        Complete Purchase
                                    </button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="py-20 flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500">
                                    <div className="relative">
                                        <div className="w-24 h-24 border-4 border-[#163E3E]/10 border-t-[#163E3E] rounded-full animate-spin"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ShieldCheck className="w-8 h-8 text-[#163E3E]" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-4">
                                        <h2 className="font-serif text-3xl text-gray-900">Processing Payment</h2>
                                        <p className="text-sm text-gray-500 font-light italic">Securely verifying your transaction with Ritzin Vault...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-10 md:p-12 shadow-sm rounded-sm sticky top-32 space-y-10 border border-gray-100">
                            <h3 className="font-serif text-2xl text-gray-900">Order Summary</h3>

                            <div className="space-y-8 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center">
                                        <div className="w-16 h-20 bg-gray-50 relative flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-serif truncate text-gray-900">{item.name}</h4>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-1">{item.metal}</p>
                                            <p className="text-sm font-medium text-[#163E3E] mt-2">${item.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                                    <span className="text-gray-400">Shipping</span>
                                    <span className="text-green-600">Complimentary</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest font-serif">
                                    <span className="text-gray-400">Estimated Tax</span>
                                    <span>${tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                    <span className="font-serif text-2xl">Total</span>
                                    <span className="text-3xl font-serif text-[#163E3E]">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 flex items-start gap-4">
                                <ShieldCheck className="w-5 h-5 text-gray-300 mt-1" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Secure Purchase</p>
                                    <p className="text-[9px] text-gray-400 leading-relaxed font-light">Your security is our priority. Every Ritzin transaction is encrypted and insured.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
