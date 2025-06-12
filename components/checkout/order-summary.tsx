import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { OrderResponse } from "@/lib/types";

interface OrderSummaryCardProps {
  order?: OrderResponse | null; // Allow optional or null order
}

export default function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  if (!order) {
    return (
      <Card className="p-6 text-center border border-red-300 bg-red-50 dark:bg-red-950/30 rounded-xl">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Order Confirmation Issue
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Your transaction was successful, but we're unable to display your order details right now.
        </p>
        <p className="mt-2 text-sm">
          Please visit the{" "}
          <a
            href="/orders"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Order History
          </a>{" "}
          page to view your order status.
        </p>
      </Card>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-center text-green-600 dark:text-green-400">
          Payment Successful
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Your order has been placed successfully.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-medium">{order.txnId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{date}</span>
          </div>

          <div className="flex justify-between items-start">
            <span className="text-muted-foreground">Products</span>
            <ul className="text-right font-medium text-sm space-y-1">
              {order.productInfo?.map((item, index) => (
                <li key={index}>{item["product"].name ?? "Unnamed Item"}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Customer</span>
            <span className="font-medium">
              {order.user?.firstName ?? "Unknown"}
            </span>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="text-lg font-bold">
              ₹{order.amount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>{order.status}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
