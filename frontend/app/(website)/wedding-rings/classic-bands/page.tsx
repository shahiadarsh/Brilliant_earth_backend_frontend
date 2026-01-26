import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const CLASSIC_BANDS = [
    {
        id: 111,
        name: "Traditional Gold Comfort Fit Band",
        price: 790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Classic Bands",
        type: "Comfort Fit",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 112,
        name: "Platinum Classic Wedding Ring",
        price: 1390,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Classic Bands",
        type: "Traditional",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 113,
        name: "White Gold Timeless Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Classic Bands",
        type: "Timeless",
        shape: "Round"
    },
    {
        id: 114,
        name: "Rose Gold Classic Men's Ring",
        price: 990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Classic Bands",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 115,
        name: "Flat Profile Classic Band",
        price: 690,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Classic Bands",
        type: "Flat",
        shape: "Round"
    },
    {
        id: 116,
        name: "Half-Round Classic Wedding Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Classic Bands",
        type: "Half-Round",
        shape: "Round"
    },
    {
        id: 117,
        name: "Domed Classic Men's Band",
        price: 1090,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Classic Bands",
        type: "Domed",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 118,
        name: "Pipe Cut Classic Wedding Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Classic Bands",
        type: "Pipe Cut",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Classic Bands",
    "Comfort Fit",
    "Traditional",
    "Flat",
    "Domed",
    "Half-Round",
    "Pipe Cut"
]

export default function ClassicBandsPage() {
    return (
        <WeddingRingsTemplate
            title="Classic Men's Wedding Bands"
            description="Timeless elegance meets superior craftsmanship in our classic men's wedding bands. Choose from traditional profiles and premium metals for a ring that will last a lifetime."
            products={CLASSIC_BANDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Classic Bands"
            section="Men's"
        />
    )
}
