"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { Price } from "@/components/ui/price";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div onClick={() => router.push(`/product/${product.id}`)}>
        <div
          className={cn(
            "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300",
            isHovered ? "shadow-xl scale-[1.03]" : "shadow-md"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

              />

              {/* Product badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
                )}
                {product.discountPrice && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    {Math.round(
                      ((product.price - product.discountPrice) / product.price) * 100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>

              {/* Quick actions */}
              <div
                className={cn(
                  "absolute right-3 top-3 flex flex-col gap-2 transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              >
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
                  onClick={handleToggleFavorite}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600 dark:text-gray-400"
                    )}
                  />
                </Button>
                <Link href={`/product/${product.id}`}>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
                  >
                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                </Link>
              </div>

              {/* Add to cart button */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 flex justify-center p-3 transition-all duration-300",
                  isHovered ? "" : "translate-y-full opacity-0"
                )}
              >
                <Button
                  className={`w-full rounded-full bg-primary/90 backdrop-blur-sm ${isHovered && "bg-blue-600"}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 pt-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                {product.name}
              </h3>
            </div>

            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                      )}
                    />
                  ))}
              </div>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>

            <div className="mt-2">
              <Price
                price={product.price}
                discountPrice={product.discountPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}