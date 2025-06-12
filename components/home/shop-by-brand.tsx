"use client"

import { ScrollingBrands } from "./brand"
import { motion } from "framer-motion"
import { ArrowRight, Truck, RotateCcw, Headphones, Shield } from "lucide-react"


const serviceFeatures = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free shipping over $100",
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
  },
  {
    icon: RotateCcw,
    title: "Free Return",
    description: "Free shipping over $100",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
  },
]

export default function ShopBrandsDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Brands</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Shop from the world's most trusted brands with unbeatable prices and quality guarantee
          </p>
        </div>
      </section>

<div className="bg-purple-200 p-20">
      {/* Shop by Brands Section */}
      
      <ScrollingBrands />

      {/* Additional Content */}
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:mx-40 grid mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {serviceFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${feature.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>
        </div>
    </div>
  )
}
