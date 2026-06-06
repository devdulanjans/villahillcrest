import { deleteSurfBreak, updateSurfBreak } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const numericId = Number(req.query.id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid surf break id' });
  }

  if (req.method === 'PUT') {
    const { name, tagline, breaks, photos, sortOrder, enabled } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Location name is required' });
    }

    try {
      const item = await updateSurfBreak(numericId, {
        name: name.trim(),
        tagline: String(tagline || '').trim(),
        breaks: Array.isArray(breaks) ? breaks : [],
        photos: Array.isArray(photos) ? photos : [],
        sortOrder: Number(sortOrder || 0),
        enabled: enabled !== false,
      });

      if (!item) {
        return res.status(404).json({ success: false, message: 'Surf break not found' });
      }
      return res.status(200).json({ success: true, item });
    } catch (err) {
      console.error('Failed to update surf break:', err);
      return res.status(500).json({ success: false, message: 'Failed to update surf break' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteSurfBreak(numericId);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Surf break not found' });
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Failed to delete surf break:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete surf break' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
