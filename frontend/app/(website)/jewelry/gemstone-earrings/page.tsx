import GemstoneTemplate from "@/components/GemstoneTemplate"

const GEMSTONE_EARRINGS = [
    {
        id: 511,
        name: "Moissanite Round Stud Earrings",
        price: 950,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Earrings",
        type: "Moissanite",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 512,
        name: "Emerald Cut Emerald Studs",
        price: 1850,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "18K Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Earrings",
        type: "Emerald",
        shape: "Emerald"
    }
]

const FILTER_TABS = ["Earrings", "Sapphire", "Emerald", "Moissanite"]

export default function GemstoneEarringsCategoryPage() {
    return (
        <GemstoneTemplate
            title="Gemstone Earrings"
            description="Our gemstone earrings selection features a curated range of ethical gemstones in timeless settings. From simple studs to elegant drops."
            products={GEMSTONE_EARRINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Earrings"
            section="Jewelry"
        />
    )
}
