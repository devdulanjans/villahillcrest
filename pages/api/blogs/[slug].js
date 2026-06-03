import { findPublishedBlogBySlug } from '../../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const slug = String(req.query.slug || '').trim().toLowerCase();
  if (!slug) {
    return res.status(400).json({ success: false, message: 'Blog slug is required' });
  }

  try {
    const item = await findPublishedBlogBySlug(slug);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    return res.status(200).json({ success: true, item });
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blog' });
  }
}
