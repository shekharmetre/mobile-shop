import PolicyLayout from '@/components/layout/PolicyLayout';

const ShippingPolicy: React.FC = () => {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="March 5&apos;&#44; 2025">
      <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-4">
        This Shipping Policy describes how Razorpay handles shipping for physical products purchased through our platform. This policy is applicable to merchants who use Razorpay for processing payments for physical goods that require shipping&#44; as well as to customers who purchase goods through these merchants.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">2. Shipping Methods and Timeframes</h2>
      <p className="mb-4">
        Razorpay offers multiple shipping options through our merchant partners&#58;
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <strong>Standard Shipping&#58;</strong> Typically delivered within 5&ndash;7 business days.
        </li>
        <li>
          <strong>Express Shipping&#58;</strong> Typically delivered within 2&ndash;3 business days.
        </li>
        <li>
          <strong>Priority Shipping&#58;</strong> Typically delivered within 1&ndash;2 business days.
        </li>
        <li>
          <strong>International Shipping&#58;</strong> Delivery times vary depending on the destination country&#44; customs processing&#44; and other factors. Generally&#44; international shipments are delivered within 7&ndash;21 business days.
        </li>
      </ul>
      <p className="mb-4">
        Please note that these timeframes are estimates and not guarantees. Actual delivery times may vary based on various factors including shipping destination&#44; customs clearance for international shipments&#44; and unforeseen circumstances.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">3. Shipping Costs</h2>
      <p className="mb-4">
        Shipping costs are determined by several factors&#44; including&#58;
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Weight and dimensions of the package</li>
        <li>Shipping destination</li>
        <li>Selected shipping method</li>
        <li>Any special handling requirements</li>
      </ul>
      <p className="mb-4">
        The exact shipping cost will be displayed at checkout before the payment is processed. Some merchants may offer free shipping on orders that meet certain criteria&#44; such as a minimum order value.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">4. Order Processing Time</h2>
      <p className="mb-4">
        Orders are typically processed within 1&ndash;2 business days after the payment has been confirmed. During high-volume periods such as sales events or holidays&#44; processing times may be longer. Once an order has been processed and shipped&#44; customers will receive a shipping confirmation email with tracking information where available.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">5. Tracking Orders</h2>
      <p className="mb-4">
        Most shipments include tracking capabilities. Once an order has been shipped&#44; customers will receive tracking information via email. This tracking information can also be accessed through the customer&apos;s account on the merchant&apos;s website. If a tracking number is not provided or if there are any issues with tracking&#44; customers should contact the merchant directly.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">6. International Shipping</h2>
      <p className="mb-4">
        For international shipments&#44; customers are responsible for any customs duties&#44; taxes&#44; or fees that may be imposed by the destination country. These charges are not included in the shipping cost and are collected by the relevant authorities at the time of delivery or customs clearance.
      </p>
      <p className="mb-4">
        Please note that international shipments may be subject to customs inspection&#44; which can cause delays in delivery. Razorpay and our merchant partners have no control over customs procedures or delays.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">7. Shipping Restrictions</h2>
      <p className="mb-4">
        Certain items may be subject to shipping restrictions due to their nature&#44; size&#44; or the regulations of the destination country. Merchants are responsible for informing customers of any shipping restrictions that apply to their products. Razorpay reserves the right to refuse processing payments for items that violate shipping regulations or are prohibited by law.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">8. Lost or Damaged Shipments</h2>
      <p className="mb-4">
        If a shipment is lost or damaged during transit&#44; customers should contact the merchant directly to initiate an investigation. Merchants are encouraged to use shipping services that include insurance to cover the value of the items being shipped.
      </p>
      <p className="mb-4">
        Razorpay is not responsible for lost or damaged shipments&#44; but we will assist merchants and customers in resolving disputes related to shipping issues when possible.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">9. Address Changes</h2>
      <p className="mb-4">
        If a customer needs to change their shipping address after an order has been placed but before it has been shipped&#44; they should contact the merchant immediately. While merchants will make reasonable efforts to accommodate address changes&#44; we cannot guarantee that all requests can be fulfilled&#44; especially if the order has already been processed for shipping.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">10. Contact Information</h2>
      <p className="mb-4">
        For any questions or concerns regarding shipping&#44; please contact&#58;
      </p>
      <p className="mb-4">
        <strong>Razorpay Merchant Support</strong><br />
        Email&#58; support@razorpay.com<br />
        Phone&#58; +91 1234567890<br />
        Hours of Operation&#58; Monday to Friday&#44; 9&#58;00 AM to 6&#58;00 PM IST
      </p>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
