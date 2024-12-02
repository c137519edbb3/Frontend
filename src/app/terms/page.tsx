import { NextPage } from "next";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head>
        <title>Terms of Service</title>
        <meta name="description" content="Terms of Service for Our Website" />
      </Head>
      <main className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <section>
              <p className="text-gray-600 mb-4">
                These Terms of Service ("Terms") govern your use of our website and services. By
                accessing or using our services, you agree to these Terms. Please read them
                carefully.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By using our website, you confirm that you accept these Terms and agree to comply
                with them. If you do not agree, you must not use our website.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">2. Changes to the Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms at any time. Changes will be effective
                upon posting to this page. Continued use of the website signifies your acceptance of
                any updated Terms.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">3. Use of the Website</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Do not engage in unlawful or fraudulent activities.</li>
                <li>Do not distribute viruses or other harmful content.</li>
                <li>Do not violate any intellectual property rights.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">4. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, trademarks, and other intellectual property on this website are owned
                by us or our licensors. Unauthorized use is prohibited.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">5. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the fullest extent permitted by law, we will not be liable for any damages
                resulting from your use of the website.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">6. Governing Law</h2>
              <p className="text-gray-600">
                These Terms are governed by and construed in accordance with the laws of [Your
                Jurisdiction].
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">7. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-600 mt-2">Email: support@example.com</p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;
