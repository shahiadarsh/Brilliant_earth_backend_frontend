import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const DIAMOND_RINGS = [
    {
        id: 31,
        name: "Classic Diamond Eternity Band",
        price: 2490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Rings",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 32,
        name: "Pavé Diamond Wedding Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Diamond Rings",
        type: "Pavé",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 33,
        name: "Channel Set Diamond Band",
        price: 2190,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Diamond Rings",
        type: "Channel",
        shape: "Princess"
    },
    {
        id: 34,
        name: "Shared Prong Diamond Ring",
        price: 1990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Diamond Rings",
        type: "Shared Prong",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 35,
        name: "Bezel Set Diamond Wedding Band",
        price: 2290,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Rings",
        type: "Bezel",
        shape: "Round"
    },
    {
        id: 36,
        name: "Vintage Milgrain Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Diamond Rings",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 37,
        name: "French Pavé Diamond Band",
        price: 2090,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Diamond Rings",
        type: "French Pavé",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 38,
        name: "Baguette Diamond Anniversary Ring",
        price: 2690,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Diamond Rings",
        type: "Baguette",
        shape: "Baguette"
    }
]

const FILTER_TABS = [
    "All Diamond Rings",
    "Eternity",
    "Pavé",
    "Channel",
    "Shared Prong",
    "Bezel",
    "Vintage"
]

export default function DiamondRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Diamond Wedding Rings"
            description="Celebrate your love with our stunning collection of diamond wedding rings. From classic eternity bands to modern pavé designs, each ring features ethically sourced diamonds."
            products={DIAMOND_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Diamond Rings"
            section="Women's"
        />
    )
}
