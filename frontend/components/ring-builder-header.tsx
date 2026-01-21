"use client"

import { Check, Diamond, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Step {
    id: string
    label: string
}

interface RingBuilderHeaderProps {
    currentStep: string
    steps: Step[]
    totalPrice: number
    settingSelected: boolean
    diamondSelected: boolean
    onStepClick: (stepId: any) => void
    settingImage?: string
    diamondImage?: string
}

export function RingBuilderHeader({
    currentStep,
    steps,
    totalPrice,
    settingSelected,
    diamondSelected,
    onStepClick,
    settingImage,
    diamondImage
}: RingBuilderHeaderProps) {
    return (
        <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm animate-in fade-in duration-500">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-[72px] md:h-[80px] flex items-center justify-between">

                {/* Progress Steps */}
                <div className="flex items-center gap-10 md:gap-16">
                    {steps.map((step, index) => {
                        const isActive = currentStep === step.id
                        const isCompleted = (step.id === "setting" && settingSelected) ||
                            (step.id === "diamond" && diamondSelected) ||
                            (currentStep === "complete")

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-4 cursor-pointer group transition-all duration-300 ${isActive ? "opacity-100" : isCompleted ? "opacity-100" : "opacity-30 hover:opacity-100"}`}
                                onClick={() => onStepClick(step.id)}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300
                  ${isActive ? "bg-[#163E3E] border-[#163E3E] text-white font-serif" : isCompleted ? "bg-white border-[#163E3E] text-[#163E3E]" : "bg-white border-gray-200 text-gray-400"}
                `}>
                                    {isCompleted && !isActive ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.15em] mb-0.5 ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                                        Step {index + 1}
                                    </span>
                                    <span className={`text-[12px] md:text-[13px] font-serif uppercase tracking-[0.08em] whitespace-nowrap ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block ml-4 text-gray-200">
                                        <ChevronRight strokeWidth={1} className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Estimated Total & Status Icons */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Estimated Total</span>
                        <span className="font-serif text-[26px] text-gray-900 leading-none">${totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Setting Icon */}
                        <div className="relative">
                            {settingSelected ? (
                                <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-white p-0.5 flex items-center justify-center">
                                    <img src={settingImage} alt="Setting" className="w-full h-full object-contain" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-full border border-gray-100 border-dashed flex items-center justify-center bg-gray-50/20">
                                    <div className="w-7 h-7 rounded-full border border-gray-200" />
                                </div>
                            )}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-400">1</div>
                        </div>

                        <div className="text-gray-200 font-light text-sm px-1">+</div>

                        {/* Diamond Icon */}
                        <div className="relative">
                            {diamondSelected ? (
                                <div className="w-12 h-12 rounded-full border border-gray-100 overflow-hidden bg-white p-0.5 flex items-center justify-center">
                                    <img src={diamondImage} alt="Diamond" className="w-full h-full object-contain" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-full border border-gray-100 border-dashed flex items-center justify-center bg-gray-50/20">
                                    <Diamond strokeWidth={1} className="w-5 h-5 text-gray-200" />
                                </div>
                            )}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-400">2</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
