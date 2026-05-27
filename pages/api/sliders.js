import { listRootSliders } from '../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Public endpoint: get enabled sliders
    const sliders = await listRootSliders();
    return res.status(200).json({ sliders });
  } catch (error) {
    console.error('Failed to load root sliders:', error);
    return res.status(500).json({ sliders: [], message: 'Failed to load sliders' });
  }
}
