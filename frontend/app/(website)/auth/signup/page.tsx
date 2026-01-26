"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, ShieldCheck, ShieldAlert, Info, ArrowRight } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Info, 2: OTP
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: "Too weak",
        color: "bg-red-400",
        requirements: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    useEffect(() => {
        const pass = formData.password;
        const requirements = {
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /[0-9]/.test(pass),
            special: /[^A-Za-z0-9]/.test(pass)
        };

        const score = Object.values(requirements).filter(Boolean).length;
        let message = "Too weak";
        let color = "bg-red-400";

        if (score === 5) {
            message = "Very strong"; color = "bg-green-500";
        } else if (score >= 4) {
            message = "Strong"; color = "bg-green-400";
        } else if (score >= 3) {
            message = "Fair"; color = "bg-yellow-400";
        } else if (score >= 2) {
            message = "Weak"; color = "bg-orange-400";
        }

        setPasswordStrength({ score, message, color, requirements });
    }, [formData.password]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordStrength.score < 3) {
            return toast.error("Please choose a stronger password");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                setStep(2); // Move to OTP step
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    otp
                })
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Account verified! Redirecting to login...");
                setTimeout(() => router.push("/auth/login"), 2000);
            } else {
                toast.error(data.message || "Verification failed");
            }
        } catch (error) {
            toast.error("Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email })
            });
            const data = await res.json();
            if (data.success) toast.success("OTP sent again!");
            else toast.error(data.message);
        } catch (error) {
            toast.error("Failed to resend OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 transition-all duration-500">

                {step === 1 ? (
                    <>
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-[#1a1a1a]">Create Account</h2>
                            <p className="mt-2 text-sm text-gray-600 italic font-serif">A beautiful journey begins here.</p>
                        </div>
                        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                            <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />

                            <div className="space-y-4">
                                <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />

                                {formData.password && (
                                    <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {passwordStrength.score >= 4 ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <Info className="w-4 h-4 text-yellow-500" />}
                                                <span className="text-xs font-bold text-gray-700 uppercase">{passwordStrength.message}</span>
                                            </div>
                                            <span className="text-[10px] text-gray-400">{passwordStrength.score}/5</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-200 rounded-full flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(l => <div key={l} className={`h-full flex-1 ${passwordStrength.score >= l ? passwordStrength.color : 'bg-gray-100'} transition-all`} />)}
                                        </div>
                                    </div>
                                )}

                                <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
                            </div>

                            <button
                                disabled={loading}
                                className="group w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a1a1a] text-white text-sm font-bold rounded-lg hover:bg-[#333] transition-all disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Continue Registration"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-500 text-center">
                        <div className="w-16 h-16 bg-[#163E3E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8 text-[#163E3E]" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
                        <p className="mt-2 text-sm text-gray-600 mb-8">
                            We've sent a 6-digit code to <br /><span className="font-bold text-gray-900">{formData.email}</span>
                        </p>

                        <form onSubmit={handleVerifyOtp} className="space-y-6">
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="000 000"
                                className="w-full text-center text-3xl tracking-[1rem] font-bold py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-[#c2a26d] focus:border-[#c2a26d] outline-none"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            />

                            <button
                                disabled={loading || otp.length < 6}
                                className="w-full py-4 bg-[#1a1a1a] text-white font-bold rounded-xl hover:bg-[#333] transition-all disabled:opacity-50 shadow-lg shadow-black/10"
                            >
                                {loading ? "Verifying..." : "Verify & Complete"}
                            </button>
                        </form>

                        <div className="mt-8 text-sm text-gray-500">
                            Didn't receive the code? <br />
                            <button onClick={handleResendOtp} className="mt-2 font-bold text-[#c2a26d] hover:underline underline-offset-4">Resend OTP</button>
                        </div>
                    </div>
                )}

                <div className="text-center pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-500">
                        Already have an account? {" "}
                        <Link href="/auth/login" className="font-bold text-[#c2a26d] hover:text-[#b08e56]">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Input({ label, ...props }: any) {
    return (
        <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
            <input
                {...props}
                required
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#c2a26d]/20 focus:border-[#c2a26d] outline-none"
            />
        </div>
    );
}
