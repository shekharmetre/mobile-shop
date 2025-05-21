"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from our satisfied customers.
          </p>
        </div>

        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="rounded-full border-4 border-white dark:border-gray-800 overflow-hidden h-16 w-16 shadow-md">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-8 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}