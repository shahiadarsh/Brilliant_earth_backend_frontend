import GemstoneTemplate from "@/components/GemstoneTemplate"

const GEMSTONE_NECKLACES = [
    {
        id: 501,
        name: "Emerald Cut Moissanite Pendant",
        price: 850,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Necklaces",
        type: "Moissanite",
        shape: "Emerald",
        isBestSeller: true
    },
    {
        id: 502,
        name: "Blue Sapphire Round Pendant",
        price: 1250,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "18K Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Necklaces",
        type: "Sapphire",
        shape: "Round"
    }
]

const FILTER_TABS = ["Necklaces", "Sapphire", "Emerald", "Moissanite"]

export default function GemstoneNecklacesCategoryPage() {
    return (
        <GemstoneTemplate
            title="Gemstone Necklaces"
            description="Discover the perfect gemstone necklace to elevate your style. From vibrant sapphires to brilliant moissanites, find your signature piece."
            products={GEMSTONE_NECKLACES}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Necklaces"
            section="Jewelry"
        />
    )
}
