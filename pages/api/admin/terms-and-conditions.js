import { getTermsContent, upsertTermsContent } from '../../../lib/mysql';

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
      const item = await getTermsContent();
      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to fetch terms content:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch terms content' });
    }
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const { sectionTitle, bodyHtml } = req.body || {};

    if (!sectionTitle || !String(sectionTitle).trim()) {
      return res.status(400).json({ success: false, message: 'Section title is required' });
    }

    if (!bodyHtml || !String(bodyHtml).trim()) {
      return res.status(400).json({ success: false, message: 'Terms content is required' });
    }

    try {
      const item = await upsertTermsContent({
        sectionTitle: String(sectionTitle).trim(),
        bodyHtml: String(bodyHtml).trim(),
      });

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to save terms content:', error);
      return res.status(500).json({ success: false, message: 'Failed to save terms content' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
