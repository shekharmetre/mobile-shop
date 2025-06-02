"use client";

import { usePopupStore } from "@/store/usePopupStore";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function Popup() {
  const {
    isOpen,
    headline = "🚀 Upcoming Feature",
    description = "We're crafting something amazing behind the scenes. Stay tuned for updates!",
    closePopup,
  } = usePopupStore();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#111827] via-[#1e3a8a] to-[#111827] p-6 shadow-2xl text-white overflow-hidden"
      >
        {/* Glowing orbs */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-ping" />

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon with Pulse Glow */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg animate-pulse"
        >
          <span className="text-3xl">🚧</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-center mb-2 tracking-wide"
        >
          {headline}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-center text-blue-100/80 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Dismiss Button */}
        <motion.button
          onClick={closePopup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 mx-auto block rounded-full bg-white/10 hover:bg-white/20 px-5 py-2 text-sm text-white transition"
        >
          Got it!
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
