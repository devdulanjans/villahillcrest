export const defaultFeatureSections = [];

export function normalizeFeatureSections(items) {
  const source = Array.isArray(items) ? items : [];

  return source.map((item) => ({
    title: String(item?.title || '').trim(),
    text: String(item?.text || '').trim(),
    image: String(item?.image || '').trim(),
    alt: String(item?.alt || '').trim(),
    url: String(item?.url || '').trim() || '#',
    reverse: Boolean(item?.reverse),
    cta: String(item?.cta || '').trim(),
  }));
}
