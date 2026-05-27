import { getContactDetails, upsertContactDetails } from '../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

function normalizePhoneNumbers(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const item = await getContactDetails();
      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to fetch contact details:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch contact details' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const {
      addressText,
      phoneNumbers,
      email,
      mapIframeHtml,
      whatsappNumber,
    } = req.body || {};

    if (!addressText || !String(addressText).trim()) {
      return res.status(400).json({ success: false, message: 'Address is required' });
    }

    if (!email || !String(email).trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    if (!mapIframeHtml || !String(mapIframeHtml).trim()) {
      return res.status(400).json({ success: false, message: 'Google map iframe is required' });
    }

    if (!whatsappNumber || !String(whatsappNumber).trim()) {
      return res.status(400).json({ success: false, message: 'WhatsApp number is required' });
    }

    const normalizedPhones = normalizePhoneNumbers(phoneNumbers);
    if (normalizedPhones.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one contact number is required' });
    }

    try {
      const item = await upsertContactDetails({
        addressText: String(addressText).trim(),
        phoneNumbers: normalizedPhones,
        email: String(email).trim(),
        mapIframeHtml: String(mapIframeHtml).trim(),
        whatsappNumber: String(whatsappNumber).trim(),
      });

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to save contact details:', error);
      return res.status(500).json({ success: false, message: 'Failed to save contact details' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
