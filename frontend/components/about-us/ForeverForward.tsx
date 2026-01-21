"use client"

const goals = [
  {
    title: "REPURPOSED METALS",
    text: "Today, 99% of our gold and 95% of our silver are repurposed. By the end of 2025, 100% will be repurposed or Fairmined."
  },
  {
    title: "CIRCULARITY",
    text: "Recycled and repurposed materials. Timeless designs. Lifetime warranties. And trade-in programs that give your jewelry new life."
  },
  {
    title: "ZERO WASTE",
    text: "No single-use plastics by 2050. Zero waste in showrooms and offices by 2033."
  },
  {
    title: "NET ZERO",
    text: "Our company-wide emission reduction targets have been validated by the Science Based Targets initiative."
  }
]

export function ForeverForward() {
  return (
    <section id="forever-forward" className="bg-white py-20 md:py-32 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-28">
          <h2 className="font-sans text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6">
            FOREVER FORWARD
          </h2>
          <p className="font-serif text-2xl md:text-[36px] leading-[1.3] text-[#163E3E] antialiased font-light">
            We constantly look for new ways to push our Mission forward, setting <span className="italic">ambitious goals</span> — and achieving them.
          </p>
          <div className="h-[2px] w-16 bg-[#A68A7C]/40 mx-auto mt-12"></div>
        </div>

        {/* 4-Column Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-gray-100 lg:border-t-0">
          {goals.map((goal, index) => (
            <div
              key={goal.title}
              className={`
                flex flex-col p-10 md:p-12 transition-all duration-300 hover:bg-gray-50/50 group
                ${/* Desktop Borders */ ""}
                ${index !== goals.length - 1 ? 'lg:border-r lg:border-gray-100' : ''}
                {/* Tablet Borders */ ""}
                ${index % 2 === 0 ? 'md:border-r md:border-gray-100' : ''}
                ${index < 2 ? 'md:border-b md:border-gray-100' : ''}
                {/* Mobile Borders */ ""}
                ${index !== goals.length - 1 ? 'border-b border-gray-100 lg:border-b-0 md:border-b-inherit' : ''}
              `}
            >
              <h3 className="font-sans text-[15px] font-bold tracking-[0.2em] uppercase text-gray-800 mb-6 group-hover:text-[#163E3E] transition-colors">
                {goal.title}
              </h3>

              <p className="font-sans text-[16px] leading-7 text-gray-600 font-light group-hover:text-gray-900 transition-colors">
                {goal.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
