import { createGalleryImage, listGalleryAlbums, listGalleryImages } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { album } = req.query;

    try {
      const [items, albums] = await Promise.all([
        listGalleryImages(typeof album === 'string' ? album : ''),
        listGalleryAlbums(),
      ]);

      return res.status(200).json({ success: true, items, albums });
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch gallery images' });
    }
  }

  if (req.method === 'POST') {
    const { albumName, title, imageUrl, sortOrder } = req.body || {};

    if (!albumName || typeof albumName !== 'string' || !albumName.trim()) {
      return res.status(400).json({ success: false, message: 'Album name is required' });
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    try {
      const item = await createGalleryImage({
        albumName: albumName.trim(),
        title: typeof title === 'string' ? title.trim() : '',
        imageUrl: imageUrl.trim(),
        sortOrder: Number(sortOrder || 0),
      });

      return res.status(201).json({ success: true, item });
    } catch (error) {
      console.error('Failed to create gallery image:', error);
      return res.status(500).json({ success: false, message: 'Failed to create gallery image' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
