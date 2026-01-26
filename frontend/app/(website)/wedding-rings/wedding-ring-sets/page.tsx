import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const WEDDING_SETS = [
    {
        id: 41,
        name: "Classic Solitaire & Pavé Band Set",
        price: 3490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Wedding Sets",
        type: "Solitaire Set",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 42,
        name: "Halo Engagement & Matching Band Set",
        price: 4290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Wedding Sets",
        type: "Halo Set",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 43,
        name: "Three Stone & Curved Band Set",
        price: 3990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Wedding Sets",
        type: "Three Stone Set",
        shape: "Oval"
    },
    {
        id: 44,
        name: "Vintage Inspired Bridal Set",
        price: 3790,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Wedding Sets",
        type: "Vintage Set",
        shape: "Cushion",
        isBestSeller: true
    },
    {
        id: 45,
        name: "Modern Bezel & Band Set",
        price: 3290,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Wedding Sets",
        type: "Bezel Set",
        shape: "Round"
    },
    {
        id: 46,
        name: "Princess Cut Bridal Set",
        price: 4090,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Wedding Sets",
        type: "Princess Set",
        shape: "Princess"
    },
    {
        id: 47,
        name: "Emerald Cut & Eternity Set",
        price: 4490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Wedding Sets",
        type: "Emerald Set",
        shape: "Emerald",
        isBestSeller: true
    },
    {
        id: 48,
        name: "Pear Shape & Shadow Band Set",
        price: 3890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Wedding Sets",
        type: "Pear Set",
        shape: "Pear"
    }
]

const FILTER_TABS = [
    "All Wedding Sets",
    "Solitaire Set",
    "Halo Set",
    "Three Stone Set",
    "Vintage Set",
    "Modern Set"
]

export default function WeddingRingSetsPage() {
    return (
        <WeddingRingsTemplate
            title="Wedding Ring Sets"
            description="Find your perfect match with our curated wedding ring sets. Each set includes a stunning engagement ring paired with a complementary wedding band, designed to fit together flawlessly."
            products={WEDDING_SETS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Wedding Ring Sets"
            section="Women's"
        />
    )
}
