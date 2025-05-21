"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Price } from "@/components/ui/price";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const addToCart = useCartStore((state) => state.addItem);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 inline-flex items-center"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md",
                  index === selectedImageIndex 
                    ? "ring-2 ring-primary" 
                    : "ring-1 ring-gray-200 dark:ring-gray-700"
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                      )}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <Price
            price={product.price}
            discountPrice={product.discountPrice}
            className="text-2xl"
          />

          <p className="text-muted-foreground">{product.description}</p>

          {product.compatibility && (
            <div>
              <p className="text-sm font-medium">Compatible with:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {product.compatibility.map((device) => (
                  <span
                    key={device}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  >
                    {device}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 mr-2 text-green-500" />
              <span>Free shipping on orders over ₹50</span>
            </div>
            <div className="flex items-center text-sm">
              <Shield className="h-4 w-4 mr-2 text-blue-500" />
              <span>1 year warranty included</span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Button className="w-full" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="mt-8">
            <TabsContent value="features" className="space-y-4">
              <h2 className="text-xl font-semibold">Product Features</h2>
              {product.features ? (
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <p>No feature information available for this product.</p>
              )}
            </TabsContent>
            
            <TabsContent value="specifications">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Subcategory</span>
                    <span>{product.subcategory}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">In Stock</span>
                    <span>{product.inStock ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {product.compatibility && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Compatible with</span>
                      <span>{product.compatibility.join(", ")}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Product ID</span>
                    <span>{product.id}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Review functionality coming soon.
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}