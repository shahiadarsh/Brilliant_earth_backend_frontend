import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const PLATINUM_RINGS = [
    {
        id: 201,
        name: "Petite Shared Prong Platinum Diamond Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 202,
        name: "Platinum Comfort Fit Wedding Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 203,
        name: "Platinum Eternity Diamond Ring",
        price: 3290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Eternity",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 204,
        name: "Platinum Baguette Diamond Ring",
        price: 2490,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 205,
        name: "Classic Half Round Platinum Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Plain",
        shape: "Round"
    },
    {
        id: 206,
        name: "Platinum Pavé Diamond Ring",
        price: 2190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Diamond",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 207,
        name: "Platinum Milgrain Wedding Band",
        price: 1490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Vintage",
        shape: "Round"
    },
    {
        id: 208,
        name: "Platinum Bezel Set Diamond Ring",
        price: 2290,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Diamond",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Platinum",
    "Diamond",
    "Eternity",
    "Plain",
    "Vintage"
]

export default function WomenPlatinumRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Platinum Wedding Rings for Women"
            description="Experience the enduring beauty of platinum. Naturally white and remarkably strong, our platinum wedding rings for women are the perfect symbol of your everlasting love."
            products={PLATINUM_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Platinum"
            section="Women's"
        />
    )
}
