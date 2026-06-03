export function slugifyRoom(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getRoomSlug(pageSlug, roomName, fallback = 'room') {
  const fromPageSlug = slugifyRoom(pageSlug);
  if (fromPageSlug) {
    return fromPageSlug;
  }

  const fromName = slugifyRoom(roomName);
  if (fromName) {
    return fromName;
  }

  return fallback;
}