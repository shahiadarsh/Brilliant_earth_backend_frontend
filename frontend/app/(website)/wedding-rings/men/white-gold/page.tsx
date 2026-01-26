import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_WHITE_GOLD_RINGS = [
    {
        id: 341,
        name: "Classic Comfort Fit 18K White Gold Band",
        price: 990,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 342,
        name: "18K White Gold Beveled Edge Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 343,
        name: "18K White Gold Matte Finish Band",
        price: 1090,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Matte",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 344,
        name: "18K White Gold Hammered Wedding Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Hammered",
        shape: "Round"
    },
    {
        id: 345,
        name: "18K White Gold Baguette Diamond Band",
        price: 2290,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Diamond",
        shape: "Baguette"
    },
    {
        id: 346,
        name: "Wide Comfort Fit 18K White Gold Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 347,
        name: "18K White Gold Brushed & Polished Band",
        price: 1250,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 348,
        name: "18K White Gold Low Profile Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "White Gold",
        type: "Classic",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "White Gold",
    "Classic",
    "Modern",
    "Matte",
    "Hammered",
    "Diamond"
]

export default function MenWhiteGoldRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's White Gold Wedding Bands"
            description="Modern elegance in every design. Our men's 18k white gold wedding bands offer a sleek, sophisticated look that perfectly captures contemporary style."
            products={MENS_WHITE_GOLD_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="White Gold"
            section="Men's"
        />
    )
}
