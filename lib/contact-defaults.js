export const defaultContactDetails = {
  addressText: 'Villa Hillcrest\nGalkaduwahena, Palalla,\nWeligama 81700\nSri Lanka',
  phoneNumbers: ['+94 77 796 5733'],
  email: 'info@villahillcrest.com',
  mapIframeHtml:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.024143187852!2d80.4297093!3d5.9914122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16b18fd149cf5%3A0x51e8715a6bd36414!2sVilla%20Hillcrest!5e0!3m2!1sen!2slk!4v1779045768360!5m2!1sen!2slk',
  whatsappNumber: '+94777965733',
};

export function normalizeContactDetails(item) {
  const source = item || {};

  return {
    addressText: String(source.addressText || defaultContactDetails.addressText),
    phoneNumbers: Array.isArray(source.phoneNumbers) && source.phoneNumbers.length
      ? source.phoneNumbers.map((value) => String(value || '').trim()).filter(Boolean)
      : defaultContactDetails.phoneNumbers,
    email: String(source.email || defaultContactDetails.email),
    mapIframeHtml: String(source.mapIframeHtml || defaultContactDetails.mapIframeHtml),
    whatsappNumber: String(source.whatsappNumber || defaultContactDetails.whatsappNumber),
  };
}
