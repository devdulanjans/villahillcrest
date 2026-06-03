import { getFeatureSectionsContent } from '../../lib/mysql';
import { normalizeFeatureSections } from '../../lib/feature-sections-defaults';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const items = await getFeatureSectionsContent();
    return res.status(200).json({ success: true, items: normalizeFeatureSections(items) });
  } catch (error) {
    console.error('Failed to fetch feature sections:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch feature sections',
      items: [],
    });
  }
}
