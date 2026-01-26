import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MENS_TUNGSTEN_RINGS = [
    {
        id: 321,
        name: "Classic Grey Tungsten Wedding Band",
        price: 350,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white"],
        category: "Tungsten",
        type: "Classic",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 322,
        name: "Black Tungsten Beveled Edge Band",
        price: 450,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["black"],
        category: "Tungsten",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 323,
        name: "Tungsten Matte Finish Band",
        price: 390,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white"],
        category: "Tungsten",
        type: "Matte",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 324,
        name: "Wood Inlay Tungsten Ring",
        price: 550,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white", "brown"],
        category: "Tungsten",
        type: "Custom",
        shape: "Round"
    },
    {
        id: 325,
        name: "Brushed Black Tungsten Band",
        price: 490,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["black"],
        category: "Tungsten",
        type: "Brushed",
        shape: "Round"
    },
    {
        id: 326,
        name: "Wide Grey Tungsten Band",
        price: 420,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white"],
        category: "Tungsten",
        type: "Wide",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 327,
        name: "Tungsten & Gold Inlay Band",
        price: 650,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white", "yellow"],
        category: "Tungsten",
        type: "Modern",
        shape: "Round"
    },
    {
        id: 328,
        name: "Polished Tungsten Wedding Ring",
        price: 350,
        image: "https://images.unsplash.com/photo-1622398476015-5186bc74045d?w=400",
        metal: "Tungsten",
        metalColors: ["white"],
        category: "Tungsten",
        type: "Classic",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "Tungsten",
    "Classic",
    "Modern",
    "Matte",
    "Custom",
    "Brushed"
]

export default function MenTungstenRingsPage() {
    return (
        <WeddingRingsTemplate
            title="Men's Tungsten Wedding Bands"
            description="Exceptionally strong and modern. Our men's tungsten wedding bands offer a heavy, durable feel and unique finishes that stand the test of time."
            products={MENS_TUNGSTEN_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Tungsten"
            section="Men's"
        />
    )
}
