import GemstoneTemplate from "@/components/GemstoneTemplate"

const SAPPHIRE_JEWELRY = [
    {
        id: 401,
        name: "Blue Sapphire Round Stud Earrings",
        price: 850,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "14K White Gold",
        metalColors: ["white", "yellow"],
        category: "Sapphire Jewelry",
        type: "Earrings",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 402,
        name: "Blue Sapphire Pendant Necklace",
        price: 1250,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "18K Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Sapphire Jewelry",
        type: "Necklaces",
        shape: "Round"
    }
]

const FILTER_TABS = ["Sapphire Jewelry", "Earrings", "Necklaces", "Rings"]

export default function SapphireJewelryPage() {
    return (
        <GemstoneTemplate
            title="Sapphire Jewelry Collections"
            description="Explore our exquisite collection of sapphire jewelry. From classic studs to elegant pendants, discover the timeless beauty of natural sapphires."
            products={SAPPHIRE_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Sapphire"
            section="Jewelry"
        />
    )
}
