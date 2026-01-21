import Link from "next/link"

export function Breadcrumb() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="text-[11px] md:text-xs text-gray-500 font-sans tracking-wide">
        <Link href="/" className="hover:text-[#163E3E] hover:underline">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-900">Engagement Rings</span>
      </nav>
    </div>
  )
}
