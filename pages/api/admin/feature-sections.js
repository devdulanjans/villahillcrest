import { getFeatureSectionsContent, upsertFeatureSectionsContent } from '../../../lib/mysql';
import { isAdminAuthenticated } from '../../../lib/admin-auth';
import { normalizeFeatureSections } from '../../../lib/feature-sections-defaults';

function isValidFeatureItem(item) {
  return item
    && typeof item.title === 'string' && item.title.trim()
    && typeof item.text === 'string' && item.text.trim()
    && typeof item.image === 'string' && item.image.trim()
    && typeof item.alt === 'string' && item.alt.trim()
    && typeof item.url === 'string' && item.url.trim()
    && typeof item.cta === 'string' && item.cta.trim();
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const items = await getFeatureSectionsContent();
      return res.status(200).json({ success: true, items: normalizeFeatureSections(items) });
    } catch (error) {
      console.error('Failed to fetch feature sections:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch feature sections' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const items = req.body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one feature section is required' });
    }

    const invalidItem = items.find((item) => !isValidFeatureItem(item));
    if (invalidItem) {
      return res.status(400).json({ success: false, message: 'Each feature section must include title, text, image, alt, url and cta' });
    }

    try {
      const normalizedItems = normalizeFeatureSections(items);
      const savedItems = await upsertFeatureSectionsContent(normalizedItems);
      return res.status(200).json({ success: true, items: normalizeFeatureSections(savedItems) });
    } catch (error) {
      console.error('Failed to save feature sections:', error);
      return res.status(500).json({ success: false, message: 'Failed to save feature sections' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
