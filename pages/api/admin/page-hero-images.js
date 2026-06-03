import { listPageHeroImages, upsertPageHeroImages } from '../../../lib/mysql';
import { normalizePageHeroItems } from '../../../lib/page-hero-images-defaults';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const items = await listPageHeroImages();
      return res.status(200).json({ success: true, items: normalizePageHeroItems(items) });
    } catch (error) {
      console.error('Failed to fetch page hero images:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch page hero images' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const inputItems = Array.isArray(req.body?.items) ? req.body.items : [];
    const normalizedItems = normalizePageHeroItems(inputItems);

    try {
      const items = await upsertPageHeroImages(normalizedItems);
      return res.status(200).json({ success: true, items: normalizePageHeroItems(items) });
    } catch (error) {
      console.error('Failed to save page hero images:', error);
      return res.status(500).json({ success: false, message: 'Failed to save page hero images' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
