import { listOffers } from '../../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const offers = await listOffers();

    if (!offers.length) {
      return res.status(200).json({ success: true, item: null });
    }

    const randomIndex = Math.floor(Math.random() * offers.length);
    return res.status(200).json({ success: true, item: offers[randomIndex] });
  } catch (error) {
    console.error('Failed to fetch random offer:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch random offer', item: null });
  }
}
