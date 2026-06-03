import { getPageHeroImage, listPageHeroImages } from '../../lib/mysql';
import { normalizePageHeroItems } from '../../lib/page-hero-images-defaults';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const pageKey = String(req.query?.pageKey || '').trim();

  try {
    if (pageKey) {
      const item = await getPageHeroImage(pageKey);
      const normalized = normalizePageHeroItems(item ? [item] : []);
      const normalizedItem = normalized.find((entry) => entry.pageKey === pageKey) || null;
      return res.status(200).json({
        success: true,
        item: normalizedItem,
      });
    }

    const items = await listPageHeroImages();
    return res.status(200).json({ success: true, items: normalizePageHeroItems(items) });
  } catch (error) {
    console.error('Failed to fetch page hero images:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch page hero images' });
  }
}
