// pages/api/create-order.ts
import Razorpay from 'razorpay';
import type { NextApiRequest, NextApiResponse } from 'next';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, currency = 'INR' } = req.body;

    try {
      const options = {
        amount: amount * 100, // amount in paisa (e.g., 500 = ₹5)
        currency,
        receipt: 'receipt_order_74394',
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
