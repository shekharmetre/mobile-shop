import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  discountPrice?: number;
  className?: string;
}

export function Price({ price, discountPrice, className }: PriceProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {discountPrice ? (
        <>
          <span className="font-medium text-primary">
            ₹{discountPrice.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ₹{price.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="font-medium">₹{price.toFixed(2)}</span>
      )}
    </div>
  );
}