"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Premium Mobile Accessories",
    subtitle: "Enhance your mobile experience with our quality products",
    image: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg",
    cta: "Shop Now",
    link: "/products",
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out our latest high-performance chargers",
    image: "https://images.pexels.com/photos/4068355/pexels-photo-4068355.jpeg",
    cta: "View Collection",
    link: "/products?category=chargers",
    color: "from-rose-500 to-orange-500",
  },
  {
    id: 3,
    title: "Audio Collection",
    subtitle: "Experience superior sound with our headphones",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
    cta: "Explore",
    link: "/products?category=audio",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <div>
        {slides.map(
          (slide, index) =>
            current === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div
                    className={cn(
                      "absolute inset-0 opacity-40 bg-gradient-to-r",
                      slide.color
                    )}
                  />

                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 lg:px-16 max-w-screen-lg mx-auto">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-lg md:text-xl text-gray-100 mb-8 max-w-md"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Link href={slide.link}>
                        <Button size="lg" className="text-md font-medium">
                          {slide.cta}
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              current === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}