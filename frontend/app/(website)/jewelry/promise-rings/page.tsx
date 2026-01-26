import JewelryTemplate from "@/components/JewelryTemplate"

const PROMISE_RINGS = [
    {
        id: 1901,
        name: "Petite Twist Promise Ring",
        price: 890,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "14k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Classic",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1902,
        name: "Heart Shaped Promise Ring",
        price: 750,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "14k Rose Gold",
        metalColors: ["rose", "yellow"],
        category: "Romantic",
        type: "Diamond"
    },
    {
        id: 1903,
        name: "Bezel Set Diamond Promise Ring",
        price: 690,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Modern",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 1904,
        name: "Personalized Engraved Promise Ring",
        price: 550,
        image: "https://images.unsplash.com/photo-1595080979428-f33225546baa?w=400",
        metal: "Sterling Silver",
        metalColors: ["white"],
        category: "Personalized",
        type: "Silver"
    }
]

const FILTER_TABS = ["All Promise Rings", "Classic", "Romantic", "Modern", "Personalized", "Diamond"]

export default function PromiseRingsPage() {
    return (
        <JewelryTemplate
            title="Promise Rings"
            description="A promise ring represents a special commitment between two people. Our collection offers beautiful and meaningful designs to celebrate your unique bond."
            products={PROMISE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Promise Rings"
            section="Shop By Style"
        />
    )
}
