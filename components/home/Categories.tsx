"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Categories() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our wide selection of mobile accessories categorized for your convenience.
          </p>
        </div>

        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={item}>
              <Link href={`/products?category=${category.slug}`}>
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-xl h-60 shadow-md hover:shadow-xl transition-all duration-300",
                    index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  )}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-3 max-w-xs">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium">
                      <span className="mr-1">Shop now</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}