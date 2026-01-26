import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const MATCHING_RINGS = [
    {
        id: 21,
        name: "Curved Band to Match Oval Engagement Ring",
        price: 1290,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Matching Rings",
        type: "Curved",
        shape: "Oval",
        isBestSeller: true
    },
    {
        id: 22,
        name: "Contoured Band for Round Solitaire",
        price: 990,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Matching Rings",
        type: "Contoured",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 23,
        name: "Shadow Band for Halo Setting",
        price: 1490,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Matching Rings",
        type: "Shadow",
        shape: "Round"
    },
    {
        id: 24,
        name: "Fitted Band for Three Stone Ring",
        price: 1690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Matching Rings",
        type: "Fitted",
        shape: "Emerald"
    },
    {
        id: 25,
        name: "Curved Pavé Matching Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Matching Rings",
        type: "Pavé",
        shape: "Cushion",
        isBestSeller: true
    },
    {
        id: 26,
        name: "Notched Band for Pear Shape",
        price: 1390,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Matching Rings",
        type: "Notched",
        shape: "Pear"
    },
    {
        id: 27,
        name: "Chevron Matching Wedding Band",
        price: 890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Matching Rings",
        type: "Chevron",
        shape: "Princess"
    },
    {
        id: 28,
        name: "Custom Fitted Diamond Band",
        price: 1890,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Matching Rings",
        type: "Custom",
        shape: "Marquise"
    }
]

const FILTER_TABS = [
    "All Matching Rings",
    "Curved",
    "Contoured",
    "Shadow",
    "Fitted",
    "Pavé",
    "Chevron"
]

export default function FindMyMatchingRingPage() {
    return (
        <WeddingRingsTemplate
            title="Find My Matching Ring"
            description="Discover the perfect wedding band to complement your engagement ring. Our matching bands are designed to fit seamlessly with various engagement ring styles and shapes."
            products={MATCHING_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Find My Matching Ring"
            section="Women's"
        />
    )
}
