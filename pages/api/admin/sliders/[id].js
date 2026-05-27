import { updateRootSlider, deleteRootSlider } from '../../../../lib/mysql';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method === 'PUT') {
    const { imageUrl, wording, sortOrder, enabled } = req.body;
    if (!imageUrl || !wording) {
      return res.status(400).json({ error: 'Image and wording are required.' });
    }
    const slider = await updateRootSlider(id, { imageUrl, wording, sortOrder, enabled });
    if (!slider) return res.status(404).json({ error: 'Slider not found' });
    return res.status(200).json({ slider });
  }
  if (req.method === 'DELETE') {
    const ok = await deleteRootSlider(id);
    if (!ok) return res.status(404).json({ error: 'Slider not found' });
    return res.status(204).end();
  }
  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
