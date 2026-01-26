import GemstoneTemplate from "@/components/GemstoneTemplate"

const EMERALD_RINGS = [
    {
        id: 361,
        name: "Emerald Cut Emerald Three Stone Ring",
        price: 5800,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "18K Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Emerald",
        type: "Emerald",
        shape: "Emerald",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Emerald", "Classic", "Vintage"]

export default function EmeraldPresetPage() {
    return (
        <GemstoneTemplate
            title="Emerald Engagement Rings"
            description="Lush and vibrant, emeralds have been prized for millennia. Our ethically sourced emeralds are chosen for their exceptional color and character."
            products={EMERALD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Emerald"
            section="Preset Rings"
        />
    )
}
