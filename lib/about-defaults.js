export const defaultAboutContent = {
  heroTitle: 'About Villa Hillcrest',
  heroSubtitle: 'A private tropical retreat designed for comfort, calm, and memorable coastal experiences in Weligama.',
  sectionTitle: 'Our Story',
  bodyHtml: '<p>Villa Hillcrest blends modern comfort with warm island hospitality. From thoughtfully curated rooms to personalized guest support, every stay is designed to feel effortless and meaningful.</p><p>Whether you are here to relax, explore the coast, or celebrate special moments, we welcome you to experience a peaceful escape surrounded by nature.</p>',
  imageUrl: '/images/uploads/villa-lunch-table.jpeg',
};

export function normalizeAboutContent(item) {
  const source = item || {};

  return {
    heroTitle: String(source.heroTitle || defaultAboutContent.heroTitle),
    heroSubtitle: String(source.heroSubtitle || defaultAboutContent.heroSubtitle),
    sectionTitle: String(source.sectionTitle || defaultAboutContent.sectionTitle),
    bodyHtml: String(source.bodyHtml || defaultAboutContent.bodyHtml),
    imageUrl: String(source.imageUrl || defaultAboutContent.imageUrl),
  };
}
