import fs from 'fs/promises';
import path from 'path';
import formidable from 'formidable';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

function parseForm(req) {
  const form = formidable({
    multiples: false,
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
    const { files } = await parseForm(req);
    const imageFile = files.image;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const file = Array.isArray(imageFile) ? imageFile[0] : imageFile;
    const targetDir = path.join(process.cwd(), 'public', 'images', 'offers');
    await fs.mkdir(targetDir, { recursive: true });

    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.jpg`;
    const outputPath = path.join(targetDir, fileName);

    await sharp(file.filepath)
      .rotate()
      .resize({ width: 1800, height: 1200, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    await fs.unlink(file.filepath).catch(() => {});

    return res.status(200).json({
      success: true,
      imageUrl: `/images/offers/${fileName}`,
    });
  } catch (error) {
    console.error('Failed to upload offer image:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload offer image' });
  }
}
