"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { useSignupMutation } from "@/lib/redux/slices/authApiSlice"
import { setCredentials } from "@/lib/redux/slices/authSlice"
import { toast } from "sonner"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const dispatch = useDispatch()
  const router = useRouter()
  const [signup, { isLoading }] = useSignupMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match")
    }

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      }).unwrap()

      dispatch(setCredentials({ user: result.data.user, token: result.token }))
      toast.success("Account created successfully")
      router.push("/")
    } catch (err: any) {
      toast.error(err.data?.message || "Registration failed")
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6 py-32">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-sm p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#163E3E]" />

        <div className="space-y-10">
          <div className="text-center space-y-4">
            <Link href="/" className="font-serif text-3xl tracking-widest text-gray-900 uppercase inline-block mb-4">
              Ritzin<sup className="text-[10px]">®</sup>
            </Link>
            <h1 className="font-serif text-4xl text-gray-900">Join Ritzin</h1>
            <p className="text-gray-500 font-light text-sm italic">Create your account for a personalized jewelry experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-gray-100 p-4 outline-none text-sm font-light group-focus-within:border-[#163E3E] transition-all"
                  placeholder="John"
                />
              </div>
              <div className="relative group">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-gray-100 p-4 outline-none text-sm font-light group-focus-within:border-[#163E3E] transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Email Address</label>
              <div className="flex items-center border border-gray-100 p-4 group-focus-within:border-[#163E3E] transition-all">
                <Mail className="w-4 h-4 text-gray-300 mr-4" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex-1 outline-none text-sm font-light"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Password</label>
              <div className="flex items-center border border-gray-100 p-4 group-focus-within:border-[#163E3E] transition-all">
                <Lock className="w-4 h-4 text-gray-300 mr-4" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="flex-1 outline-none text-sm font-light"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 absolute -top-2 left-4 bg-white px-2 z-10">Confirm Password</label>
              <div className="flex items-center border border-gray-100 p-4 group-focus-within:border-[#163E3E] transition-all">
                <Lock className="w-4 h-4 text-gray-300 mr-4" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="flex-1 outline-none text-sm font-light"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#163E3E] text-white py-5 font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-8 border-t border-gray-50">
            <p className="text-[11px] text-gray-400 font-medium mb-4">ALREADY HAVE AN ACCOUNT?</p>
            <Link href="/login" className="text-[11px] font-bold text-[#163E3E] uppercase tracking-widest hover:underline underline-offset-4">Sign In Instead</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
