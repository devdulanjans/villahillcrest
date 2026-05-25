import { listGalleryImages } from '../../lib/mysql';

function toAlbumId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const rows = await listGalleryImages();

    const grouped = rows.reduce((acc, row) => {
      const albumName = String(row.albumName || 'Uncategorized').trim();
      if (!acc[albumName]) {
        acc[albumName] = [];
      }
      acc[albumName].push(row);
      return acc;
    }, {});

    const albums = Object.entries(grouped).map(([albumName, items]) => {
      const images = items.map((item) => item.imageUrl);

      return {
        id: toAlbumId(albumName) || `album-${items[0].id}`,
        title: albumName,
        subtitle: `${images.length} image${images.length === 1 ? '' : 's'}`,
        cover: images[0] || '',
        images,
      };
    });

    return res.status(200).json({ success: true, albums });
  } catch (error) {
    console.error('Failed to fetch public gallery:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch gallery data', albums: [] });
  }
}
