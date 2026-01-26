import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_JEWELRY = [
    {
        id: 171,
        name: "Men's Diamond Cufflinks",
        price: 890,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Jewelry",
        type: "Cufflinks",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 172,
        name: "Men's Gold Chain Bracelet",
        price: 1290,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Jewelry",
        type: "Bracelet",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 173,
        name: "Men's Platinum Tie Bar",
        price: 590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Jewelry",
        type: "Tie Bar",
        shape: "Round"
    },
    {
        id: 174,
        name: "Men's Diamond Stud Earrings",
        price: 1690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Jewelry",
        type: "Earrings",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 175,
        name: "Men's Signet Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Men's Jewelry",
        type: "Signet Ring",
        shape: "Round"
    },
    {
        id: 176,
        name: "Men's Leather Bracelet with Gold",
        price: 790,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Men's Jewelry",
        type: "Bracelet",
        shape: "Round"
    },
    {
        id: 177,
        name: "Men's Diamond Pendant Necklace",
        price: 1990,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Men's Jewelry",
        type: "Necklace",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 178,
        name: "Men's Money Clip",
        price: 490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Men's Jewelry",
        type: "Money Clip",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Men's Jewelry",
    "Cufflinks",
    "Bracelet",
    "Earrings",
    "Necklace",
    "Signet Ring",
    "Accessories"
]

export default function MensJewelryPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Jewelry"
            description="Complete your look with our collection of men's jewelry. From diamond cufflinks to gold bracelets and signet rings, find the perfect accessories to complement your wedding band."
            products={MENS_JEWELRY}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Men's Jewelry"
            section="Men's"
        />
    )
}
