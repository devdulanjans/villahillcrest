import { renameGalleryAlbum } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
