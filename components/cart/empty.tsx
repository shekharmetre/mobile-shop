import {motion} from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
export function EmptyCart(){
    return (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-xl"
        >
          <div className="mx-auto flex justify-center mb-4">
            <ShoppingBag size={64} className="text-muted-foreground/50" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </motion.div>
    )
}