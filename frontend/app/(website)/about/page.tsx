//about-us page.tsx
import { AboutHero } from "@/components/about-us/AboutHero"
import { ForeverForward } from "@/components/about-us/ForeverForward"
import { MissionPillars } from "@/components/about-us/MissionPillars"
import { OurBeginning } from "@/components/about-us/OurBeginning"
import { TheDifference } from "@/components/about-us/TheDifference"
import { TheExperience } from "@/components/about-us/TheExperience"


export const metadata = {
    title: "Ritzin | About Us",
    description: "Design your own custom engagement ring. Choose from thousands of certified diamonds and unique ring settings.",
}

export default function AboutUsPage() {
    return (
        <main className="w-full min-h-screen bg-gray-50 scroll-smooth">
            <AboutHero />
            <OurBeginning />
            <MissionPillars />
            <ForeverForward />
            <TheDifference />
            <TheExperience />
        </main>
    )
}   
