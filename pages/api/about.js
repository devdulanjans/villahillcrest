import { getAboutContent } from '../../lib/mysql';
import { normalizeAboutContent } from '../../lib/about-defaults';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const item = await getAboutContent();
    return res.status(200).json({ success: true, item: normalizeAboutContent(item) });
  } catch (error) {
    console.error('Failed to fetch about content:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch about content',
      item: normalizeAboutContent(null),
    });
  }
}
