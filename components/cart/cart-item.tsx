'use client'
import { CartItem, CartState, Product } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Price } from "../ui/price";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface cartItems {
      items: CartItem[];
      removeItem: (productId: string) => void;
      updateQuantity: (productId: string, quantity: number) => void;
      clearCart: () => void;
}


export function CartItems({removeItem,updateQuantity,clearCart,items}:cartItems) {
    const { toast } = useToast();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.3 }
        }
    };
    const handleRemoveItem = (itemId: string, itemName: string) => {
        removeItem(itemId);
        toast({
            title: "Item removed",
            description: `${itemName} has been removed from your cart.`,
        });
    };

    const handleClearCart = () => {
        clearCart();
        toast({
            title: "Cart cleared",
            description: "All items have been removed from your cart.",
        });
    };
      const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4"
        >
            <div className="hidden sm:grid grid-cols-12 text-sm font-medium mb-2 text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
            </div>

            <AnimatePresence>
                {items.map((item) => (
                    <CartItemCard
                        key={item.product.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                        itemVariants={itemVariants}
                    />
                ))}
            </AnimatePresence>

            <div className="mt-4 flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    className="text-muted-foreground hover:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                </Button>
            </div>
        </motion.div>
    )
}


interface CartItemCardProps {
    item: CartItem;
    onQuantityChange: (itemId: string, quantity: number) => void;
    onRemove: (itemId: string, itemName: string) => void;
    itemVariants: any;
}

function CartItemCard({ item, onQuantityChange, onRemove, itemVariants }: CartItemCardProps) {
    const { product, quantity } = item;
    const price = product.discountPrice || product.price;
    const itemTotal = price * quantity;
    console.log(item)

    return (
        <motion.div
            variants={itemVariants}
            exit="exit"
            layout
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product Image and Info */}
                <div className="col-span-12 sm:col-span-6 flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                        <Image
                            src={product.images[0].startsWith("/") ? product.images[0] : `/${product.images[0]}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Link
                            href={`/product/${product.id}`}
                            className="font-medium hover:underline line-clamp-2"
                        >
                            {product.name}
                        </Link>
                        <span className="text-xs text-muted-foreground mb-1">
                            Category: {product.category
                                .split("-")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-destructive justify-start p-0 h-auto"
                            onClick={() => onRemove(product.id, product.name)}
                        >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                        </Button>
                    </div>
                </div>

                {/* Price */}
                <div className="col-span-4 sm:col-span-2 text-center">
                    <Price
                        price={product.price}
                        discountPrice={product.discountPrice}
                        className="text-sm sm:text-base"
                    />
                </div>

                {/* Quantity */}
                <div className="col-span-4 sm:col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-md overflow-hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 rounded-none border-r",
                                quantity <= 1 && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => onQuantityChange(product.id, quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center text-sm">
                            {quantity}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none border-l"
                            onClick={() => onQuantityChange(product.id, quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>

                {/* Total */}
                <div className="col-span-4 sm:col-span-2 text-right font-medium">
                    ₹{itemTotal.toFixed(2)}
                </div>
            </div>
        </motion.div>
    );
}