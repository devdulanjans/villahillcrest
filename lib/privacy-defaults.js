export const defaultPrivacyContent = {
  sectionTitle: 'Default Privacy Policy',
  bodyHtml: '<p>This page currently shows default Privacy Policy content. You can replace this text with your final policy at any time.</p><h3>1. Information we collect</h3><p>We may collect personal information such as your name, email address, phone number, booking details, and payment-related information when you make inquiries or reservations.</p><h3>2. How we use information</h3><p>We use your information to process bookings, provide guest services, communicate updates, improve our website experience, and comply with legal obligations.</p><h3>3. Cookies and analytics</h3><p>Our website may use cookies and similar technologies to remember preferences, understand website traffic, and enhance performance. You can manage cookie settings through your browser.</p><h3>4. Sharing of data</h3><p>We do not sell personal data. Information may be shared with trusted service providers (for example, payment processors and booking platforms) only as needed to deliver services.</p><h3>5. Data retention</h3><p>Personal data is retained only for as long as necessary for operational, legal, or regulatory purposes. When no longer needed, data is securely deleted or anonymized.</p><h3>6. Data security</h3><p>We apply reasonable technical and organizational safeguards to protect personal data. However, no online transmission or storage method is 100% secure.</p><h3>7. Your rights</h3><p>Depending on applicable law, you may have rights to access, correct, delete, or restrict the use of your personal data. You may also object to certain processing activities.</p><h3>8. Policy updates</h3><p>This Privacy Policy may be updated from time to time. Any updates will be published on this page with the latest effective date.</p><h3>9. Contact us</h3><p>If you have any privacy-related questions, please contact us via the Contact Us page.</p>',
};

export function normalizePrivacyContent(item) {
  const source = item || {};

  return {
    sectionTitle: String(source.sectionTitle || defaultPrivacyContent.sectionTitle),
    bodyHtml: String(source.bodyHtml || defaultPrivacyContent.bodyHtml),
  };
}
