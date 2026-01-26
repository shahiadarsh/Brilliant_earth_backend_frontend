import JewelryTemplate from "@/components/JewelryTemplate"

const LAB_DIAMONDS = [
    {
        id: 901,
        name: "Lab Diamond Solitaire Necklace",
        price: 890,
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=400",
        metal: "18k White Gold",
        metalColors: ["white", "yellow"],
        category: "Necklaces",
        type: "Lab Diamond",
        isBestSeller: true
    },
    {
        id: 902,
        name: "Lab Diamond Stud Earrings",
        price: 690,
        image: "https://images.unsplash.com/photo-1535633302703-b0703af78518?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Earrings",
        type: "Lab Diamond"
    },
    {
        id: 903,
        name: "Lab Diamond Tennis Bracelet",
        price: 2990,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400",
        metal: "18k White Gold",
        metalColors: ["white"],
        category: "Bracelets",
        type: "Lab Diamond",
        isBestSeller: true
    },
    {
        id: 904,
        name: "Lab Diamond Fashion Ring",
        price: 1090,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
        metal: "18k Yellow Gold",
        metalColors: ["yellow"],
        category: "Rings",
        type: "Lab Diamond"
    }
]

const FILTER_TABS = ["All Lab Diamond", "Necklaces", "Earrings", "Bracelets", "Rings"]

export default function LabDiamondJewelryPage() {
    return (
        <JewelryTemplate
            title="Lab Diamond Jewelry"
            description="Our lab grown diamond jewelry offers the same brilliance and quality as natural diamonds, with exceptional value and ethically sourced origin."
            products={LAB_DIAMONDS}
            filterTabs={FILTER_TABS}
            breadcrumbPath="Lab Diamond"
        />
    )
}
