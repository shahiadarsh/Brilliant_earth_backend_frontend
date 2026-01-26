import GemstoneTemplate from "@/components/GemstoneTemplate"

const MOISSANITE_RINGS = [
    {
        id: 341,
        name: "Emerald Cut Moissanite Solitaire Ring",
        price: 1190,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Moissanite",
        type: "Moissanite",
        shape: "Emerald",
        isBestSeller: true
    },
    {
        id: 342,
        name: "Round Moissanite Halo Ring",
        price: 1590,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "14K Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "Moissanite",
        type: "Moissanite",
        shape: "Round"
    }
]

const FILTER_TABS = ["Moissanite", "Solitaire", "Halo"]

export default function MoissanitePresetPage() {
    return (
        <GemstoneTemplate
            title="Moissanite Engagement Rings"
            description="Our moissanite rings offer extraordinary brilliance and fire. Ethically sourced and exceptionally durable, they are a stunning choice for a lifelong symbol."
            products={MOISSANITE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Moissanite"
            section="Preset Rings"
        />
    )
}
