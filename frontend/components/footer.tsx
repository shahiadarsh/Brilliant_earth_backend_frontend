"use client"

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ChevronRight,
  Mail
} from "lucide-react"

// Custom SVG for Pinterest to match the style if needed, or use Lucide's if sufficient.
// Using a generic SVG for the "X" logo and Pinterest for accuracy.
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.487-.695-2.432-2.878-2.432-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-100 font-sans pt-12 md:pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 xl:gap-x-12 gap-y-12 md:gap-y-16 mb-16 md:mb-24 text-center sm:text-left">

          {/* Column 1 */}
          <div className="flex flex-col gap-10 md:gap-12">
            {/* ABOUT */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900">About</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Our Story", href: "/about" },
                  { label: "Our Mission", href: "/info/our-mission" },
                  { label: "Responsible Sourcing", href: "/info/responsible-sourcing" },
                  { label: "Sustainability Goals", href: "/info/sustainability" },
                  { label: "How We Give Back", href: "/info/give-back" },
                  { label: "Our People", href: "/info/people" },
                  { label: "Ritzin Reviews", href: "/info/reviews" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* EDUCATION */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900">Education</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Blog", href: "/blog" },
                  { label: "4 C's of Diamond Guide", href: "/guides/4cs" },
                  { label: "Lab Grown vs. Natural Diamond", href: "/guides/lab-vs-natural" },
                  { label: "Moissanite vs. Diamond Guide", href: "/guides/moissanite-vs-diamond" },
                  { label: "Free Ring Sizer", href: "/guides/ring-sizer" },
                  { label: "Careers", href: "/careers" },
                  { label: "Investor Relations", href: "/investor-relations" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-10 md:gap-12">
            {/* ORDERS */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900">Orders</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Track Your Order", href: "/account/orders" },
                  { label: "Free 30 Day Returns", href: "/info/returns" },
                  { label: "Free Shipping Both Ways", href: "/info/shipping" },
                  { label: "Free Lifetime Warranty", href: "/info/warranty" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CUSTOMER SERVICE */}
            <div>
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900">Customer Service</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Contact Us", href: "/contact" },
                  { label: "FAQs", href: "/info/faqs" },
                  { label: "Shipping Policy", href: "/info/shipping" },
                  { label: "Returns Policy", href: "/info/returns" },
                  { label: "Financing", href: "/info/financing" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 - Newsletter & Social */}
          <div className="flex flex-col gap-10 md:gap-12 sm:col-span-2 lg:col-span-1">
            {/* CONTACT US */}
            <div className="border-t sm:border-t-0 pt-10 sm:pt-0">
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900 text-center sm:text-left">Contact Us</h3>
              <ul className="flex flex-col gap-3 text-center sm:text-left">
                {[
                  { label: "Live Chat", href: "#" },
                  { label: "Book Appointment", href: "/appointment" },
                  { label: "Stores", href: "/stores" },
                  { label: "Email Us", href: "/contact" },
                  { label: "800.691.0952", href: "tel:8006910952" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-[13px] text-gray-600 hover:text-[#163E3E] hover:underline transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SIGN UP */}
            <div className="bg-gray-50/50 p-6 sm:p-0 sm:bg-transparent rounded-lg text-center sm:text-left">
              <h3 className="text-[13px] font-bold tracking-[0.1em] uppercase mb-5 text-gray-900">Stay Connected</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-[13px]">Email me updates and offers</span>
              </div>

              <div className="flex w-full max-w-sm mb-8 mx-auto sm:mx-0">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 min-w-0 border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#163E3E] rounded-l-[2px] bg-white text-left"
                />
                <button className="bg-[#163E3E] text-white px-5 py-2 hover:bg-[#123333] transition-colors rounded-r-[2px] flex-shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center justify-center sm:justify-start gap-6">
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors"><Instagram className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors"><Facebook className="w-5 h-5 fill-current" /></Link>
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors"><PinterestIcon className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors"><XIcon className="w-4 h-4" /></Link>
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors hidden xs:block"><Youtube className="w-5 h-5" /></Link>
                <Link href="#" className="text-gray-900 hover:text-[#163E3E] transition-colors hidden xs:block"><Linkedin className="w-5 h-5 fill-current" /></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-6">
          <div className="text-center md:text-left">
            <p className="text-[11px] text-gray-500 mb-2">©2026 Ritzin, LLC</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-[10px] text-gray-400 font-medium">
              <Link href="/info/terms-conditions" className="hover:text-gray-600">Terms & Conditions</Link>
              <Link href="/info/privacy-policy" className="hover:text-gray-600">Privacy Policy</Link>
              <Link href="/info/site-map" className="hover:text-gray-600">Site Map</Link>
              <Link href="/info/accessibility" className="hover:text-gray-600">Accessibility</Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Crafted with Love</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
