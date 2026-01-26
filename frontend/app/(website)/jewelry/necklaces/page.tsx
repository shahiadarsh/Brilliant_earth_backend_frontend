import JewelryTemplate from "@/components/JewelryTemplate"

const NECKLACES = [
    {
        id: 501,
        name: "Diamond Solitaire Necklace",
        price: 990,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Pendants",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 502,
        name: "Diamond Tennis Necklace",
        price: 4990,
        image: "https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Tennis",
        type: "Diamond"
    },
    {
        id: 503,
        name: "Gold Link Chain Necklace",
        price: 590,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Chains",
        type: "Gold",
        isBestSeller: true
    },
    {
        id: 504,
        name: "Emerald Halo Pendant",
        price: 1890,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Pendants",
        type: "Gemstone"
    }
]

const FILTER_TABS = ["All Necklaces", "Pendants", "Tennis", "Chains", "Diamond", "Gold", "Gemstone"]

export default function NecklacesPage() {
    return (
        <JewelryTemplate
            title="Necklaces"
            description="Explore our curated collection of necklaces. From delicate pendants and classic gold chains to breathtaking diamond tennis necklaces."
            products={NECKLACES}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Necklaces"
        />
    )
}
