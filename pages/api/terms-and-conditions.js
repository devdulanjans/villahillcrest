import { getTermsContent } from '../../lib/mysql';
import { normalizeTermsContent } from '../../lib/terms-defaults';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const item = await getTermsContent();
    return res.status(200).json({ success: true, item: normalizeTermsContent(item) });
  } catch (error) {
    console.error('Failed to fetch terms content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch terms content',
      item: normalizeTermsContent(null),
    });
  }
}
