import { listPublishedBlogs } from '../../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 6);
  const search = String(req.query.q || '').trim();

  try {
    const result = await listPublishedBlogs({ search, page, pageSize });
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch blogs', items: [], page, pageSize, totalItems: 0, totalPages: 0 });
  }
}
