import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_PLATINUM_RINGS = [
    {
        id: 301,
        name: "Classic Comfort Fit Platinum Band",
        price: 1490,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 302,
        name: "Platinum Beveled Edge Band",
        price: 1690,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 303,
        name: "Platinum Matte Finish Band",
        price: 1590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Matte",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 304,
        name: "Platinum Hammered Wedding Ring",
        price: 1790,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Hammered",
        shape: "Round"
    },
    {
        id: 305,
        name: "Platinum Baguette Diamond Band",
        price: 2890,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 306,
        name: "Wide Comfort Fit Platinum Band",
        price: 1890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 307,
        name: "Platinum Brushed & Polished Band",
        price: 1750,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 308,
        name: "Platinum Low Profile Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Platinum",
        type: "Classic",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Platinum",
    "Classic",
    "Modern",
    "Matte",
    "Hammered",
    "Diamond"
]

export default function MenPlatinumRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Platinum Wedding Bands"
            description="Strength meets sophistication. Our men's platinum wedding bands are crafted to last a lifetime, offering a naturally white glow and exceptional durability."
            products={MENS_PLATINUM_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Platinum"
            section="Men's"
        />
    )
}
