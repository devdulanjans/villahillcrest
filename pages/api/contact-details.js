import { getContactDetails } from '../../lib/mysql';
import { normalizeContactDetails } from '../../lib/contact-defaults';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const item = await getContactDetails();
    return res.status(200).json({ success: true, item: normalizeContactDetails(item) });
  } catch (error) {
    console.error('Failed to fetch public contact details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact details',
      item: normalizeContactDetails(null),
    });
  }
}
