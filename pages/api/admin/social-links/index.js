import { createSocialLink, listSocialLinks } from '../../../../lib/mysql';

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
      const items = await listSocialLinks();
      return res.status(200).json({ success: true, items });
    } catch (error) {
      console.error('Failed to fetch social links:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch social links' });
    }
  }

  if (req.method === 'POST') {
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
      const item = await createSocialLink({
        label: label.trim(),
        url: url.trim(),
        iconKey: iconKey.trim(),
        isEnabled: Boolean(isEnabled),
        sortOrder: Number(sortOrder || 0),
      });

      return res.status(201).json({ success: true, item });
    } catch (error) {
      console.error('Failed to create social link:', error);
      return res.status(500).json({ success: false, message: 'Failed to create social link' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
