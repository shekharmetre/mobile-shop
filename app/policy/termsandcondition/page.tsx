import PolicyLayout from '@/components/layout/PolicyLayout';

const TermsConditions: React.FC = () => {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="January 15, 2025">
      <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Razorpay. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Services.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">2. Definitions</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>"Account"</strong> means a unique account created for you to access our Services.</li>
        <li><strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Razorpay Software Private Limited.</li>
        <li><strong>"Customer"</strong> refers to the company, organization or person who signs up to use the Razorpay Services.</li>
        <li><strong>"Services"</strong> refers to the applications, services, websites, and software offered by Razorpay.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-8">3. Account Registration</h2>
      <p className="mb-4">
        To use certain features of the Services, you must register for an account with us. You must provide accurate, complete, and updated information for your account. You are solely responsible for safeguarding your account credentials and for all activity that occurs under your account.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">4. Payment Processing</h2>
      <p className="mb-4">
        Razorpay provides payment processing services for merchants and customers. By using our payment processing services, you agree to comply with all applicable laws, rules, and regulations.
      </p>
      <p className="mb-4">
        We may, at our discretion, impose transaction limits or decline to process any transaction that we believe may violate these Terms or put you, our customers, or Razorpay at risk.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">5. Fees and Charges</h2>
      <p className="mb-4">
        Razorpay charges fees for the use of its Services. The fees are published on our website and may be updated from time to time. We reserve the right to change our fees upon thirty (30) days' notice. Your continued use of the Services after the fee change becomes effective constitutes your agreement to pay the modified fees.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">6. Prohibited Activities</h2>
      <p className="mb-4">
        You agree not to engage in any of the following prohibited activities:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Violating any laws, regulations, or third-party rights</li>
        <li>Using the Services for illegal or unauthorized purposes</li>
        <li>Attempting to interfere with, compromise, or disrupt the Services</li>
        <li>Engaging in fraudulent or deceptive practices</li>
        <li>Providing false, inaccurate, or misleading information</li>
        <li>Attempting to circumvent any security features of the Services</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-8">7. Intellectual Property</h2>
      <p className="mb-4">
        The Services, including their content, features, and functionality, are owned by Razorpay and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">8. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, and with or without notice. Upon termination, your right to use the Services will immediately cease.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">9. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, Razorpay shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Your use or inability to use the Services</li>
        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
        <li>Any interruption or cessation of transmission to or from the Services</li>
        <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Services</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4 mt-8">10. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">11. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India.
      </p>

      <h2 className="text-xl font-semibold mb-4 mt-8">12. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us at:
      </p>
      <p className="mb-4">
        <strong>Razorpay Software Private Limited</strong><br />
        Sarjapur Road, Bangalore<br />
        Karnataka, India<br />
        Email: legal@razorpay.com
      </p>
    </PolicyLayout>
  );
};

export default TermsConditions;