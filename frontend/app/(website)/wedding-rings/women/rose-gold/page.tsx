import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const ROSE_GOLD_RINGS = [
    {
        id: 231,
        name: "18K Rose Gold Shared Prong Diamond Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 232,
        name: "18K Rose Gold Comfort Fit Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 233,
        name: "18K Rose Gold Eternity Diamond Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 234,
        name: "18K Rose Gold Baguette Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 235,
        name: "Classic Half Round Rose Gold Band",
        price: 790,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 236,
        name: "18K Rose Gold Pavé Diamond Ring",
        price: 1990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 237,
        name: "18K Rose Gold Milgrain Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 238,
        name: "18K Rose Gold Bezel Set Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose"],
        category: "Rose Gold",
        type: "Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Rose Gold",
    "Diamond",
    "Eternity",
    "Plain",
    "Vintage"
]

export default function WomenRoseGoldRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Rose Gold Wedding Rings for Women"
            description="Romantic and warm. Our 18k rose gold wedding rings for women offer a unique, vintage-inspired look that captures the heart."
            products={ROSE_GOLD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Rose Gold"
            section="Women's"
        />
    )
}
