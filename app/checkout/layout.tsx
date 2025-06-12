import { CartSummary } from "@/components/cart/cart-summary";
import React from "react";

interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-7xl mx-auto">
      <div>{children}</div>
      <div className="md:sticky md:top-4 h-fit">
        <CartSummary buttonText="Procceed To Payment" />
      </div>
    </div>
  );
};

export default CheckoutLayout;
