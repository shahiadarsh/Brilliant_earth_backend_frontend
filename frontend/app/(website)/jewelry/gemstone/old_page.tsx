import JewelryTemplate from "@/components/JewelryTemplate"

const GEMSTONE_JEWELRY = [
    {
        id: 1001,
        name: "Emerald Pendant Necklace",
        price: 1890,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Necklaces",
        type: "Emerald",
        isBestSeller: true
    },
    {
        id: 1002,
        name: "Sapphire Stud Earrings",
        price: 1590,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Earrings",
        type: "Sapphire"
    },
    {
        id: 1003,
        name: "Ruby Fashion Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Rings",
        type: "Ruby",
        isBestSeller: true
    },
    {
        id: 1004,
        name: "Aquamarine Bracelet",
        price: 1290,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Bracelets",
        type: "Aquamarine"
    }
]

const FILTER_TABS = ["All Gemstone", "Necklaces", "Earrings", "Rings", "Bracelets", "Emerald", "Sapphire", "Ruby"]

export default function GemstoneJewelryPage() {
    return (
        <JewelryTemplate
            title="Gemstone Jewelry"
            description="From deep green emeralds to brilliant blue sapphires, our gemstone jewelry collection features responsibly sourced stones in classic and modern settings."
            products={GEMSTONE_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Gemstone"
        />
    )
}
