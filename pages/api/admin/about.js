import { getAboutContent, upsertAboutContent } from '../../../lib/mysql';

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
      const item = await getAboutContent();
      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to fetch about content:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch about content' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const {
      heroTitle,
      heroSubtitle,
      sectionTitle,
      bodyHtml,
      imageUrl,
    } = req.body || {};

    if (!heroTitle || !String(heroTitle).trim()) {
      return res.status(400).json({ success: false, message: 'Hero title is required' });
    }

    if (!heroSubtitle || !String(heroSubtitle).trim()) {
      return res.status(400).json({ success: false, message: 'Hero subtitle is required' });
    }

    if (!sectionTitle || !String(sectionTitle).trim()) {
      return res.status(400).json({ success: false, message: 'Section title is required' });
    }

    if (!bodyHtml || !String(bodyHtml).trim()) {
      return res.status(400).json({ success: false, message: 'About body content is required' });
    }

    if (!imageUrl || !String(imageUrl).trim()) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    try {
      const item = await upsertAboutContent({
        heroTitle: String(heroTitle).trim(),
        heroSubtitle: String(heroSubtitle).trim(),
        sectionTitle: String(sectionTitle).trim(),
        bodyHtml: String(bodyHtml).trim(),
        imageUrl: String(imageUrl).trim(),
      });

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to save about content:', error);
      return res.status(500).json({ success: false, message: 'Failed to save about content' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
