export function slugifyBlog(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getBlogSlug(pageSlug, title, fallback = 'blog-post') {
  const fromPageSlug = slugifyBlog(pageSlug);
  if (fromPageSlug) {
    return fromPageSlug;
  }

  const fromTitle = slugifyBlog(title);
  if (fromTitle) {
    return fromTitle;
  }

  return fallback;
}
