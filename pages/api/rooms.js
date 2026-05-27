import { listEnabledRooms } from '../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const items = await listEnabledRooms();
    return res.status(200).json({ success: true, items });
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
}
