import crypto from "crypto";

export function generateToken(txnid: string): string {
  const now = new Date();
  const isoDate = now.toISOString(); // full ISO timestamp
  const payload = `${txnid}|${isoDate}`;

  // Use base64url to make it URL-safe
  const base64urlData = Buffer.from(payload).toString("base64url");

  const hmac = crypto
    .createHmac("sha256", process.env.NEXT_PUBLIC_SALT!)
    .update(base64urlData)
    .digest("hex");

  return `${base64urlData}.${hmac}`;
}

export function isTokenValid(token?: string, expectedTxnId?: string): boolean {
  if (!token || !expectedTxnId) return false;
  try {
    const [base64urlData, receivedHmac] = token.split(".");
    if (!base64urlData || !receivedHmac) return false;

    const expectedHmac = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_SALT!)
      .update(base64urlData)
      .digest("hex");

    if (expectedHmac !== receivedHmac) return false;

    const decoded = Buffer.from(base64urlData, "base64url").toString("utf-8");
    const [txnid, isoDate] = decoded.split("|");
    if (txnid !== expectedTxnId) return false;

    const tokenTime = new Date(isoDate).getTime();
    const now = Date.now();
    const age = now - tokenTime;

    return age <= 86_400_000; // Valid for 24 hours
  } catch {
    return false;
  }
}

