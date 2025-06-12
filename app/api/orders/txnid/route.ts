import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { OrderResponse } from "@/lib/types";
import { safeQuery } from "@/lib/db/safeQuery"; // Import the safeQuery wrapper

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { txnid } = body;

    if (!txnid || typeof txnid !== "string") {
      return NextResponse.json(
        { success: false, message: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Wrap all Prisma calls with safeQuery
    let order = await safeQuery(() =>
      prisma.order.findUnique({
        where: { txnId: txnid },
        include: { user: { select: { id: true, firstName: true, email: true, phone: true } } },
      })
    );

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // If status is PENDING, update to SUCCESS
    if (order.status === "PENDING") {
      order = await safeQuery(() =>
        prisma.order.update({
          where: { txnId: txnid },
          data: { status: "SUCCESS" },
          include: { user: { select: { id: true, firstName: true, email: true, phone: true } } },
        })
      );
    }

    const responseData: OrderResponse = {
      id: order.id,
      txnId: order.txnId,
      orderKey: order.orderKey,
      userId: order.userId,
      amount: order.amount,
      status: order.status,
      productInfo: order.productInfo as any[],
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user: order.user
        ? {
            id: order.user.id,
            firstName: order.user.firstName,
            email: order.user.email,
            phone: order.user.phone ?? null,
          }
        : undefined,
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (err: unknown) {
    console.error("Order fetch error:", err);
    
    // Improved error response
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error && err.message.includes("Database operation failed")
          ? "Our systems are temporarily unavailable. Please try again later."
          : "Failed to fetch order details",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}