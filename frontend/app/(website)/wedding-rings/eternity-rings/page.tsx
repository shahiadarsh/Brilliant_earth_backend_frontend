import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const ETERNITY_RINGS = [
    {
        id: 51,
        name: "Classic Round Diamond Eternity Band",
        price: 2890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 52,
        name: "Half Eternity Pavé Diamond Ring",
        price: 1990,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Eternity Rings",
        type: "Half Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 53,
        name: "Emerald Cut Eternity Band",
        price: 3290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Emerald"
    },
    {
        id: 54,
        name: "Princess Cut Eternity Ring",
        price: 2690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Princess",
        isBestSeller: true
    },
    {
        id: 55,
        name: "Oval Diamond Eternity Band",
        price: 3090,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Oval"
    },
    {
        id: 56,
        name: "Cushion Cut Half Eternity Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Eternity Rings",
        type: "Half Eternity",
        shape: "Cushion"
    },
    {
        id: 57,
        name: "Baguette Diamond Eternity Band",
        price: 3490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Baguette",
        isBestSeller: true
    },
    {
        id: 58,
        name: "Mixed Cut Eternity Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Eternity Rings",
        type: "Full Eternity",
        shape: "Mixed"
    }
]

const FILTER_TABS = [
    "All Eternity Rings",
    "Full Eternity",
    "Half Eternity",
    "Round",
    "Emerald",
    "Princess",
    "Oval"
]

export default function EternityRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Eternity Rings"
            description="Symbolize eternal love with our exquisite eternity rings. Featuring diamonds that encircle the entire band or halfway around, these timeless pieces celebrate your everlasting commitment."
            products={ETERNITY_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Eternity Rings"
            section="Women's"
        />
    )
}
