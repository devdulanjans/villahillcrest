import fs from 'fs/promises';
import path from 'path';
import formidable from 'formidable';

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
    maxFileSize: 150 * 1024 * 1024,
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
    const videoFile = files.video;

    if (!videoFile) {
      return res.status(400).json({ success: false, message: 'Video file is required' });
    }

    const file = Array.isArray(videoFile) ? videoFile[0] : videoFile;
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ success: false, message: 'Only MP4, WebM or OGG video files are supported' });
    }

    const targetDir = path.join(process.cwd(), 'public', 'videos', 'rooms');
    await fs.mkdir(targetDir, { recursive: true });

    const fileExtension = path.extname(file.originalFilename || file.filepath) || '.mp4';
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}${fileExtension}`;
    const outputPath = path.join(targetDir, fileName);

    await fs.copyFile(file.filepath, outputPath);
    await fs.unlink(file.filepath).catch(() => {});

    return res.status(200).json({
      success: true,
      videoUrl: `/videos/rooms/${fileName}`,
    });
  } catch (error) {
    console.error('Failed to upload room video:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload room video' });
  }
}
