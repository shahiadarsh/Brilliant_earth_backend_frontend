import JewelryTemplate from "@/components/JewelryTemplate"

const BRACELETS = [
    {
        id: 701,
        name: "Diamond Tennis Bracelet",
        price: 3490,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Tennis",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 702,
        name: "Gold Bangle",
        price: 1290,
        image: "https://images.unsplash.com/photo-1576158187530-98633e8b858c?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Bangles",
        type: "Gold"
    },
    {
        id: 703,
        name: "Chain Linked Bracelet",
        price: 690,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Chain",
        type: "Gold",
        isBestSeller: true
    },
    {
        id: 704,
        name: "Cuff Diamond Bracelet",
        price: 2190,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Cuffs",
        type: "Diamond"
    }
]

const FILTER_TABS = ["All Bracelets", "Tennis", "Bangles", "Chain", "Cuffs", "Diamond", "Gold"]

export default function BraceletsPage() {
    return (
        <JewelryTemplate
            title="Bracelets"
            description="From timeless diamond tennis bracelets to modern bangles and cuffs, our collection offers something for every occasion."
            products={BRACELETS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Bracelets"
        />
    )
}
