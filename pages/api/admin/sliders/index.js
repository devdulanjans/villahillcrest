import { listAllRootSliders, createRootSlider } from '../../../../lib/mysql';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // List all sliders (admin)
    const sliders = await listAllRootSliders();
    return res.status(200).json({ sliders });
  }
  if (req.method === 'POST') {
    // Create new slider
    const { imageUrl, wording, sortOrder, enabled } = req.body;
    if (!imageUrl || !wording) {
      return res.status(400).json({ error: 'Image and wording are required.' });
    }
    const slider = await createRootSlider({ imageUrl, wording, sortOrder, enabled });
    return res.status(201).json({ slider });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
