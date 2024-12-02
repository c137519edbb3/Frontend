import { NextPage } from "next";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy of Our Website" />
      </Head>
      <main className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <section>
              <p className="text-gray-600 mb-4">
                Welcome to our Privacy Policy page. Your privacy is critically important to us.
                This policy outlines how we collect, use, and safeguard your personal information
                when you use our website or services.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Information We Collect</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Personal information (e.g., name, email address) when you provide it to us.</li>
                <li>Usage data, such as your IP address, browser type, and interaction with our site.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Improving our website and services.</li>
                <li>Responding to your queries and providing customer support.</li>
                <li>Complying with legal obligations.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Sharing Your Information</h2>
              <p className="text-gray-600">
                We do not share your personal data with third parties except in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li>To comply with legal requirements.</li>
                <li>With your explicit consent.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Data Security</h2>
              <p className="text-gray-600">
                We take appropriate measures to protect your data against unauthorized access,
                alteration, disclosure, or destruction. However, no internet transmission or
                storage solution is 100% secure.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Changes to This Privacy Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. Changes will be posted on this
                page with an updated revision date.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, you can contact us at:
              </p>
              <p className="text-gray-600 mt-2">Email: support@example.com</p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
