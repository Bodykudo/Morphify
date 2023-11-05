import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Morphify - Private Policy',
  openGraph: {
    title: 'Morphify - Privacy Policy',
  },
  twitter: {
    title: 'Morphify - Privacy Policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className='space-y-12 text-md md:text-lg text-gray-500 pb-4 md:pb-8 dark:text-gray-300'>
      <p>
        At Morphify, we take your privacy seriously. This Privacy Policy details
        our approach to handling your personal information when you use our
        services. We encourage you to read this policy carefully to understand
        how we protect your data.
      </p>
      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          1. Information We Gather
        </h2>
        <p>
          Our commitment is to enhance user experiences. We gather limited data
          through Google Analytics, which includes usage information such as
          pages visited, IP addresses, browser types, device types, and referral
          URLs. This data helps us enhance our website&apos;s features and
          content based on user interaction.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          2. How We Utilize Your Data
        </h2>
        <p>
          We solely use the data collected through Google Analytics to
          comprehend user behavior and improve our website&apos;s performance.
          We have a strict policy of not selling, renting, or sharing this data
          with third parties.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          3. Cookies and Tracking Tech
        </h2>
        <p>
          We employ cookies and similar tracking technologies to gather and
          store information about your website interactions. You can manage your
          cookie preferences through your browser settings. Please note that
          disabling cookies may affect your website experience.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          4. Data Security
        </h2>
        <p>
          We take reasonable measures to protect your data from unauthorized
          access, disclosure, alteration, or destruction. However, please be
          aware that no method of data transmission over the internet or
          electronic storage is completely secure.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          5. External Links
        </h2>
        <p>
          Our website may feature links to third-party websites or services not
          operated by us. We have no control over the content, privacy policies,
          or practices of these third-party websites. We recommend reviewing
          their privacy policies before providing any personal information.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          6. Privacy for Children
        </h2>
        <p>
          Our website is not directed at children under 13 years of age. We do
          not knowingly collect personal information from children. If you are a
          parent or guardian and believe your child has provided us with
          personal information, please contact us, and we will take necessary
          steps to remove that information.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          7. Changes to This Privacy Policy
        </h2>
        <p>
          We reserve the right to update or modify this Privacy Policy without
          prior notice. Any changes will be immediately effective upon posting
          on this page, and we will indicate the latest revision date at the top
          of the policy.
        </p>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-100'>
          8. Contact Us
        </h2>
        <p>
          If you have questions or concerns about this Privacy Policy or the
          data we collect, please reach out to us at privacy@morphify.com.
        </p>
      </div>

      <p>
        By using Morphify, you agree to the practices outlined in this Privacy
        Policy. If you do not agree with this policy, please discontinue using
        our services. Thank you for entrusting us with your privacy.
      </p>
    </div>
  );
}
