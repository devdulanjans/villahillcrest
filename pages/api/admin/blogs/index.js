import { createBlog, listBlogs } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const items = await listBlogs();
      return res.status(200).json({ success: true, items });
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
    }
  }

  if (req.method === 'POST') {
    const { title, slug, excerpt, contentHtml, imageUrl, imageUrls: rawImageUrls, keywords, published, publishedAt } = req.body || {};

    const imageUrls = Array.isArray(rawImageUrls)
      ? rawImageUrls.filter((item) => typeof item === 'string' && item.trim())
      : typeof rawImageUrls === 'string'
      ? (() => {
          try {
            const parsed = JSON.parse(rawImageUrls);
            return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string' && item.trim()) : [];
          } catch {
            return [];
          }
        })()
      : [];

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Blog title is required' });
    }

    if (!excerpt || typeof excerpt !== 'string' || !excerpt.trim()) {
      return res.status(400).json({ success: false, message: 'Blog excerpt is required' });
    }

    if (!contentHtml || typeof contentHtml !== 'string' || !contentHtml.trim()) {
      return res.status(400).json({ success: false, message: 'Blog content is required' });
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return res.status(400).json({ success: false, message: 'Blog image is required' });
    }

    try {
      const item = await createBlog({
        title: title.trim(),
        slug: String(slug || '').trim(),
        excerpt: excerpt.trim(),
        contentHtml,
        imageUrl: imageUrl.trim(),
        imageUrls,
        keywords: String(keywords || '').trim(),
        published: Boolean(published),
        publishedAt: published ? String(publishedAt || new Date().toISOString()) : null,
      });

      return res.status(201).json({ success: true, item });
    } catch (error) {
      console.error('Failed to create blog:', error);
      return res.status(500).json({ success: false, message: 'Failed to create blog' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
