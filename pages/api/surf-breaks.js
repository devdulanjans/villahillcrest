import { listEnabledSurfBreaks } from '../../lib/mysql';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const items = await listEnabledSurfBreaks();
    return res.status(200).json({ success: true, items });
  } catch (err) {
    console.error('Failed to fetch surf breaks:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch surf breaks' });
  }
}
