import GemstoneTemplate from "@/components/GemstoneTemplate"

const PLATINUM_GEMSTONE_RINGS = [
    {
        id: 301,
        name: "Emerald Cut Moissanite Platinum Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Moissanite",
        shape: "Emerald",
        isBestSeller: true
    },
    {
        id: 302,
        name: "Round Sapphire Platinum Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Sapphire",
        shape: "Round"
    },
    {
        id: 303,
        name: "Oval Emerald Platinum Ring",
        price: 3890,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Emerald",
        shape: "Oval",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Platinum", "Moissanite", "Sapphire", "Emerald"]

export default function GemstonePlatinumPage() {
    return (
        <GemstoneTemplate
            title="Platinum Gemstone Engagement Rings"
            description="Timeless and durable, our platinum gemstone rings showcase the natural brilliance of sapphires, emeralds, and moissanites in the world's most precious metal."
            products={PLATINUM_GEMSTONE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Platinum"
            section="Preset Rings"
        />
    )
}
