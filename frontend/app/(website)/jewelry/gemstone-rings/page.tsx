import GemstoneTemplate from "@/components/GemstoneTemplate"

const GEMSTONE_RINGS = [
    {
        id: 521,
        name: "Oval Pink Sapphire Fashion Ring",
        price: 1450,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "14K Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "Rings",
        type: "Sapphire",
        shape: "Oval",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Rings", "Sapphire", "Emerald", "Morganite"]

export default function GemstoneRingsCategoryPage() {
    return (
        <GemstoneTemplate
            title="Gemstone Rings"
            description="Our collection of gemstone fashion rings offers a perfect blend of modern style and timeless elegance. Hand-crafted with ethical gemstones."
            products={GEMSTONE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Rings"
            section="Jewelry"
        />
    )
}
