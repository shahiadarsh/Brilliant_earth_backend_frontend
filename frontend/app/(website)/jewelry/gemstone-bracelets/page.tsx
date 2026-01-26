import GemstoneTemplate from "@/components/GemstoneTemplate"

const GEMSTONE_BRACELETS = [
    {
        id: 531,
        name: "Aquamarine Bolo Bracelet",
        price: 750,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Bracelets",
        type: "Aquamarine",
        shape: "Round",
        isBestSeller: true
    }
]

const FILTER_TABS = ["Bracelets", "Sapphire", "Aquamarine", "Moissanite"]

export default function GemstoneBraceletsCategoryPage() {
    return (
        <GemstoneTemplate
            title="Gemstone Bracelets"
            description="Exquisite gemstone bracelets designed to add a touch of color to your wrist. Crafted with the finest ethical materials."
            products={GEMSTONE_BRACELETS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Bracelets"
            section="Jewelry"
        />
    )
}
