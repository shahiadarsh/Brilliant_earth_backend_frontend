"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        if (token) {
            handleVerify();
        } else {
            setStatus("error");
            toast.error("No verification token found");
        }
    }, [token]);

    const handleVerify = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                toast.success("Account verified successfully!");
            } else {
                setStatus("error");
                toast.error(data.message || "Verification failed");
            }
        } catch (error) {
            setStatus("error");
            toast.error("An error occurred during verification");
        }
    };

    return (
        <div className="text-center space-y-6">
            {status === "loading" && (
                <>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#c2a26d] mx-auto"></div>
                    <h2 className="text-2xl font-bold text-gray-800">Verifying your account...</h2>
                </>
            )}

            {status === "success" && (
                <>
                    <div className="text-green-500 text-6xl">✓</div>
                    <h2 className="text-2xl font-bold text-gray-800">Verification Successful!</h2>
                    <p className="text-gray-600">Your email has been verified. You can now log in.</p>
                    <Link
                        href="/auth/login"
                        className="inline-block bg-[#1a1a1a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#333] transition-all"
                    >
                        Sign In
                    </Link>
                </>
            )}

            {status === "error" && (
                <>
                    <div className="text-red-500 text-6xl">✕</div>
                    <h2 className="text-2xl font-bold text-gray-800">Verification Failed</h2>
                    <p className="text-gray-600">The link may be invalid or expired. Please try registering again.</p>
                    <Link
                        href="/auth/signup"
                        className="inline-block border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all"
                    >
                        Back to Signup
                    </Link>
                </>
            )}
        </div>
    );
}

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <Suspense fallback={<div>Loading...</div>}>
                    <VerifyContent />
                </Suspense>
            </div>
        </div>
    );
}
