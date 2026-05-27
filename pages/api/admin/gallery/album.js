import fs from 'fs/promises';
import path from 'path';
import { deleteGalleryImage, listGalleryImages, renameGalleryAlbum } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (req.method === 'PUT') {
    const { oldAlbumName, newAlbumName } = req.body || {};

    if (!oldAlbumName || typeof oldAlbumName !== 'string' || !oldAlbumName.trim()) {
      return res.status(400).json({ success: false, message: 'Current album name is required' });
    }

    if (!newAlbumName || typeof newAlbumName !== 'string' || !newAlbumName.trim()) {
      return res.status(400).json({ success: false, message: 'New album name is required' });
    }

    if (oldAlbumName.trim() === newAlbumName.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a different album name' });
    }

    try {
      const affectedRows = await renameGalleryAlbum(oldAlbumName, newAlbumName);

      if (!affectedRows) {
        return res.status(404).json({ success: false, message: 'Album not found' });
      }

      return res.status(200).json({ success: true, affectedRows });
    } catch (error) {
      console.error('Failed to rename album:', error);
      return res.status(500).json({ success: false, message: 'Failed to rename album' });
    }
  }

  const { albumName } = req.body || {};

  if (!albumName || typeof albumName !== 'string' || !albumName.trim()) {
    return res.status(400).json({ success: false, message: 'Album name is required' });
  }

  try {
    const images = await listGalleryImages(albumName.trim());

    if (!images.length) {
      return res.status(404).json({ success: false, message: 'Album not found' });
    }

    let deletedCount = 0;

    for (const image of images) {
      const imageUrl = String(image.imageUrl || '').trim();

      if (imageUrl.startsWith('/images/gallery/')) {
        const relativePath = imageUrl.replace(/^\/+/, '');
        const absolutePath = path.join(process.cwd(), 'public', relativePath.replace(/^images\//, 'images/'));
        await fs.unlink(absolutePath).catch(() => {});
      }

      const deleted = await deleteGalleryImage(Number(image.id));
      if (deleted) {
        deletedCount += 1;
      }
    }

    const firstImageUrl = String(images[0]?.imageUrl || '');
    const folderMatch = firstImageUrl.match(/^\/images\/gallery\/([^/]+)\//);
    if (folderMatch && folderMatch[1]) {
      const folderPath = path.join(process.cwd(), 'public', 'images', 'gallery', folderMatch[1]);
      await fs.rm(folderPath, { recursive: true, force: true }).catch(() => {});
    }

    return res.status(200).json({ success: true, deletedCount });
  } catch (error) {
    console.error('Failed to delete album:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete album' });
  }
}
