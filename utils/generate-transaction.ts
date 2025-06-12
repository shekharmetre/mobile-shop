import { prisma } from "@/config/prisma";

export async function generateTxnId() {
  const result = await prisma.transactionCounter.update({
    where: { id: 1 },
    data: { lastValue: { increment: 1000 } }, // or 1 if you prefer
  });
  
  return `TXN${result.lastValue}`;
}
