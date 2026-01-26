import GemstoneTemplate from "@/components/GemstoneTemplate"

const ROSE_GOLD_GEMSTONE_RINGS = [
    {
        id: 331,
        name: "Round Pink Sapphire 14K Rose Gold Ring",
        price: 1850,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "14K Rose Gold",
        type: "Sapphire",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 332,
        name: "Oval Morganite 14K Rose Gold Ring",
        price: 1450,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "14K Rose Gold",
        type: "Morganite",
        shape: "Oval"
    }
]

const FILTER_TABS = ["14K Rose Gold", "Sapphire", "Morganite"]

export default function GemstoneRoseGoldPage() {
    return (
        <GemstoneTemplate
            title="Rose Gold Gemstone Rings"
            description="The romantic blush of 14K rose gold enhances the soft tones of morganite and the vibrant sparkle of pink sapphires."
            products={ROSE_GOLD_GEMSTONE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Rose Gold"
            section="Preset Rings"
        />
    )
}
