import { prisma } from "@/config/prisma";
import axios from "axios";

export async function checkUserLoggedIn() {
  try {
    const response = await axios.get('/api/auth/check');

    if (response.status === 200 && response.data.loggedIn) {
      return { loggedIn: true, user: response.data.user };
    }
    return { loggedIn: false };
  } catch (error) {
    return { loggedIn: false, error: error || 'Unknown error' };
  }
}


export async function getNextTransactionId(): Promise<string> {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const txnId = `txn_${year}${month}${day}_${hours}${minutes}${seconds}${milliseconds}`;

  return txnId;
}


