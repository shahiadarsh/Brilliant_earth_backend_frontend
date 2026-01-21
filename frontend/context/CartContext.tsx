"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
    id: number | string;
    name: string;
    price: number;
    image: string;
    metal?: string;
    carat?: string;
    quantity: number;
}

interface User {
    name: string;
    email: string;
}

interface CartContextType {
    cart: CartItem[];
    wishlist: (number | string)[];
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number | string) => void;
    toggleWishlist: (id: number | string) => void;
    clearCart: () => void;
    totalAmount: number;
    cartCount: number;
    // Mock Auth
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, name: string) => void;
    logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [wishlist, setWishlist] = useState<(number | string)[]>([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // Persist to localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("ritzin_cart")
        const savedWishlist = localStorage.getItem("ritzin_wishlist")
        const savedAuth = localStorage.getItem("ritzin_auth")

        if (savedCart) setCart(JSON.parse(savedCart))
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
        if (savedAuth) {
            const auth = JSON.parse(savedAuth)
            setIsLoggedIn(auth.isLoggedIn)
            setUser(auth.user)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("ritzin_cart", JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem("ritzin_wishlist", JSON.stringify(wishlist))
    }, [wishlist])

    useEffect(() => {
        localStorage.setItem("ritzin_auth", JSON.stringify({ isLoggedIn, user }))
    }, [isLoggedIn, user])

    const login = (email: string, name: string) => {
        setIsLoggedIn(true)
        setUser({ name, email })
    }

    const logout = () => {
        setIsLoggedIn(false)
        setUser(null)
    }

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: number | string) => {
        setCart(prev => prev.filter(i => i.id !== id))
    }

    const toggleWishlist = (id: number | string) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const clearCart = () => setCart([])

    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

    return (
        <CartContext.Provider value={{
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            toggleWishlist,
            clearCart,
            totalAmount,
            cartCount,
            isLoggedIn,
            user,
            login,
            logout
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
