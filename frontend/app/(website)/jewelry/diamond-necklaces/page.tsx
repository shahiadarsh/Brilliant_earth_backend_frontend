import JewelryTemplate from "@/components/JewelryTemplate"

const DIAMOND_NECKLACES = [
    {
        id: 1801,
        name: "Diamond Bar Necklace",
        price: 890,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Modern",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1802,
        name: "Diamond Pavé Circle Pendant",
        price: 750,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Geometric",
        type: "Diamond"
    },
    {
        id: 1803,
        name: "Diamond Solitaire Pendant",
        price: 1190,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Classic",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1804,
        name: "Diamond Cluster Necklace",
        price: 1490,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Floral",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Diamond Necklaces", "Modern", "Geometric", "Classic", "Floral", "Diamond"]

export default function DiamondNecklacesPage() {
    return (
        <JewelryTemplate
            title="Diamond Necklaces"
            description="From everyday diamond bars to show-stopping pendants, our diamond necklaces are designed to add a touch of luxury to any outfit."
            products={DIAMOND_NECKLACES}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Diamond Necklaces"
            section="Shop By Style"
        />
    )
}
