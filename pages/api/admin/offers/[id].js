import { deleteOffer, updateOffer } from '../../../../lib/mysql';

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
    return res.status(400).json({ success: false, message: 'Invalid offer id' });
  }

  if (req.method === 'PUT') {
    const { title, descriptionHtml, imageUrl } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Offer title is required' });
    }

    if (!descriptionHtml || typeof descriptionHtml !== 'string' || !descriptionHtml.trim()) {
      return res.status(400).json({ success: false, message: 'Offer description is required' });
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return res.status(400).json({ success: false, message: 'Offer image is required' });
    }

    try {
      const item = await updateOffer(numericId, {
        title: title.trim(),
        descriptionHtml,
        imageUrl: imageUrl.trim(),
      });

      if (!item) {
        return res.status(404).json({ success: false, message: 'Offer not found' });
      }

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to update offer:', error);
      return res.status(500).json({ success: false, message: 'Failed to update offer' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteOffer(numericId);

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Offer not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to delete offer:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete offer' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
