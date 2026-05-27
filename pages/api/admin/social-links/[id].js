import { deleteSocialLink, updateSocialLink } from '../../../../lib/mysql';

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
    return res.status(400).json({ success: false, message: 'Invalid social link id' });
  }

  if (req.method === 'PUT') {
    const { label, url, iconKey, isEnabled, sortOrder } = req.body || {};

    if (!label || typeof label !== 'string' || !label.trim()) {
      return res.status(400).json({ success: false, message: 'Label is required' });
    }

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({ success: false, message: 'URL is required' });
    }

    if (!iconKey || typeof iconKey !== 'string' || !iconKey.trim()) {
      return res.status(400).json({ success: false, message: 'Icon key is required' });
    }

    try {
      const item = await updateSocialLink(numericId, {
        label: label.trim(),
        url: url.trim(),
        iconKey: iconKey.trim(),
        isEnabled: Boolean(isEnabled),
        sortOrder: Number(sortOrder || 0),
      });

      if (!item) {
        return res.status(404).json({ success: false, message: 'Social link not found' });
      }

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to update social link:', error);
      return res.status(500).json({ success: false, message: 'Failed to update social link' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteSocialLink(numericId);

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Social link not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to delete social link:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete social link' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
