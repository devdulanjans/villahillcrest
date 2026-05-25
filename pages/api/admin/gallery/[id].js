import { deleteGalleryImage, updateGalleryImage } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { id } = req.query;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid image id' });
  }

  if (req.method === 'PUT') {
    const { albumName, title, imageUrl, sortOrder } = req.body || {};

    if (!albumName || typeof albumName !== 'string' || !albumName.trim()) {
      return res.status(400).json({ success: false, message: 'Album name is required' });
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    try {
      const item = await updateGalleryImage(numericId, {
        albumName: albumName.trim(),
        title: typeof title === 'string' ? title.trim() : '',
        imageUrl: imageUrl.trim(),
        sortOrder: Number(sortOrder || 0),
      });

      if (!item) {
        return res.status(404).json({ success: false, message: 'Gallery image not found' });
      }

      return res.status(200).json({ success: true, item });
    } catch (error) {
      console.error('Failed to update gallery image:', error);
      return res.status(500).json({ success: false, message: 'Failed to update gallery image' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteGalleryImage(numericId);

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Gallery image not found' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Failed to delete gallery image:', error);
      return res.status(500).json({ success: false, message: 'Failed to delete gallery image' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
