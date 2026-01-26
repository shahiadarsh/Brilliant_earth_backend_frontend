import JewelryTemplate from "@/components/JewelryTemplate"

const EARRINGS = [
    {
        id: 401,
        name: "Diamond Stud Earrings",
        price: 790,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow", "rose"],
        category: "Studs",
        type: "Diamond",
        isBestSeller: true
    },
    {
        id: 402,
        name: "Hoop Diamond Earrings",
        price: 1290,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow", "white"],
        category: "Hoops",
        type: "Diamond"
    },
    {
        id: 403,
        name: "Pearl Drop Earrings",
        price: 490,
        image: "https://images.unsplash.com/photo-1596944210341-6031382b3d83?w=400",
        metal: "14k Yellow Gold",
        metalColors: ["yellow"],
        category: "Drop",
        type: "Pearl",
        isBestSeller: true
    },
    {
        id: 404,
        name: "Sapphire Halo Studs",
        price: 1590,
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Studs",
        type: "Gemstone"
    }
]

const FILTER_TABS = ["All Earrings", "Studs", "Hoops", "Drop", "Diamond", "Gemstone", "Pearl"]

export default function EarringsPage() {
    return (
        <JewelryTemplate
            title="Earrings"
            description="Discover our exquisite collection of earrings, from classic diamond studs to elegant gold hoops and drop earrings."
            products={EARRINGS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Earrings"
        />
    )
}
