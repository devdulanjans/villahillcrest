export const pageHeroImageDefaults = [
  { pageKey: '/about-us', pageLabel: 'About Us', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/availability', pageLabel: 'Availability', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/blogs', pageLabel: 'Blogs', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/booking', pageLabel: 'Booking', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/contact-us', pageLabel: 'Contact Us', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/cycling', pageLabel: 'Cycling', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/dining', pageLabel: 'Dining', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/explore', pageLabel: 'Explore', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/foods', pageLabel: 'Foods', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/gallery', pageLabel: 'Gallery', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/offers', pageLabel: 'Offers', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/our-philosophy', pageLabel: 'Our Philosophy', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/packages', pageLabel: 'Packages', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/privacy-policy', pageLabel: 'Privacy Policy', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/surfing', pageLabel: 'Surfing', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/terms-and-conditions', pageLabel: 'Terms & Conditions', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/villa', pageLabel: 'Villa', imageUrl: '', focalX: 50, focalY: 50 },
  { pageKey: '/yoga', pageLabel: 'Yoga', imageUrl: '', focalX: 50, focalY: 50 },
];

function clampPercent(value, fallback = 50) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  if (parsed < 0) return 0;
  if (parsed > 100) return 100;
  return parsed;
}

function normalizeItem(item) {
  const source = item || {};
  return {
    pageKey: String(source.pageKey || '').trim(),
    pageLabel: String(source.pageLabel || '').trim(),
    imageUrl: String(source.imageUrl || '').trim(),
    focalX: clampPercent(source.focalX, 50),
    focalY: clampPercent(source.focalY, 50),
  };
}

export function normalizePageHeroItems(items) {
  const byKey = new Map();

  pageHeroImageDefaults.forEach((item) => {
    const normalized = normalizeItem(item);
    if (normalized.pageKey) {
      byKey.set(normalized.pageKey, normalized);
    }
  });

  if (Array.isArray(items)) {
    items.forEach((item) => {
      const normalized = normalizeItem(item);
      if (!normalized.pageKey) return;

      const existing = byKey.get(normalized.pageKey);
      byKey.set(normalized.pageKey, {
        pageKey: normalized.pageKey,
        pageLabel: normalized.pageLabel || existing?.pageLabel || normalized.pageKey,
        imageUrl: normalized.imageUrl || '',
        focalX: clampPercent(normalized.focalX, existing?.focalX ?? 50),
        focalY: clampPercent(normalized.focalY, existing?.focalY ?? 50),
      });
    });
  }

  return Array.from(byKey.values());
}

export function getPageHeroImageForKey(items, pageKey) {
  const key = String(pageKey || '').trim();
  if (!key) return null;

  const normalizedItems = normalizePageHeroItems(items);
  const found = normalizedItems.find((item) => item.pageKey === key);
  return found || null;
}
