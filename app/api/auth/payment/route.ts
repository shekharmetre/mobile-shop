import { NextResponse } from "next/server";
import crypto from "crypto";
import { generateToken } from "@/lib/generate-hash";
import { getNextTransactionId } from "@/lib/query-functions";
import { prisma } from "@/config/prisma";
import { safeQuery } from "@/lib/db/safeQuery"; // <-- ✅ Importing safeQuery

const MERCHANT_KEY = process.env.NEXT_PUBLIC_MERCHANT_KEY!;
const MERCHANT_SALT = process.env.NEXT_PUBLIC_SALT!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

interface PaymentRequest {
  amount: string;
  authId: string;
  productinfo: string;
}

export async function POST(req: Request) {
  try {
    const body: PaymentRequest = await req.json();
    const { amount, authId, productinfo } = body;

    if (!amount || !authId || !productinfo) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Find user safely
    const user = await safeQuery(() =>
      prisma.user.findUnique({
        where: { authId },
        select: {
          id: true,
          firstName: true,
          email: true,
          phone: true,
        },
      })
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not allowed to make payment." },
        { status: 403 }
      );
    }

    const orderKey = `${authId}-${amount}-${productinfo}`;

    // ✅ Find existing order safely
    const existingOrder = await safeQuery(() =>
      prisma.order.findFirst({
        where: {
          userId: user.id,
          orderKey,
        },
      })
    );

    if (existingOrder?.status === "SUCCESS") {
      return NextResponse.json(
        { success: false, message: "This order has already been paid." },
        { status: 409 }
      );
    }

    const txnid = existingOrder?.txnId ?? (await getNextTransactionId());

    // ✅ Create order safely if not existing
    if (!existingOrder) {
      await safeQuery(() =>
        prisma.order.create({
          data: {
            amount: parseFloat(amount),
            txnId: txnid,
            status: "PENDING",
            userId: user.id,
            productInfo: JSON.parse(productinfo),
            orderKey,
          },
        })
      );
    }

    // ✅ Generate token and hash
    const token = encodeURIComponent(generateToken(txnid));
    const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${user.firstName}|${user.email}|||||||||||${MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return NextResponse.json({
      success: true,
      message: existingOrder ? "Reusing existing order." : "New order created.",
      paymentParams: {
        key: MERCHANT_KEY,
        txnid,
        amount,
        productinfo,
        firstname: user.firstName,
        email: user.email,
        phone: user.phone || "9999999999",
        surl: `http://localhost:3000/payment/success?txnid=${txnid}&token=${token}`,
        furl: `${BASE_URL}/payment/failure`,
        service_provider: "payu_paisa",
        hash,
      },
    });

  } catch (err) {
    console.error("Payment init error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error && err.message.includes("Database operation failed")
          ? "Our systems are temporarily unavailable. Please try again later."
          : "Internal Server Error. Could not initiate payment.",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
