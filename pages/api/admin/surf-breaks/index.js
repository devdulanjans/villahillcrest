import { createSurfBreak, listSurfBreaks } from '../../../../lib/mysql';

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
      const items = await listSurfBreaks();
      return res.status(200).json({ success: true, items });
    } catch (err) {
      console.error('Failed to fetch surf breaks:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch surf breaks' });
    }
  }

  if (req.method === 'POST') {
    const { name, tagline, breaks, photos, sortOrder, enabled } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Location name is required' });
    }

    try {
      const item = await createSurfBreak({
        name: name.trim(),
        tagline: String(tagline || '').trim(),
        breaks: Array.isArray(breaks) ? breaks : [],
        photos: Array.isArray(photos) ? photos : [],
        sortOrder: Number(sortOrder || 0),
        enabled: enabled !== false,
      });
      return res.status(201).json({ success: true, item });
    } catch (err) {
      console.error('Failed to create surf break:', err);
      return res.status(500).json({ success: false, message: 'Failed to create surf break' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
