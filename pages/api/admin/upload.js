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

function getUploadedFile(files) {
  const candidate = files.file || files.image || files.images;
  const normalized = Array.isArray(candidate) ? candidate[0] : candidate;
  if (normalized && normalized.filepath) {
    return normalized;
  }

  // Fallback: pick the first file-like value from any key.
  const firstValue = Object.values(files || {})[0];
  const firstFile = Array.isArray(firstValue) ? firstValue[0] : firstValue;
  if (firstFile && firstFile.filepath) {
    return firstFile;
  }

  return null;
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
    const file = getUploadedFile(files);
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded. Use file, image, or images field.' });
    }

    if (file.mimetype && !String(file.mimetype).toLowerCase().startsWith('image/')) {
      return res.status(400).json({ success: false, message: 'Only image files are allowed' });
    }

    const ext = '.jpg';
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}${ext}`;
    const targetDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    await fs.mkdir(targetDir, { recursive: true });
    const outputPath = path.join(targetDir, fileName);
    await sharp(file.filepath)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78 })
      .toFile(outputPath);
    await fs.unlink(file.filepath).catch(() => {});
    const imageUrl = `/images/uploads/${fileName}`;
    return res.status(200).json({ success: true, url: imageUrl });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
  }
}
