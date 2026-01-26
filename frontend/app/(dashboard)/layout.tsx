"use client"

import { CartProvider } from "@/context/CartContext"
import { SelectionProvider } from "@/context/SelectionContext"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <SelectionProvider>
                <div className="min-h-screen bg-[#F8FAFC]">
                    {children}
                </div>
            </SelectionProvider>
        </CartProvider>
    )
}
