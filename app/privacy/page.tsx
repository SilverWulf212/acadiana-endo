// TODO(practice-review): replace this placeholder Notice of Privacy Practices
// with an attorney-reviewed version that reflects the practice's specific
// information-handling policies and current HIPAA regulations.

import type { Metadata } from "next";

import PageHero from "@/app/components/PageHero";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import {
  PRACTICE_NAME,
  PRACTICE_EMAIL,
  PHONE_LAFAYETTE,
} from "@/app/lib/constants";

export const metadata: Metadata = {
  title: `Privacy Notice — ${PRACTICE_NAME}`,
  description: `Notice of Privacy Practices for ${PRACTICE_NAME}, in compliance with HIPAA. How we collect, use, and protect your health information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        backgroundImage="/images/office/lafayette-exterior.jpg"
        imageAlt=""
        title="Privacy Notice"
        description="How we protect your information"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy" },
            ]}
          />
        }
      />
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-gray-500">
              Effective date: November 2025
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <strong className="text-gray-700">Important:</strong> This page is
              a placeholder Notice of Privacy Practices. The practice should
              replace this content with an attorney-reviewed Notice of Privacy
              Practices that reflects current HIPAA regulations and the
              practice&apos;s specific information-handling policies.
            </p>

            <div className="mt-10 space-y-8 text-gray-700">
              <section>
                <h2 className="heading-subsection text-navy-800">
                  Our commitment to your privacy
                </h2>
                <p className="mt-3 leading-relaxed">
                  {PRACTICE_NAME} is committed to protecting the privacy of
                  your health information. This Notice describes how medical
                  information about you may be used and disclosed and how you
                  can get access to this information.
                </p>
              </section>

              <section>
                <h2 className="heading-subsection text-navy-800">
                  How we use your information
                </h2>
                <p className="mt-3 leading-relaxed">
                  We may use and disclose your health information for
                  treatment, payment, and health care operations. This includes
                  coordinating care with your referring dentist, processing
                  insurance claims, and improving the quality of care we
                  provide.
                </p>
              </section>

              <section>
                <h2 className="heading-subsection text-navy-800">
                  Your rights
                </h2>
                <p className="mt-3 leading-relaxed">
                  You have the right to inspect and copy your health records,
                  request corrections, receive an accounting of disclosures,
                  and request restrictions on how your information is used or
                  disclosed.
                </p>
              </section>

              <section>
                <h2 className="heading-subsection text-navy-800">
                  Website privacy
                </h2>
                <p className="mt-3 leading-relaxed">
                  Our website may use cookies and analytics tools to improve
                  user experience. No personally identifiable health
                  information is collected through the public website. Forms
                  submitted through our contact pages are transmitted over
                  encrypted connections.
                </p>
              </section>

              <section>
                <h2 className="heading-subsection text-navy-800">
                  Questions or concerns
                </h2>
                <p className="mt-3 leading-relaxed">
                  If you have questions about this Notice or believe your
                  privacy rights have been violated, please contact our Privacy
                  Officer at{" "}
                  <a
                    href={`mailto:${PRACTICE_EMAIL}`}
                    className="link-underline text-navy-700 hover:text-gold-700"
                  >
                    {PRACTICE_EMAIL}
                  </a>{" "}
                  or call {PHONE_LAFAYETTE}.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
