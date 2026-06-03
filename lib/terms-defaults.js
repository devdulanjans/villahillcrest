export const defaultTermsContent = {
  sectionTitle: 'Default Terms & Conditions',
  bodyHtml: '<p>This page currently shows default Terms & Conditions content. You can replace any section below with your official legal text at any time.</p><h3>1. Booking confirmation</h3><p>A reservation is confirmed only after availability is verified and the required payment is received. Confirmation details will be shared via email or your selected contact method.</p><h3>2. Rates and payments</h3><p>Room rates are shown in the applicable currency and may include or exclude taxes based on your booking source. Full payment terms, due dates, and accepted payment methods are provided at checkout.</p><h3>3. Cancellation and no-show</h3><p>Cancellation policies may vary by room type, season, and offer. Any no-show or late cancellation may be subject to charges based on the selected rate policy.</p><h3>4. Check-in and check-out</h3><p>Standard check-in and check-out times apply unless otherwise agreed in writing. Early check-in and late check-out are subject to availability.</p><h3>5. Guest responsibilities</h3><p>Guests are expected to respect villa property, staff, neighbors, and local regulations. Any damage or extraordinary cleaning requirements may result in additional charges.</p><h3>6. Liability</h3><p>While reasonable care is taken to provide a safe and comfortable stay, Villa Hillcrest is not liable for loss, theft, or damage to personal belongings, except where required by law.</p><h3>7. Changes to these terms</h3><p>These terms may be updated from time to time. The latest version published on this page will apply to new bookings, unless a different policy is explicitly stated.</p><h3>8. Contact</h3><p>For questions about these Terms & Conditions, please contact us through the Contact Us page.</p>',
};

export function normalizeTermsContent(item) {
  const source = item || {};

  return {
    sectionTitle: String(source.sectionTitle || defaultTermsContent.sectionTitle),
    bodyHtml: String(source.bodyHtml || defaultTermsContent.bodyHtml),
  };
}
