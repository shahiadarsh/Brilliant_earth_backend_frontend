"use client"

import React from 'react'
import { useSelection } from '@/context/SelectionContext'
import { Diamond, Gem, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function FlowHeader() {
    const { currentStep, selectedSetting, selectedDiamond, startType } = useSelection()
    const router = useRouter()

    const estimatedTotal = (selectedSetting?.price || 0) + (selectedDiamond?.price || 0)

    const steps = [
        {
            id: 'design',
            label: 'Design Your Ring',
            icon: null,
            isActive: false,
            isCompleted: true
        },
        {
            id: 'setting',
            label: 'Choose Setting',
            icon: <div className="relative"><span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full border border-white"></span><Diamond className="w-5 h-5" /></div>,
            isCompleted: !!selectedSetting,
            isActive: currentStep === 'setting',
            thumbnail: selectedSetting?.image
        },
        {
            id: 'diamond',
            label: 'Choose Diamond',
            sublabel: 'Browse Diamonds',
            icon: <Gem className="w-5 h-5" />,
            isCompleted: !!selectedDiamond,
            isActive: currentStep === 'diamond' || currentStep === 'gemstone',
            thumbnail: selectedDiamond?.image
        },
        {
            id: 'review',
            label: 'Complete Ring',
            sublabel: 'Select Ring Size',
            icon: <div className="p-1 border border-gray-300 rounded-full"><div className="w-2 h-2 bg-gray-400 rounded-full"></div></div>,
            isCompleted: false,
            isActive: currentStep === 'review'
        }
    ]

    // If startType is diamond, swap steps 1 and 2
    if (startType === 'diamond' || startType === 'gemstone') {
        const temp = steps[1]
        steps[1] = steps[2]
        steps[2] = temp
        steps[1].label = `Choose ${startType === 'gemstone' ? 'Gemstone' : 'Diamond'}`
        steps[2].label = 'Choose Setting'
    }

    return (
        <div className="w-full bg-white border-b border-gray-200 z-40">
            <div className="max-w-[1600px] mx-auto overflow-x-auto no-scrollbar">
                <div className="flex h-[90px] min-w-[900px]">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`flex-1 flex items-center justify-center px-8 relative transition-all duration-300 ${step.isActive ? 'bg-[#F9F9F9]' : 'bg-white'} ${step.isCompleted || step.id === 'design' ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default opacity-80'}`}
                            onClick={() => {
                                if (step.id === 'design') {
                                    router.push('/engagement-rings')
                                } else if (step.isCompleted || step.isActive) {
                                    router.push(`/design/${step.id}`)
                                }
                            }}
                        >
                            {/* Chevron Start Mask */}
                            {index > 0 && (
                                <div
                                    className={`absolute left-0 inset-y-0 w-4 z-10 transition-colors ${step.isActive ? 'bg-[#F9F9F9]' : 'bg-white'}`}
                                    style={{
                                        clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                                    }}
                                />
                            )}

                            <div className="flex items-center gap-5 z-20">
                                <span className={`text-[12px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${step.isActive || step.id === 'design' ? 'text-[#163E3E]' : 'text-gray-300'}`}>
                                    {step.id === 'design' ? step.label : `${index}. ${step.label}`}
                                </span>

                                {/* Show thumbnail if item is selected */}
                                {step.thumbnail ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-500 shadow-md shrink-0">
                                        <Image
                                            src={step.thumbnail}
                                            alt={step.label}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                ) : step.icon && (
                                    <div className={`transition-colors shrink-0 ${step.isActive ? 'text-[#163E3E]' : 'text-gray-300'}`}>
                                        {step.isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : step.icon}
                                    </div>
                                )}
                            </div>

                            {/* Chevron End Tip */}
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute right-[-16px] inset-y-0 w-4 z-30 transition-colors"
                                    style={{
                                        clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                                        backgroundColor: step.isActive ? '#F9F9F9' : 'white'
                                    }}
                                />
                            )}

                            {/* Visual divider for non-active chevrons */}
                            {index < steps.length - 1 && !step.isActive && !steps[index + 1].isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-100 z-10" />
                            )}
                        </div>
                    ))}

                    {/* Estimated Total - Right Side */}
                    {estimatedTotal > 0 && (
                        <div className="flex items-center gap-4 px-8 bg-[#163E3E] text-white min-w-[280px]">
                            <div className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/60">Estimated Total</span>
                                <span className="text-[24px] font-serif">${estimatedTotal.toLocaleString()}</span>
                            </div>
                            <Sparkles className="w-5 h-5 text-white/40" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
