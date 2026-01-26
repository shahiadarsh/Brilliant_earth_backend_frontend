import WeddingRingsTemplate from "@/components/WeddingRingsTemplate"

const CUSTOM_MENS_RINGS = [
    {
        id: 131,
        name: "Personalized Engraved Men's Band",
        price: 1190,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Custom Rings",
        type: "Engraved",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 132,
        name: "Custom Inlay Men's Wedding Ring",
        price: 1490,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Custom Rings",
        type: "Inlay",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 133,
        name: "Mixed Metal Custom Band",
        price: 1390,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Custom Rings",
        type: "Mixed Metal",
        shape: "Round"
    },
    {
        id: 134,
        name: "Custom Width Men's Ring",
        price: 990,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "18k Rose Gold",
        metalColors: ["rose", "yellow", "white"],
        category: "All Custom Rings",
        type: "Custom Width",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 135,
        name: "Fingerprint Engraved Band",
        price: 1690,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Custom Rings",
        type: "Fingerprint",
        shape: "Round"
    },
    {
        id: 136,
        name: "Custom Texture Men's Band",
        price: 1290,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white", "rose"],
        category: "All Custom Rings",
        type: "Textured",
        shape: "Round"
    },
    {
        id: 137,
        name: "Personalized Stone Set Ring",
        price: 1890,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "All Custom Rings",
        type: "Stone Set",
        shape: "Round",
        isBestSeller: true
    },
    {
        id: 138,
        name: "Custom Profile Wedding Band",
        price: 1590,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400",
        metal: "Platinum",
        metalColors: ["white", "yellow"],
        category: "All Custom Rings",
        type: "Custom Profile",
        shape: "Round"
    }
]

const FILTER_TABS = [
    "All Custom Rings",
    "Engraved",
    "Inlay",
    "Mixed Metal",
    "Fingerprint",
    "Textured",
    "Stone Set"
]

export default function CustomizeYourOwnRingPage() {
    return (
        <WeddingRingsTemplate
            title="Customize Your Own Men's Ring"
            description="Create a one-of-a-kind wedding band that reflects your unique style. From personalized engravings to custom inlays and mixed metals, design the perfect ring that tells your story."
            products={CUSTOM_MENS_RINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Customize Your Own Ring"
            section="Men's"
        />
    )
}
