"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const brands = [
  {
    id: 1,
    name: "Treivance",
    logo: "Trivance",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    id: 2,
    name: "3G Gold",
    logo: "3G Gold",
    color: "from-yellow-500 to-yellow-700",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    id: 3,
    name: "ETAR",
    logo: "ETAR",
    color: "from-blue-600 to-blue-800",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: 4,
    name: "ARH",
    logo: "ARh",
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    id: 5,
    name: "Ytel",
    logo: "Ytel",
    color: "from-green-500 to-green-700",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: 6,
    name: "U&I",
    logo: "U&I",
    color: "from-pink-500 to-pink-700",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
  },
  {
    id: 7,
    name: "VIP",
    logo: "https://pngtree.com/freepng/vip-logo-design_4567894.html",
    color: "from-purple-600 to-purple-800",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    id: 8,
    name: "Signatize",
    logo: "https://signatize.in/assets/images/logo.png",
    color: "from-orange-500 to-orange-700",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: 9,
    name: "Nirmax",
    logo: "NX",
    color: "from-teal-500 to-teal-700",
    bgColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
  {
    id: 10,
    name: "Ycom",
    logo: "YC",
    color: "from-cyan-500 to-cyan-700",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    id: 11,
    name: "OOGE",
    logo: "OG",
    color: "from-lime-500 to-lime-700",
    bgColor: "bg-lime-50",
    textColor: "text-lime-600",
  },
  {
    id: 12,
    name: "Troops",
    logo: "TP",
    color: "from-amber-500 to-amber-700",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    id: 13,
    name: "ArBuda",
    logo: "AB",
    color: "from-rose-500 to-rose-700",
    bgColor: "bg-rose-50",
    textColor: "text-rose-600",
  },
  {
    id: 14,
    name: "Leebon",
    logo: "LB",
    color: "from-fuchsia-500 to-fuchsia-700",
    bgColor: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
  },
  {
    id: 15,
    name: "Hr Life",
    logo: "HL",
    color: "from-sky-500 to-sky-700",
    bgColor: "bg-sky-50",
    textColor: "text-sky-600",
  },
];


export function ScrollingBrands() {
  const scrollDuration = 30 // seconds

  return (
    <section className="overflow-hidden relative">
      <div className=" px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop By Brands</h2>
          <Link href="/brands" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group">
            View all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Infinite Scrolling Marquee */}
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              duration: scrollDuration,
              ease: "linear",
            }}
          >
            {/* Duplicated list for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className={`min-w-[160px] ${brand.bgColor} rounded-2xl p-4 shadow-md border border-white/50 backdrop-blur-sm transition-all duration-300 group`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div
                    className={`w-full h-20 rounded-xl bg-gradient-to-r ${brand.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-lg">{brand.name}</span>
                  </div>
                  <h3 className={`font-semibold text-sm ${brand.textColor} text-center`}>{brand.name}</h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
