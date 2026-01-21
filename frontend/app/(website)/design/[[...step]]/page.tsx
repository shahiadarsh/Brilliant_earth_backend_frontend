"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RingBuilderHeader } from "@/components/ring-builder-header"
import { Check, Diamond, Save, Share2, Info, X, Search, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/CartContext"

type Step = "setting" | "diamond" | "review" | "complete" | "gemstone" | "bridal"

interface DesignState {
    setting: string | null
    diamond: string | null
    metalType: string
    size: string
}

const mockSettings = [
    { id: "setting-1", name: "Petite Twisted Vine", price: 1290, style: "Vintage", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-2", name: "Demi Diamond Ring", price: 1590, style: "Halo", image: "https://images.unsplash.com/photo-1603561596112-0a132b7223e8?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-3", name: "Secret Garden", price: 2150, style: "Nature-Inspired", image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-4", name: "Willow", price: 1490, style: "Solitaire", image: "https://images.unsplash.com/photo-1589674781759-c21c379563e1?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-5", name: "Waverly", price: 1990, style: "Halo", image: "https://images.unsplash.com/photo-1608542142816-c87d46152ec9?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-6", name: "Three Stone Trellis", price: 2390, style: "Three-Stone", image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-7", name: "Luxe Ballad", price: 1750, style: "Solitaire", image: "https://images.unsplash.com/photo-1576158187530-98633e8b858c?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "setting-8", name: "Nadia", price: 1650, style: "Vintage", image: "https://images.unsplash.com/photo-1600003014748-02cb7db28362?auto=format&fit=crop&q=80&w=600&h=600" },
]

const mockDiamonds = [
    { id: "diamond-1", shape: "Round", carat: "1.01", color: "E", clarity: "VS1", cut: "Super Ideal", price: 5450, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "diamond-2", shape: "Oval", carat: "1.20", color: "F", clarity: "VS2", cut: "Ideal", price: 6200, image: "https://images.unsplash.com/photo-1596942502719-e931ca87878d?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "diamond-3", shape: "Cushion", carat: "1.50", color: "G", clarity: "VVS2", cut: "Ideal", price: 7800, image: "https://images.unsplash.com/photo-1617038220319-86719541b9c3?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "diamond-4", shape: "Emerald", carat: "1.10", color: "E", clarity: "VS1", cut: "Ideal", price: 5900, image: "https://images.unsplash.com/photo-1614959541556-9d33fd0248c8?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "diamond-5", shape: "Round", carat: "0.90", color: "D", clarity: "IF", cut: "Super Ideal", price: 7200, image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600&h=600" },
    { id: "diamond-6", shape: "Pear", carat: "1.30", color: "G", clarity: "VS1", cut: "Ideal", price: 6500, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=600&h=600" },
]

export default function DesignPage() {
    const params = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const typeQuery = searchParams.get("type")

    const stepParam = params?.step?.[0] as Step | undefined
    const [currentStep, setCurrentStep] = useState<Step>("setting")
    const [startedWith, setStartedWith] = useState<"setting" | "diamond">("setting")
    const { addToCart, toggleWishlist, wishlist } = useCart()
    const [design, setDesign] = useState<DesignState>({
        setting: null,
        diamond: null,
        metalType: "18K White Gold",
        size: "6",
    })

    // Filter States
    const [settingStyle, setSettingStyle] = useState<string | null>(null)
    const [diamondShape, setDiamondShape] = useState<string | null>(null)
    const [diamondColor, setDiamondColor] = useState<string[]>([])
    const [diamondClarity, setDiamondClarity] = useState<string[]>([])

    useEffect(() => {
        if (stepParam && ["setting", "diamond", "review", "complete", "gemstone", "bridal"].includes(stepParam)) {
            const normalizedStep = (stepParam === "gemstone" || stepParam === "bridal") ? "setting" : stepParam as Step
            setCurrentStep(normalizedStep)
            if (stepParam === "diamond" && !design.setting) setStartedWith("diamond")
            if (stepParam === "setting" && !design.diamond) setStartedWith("setting")
        } else if (typeQuery) {
            if (typeQuery === "natural" || typeQuery === "lab") {
                setCurrentStep("diamond")
                setStartedWith("diamond")
            }
        }
    }, [stepParam, typeQuery])

    const handleStepChange = (newStep: Step) => {
        setCurrentStep(newStep)
        router.push(`/design/${newStep}`)
    }

    // Filtered Data
    const filteredSettings = useMemo(() => {
        return settingStyle
            ? mockSettings.filter(s => s.style === settingStyle)
            : mockSettings
    }, [settingStyle])

    const filteredDiamonds = useMemo(() => {
        let res = [...mockDiamonds]
        if (diamondShape) res = res.filter(d => d.shape === diamondShape)
        if (diamondColor.length > 0) res = res.filter(d => diamondColor.includes(d.color))
        if (diamondClarity.length > 0) res = res.filter(d => diamondClarity.includes(d.clarity))
        return res
    }, [diamondShape, diamondColor, diamondClarity])

    const settingPrice = mockSettings.find(s => s.id === design.setting)?.price || 0
    const diamondPrice = mockDiamonds.find(d => d.id === design.diamond)?.price || 0
    const totalPrice = settingPrice + diamondPrice

    const steps = startedWith === "setting"
        ? [{ id: "setting", label: "Choose Setting" }, { id: "diamond", label: "Choose Diamond" }, { id: "review", label: "Complete Ring" }]
        : [{ id: "diamond", label: "Choose Diamond" }, { id: "setting", label: "Choose Setting" }, { id: "review", label: "Complete Ring" }]

    const getNextStep = (current: Step): Step => {
        if (current === "setting") return startedWith === "setting" ? "diamond" : "review"
        if (current === "diamond") return startedWith === "diamond" ? "setting" : "review"
        return "review"
    }

    const toggleArrayFilter = (arr: string[], val: string, setFn: (val: string[]) => void) => {
        if (arr.includes(val)) setFn(arr.filter(a => a !== val))
        else setFn([...arr, val])
    }

    return (
        <div className="min-h-screen bg-white">
            <RingBuilderHeader
                currentStep={currentStep}
                steps={steps}
                totalPrice={totalPrice}
                settingSelected={!!design.setting}
                diamondSelected={!!design.diamond}
                onStepClick={(s) => handleStepChange(s as Step)}
                settingImage={mockSettings.find(s => s.id === design.setting)?.image}
                diamondImage={mockDiamonds.find(d => d.id === design.diamond)?.image}
            />

            <main className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">

                {/* --- CHOOSE SETTING --- */}
                {currentStep === "setting" && (
                    <div className="animate-in fade-in duration-700">
                        <div className="flex flex-col xl:flex-row justify-between mb-12 gap-10">
                            <div className="max-w-xl">
                                <h1 className="font-serif text-[42px] text-gray-900 mb-4 leading-tight">Choose Your Setting</h1>
                                <p className="text-[#526371] text-[18px]">Handcrafted with recycled metals and exceptional attention to detail.</p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="flex border border-gray-200 p-0.5 h-[44px] bg-white">
                                    {["18K White Gold", "18K Yellow Gold", "14K Rose Gold", "Platinum"].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setDesign({ ...design, metalType: m })}
                                            className={`px-4 text-[10px] uppercase font-bold tracking-widest transition-all ${design.metalType === m ? "bg-[#163E3E] text-white" : "text-gray-500 hover:bg-gray-50"}`}
                                        >
                                            {m.split(' ').pop()}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["Solitaire", "Halo", "Vintage", "Three-Stone"].map(style => (
                                        <button
                                            key={style}
                                            onClick={() => setSettingStyle(settingStyle === style ? null : style)}
                                            className={`px-6 py-3 border text-[10px] uppercase font-bold tracking-widest transition-all ${settingStyle === style ? "bg-[#163E3E] border-[#163E3E] text-white" : "border-gray-200 text-gray-500 hover:border-black"}`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {filteredSettings.map(setting => (
                                <div key={setting.id} className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4" onClick={() => {
                                    setDesign({ ...design, setting: setting.id })
                                    handleStepChange(getNextStep("setting"))
                                }}>
                                    <div className="relative aspect-square mb-6 overflow-hidden bg-[#FAFAFA] group">
                                        <img src={setting.image} alt={setting.name} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" />
                                        <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 z-10">
                                            <div className="bg-white/95 backdrop-blur-md py-4 text-center text-[10px] font-bold uppercase tracking-widest shadow-2xl">Select This Setting</div>
                                        </div>
                                        <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center"><Search className="w-4 h-4" /></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-[22px] text-gray-900 group-hover:text-[#163E3E] transition-colors">{setting.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[12px] text-gray-400 font-normal">{design.metalType} • {setting.style}</p>
                                            <p className="font-bold text-[15px] text-gray-900">${setting.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- CHOOSE DIAMOND --- */}
                {currentStep === "diamond" && (
                    <div className="animate-in fade-in duration-700">
                        <div className="mb-12">
                            <h1 className="font-serif text-[42px] text-gray-900 mb-2 leading-tight">Choose Your Diamond</h1>
                            <p className="text-[#526371] text-[18px]">Hand-selected for brilliance, ethically sourced.</p>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-[#F9F9F9] p-10 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16 rounded-sm border border-gray-100">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shape</h4>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        { s: "Round", icon: <div className="w-5 h-5 border border-gray-400 rounded-full" /> },
                                        { s: "Oval", icon: <div className="w-4 h-6 border border-gray-400 rounded-[50%]" /> },
                                        { s: "Emerald", icon: <div className="w-4 h-6 border border-gray-400 rounded-[2px]" /> },
                                        { s: "Pear", icon: <div className="w-4 h-6 border border-gray-400 rounded-b-full rounded-t-[70%]" /> },
                                        { s: "Princess", icon: <div className="w-5 h-5 border border-gray-400 rotate-45" /> }
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setDiamondShape(diamondShape === item.s ? null : item.s)}
                                            className={`w-11 h-11 border rounded-lg bg-white flex items-center justify-center group cursor-pointer transition-all ${diamondShape === item.s ? "border-[#163E3E] shadow-lg ring-1 ring-[#163E3E]" : "border-gray-200 hover:border-[#163E3E]"}`}
                                        >
                                            <div className={`${diamondShape === item.s ? "scale-110" : ""}`}>{item.icon}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selected Filters</h4>
                                <div className="flex flex-wrap gap-2">
                                    {diamondShape && (
                                        <div className="flex items-center gap-2 bg-[#163E3E] text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                            {diamondShape} <X className="w-3 h-3 cursor-pointer" onClick={() => setDiamondShape(null)} />
                                        </div>
                                    )}
                                    {diamondColor.map(c => (
                                        <div key={c} className="flex items-center gap-2 bg-[#163E3E] text-white px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                            Color: {c} <X className="w-3 h-3 cursor-pointer" onClick={() => toggleArrayFilter(diamondColor, c, setDiamondColor)} />
                                        </div>
                                    ))}
                                    {(!diamondShape && diamondColor.length === 0 && diamondClarity.length === 0) && (
                                        <p className="text-[10px] text-gray-300 italic py-2">No filters active</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Color</h4>
                                <div className="flex border border-gray-200 bg-white rounded-sm overflow-hidden">
                                    {["D", "E", "F", "G", "H", "I"].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => toggleArrayFilter(diamondColor, c, setDiamondColor)}
                                            className={`flex-1 h-10 text-[10px] font-bold transition-colors border-r last:border-0 border-gray-100 ${diamondColor.includes(c) ? "bg-[#163E3E] text-white" : "hover:bg-gray-50 text-gray-500"}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clarity</h4>
                                <div className="flex border border-gray-200 bg-white rounded-sm overflow-hidden">
                                    {["IF", "VVS1", "VVS2", "VS1", "VS2"].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => toggleArrayFilter(diamondClarity, c, setDiamondClarity)}
                                            className={`flex-1 h-10 text-[10px] font-bold transition-colors border-r last:border-0 border-gray-100 uppercase ${diamondClarity.includes(c) ? "bg-[#163E3E] text-white" : "hover:bg-gray-50 text-gray-500"}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredDiamonds.map(diamond => (
                                <div key={diamond.id} className="bg-white border border-gray-100 flex flex-col group hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-sm overflow-hidden animate-in zoom-in-95 duration-500">
                                    <div className="relative aspect-square w-full bg-[#FAFAFA] flex items-center justify-center p-16 overflow-hidden">
                                        <img src={diamond.image} alt="Diamond" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 group-hover:scale-115" />
                                        {design.diamond === diamond.id && (
                                            <div className="absolute top-6 right-6 bg-[#163E3E] text-white p-1.5 rounded-full shadow-lg">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                    </div>
                                    <div className="p-12 flex flex-col items-center">
                                        <h3 className="font-serif text-[28px] text-gray-900 mb-3 leading-tight">{diamond.carat} Carat {diamond.shape}</h3>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold mb-10 border-b border-gray-100 pb-6 w-full text-center">
                                            {diamond.color} COLOR • {diamond.clarity} CLARITY • {diamond.cut} CUT
                                        </div>
                                        <div className="text-[32px] font-serif text-[#163E3E] mb-12 leading-none">${diamond.price.toLocaleString()}</div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setDesign({ ...design, diamond: diamond.id })
                                                handleStepChange(getNextStep("diamond"))
                                            }}
                                            className={`w-full py-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border shadow-lg
                                              ${design.diamond === diamond.id
                                                    ? "bg-[#163E3E] border-[#163E3E] text-white"
                                                    : "bg-white border-gray-900 text-gray-900 hover:bg-black hover:text-white hover:border-black"}
                                            `}
                                        >
                                            {design.diamond === diamond.id ? "Diamond Selected" : "Select This Diamond"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredDiamonds.length === 0 && (
                            <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-200 rounded-sm">
                                <Diamond className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                                <h3 className="font-serif text-2xl text-gray-400">No diamonds matching your criteria.</h3>
                                <button onClick={() => { setDiamondShape(null); setDiamondColor([]); setDiamondClarity([]); }} className="mt-6 text-[#163E3E] font-bold uppercase tracking-widest text-[10px] underline underline-offset-8">Clear all filters</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- REVIEW --- */}
                {currentStep === "review" && (
                    <div className="animate-in zoom-in-95 duration-700 max-w-6xl mx-auto py-8">
                        <div className="text-center mb-20">
                            <h1 className="font-serif text-[52px] text-gray-900 leading-tight">Review Your Custom Ring</h1>
                            <p className="text-gray-400 uppercase tracking-[0.3em] text-[11px] font-bold mt-4">One of a kind, just like your love.</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="bg-[#FBFBFB] aspect-square flex items-center justify-center relative shadow-inner rounded-sm overflow-hidden border border-gray-50">
                                <img src={mockSettings.find(s => s.id === design.setting)?.image} className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-40 scale-125" />
                                <img src={mockDiamonds.find(d => d.id === design.diamond)?.image} className="absolute w-[45%] h-[45%] -translate-y-6 object-contain mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                            </div>

                            <div className="flex flex-col justify-center space-y-12">
                                <div className="space-y-10 border-b border-gray-100 pb-12">
                                    <div className="flex justify-between items-start group">
                                        <div className="space-y-2">
                                            <h3 className="font-serif text-[28px] text-gray-900 group-hover:text-[#163E3E] transition-colors">{mockSettings.find(s => s.id === design.setting)?.name || "Selected Setting"}</h3>
                                            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{design.metalType}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[24px] font-serif">${settingPrice.toLocaleString()}</p>
                                            <button onClick={() => handleStepChange("setting")} className="text-[10px] underline uppercase tracking-widest font-bold mt-3 text-gray-300 hover:text-black transition-colors">Change Setting</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start group border-t border-gray-50 pt-10">
                                        <div className="space-y-2">
                                            <h3 className="font-serif text-[28px] text-gray-900 group-hover:text-[#163E3E] transition-colors">{mockDiamonds.find(d => d.id === design.diamond)?.carat} Carat {mockDiamonds.find(d => d.id === design.diamond)?.shape || "Diamond"}</h3>
                                            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                                                {mockDiamonds.find(d => d.id === design.diamond)?.color} color • {mockDiamonds.find(d => d.id === design.diamond)?.clarity} clarity • {mockDiamonds.find(d => d.id === design.diamond)?.cut} cut
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[24px] font-serif">${diamondPrice.toLocaleString()}</p>
                                            <button onClick={() => handleStepChange("diamond")} className="text-[10px] underline uppercase tracking-widest font-bold mt-3 text-gray-300 hover:text-black transition-colors">Change Diamond</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center py-4">
                                    <span className="font-serif text-[38px] text-gray-900">Total</span>
                                    <span className="font-serif text-[52px] text-[#163E3E] font-light">${totalPrice.toLocaleString()}</span>
                                </div>

                                <div className="space-y-6 pt-4">
                                    <button
                                        onClick={() => {
                                            const selectedSetting = mockSettings.find(s => s.id === design.setting)
                                            const selectedDiamond = mockDiamonds.find(d => d.id === design.diamond)
                                            if (selectedSetting && selectedDiamond) {
                                                addToCart({
                                                    id: `custom-ring-${Date.now()}`,
                                                    name: `${selectedSetting.name} with ${selectedDiamond.carat}ct ${selectedDiamond.shape}`,
                                                    price: totalPrice,
                                                    image: selectedDiamond.image, // Use diamond image as primary for the custom ring
                                                    metal: design.metalType
                                                })
                                            }
                                            handleStepChange("complete")
                                        }}
                                        className="w-full bg-[#163E3E] text-white py-6 font-bold uppercase tracking-[0.3em] text-[12px] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Complete Selection
                                    </button>
                                    <div className="grid grid-cols-2 gap-6">
                                        <button className="py-5 border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"><Save className="w-4 h-4" /> Save Design</button>
                                        <button className="py-5 border border-gray-200 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 flex items-center justify-center gap-3 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
                                    </div>
                                </div>

                                <div className="pt-10 flex gap-8 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Info className="w-5 h-5 text-gray-300" />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Free Shipping</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Save className="w-5 h-5 text-gray-300" />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Free 30-Day Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- COMPLETE --- */}
                {currentStep === "complete" && (
                    <div className="flex flex-col items-center justify-center py-32 animate-in zoom-in-95 duration-700">
                        <div className="w-24 h-24 bg-[#163E3E] rounded-full flex items-center justify-center text-white mb-12 shadow-2xl">
                            <Check className="w-12 h-12" />
                        </div>
                        <h1 className="font-serif text-[64px] mb-6 text-gray-900 leading-tight">Masterpiece Added</h1>
                        <p className="text-gray-500 text-[20px] max-w-lg text-center mb-16 font-light leading-relaxed">Your custom-designed ring has been successfully added to your shopping bag. We can't wait to craft it for you.</p>
                        <div className="flex gap-8">
                            <Link href="/cart" className="bg-[#163E3E] text-white px-16 py-6 uppercase tracking-[0.3em] font-bold text-[12px] hover:bg-black transition-all shadow-xl">Secure Checkout</Link>
                            <Link href="/" className="border border-gray-900 px-16 py-6 uppercase tracking-[0.3em] font-bold text-[12px] hover:bg-black hover:text-white transition-all">Back to Home</Link>
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}
