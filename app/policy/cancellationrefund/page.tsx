import PolicyLayout from "@/components/layout/PolicyLayout";

const CancellationRefundPolicy: React.FC = () => {
  return (
    <PolicyLayout title="Cancellation &amp; Refund Policy" lastUpdated="March 20, 2025">
      <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-4">
        This Cancellation and Refund Policy outlines the terms and conditions for cancellations and refunds for transactions processed through Razorpay. This policy applies to both merchants using Razorpay&apos;s payment processing services and customers making payments through Razorpay.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">2. Merchant Cancellation Policy</h2>
      <p className="mb-4">
        Merchants who use Razorpay for payment processing are required to establish their own cancellation policies for the products or services they offer. Merchants should clearly communicate their cancellation policy to customers before a purchase is made.
      </p>
      <p className="mb-4">
        Razorpay recommends that merchants include the following information in their cancellation policy:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Timeframe within which cancellations are accepted</li>
        <li>Any fees or charges associated with cancellations</li>
        <li>Process for requesting a cancellation</li>
        <li>Special conditions for specific products or services</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-8">3. Customer Cancellation Requests</h2>
      <p className="mb-4">
        Customers who wish to cancel an order or transaction should:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Contact the merchant directly using the contact information provided on the merchant&apos;s website or in the order confirmation.</li>
        <li>Provide the order number, date of purchase, and reason for cancellation.</li>
        <li>Follow the merchant&apos;s specific cancellation procedure as outlined in their policy.</li>
      </ul>
      <p className="mb-4">
        Razorpay is not responsible for handling cancellation requests directly but may assist in facilitating communication between merchants and customers when necessary.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">4. Refund Policy for Merchants</h2>
      <p className="mb-4">
        Merchants using Razorpay&apos;s payment processing services are responsible for processing refunds for their customers in accordance with their stated refund policy. Razorpay provides merchants with the tools necessary to process refunds through our platform.
      </p>
      <p className="mb-4">
        When processing refunds, merchants should be aware of the following:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Refunds can be processed for up to 90 days after the original transaction date.</li>
        <li>Partial refunds are supported for eligible transactions.</li>
        <li>Refund processing fees may apply, as outlined in the merchant&apos;s agreement with Razorpay.</li>
        <li>Refunds are typically processed within 5&#8211;7 business days, though the actual time for the funds to appear in the customer&apos;s account depends on the customer&apos;s payment method and financial institution.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-8">5. Refund Policy for Customers</h2>
      <p className="mb-4">
        Customers seeking a refund for a purchase made through Razorpay should:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Review the merchant&apos;s refund policy before requesting a refund.</li>
        <li>Contact the merchant directly with their refund request, including the order number, date of purchase, and reason for the refund.</li>
        <li>Allow the merchant the time specified in their refund policy to process the refund.</li>
      </ul>
      <p className="mb-4">
        If a customer is unable to resolve a refund issue with a merchant, they may contact Razorpay customer support for assistance. However, Razorpay&apos;s ability to intervene in refund disputes is limited by our role as a payment processor.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">6. Automatic Cancellations and Refunds</h2>
      <p className="mb-4">
        In certain circumstances, transactions may be automatically cancelled and refunded:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Failed or incomplete transactions where the funds were initially debited from the customer&apos;s account.</li>
        <li>Duplicate transactions where a customer was charged multiple times for the same purchase.</li>
        <li>Transactions flagged as fraudulent by our security systems.</li>
        <li>Transactions where the merchant is unable to fulfill the order due to inventory issues or other constraints.</li>
      </ul>
      <p className="mb-4">
        In these cases, the refund is usually processed automatically, and customers will be notified via email.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">7. Non-Refundable Items and Services</h2>
      <p className="mb-4">
        Merchants may designate certain items or services as non-refundable. These may include:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Digital products that have been downloaded or accessed.</li>
        <li>Personalized or custom-made items.</li>
        <li>Services that have already been rendered.</li>
        <li>Items explicitly marked as non-refundable at the time of purchase.</li>
      </ul>
      <p className="mb-4">
        Merchants must clearly indicate which items or services are non-refundable before a purchase is completed.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">8. Disputes and Chargebacks</h2>
      <p className="mb-4">
        In the event that a customer is unable to resolve a refund issue directly with a merchant, they may have the right to dispute the charge with their payment provider or bank. This process, known as a chargeback, is governed by the policies of the customer&apos;s payment provider.
      </p>
      <p className="mb-4">
        Razorpay will cooperate with all parties involved in a dispute to facilitate a fair resolution. Merchants are advised to maintain detailed records of all transactions, communications with customers, and their stated policies to help resolve disputes efficiently.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">9. Modifications to this Policy</h2>
      <p className="mb-4">
        Razorpay reserves the right to modify this Cancellation and Refund Policy at any time. Any changes will be effective immediately upon posting the updated policy on our website. We encourage merchants and customers to review this policy periodically to stay informed about our practices.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">10. Contact Information</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Cancellation and Refund Policy, please contact:
      </p>
      <p className="mb-4">
        <strong>Razorpay Support</strong><br />
        Email: support@razorpay.com<br />
        Phone: +91 1234567890<br />
        Hours of Operation: Monday to Friday, 9:00 AM to 6:00 PM IST
      </p>
    </PolicyLayout>
  );
};

export default CancellationRefundPolicy;
