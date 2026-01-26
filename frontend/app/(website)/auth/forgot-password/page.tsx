"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.success) {
                setSubmitted(true);
                toast.success("Password reset link sent!");
            } else {
                toast.error(data.message || "Failed to send reset link");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                {!submitted ? (
                    <>
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1a1a1a]">
                                Forgot Password?
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#c2a26d] focus:border-[#c2a26d]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a1a1a] hover:bg-[#333] transition-all ${loading ? "opacity-70" : ""}`}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="text-[#c2a26d] text-6xl italic font-serif">✉</div>
                        <h2 className="text-2xl font-bold text-gray-800">Check Your Email</h2>
                        <p className="text-gray-600">
                            We've sent a password reset link to <span className="font-semibold">{email}</span>.
                        </p>
                        <Link
                            href="/auth/login"
                            className="inline-block bg-[#1a1a1a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333] transition-all"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}

                <div className="text-center">
                    <Link href="/auth/login" className="font-medium text-[#c2a26d] hover:text-[#b08e56]">
                        Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
