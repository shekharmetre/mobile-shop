"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SuccessAnimation() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation after component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-green-500/20 scale-0 transition-transform duration-700",
            animate && "scale-[2.5] opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-green-500/30 scale-0 transition-transform duration-700 delay-100",
            animate && "scale-[2] opacity-0"
          )}
        />
        <div
          className={cn(
            "relative transition-all duration-500 scale-0",
            animate && "scale-100"
          )}
        >
          <CheckCircle
            className="h-20 w-20 text-green-500 drop-shadow-md"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}