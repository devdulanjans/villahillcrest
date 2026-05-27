import { deleteRoom, updateRoom } from '../../../../lib/mysql';

function isAdminAuthenticated(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('admin_auth=1');
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter((item) => item.length > 0);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return [];
}

function validateRoomBody(body = {}) {
  const payload = {
    name: String(body.name || '').trim(),
    category: String(body.category || '').trim(),
    shortDescription: String(body.shortDescription || '').trim(),
    descriptionText: String(body.descriptionText || '').trim(),
    bedSize: String(body.bedSize || '').trim(),
    maxGuests: Number(body.maxGuests || 0),
    bathrooms: String(body.bathrooms || '').trim(),
    roomSizeSqft: Number(body.roomSizeSqft || 0),
    priceUsd: body.priceUsd,
    priceLkr: body.priceLkr,
    amenities: normalizeArray(body.amenities),
    images: normalizeArray(body.images),
    isEnabled: Boolean(body.isEnabled),
    sortOrder: Number(body.sortOrder || 0),
  };

  if (!payload.name) {
    return { error: 'Room name is required' };
  }

  if (!payload.category) {
    return { error: 'Category is required' };
  }

  if (!payload.shortDescription) {
    return { error: 'Short description is required' };
  }

  if (!payload.bedSize) {
    return { error: 'Bed size is required' };
  }

  if (!Number.isFinite(payload.maxGuests) || payload.maxGuests <= 0) {
    return { error: 'Max guests must be greater than 0' };
  }

  if (!payload.bathrooms) {
    return { error: 'Bathrooms detail is required' };
  }

  if (!Number.isFinite(payload.roomSizeSqft) || payload.roomSizeSqft <= 0) {
    return { error: 'Room size must be greater than 0' };
  }

  if (payload.images.length === 0) {
    return { error: 'At least one image is required' };
  }

  return { payload };
}

export default async function handler(req, res) {
  if (!isAdminAuthenticated(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const numericId = Number(req.query.id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid room id' });
  }

  if (req.method === 'PUT') {
    const { payload, error } = validateRoomBody(req.body || {});
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    try {
      const item = await updateRoom(numericId, payload);

      if (!item) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }

      return res.status(200).json({ success: true, item });
    } catch (updateError) {
      console.error('Failed to update room:', updateError);
      return res.status(500).json({ success: false, message: 'Failed to update room' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await deleteRoom(numericId);

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }

      return res.status(200).json({ success: true });
    } catch (deleteError) {
      console.error('Failed to delete room:', deleteError);
      return res.status(500).json({ success: false, message: 'Failed to delete room' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
