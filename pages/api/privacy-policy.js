import { getPrivacyContent } from '../../lib/mysql';
import { normalizePrivacyContent } from '../../lib/privacy-defaults';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const item = await getPrivacyContent();
    return res.status(200).json({ success: true, item: normalizePrivacyContent(item) });
  } catch (error) {
    console.error('Failed to fetch privacy content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch privacy content',
      item: normalizePrivacyContent(null),
    });
  }
}
