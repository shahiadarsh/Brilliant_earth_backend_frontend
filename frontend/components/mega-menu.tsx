"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface MegaMenuProps {
  label: string
  href: string
}

export function MegaMenu({ label, href }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const megaMenuContent: Record<
    string,
    {
      columns: Array<{ title: string; links: Array<{ label: string; href: string }> }>
      featuredImage?: string
      featuredTitle?: string
    }
  > = {
    "ENGAGEMENT RINGS": {
      columns: [
        {
          title: "DESIGN YOUR OWN ENGAGEMENT RING",
          links: [
            { label: "Start with a Setting", href: "/design" },
            { label: "Start with a Natural Diamond", href: "/design?type=natural" },
            { label: "Start with a Lab Grown Diamond", href: "/design?type=lab" },
            { label: "Start with a Gemstone", href: "/design?type=gemstone" },
            { label: "Start with a Bridal Set", href: "/design?type=bridal" },
          ],
        },
        {
          title: "ENGAGEMENT RING STYLES",
          links: [
            { label: "Solitaire", href: "/engagement-rings/list?style=solitaire" },
            { label: "Three Stone", href: "/engagement-rings/list?style=three-stone" },
            { label: "Halo", href: "/engagement-rings/list?style=halo" },
            { label: "Hidden Halo", href: "/engagement-rings/list?style=hidden-halo" },
            { label: "Nature-Inspired", href: "/engagement-rings/list?style=nature" },
            { label: "Antique & Vintage", href: "/engagement-rings/list?style=vintage" },
          ],
        },
        {
          title: "SHOP BY SHAPE",
          links: [
            { label: "Oval", href: "/engagement-rings/list?shape=oval" },
            { label: "Round", href: "/engagement-rings/list?shape=round" },
            { label: "Cushion", href: "/engagement-rings/list?shape=cushion" },
            { label: "Emerald", href: "/engagement-rings/list?shape=emerald" },
            { label: "Pear", href: "/engagement-rings/list?shape=pear" },
            { label: "Princess", href: "/engagement-rings/list?shape=princess" },
            { label: "Marquise", href: "/engagement-rings/list?shape=marquise" },
            { label: "Asscher", href: "/engagement-rings/list?shape=asscher" },
          ],
        },
        {
          title: "FEATURED",
          links: [
            { label: "Ready to Ship Engagement Rings", href: "/engagement-rings/list?ready=true" },
            { label: "Top 20 Engagement Rings", href: "/engagement-rings/list?featured=top20" },
            { label: "Signature Collections", href: "/engagement-rings/list?collection=signature" },
            { label: "Custom Engagement Rings", href: "/engagement-rings/list?custom=true" },
          ],
        },
      ],
      featuredImage: "/engagement-featured.jpg",
      featuredTitle: "Bold Bezels",
    },
    "WEDDING RINGS": {
      columns: [
        {
          title: "WOMEN",
          links: [
            { label: "Women's Wedding Rings", href: "/wedding-rings/women" },
            { label: "Design Your Own Ring Stack", href: "/design" },
            { label: "Find My Matching Wedding Ring", href: "/wedding-rings/matching" },
            { label: "Diamond Rings", href: "/wedding-rings/list?type=diamond" },
            { label: "Wedding Ring Sets", href: "/wedding-rings/list?sets=true" },
            { label: "Eternity Rings", href: "/wedding-rings/list?style=eternity" },
          ],
        },
        {
          title: "MEN",
          links: [
            { label: "Men's Wedding Bands", href: "/wedding-rings/men" },
            { label: "Classic Bands", href: "/wedding-rings/list?style=classic" },
            { label: "Customize Your Own Ring", href: "/design" },
            { label: "Diamond Bands", href: "/wedding-rings/list?has-diamond=true" },
            { label: "Matte Bands", href: "/wedding-rings/list?finish=matte" },
            { label: "Hammered Bands", href: "/wedding-rings/list?finish=hammered" },
          ],
        },
        {
          title: "WOMEN'S BY METAL",
          links: [
            { label: "Platinum", href: "/wedding-rings/list?metal=platinum" },
            { label: "Yellow Gold", href: "/wedding-rings/list?metal=yellow" },
            { label: "White Gold", href: "/wedding-rings/list?metal=white" },
            { label: "Rose Gold", href: "/wedding-rings/list?metal=rose" },
          ],
        },
        {
          title: "MEN'S BY METAL",
          links: [
            { label: "Platinum", href: "/wedding-rings/list?metal=platinum" },
            { label: "Yellow Gold", href: "/wedding-rings/list?metal=yellow" },
            { label: "Tungsten", href: "/wedding-rings/list?metal=tungsten" },
            { label: "Meteorite", href: "/wedding-rings/list?metal=meteorite" },
            { label: "Tantalum", href: "/wedding-rings/list?metal=tantalum" },
          ],
        },
      ],
      featuredImage: "/wedding-featured.jpg",
      featuredTitle: "Gift Card Offer",
    },
    JEWELRY: {
      columns: [
        {
          title: "JEWELRY",
          links: [
            { label: "Earrings", href: "/jewelry/earrings" },
            { label: "Necklaces", href: "/jewelry/necklaces" },
            { label: "Rings", href: "/jewelry/rings" },
            { label: "Bracelets", href: "/jewelry/bracelets" },
            { label: "Men's Jewelry", href: "/jewelry/mens" },
            { label: "Lab Diamond Jewelry", href: "/jewelry?type=lab-diamond" },
          ],
        },
        {
          title: "SHOP BY STYLE",
          links: [
            { label: "Tennis Bracelets", href: "/jewelry?style=tennis" },
            { label: "Diamond Stud Earrings", href: "/jewelry?style=studs" },
            { label: "Stacking Rings", href: "/jewelry?style=stacking" },
            { label: "Fashion Rings", href: "/jewelry?style=fashion" },
            { label: "Cocktail Rings", href: "/jewelry?style=cocktail" },
            { label: "Promise Rings", href: "/jewelry?style=promise" },
          ],
        },
        {
          title: "DESIGN YOUR OWN",
          links: [
            { label: "Diamond Earrings", href: "/design?product=earrings" },
            { label: "Diamond Necklace", href: "/design?product=necklace" },
            { label: "Gemstone Necklace", href: "/design?product=necklace&type=gemstone" },
            { label: "Gemstone Ring", href: "/design?product=ring&type=gemstone" },
            { label: "Diamond Ring", href: "/design?product=ring" },
          ],
        },
        {
          title: "JEWELRY COLLECTIONS",
          links: [
            { label: "Jane Goodall Collection", href: "/collections/jane-goodall" },
            { label: "Love Decoded Collection", href: "/collections/love-decoded" },
            { label: "Zodiac Jewelry", href: "/collections/zodiac" },
            { label: "Sol Collection", href: "/collections/sol" },
            { label: "Pacific Green Jewelry", href: "/collections/pacific-green" },
          ],
        },
      ],
      featuredImage: "/jewelry-featured.jpg",
      featuredTitle: "Medallions with Meaning",
    },
    DIAMONDS: {
      columns: [
        {
          title: "SHOP DIAMONDS",
          links: [
            { label: "Natural Diamonds", href: "/diamonds/natural" },
            { label: "Lab Grown Diamonds", href: "/diamonds/lab-grown" },
            { label: "Colored Diamonds", href: "/diamonds/colored" },
            { label: "Ready to Ship", href: "/diamonds?ready=true" },
          ],
        },
        {
          title: "SHOP BY SHAPE",
          links: [
            { label: "Round", href: "/diamonds?shape=round" },
            { label: "Oval", href: "/diamonds?shape=oval" },
            { label: "Cushion", href: "/diamonds?shape=cushion" },
            { label: "Emerald", href: "/diamonds?shape=emerald" },
            { label: "Pear", href: "/diamonds?shape=pear" },
            { label: "Princess", href: "/diamonds?shape=princess" },
          ],
        },
        {
          title: "DIAMOND JEWELRY",
          links: [
            { label: "Diamond Earrings", href: "/jewelry/diamond-earrings" },
            { label: "Diamond Necklaces", href: "/jewelry/diamond-necklaces" },
            { label: "Diamond Bracelets", href: "/jewelry/diamond-bracelets" },
            { label: "All Diamond Jewelry", href: "/jewelry?type=diamond" },
          ],
        },
        {
          title: "DIAMOND GUIDES",
          links: [
            { label: "Diamond Cut Guide", href: "/guides/diamond-cut" },
            { label: "Diamond Color Guide", href: "/guides/diamond-color" },
            { label: "Diamond Clarity Guide", href: "/guides/diamond-clarity" },
            { label: "Lab vs. Natural", href: "/guides/lab-vs-natural" },
          ],
        },
      ],
      featuredImage: "/diamonds-featured.jpg",
      featuredTitle: "Pacific Green Lab Diamonds",
    },
    GEMSTONES: {
      columns: [
        {
          title: "DESIGN YOUR OWN GEMSTONE RING",
          links: [
            { label: "Start with a Gemstone", href: "/design?type=gemstone" },
            { label: "Start with a Setting", href: "/design" },
            { label: "Sapphire", href: "/gemstones?type=sapphire" },
            { label: "Emerald", href: "/gemstones?type=emerald" },
            { label: "Moissanite", href: "/gemstones?type=moissanite" },
          ],
        },
        {
          title: "SHOP BY COLOR",
          links: [
            { label: "Blue", href: "/gemstones?color=blue" },
            { label: "Green", href: "/gemstones?color=green" },
            { label: "Pink", href: "/gemstones?color=pink" },
            { label: "Purple", href: "/gemstones?color=purple" },
            { label: "Bi-color", href: "/gemstones?color=bi-color" },
          ],
        },
        {
          title: "SHOP BY SHAPE",
          links: [
            { label: "Emerald", href: "/gemstones?shape=emerald" },
            { label: "Oval", href: "/gemstones?shape=oval" },
            { label: "Cushion", href: "/gemstones?shape=cushion" },
            { label: "Round", href: "/gemstones?shape=round" },
            { label: "Radiant", href: "/gemstones?shape=radiant" },
          ],
        },
        {
          title: "PRESET GEMSTONE RINGS",
          links: [
            { label: "Moissanite Engagement Rings", href: "/gemstones/moissanite" },
            { label: "Sapphire Engagement Rings", href: "/gemstones/sapphire" },
            { label: "Emerald Engagement Rings", href: "/gemstones/emerald" },
            { label: "All Gemstone Jewelry", href: "/gemstones" },
          ],
        },
      ],
      featuredImage: "/gemstones-featured.jpg",
      featuredTitle: "Bi-Color Gemstone Rings",
    },
    GIFTS: {
      columns: [
        {
          title: "TOP GIFTS",
          links: [
            { label: "Gifts Under $250", href: "/gifts?price=0-250" },
            { label: "Gifts Under $500", href: "/gifts?price=0-500" },
            { label: "Stacking Rings", href: "/gifts?category=stacking" },
            { label: "Best Selling Gifts", href: "/gifts?sort=bestselling" },
            { label: "Birthstone Jewelry", href: "/gifts/birthstones" },
          ],
        },
        {
          title: "GIFTS BY RECIPIENT",
          links: [
            { label: "Gifts For Her", href: "/gifts/for-her" },
            { label: "Gifts For Him", href: "/gifts/for-him" },
            { label: "Unisex Gifts", href: "/gifts?gender=unisex" },
          ],
        },
        {
          title: "GIFTS BY OCCASION",
          links: [
            { label: "Valentine's Day Gifts", href: "/gifts/valentines" },
            { label: "Anniversary Gifts", href: "/gifts/anniversary" },
            { label: "Birthday Gifts", href: "/gifts/birthday" },
            { label: "Bridal Party Gifts", href: "/gifts/bridal-party" },
            { label: "Milestone Gifts", href: "/gifts/milestone" },
          ],
        },
        {
          title: "BIRTHSTONES BY MONTH",
          links: [
            { label: "January - Garnet", href: "/gifts/birthstones/january" },
            { label: "February - Amethyst", href: "/gifts/birthstones/february" },
            { label: "March - Aquamarine", href: "/gifts/birthstones/march" },
            { label: "April - Diamond", href: "/gifts/birthstones/april" },
            { label: "May - Emerald", href: "/gifts/birthstones/may" },
          ],
        },
      ],
      featuredImage: "/gifts-featured.jpg",
      featuredTitle: "Birthstone Jewelry",
    },
    ABOUT: {
      columns: [
        {
          title: "ABOUT US",
          links: [
            { label: "Our Story", href: "/about" },
            { label: "Our Mission", href: "/about/mission" },
            { label: "Responsible Sourcing", href: "/about/sourcing" },
            { label: "Repurposed Gold", href: "/about/repurposed" },
            { label: "2024 Mission Report", href: "/about/mission-report" },
          ],
        },
        {
          title: "CAREERS",
          links: [
            { label: "Open Jobs", href: "/careers" },
            { label: "Inclusivity", href: "/careers/inclusivity" },
          ],
        },
        {
          title: "OUR STORES",
          links: [
            { label: "Store Locations", href: "/stores" },
            { label: "Virtual Appointment", href: "/appointment" },
          ],
        },
        {
          title: "FEATURED GUIDES",
          links: [
            { label: "Engagement Ring Styles", href: "/guides/ring-styles" },
            { label: "How Much to Spend", href: "/guides/how-much-to-spend" },
            { label: "Ring Engraving Ideas", href: "/guides/engraving" },
            { label: "Jewelry Trends 2026", href: "/guides/trends" },
          ],
        },
      ],
      featuredImage: "/about-featured.jpg",
      featuredTitle: "Jewelry Redefined",
    },
  }

  const content = megaMenuContent[label]

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1.5 py-2 px-1 text-sm font-medium text-foreground hover:text-[#163E3E] transition-colors duration-200">
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && content && (
        <div className="absolute left-0 top-full w-screen bg-white border-t-2 border-[#008080] shadow-2xl">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-5 gap-12">
              {content.columns.map((column, idx) => (
                <div key={idx}>
                  <h3 className="font-serif text-xs font-light uppercase tracking-widest text-foreground mb-6 border-b border-gray-200 pb-3">
                    {column.title}
                  </h3>
                  <ul className="space-y-4">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-600 hover:text-[#163E3E] transition-colors duration-150 font-light"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden h-full">
                  <Image
                    src={content.featuredImage || "/placeholder.jpg"}
                    alt={content.featuredTitle || "Featured"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h4 className="font-serif text-lg font-light text-foreground mb-2">{content.featuredTitle}</h4>
                  <Link href="#" className="text-sm font-medium text-[#163E3E] hover:text-[#123333] transition-colors">
                    Shop Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
