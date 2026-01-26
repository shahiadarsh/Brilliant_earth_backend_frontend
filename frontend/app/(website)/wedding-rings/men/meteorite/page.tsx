import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_METEORITE_RINGS = [
    {
        id: 331,
        name: "Classic Meteorite Inlay Platinum Band",
        price: 3490,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Meteorite",
        type: "Inlay",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 332,
        name: "Meteorite & Cerakote Wedding Band",
        price: 1890,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Cerakote",
        metalColors: ["grey"],
        category: "Meteorite",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 333,
        name: "Meteorite & Yellow Gold Band",
        price: 2690,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Meteorite",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 334,
        name: "Full Meteorite Pattern Band",
        price: 3890,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Meteorite",
        metalColors: ["grey"],
        category: "Meteorite",
        type: "Custom",
        shape: "Round"
    },
    {
        id: 335,
        name: "Meteorite & Cobalt Wedding Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Cobalt",
        metalColors: ["white"],
        category: "Meteorite",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 336,
        name: "Brushed Meteorite Inlay Band",
        price: 2290,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Meteorite",
        type: "Inlay",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 337,
        name: "Meteorite & Black Zirconium Band",
        price: 1990,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Black Zirconium",
        metalColors: ["black"],
        category: "Meteorite",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 338,
        name: "Signature Meteorite Wedding Band",
        price: 2990,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Platinum",
        metalColors: ["white"],
        category: "Meteorite",
        type: "Classic",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Meteorite",
    "Inlay",
    "Modern",
    "Classic",
    "Custom"
]

export default function MenMeteoriteRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Meteorite Wedding Bands"
            description="Truly out of this world. Our meteorite wedding bands for men feature authentic meteorite inlays, showing unique patterns that are billions of years old."
            products={MENS_METEORITE_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Meteorite"
            section="Men's"
        />
    )
}
