"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/lib/redux/slices/authApiSlice"
import { setCredentials } from "@/lib/redux/slices/authSlice"
import { toast } from "sonner"

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loginApi, { isLoading }] = useLoginMutation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await loginApi({ email, password }).unwrap()
      dispatch(setCredentials({ user: result.data.user, token: result.token }))
      toast.success("Welcome back to Ritzin")

      // Redirect based on role
      if (result.data.user.role === 'admin') {
        router.push("/admin")
      } else {
        router.push("/account")
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Authentication failed")
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6 py-32">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-sm p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#163E3E]" />

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Link href="/" className="font-serif text-3xl tracking-widest text-gray-900 uppercase inline-block mb-8">
              Ritzin<sup className="text-[10px]">®</sup>
            </Link>
            <h1 className="font-serif text-4xl text-gray-900">Sign In to Ritzin</h1>
            <p className="text-gray-500 font-light text-sm italic">Access your orders, wishlist, and expert consultations.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative group">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Email Address</label>
                <div className="flex items-center border border-gray-100 p-5 group-focus-within:border-[#163E3E] transition-all">
                  <Mail className="w-5 h-5 text-gray-300 mr-4" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 outline-none text-sm font-light placeholder:text-gray-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Password</label>
                <div className="flex items-center border border-gray-100 p-5 group-focus-within:border-[#163E3E] transition-all">
                  <Lock className="w-5 h-5 text-gray-300 mr-4" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 outline-none text-sm font-light placeholder:text-gray-200"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-8 border-t border-gray-50 flex flex-col gap-4">
            <p className="text-[11px] text-gray-400 font-medium">DON'T HAVE AN ACCOUNT?</p>
            <Link href="/signup" className="text-[11px] font-bold text-[#163E3E] uppercase tracking-widest hover:underline underline-offset-4">Create An Account</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
