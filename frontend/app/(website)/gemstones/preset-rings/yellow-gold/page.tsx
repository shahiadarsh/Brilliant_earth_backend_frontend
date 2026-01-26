import GemstoneTemplate from "@/components/GemstoneTemplate"

const YELLOW_GOLD_GEMSTONE_RINGS = [
    {
        id: 311,
        name: "Oval Sapphire 18K Yellow Gold Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "18K Yellow Gold",
        type: "Sapphire",
        shape: "Oval",
        isBestSeller: true
    },
    {
        id: 312,
        name: "Pear Ruby 18K Yellow Gold Ring",
        price: 2890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "18K Yellow Gold",
        type: "Ruby",
        shape: "Pear"
    }
]

const FILTER_TABS = ["18K Yellow Gold", "Sapphire", "Ruby"]

export default function GemstoneYellowGoldPage() {
    return (
        <GemstoneTemplate
            title="Yellow Gold Gemstone Rings"
            description="Lustrous 18K yellow gold perfectly complements the vibrant hues of our hand-selected gemstones, creating a warm and classic look."
            products={YELLOW_GOLD_GEMSTONE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Yellow Gold"
            section="Preset Rings"
        />
    )
}
