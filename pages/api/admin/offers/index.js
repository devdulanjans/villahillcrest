import { createOffer, listOffers } from '../../../../lib/mysql';

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
      const items = await listOffers();
      return res.status(200).json({ success: true, items });
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      return res.status(500).json({ success: false, message: 'Failed to fetch offers' });
    }
  }

  if (req.method === 'POST') {
    const { title, descriptionHtml, imageUrl } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Offer title is required' });
    }

    if (!descriptionHtml || typeof descriptionHtml !== 'string' || !descriptionHtml.trim()) {
      return res.status(400).json({ success: false, message: 'Offer description is required' });
    }

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) {
      return res.status(400).json({ success: false, message: 'Offer image is required' });
    }

    try {
      const item = await createOffer({
        title: title.trim(),
        descriptionHtml,
        imageUrl: imageUrl.trim(),
      });

      return res.status(201).json({ success: true, item });
    } catch (error) {
      console.error('Failed to create offer:', error);
      return res.status(500).json({ success: false, message: 'Failed to create offer' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
