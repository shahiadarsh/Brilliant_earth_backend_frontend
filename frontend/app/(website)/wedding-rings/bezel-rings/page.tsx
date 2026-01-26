import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const BEZEL_RINGS = [
    {
        id: 81,
        name: "Classic Bezel Set Diamond Band",
        price: 1790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Bezel Rings",
        type: "Full Bezel",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 82,
        name: "Modern Bezel Wedding Ring",
        price: 1590,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Bezel Rings",
        type: "Modern Bezel",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 83,
        name: "Partial Bezel Diamond Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Bezel Rings",
        type: "Partial Bezel",
        shape: "Round"
    },
    {
        id: 84,
        name: "Floating Bezel Wedding Band",
        price: 1690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Bezel Rings",
        type: "Floating Bezel",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 85,
        name: "Bezel Set Eternity Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Bezel Rings",
        type: "Eternity Bezel",
        shape: "Round"
    },
    {
        id: 86,
        name: "Minimalist Bezel Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Bezel Rings",
        type: "Minimalist",
        shape: "Round"
    },
    {
        id: 87,
        name: "Alternating Bezel Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Bezel Rings",
        type: "Alternating",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 88,
        name: "Vintage Bezel Wedding Band",
        price: 1990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Bezel Rings",
        type: "Vintage Bezel",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Bezel Rings",
    "Full Bezel",
    "Modern Bezel",
    "Partial Bezel",
    "Floating Bezel",
    "Eternity Bezel",
    "Minimalist"
]

export default function BezelRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Bezel Set Wedding Rings"
            description="Discover our collection of bezel set wedding rings, where diamonds are securely encased in metal for a sleek, modern look. Perfect for those seeking contemporary elegance with maximum diamond protection."
            products={BEZEL_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Bezel Rings"
            section="Women's"
        />
    )
}
