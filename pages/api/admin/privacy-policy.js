import { getPrivacyContent, upsertPrivacyContent } from '../../../lib/mysql';

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
      const item = await getPrivacyContent();
      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to fetch privacy content:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch privacy content' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const { sectionTitle, bodyHtml } = req.body || {};

    if (!sectionTitle || !String(sectionTitle).trim()) {
      return res.status(400).json({ success: false, message: 'Section title is required' });
    }

    if (!bodyHtml || !String(bodyHtml).trim()) {
      return res.status(400).json({ success: false, message: 'Privacy policy content is required' });
    }

    try {
      const item = await upsertPrivacyContent({
        sectionTitle: String(sectionTitle).trim(),
        bodyHtml: String(bodyHtml).trim(),
      });

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to save privacy content:', error);
      return res.status(500).json({ success: false, message: 'Failed to save privacy content' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
