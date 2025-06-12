
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import SuccessAnimation from "@/components/checkout/success-animation";
import OrderSummaryCard from "@/components/checkout/order-summary";
import Confetti from "@/components/ui/confetti";
import { isTokenValid } from "@/lib/generate-hash";
import { redirect } from "next/navigation";
import { SuccessClient } from "@/components/checkout/success-client";


export default async function PaymentPage({ searchParams }: {
  searchParams: Promise<{ token?: string, txnid?: string }>
}) {

  const { token, txnid } = await searchParams
  console.log(token, "from urls dflasdflk", txnid)

  const isvalid = isTokenValid(token, txnid)

  if (!isvalid || !txnid || !token) {
    console.log("helow orld")
    redirect("/")
  }
  const orderData = {
    orderId: "ORD123456",
    amount: "₹100",
    paymentMethod: "UPI",
    product: "Test Product",
    status: "Success",
    customerName: "John",
    date: new Date().toLocaleDateString(),
  };

  // Trigger confetti on component mount

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-teal-500/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-teal-900/30 overflow-hidden relative py-12 px-4 sm:px-6 md:py-16 lg:py-20">
      {/* Confetti animation */}
      <Confetti />

      <div className="max-w-4xl mx-auto">
        {/* Success message */}
        <SuccessClient txnId={txnid} />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" />
              Track Your Order
            </Button>
          </Link>
        </div>

        {/* Recommendations */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">You Might Also Like</h2>
          <RecommendationGrid />
        </div> */}
      </div>
    </main>
  );
}