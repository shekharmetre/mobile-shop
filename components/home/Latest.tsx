'use client'
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cart";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export function Latest() {
    const latestProducts = products.filter((product) => product.isLatest);
    const addToCart = useCartStore((state) => state.addItem);
    const router = useRouter()

    return (
        <React.Fragment>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Latest Products</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover our handpicked selection of premium mobile accessories.
                </p>
            </div>
            <div className="overflow-x-auto max-w-7xl mx-auto whitespace-nowrap py-4">
                <div className="flex space-x-4 px-4">
                    {latestProducts.map((latest, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow min-w-[250px]"
                        >

                            <Image src={latest.images[0] || "/category/accessories.png"}
                            width={100}
                            height={100}
                                alt={latest.name}
                                className="w-full h-40 object-cover cursor-pointer"
                                onClick={() => router.push(`product/${latest.id}`)}
                            />

                            <div className="p-4">
                                <h3 className="font-semibold text-gray-800">{latest.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <div>
                                        <p className="text-indigo-600 font-bold">₹{latest.price}</p>
                                        <p className="text-sm text-gray-500">Stock: {latest.inStock}</p>
                                    </div>
                                    <button onClick={(e) => { e.preventDefault(); addToCart(latest) }} className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}