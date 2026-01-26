import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const WHITE_GOLD_RINGS = [
    {
        id: 221,
        name: "18K White Gold Shared Prong Diamond Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 222,
        name: "18K White Gold Comfort Fit Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 223,
        name: "18K White Gold Eternity Diamond Ring",
        price: 2990,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 224,
        name: "18K White Gold Baguette Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 225,
        name: "Classic Half Round White Gold Band",
        price: 790,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 226,
        name: "18K White Gold Pavé Diamond Ring",
        price: 1990,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 227,
        name: "18K White Gold Milgrain Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 228,
        name: "18K White Gold Bezel Set Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "White Gold",
    "Diamond",
    "Eternity",
    "Plain",
    "Vintage"
]

export default function WomenWhiteGoldRingsPage() {
    return (
        <WeddingRingsTemplate
            title="White Gold Wedding Rings for Women"
            description="Elegance in every detail. Our 18k white gold wedding rings for women offer a sophisticated, modern aesthetic that beautifully complements any engagement ring."
            products={WHITE_GOLD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="White Gold"
            section="Women's"
        />
    )
}
