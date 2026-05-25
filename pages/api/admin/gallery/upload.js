import fs from 'fs/promises';
import path from 'path';
import formidable from 'formidable';
import sharp from 'sharp';
import { createGalleryImage, listGalleryImages } from '../../../../lib/mysql';

export const config = {
  api: {
    bodyParser: false,
  },
};

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

function toSafeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseForm(req) {
  const form = formidable({
    multiples: true,
    maxFileSize: 15 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }

      resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);

    const rawAlbumName = Array.isArray(fields.albumName) ? fields.albumName[0] : fields.albumName;
    const rawTitle = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const rawSortOrder = Array.isArray(fields.sortOrder) ? fields.sortOrder[0] : fields.sortOrder;

    if (!rawAlbumName || !String(rawAlbumName).trim()) {
      return res.status(400).json({ success: false, message: 'Album name is required' });
    }

    const albumName = String(rawAlbumName).trim();
    const albumSlug = toSafeSlug(albumName);

    if (!albumSlug) {
      return res.status(400).json({ success: false, message: 'Album name is invalid' });
    }

    const imageInput = files.images;
    const imageFiles = Array.isArray(imageInput) ? imageInput : imageInput ? [imageInput] : [];

    if (imageFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'Please select at least one image' });
    }

    const targetDir = path.join(process.cwd(), 'public', 'images', 'gallery', albumSlug);
    await fs.mkdir(targetDir, { recursive: true });

    const createdItems = [];
    const hasExplicitSortOrder =
      rawSortOrder !== undefined &&
      rawSortOrder !== null &&
      String(rawSortOrder).trim() !== '';

    let sortBase = 0;

    if (hasExplicitSortOrder) {
      sortBase = Number(rawSortOrder || 0);
    } else {
      const existingItems = await listGalleryImages(albumName);
      const maxSort = existingItems.reduce((max, item) => {
        const current = Number(item.sortOrder || 0);
        return current > max ? current : max;
      }, -1);
      sortBase = maxSort + 1;
    }

    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const ext = '.jpg';
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}-${index}${ext}`;
      const outputPath = path.join(targetDir, fileName);

      await sharp(file.filepath)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 78 })
        .toFile(outputPath);

      await fs.unlink(file.filepath).catch(() => {});

      const imageUrl = `/images/gallery/${albumSlug}/${fileName}`;
      const title = rawTitle ? String(rawTitle).trim() : '';
      const titleWithIndex = imageFiles.length > 1 && title ? `${title} ${index + 1}` : title;

      const created = await createGalleryImage({
        albumName,
        title: titleWithIndex,
        imageUrl,
        sortOrder: sortBase + index,
      });

      if (created) {
        createdItems.push(created);
      }
    }

    return res.status(201).json({ success: true, items: createdItems });
  } catch (error) {
    console.error('Failed to upload gallery images:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload gallery images' });
  }
}
