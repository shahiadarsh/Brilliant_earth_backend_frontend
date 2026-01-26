import GemstoneTemplate from "@/components/GemstoneTemplate"

const MORGANITE_RINGS = [
    {
        id: 381,
        name: "Cushion Morganite Halo Rose Gold Ring",
        price: 1850,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "14K Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "Morganite",
        type: "Morganite",
        shape: "Cushion",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Morganite", "Pink", "Romantic"]

export default function MorganitePresetPage() {
    return (
        <GemstoneTemplate
            title="Morganite Engagement Rings"
            description="Morganite's feminine peach-pink sparkle is beautifully complemented by rose gold settings. A romantic and modern choice for a unique engagement ring."
            products={MORGANITE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Morganite"
            section="Preset Rings"
        />
    )
}
