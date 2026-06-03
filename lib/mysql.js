import mysql from 'mysql2/promise';
import { getRoomSlug, slugifyRoom } from './room-slug';
import { slugifyBlog } from './blog-slug';

// --- Root Page Sliders ---
let slidersTableReady = false;

async function ensureSlidersTable() {
  if (slidersTableReady) return;
  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS root_page_sliders (
      id INT NOT NULL AUTO_INCREMENT,
      image_url VARCHAR(500) NOT NULL,
      wording VARCHAR(255) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  slidersTableReady = true;
}

export async function listRootSliders() {
  await ensureSlidersTable();
  const [rows] = await getPool().execute(
    `SELECT id, image_url AS imageUrl, wording, sort_order AS sortOrder, enabled, created_at AS createdAt, updated_at AS updatedAt
     FROM root_page_sliders
     WHERE enabled = 1
     ORDER BY sort_order ASC, id DESC`
  );
  return rows;
}

export async function listAllRootSliders() {
  await ensureSlidersTable();
  const [rows] = await getPool().execute(
    `SELECT id, image_url AS imageUrl, wording, sort_order AS sortOrder, enabled, created_at AS createdAt, updated_at AS updatedAt
     FROM root_page_sliders
     ORDER BY sort_order ASC, id DESC`
  );
  return rows;
}

export async function createRootSlider({ imageUrl, wording, sortOrder, enabled = 1 }) {
  await ensureSlidersTable();
  const [result] = await getPool().execute(
    'INSERT INTO root_page_sliders (image_url, wording, sort_order, enabled) VALUES (?, ?, ?, ?)',
    [String(imageUrl || '').trim(), String(wording || '').trim(), Number(sortOrder || 0), Number(enabled)]
  );
  const [rows] = await getPool().execute(
    `SELECT id, image_url AS imageUrl, wording, sort_order AS sortOrder, enabled, created_at AS createdAt, updated_at AS updatedAt
     FROM root_page_sliders
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );
  return rows[0] || null;
}

export async function updateRootSlider(id, { imageUrl, wording, sortOrder, enabled }) {
  await ensureSlidersTable();
  const [result] = await getPool().execute(
    `UPDATE root_page_sliders
     SET image_url = ?, wording = ?, sort_order = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [String(imageUrl || '').trim(), String(wording || '').trim(), Number(sortOrder || 0), Number(enabled), Number(id)]
  );
  if (result.affectedRows === 0) return null;
  const [rows] = await getPool().execute(
    `SELECT id, image_url AS imageUrl, wording, sort_order AS sortOrder, enabled, created_at AS createdAt, updated_at AS updatedAt
     FROM root_page_sliders
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );
  return rows[0] || null;
}

export async function deleteRootSlider(id) {
  await ensureSlidersTable();
  const [result] = await getPool().execute('DELETE FROM root_page_sliders WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

let pool;

function getPool() {
  if (!pool) {
    const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

    if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_DATABASE) {
      throw new Error('Missing MySQL environment variables. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE.');
    }

    pool = mysql.createPool({
      host: MYSQL_HOST,
      port: Number(MYSQL_PORT || 3306),
      user: MYSQL_USER,
      password: MYSQL_PASSWORD || '',
      database: MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}

export async function findAdminByUsername(username) {
  const [rows] = await getPool().execute(
    'SELECT id, username, password FROM admin_users WHERE username = ? LIMIT 1',
    [username]
  );

  return rows[0] || null;
}

let galleryTableReady = false;

async function ensureGalleryTable() {
  if (galleryTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id INT NOT NULL AUTO_INCREMENT,
      album_name VARCHAR(120) NOT NULL,
      title VARCHAR(255) DEFAULT NULL,
      image_url VARCHAR(500) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_album_sort (album_name, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  galleryTableReady = true;
}

export async function listGalleryImages(albumName) {
  await ensureGalleryTable();

  if (albumName && String(albumName).trim()) {
    const [rows] = await getPool().execute(
      `SELECT id, album_name AS albumName, title, image_url AS imageUrl, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
       FROM gallery_images
       WHERE album_name = ?
       ORDER BY sort_order ASC, id DESC`,
      [String(albumName).trim()]
    );
    return rows;
  }

  const [rows] = await getPool().execute(
    `SELECT id, album_name AS albumName, title, image_url AS imageUrl, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM gallery_images
     ORDER BY album_name ASC, sort_order ASC, id DESC`
  );
  return rows;
}

export async function listGalleryAlbums() {
  await ensureGalleryTable();

  const [rows] = await getPool().execute(
    `SELECT album_name AS albumName, COUNT(*) AS totalImages
     FROM gallery_images
     GROUP BY album_name
     ORDER BY album_name ASC`
  );

  return rows;
}

export async function createGalleryImage({ albumName, title, imageUrl, sortOrder }) {
  await ensureGalleryTable();

  const [result] = await getPool().execute(
    'INSERT INTO gallery_images (album_name, title, image_url, sort_order) VALUES (?, ?, ?, ?)',
    [String(albumName).trim(), title || null, imageUrl, Number(sortOrder || 0)]
  );

  const [rows] = await getPool().execute(
    `SELECT id, album_name AS albumName, title, image_url AS imageUrl, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM gallery_images
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0] || null;
}

export async function updateGalleryImage(id, { albumName, title, imageUrl, sortOrder }) {
  await ensureGalleryTable();

  const [result] = await getPool().execute(
    `UPDATE gallery_images
     SET album_name = ?, title = ?, image_url = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [String(albumName).trim(), title || null, imageUrl, Number(sortOrder || 0), Number(id)]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await getPool().execute(
    `SELECT id, album_name AS albumName, title, image_url AS imageUrl, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM gallery_images
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );

  return rows[0] || null;
}

export async function deleteGalleryImage(id) {
  await ensureGalleryTable();

  const [result] = await getPool().execute('DELETE FROM gallery_images WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

export async function renameGalleryAlbum(oldAlbumName, newAlbumName) {
  await ensureGalleryTable();

  const [result] = await getPool().execute(
    'UPDATE gallery_images SET album_name = ?, updated_at = CURRENT_TIMESTAMP WHERE album_name = ?',
    [String(newAlbumName).trim(), String(oldAlbumName).trim()]
  );

  return result.affectedRows;
}

let offersTableReady = false;

async function ensureOffersTable() {
  if (offersTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS offers (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description_html LONGTEXT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  offersTableReady = true;
}

export async function listOffers() {
  await ensureOffersTable();

  const [rows] = await getPool().execute(
    `SELECT id, title, description_html AS descriptionHtml, image_url AS imageUrl, created_at AS createdAt, updated_at AS updatedAt
     FROM offers
     ORDER BY id DESC`
  );

  return rows;
}

export async function createOffer({ title, descriptionHtml, imageUrl }) {
  await ensureOffersTable();

  const [result] = await getPool().execute(
    'INSERT INTO offers (title, description_html, image_url) VALUES (?, ?, ?)',
    [String(title || '').trim(), String(descriptionHtml || ''), String(imageUrl || '').trim()]
  );

  const [rows] = await getPool().execute(
    `SELECT id, title, description_html AS descriptionHtml, image_url AS imageUrl, created_at AS createdAt, updated_at AS updatedAt
     FROM offers
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0] || null;
}

export async function updateOffer(id, { title, descriptionHtml, imageUrl }) {
  await ensureOffersTable();

  const [result] = await getPool().execute(
    `UPDATE offers
     SET title = ?, description_html = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [String(title || '').trim(), String(descriptionHtml || ''), String(imageUrl || '').trim(), Number(id)]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await getPool().execute(
    `SELECT id, title, description_html AS descriptionHtml, image_url AS imageUrl, created_at AS createdAt, updated_at AS updatedAt
     FROM offers
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );

  return rows[0] || null;
}

export async function deleteOffer(id) {
  await ensureOffersTable();

  const [result] = await getPool().execute('DELETE FROM offers WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

let blogsTableReady = false;

async function ensureBlogsTable() {
  if (blogsTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      excerpt TEXT NOT NULL,
      content_html LONGTEXT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      image_urls TEXT NULL,
      keywords TEXT NULL,
      is_published TINYINT(1) NOT NULL DEFAULT 0,
      published_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY idx_blog_slug (slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const [columnRows] = await getPool().execute(
    `SELECT COUNT(*) AS count
     FROM information_schema.columns
     WHERE table_schema = DATABASE()
       AND table_name = 'blogs'
       AND column_name = 'image_urls'`
  );

  if (!columnRows?.[0]?.count) {
    await getPool().execute('ALTER TABLE blogs ADD COLUMN image_urls TEXT NULL');
  }

  blogsTableReady = true;
}

function normalizeBlogRow(row) {
  if (!row) return null;

  let imageUrls = [];
  if (typeof row.imageUrls === 'string' && row.imageUrls.trim()) {
    try {
      imageUrls = JSON.parse(row.imageUrls);
    } catch {
      imageUrls = [];
    }
  }

  return {
    ...row,
    imageUrls,
  };
}

export async function listBlogs() {
  await ensureBlogsTable();

  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, is_published AS published, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs
     ORDER BY id DESC`
  );

  return rows.map(normalizeBlogRow);
}

export async function listPublishedBlogs({ search = '', page = 1, pageSize = 6 } = {}) {
  await ensureBlogsTable();

  const offset = Math.max(0, (Number(page) - 1) * Number(pageSize));
  const filters = ['is_published = 1'];
  const params = [];

  if (search && String(search).trim()) {
    const likeTerm = `%${String(search).trim()}%`;
    filters.push(`(
      title LIKE ? OR
      excerpt LIKE ? OR
      content_html LIKE ? OR
      keywords LIKE ? OR
      DATE_FORMAT(published_at, '%Y-%m-%d') LIKE ?
    )`);
    params.push(likeTerm, likeTerm, likeTerm, likeTerm, likeTerm);
  }

  const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
  const [countRows] = await getPool().execute(
    `SELECT COUNT(*) AS total FROM blogs ${whereClause}`,
    params
  );
  const totalItems = countRows?.[0]?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / Number(pageSize)));

  const limit = Number(pageSize);
  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs ${whereClause}
     ORDER BY published_at DESC, id DESC
     LIMIT ${limit} OFFSET ${offset}`,
    params
  );

  return {
    items: rows.map(normalizeBlogRow),
    page: Number(page),
    pageSize: Number(pageSize),
    totalItems: Number(totalItems),
    totalPages,
  };
}

export async function findPublishedBlogBySlug(slug) {
  await ensureBlogsTable();

  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs
     WHERE slug = ? AND is_published = 1
     LIMIT 1`,
    [String(slug).trim()]
  );

  return normalizeBlogRow(rows[0]);
}

export async function findBlogBySlug(slug) {
  await ensureBlogsTable();

  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, is_published AS published, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs
     WHERE slug = ?
     LIMIT 1`,
    [String(slug).trim()]
  );

  return normalizeBlogRow(rows[0]);
}

export async function createBlog({ title, slug, excerpt, contentHtml, imageUrl, imageUrls, keywords, published, publishedAt }) {
  await ensureBlogsTable();
  const normalizedSlug = slugifyBlog(String(slug || title || '').trim() || String(title || '').trim());

  const [result] = await getPool().execute(
    'INSERT INTO blogs (title, slug, excerpt, content_html, image_url, image_urls, keywords, is_published, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      String(title || '').trim(),
      normalizedSlug,
      String(excerpt || '').trim(),
      String(contentHtml || ''),
      String(imageUrl || '').trim(),
      Array.isArray(imageUrls) ? JSON.stringify(imageUrls) : null,
      String(keywords || '').trim(),
      published ? 1 : 0,
      publishedAt ? String(publishedAt).trim() : null,
    ]
  );

  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, is_published AS published, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return rows[0] || null;
}

export async function updateBlog(id, { title, slug, excerpt, contentHtml, imageUrl, imageUrls, keywords, published, publishedAt }) {
  await ensureBlogsTable();
  const normalizedSlug = slugifyBlog(String(slug || title || '').trim() || String(title || '').trim());

  const [result] = await getPool().execute(
    `UPDATE blogs
     SET title = ?, slug = ?, excerpt = ?, content_html = ?, image_url = ?, image_urls = ?, keywords = ?, is_published = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      String(title || '').trim(),
      normalizedSlug,
      String(excerpt || '').trim(),
      String(contentHtml || ''),
      String(imageUrl || '').trim(),
      Array.isArray(imageUrls) ? JSON.stringify(imageUrls) : null,
      String(keywords || '').trim(),
      published ? 1 : 0,
      publishedAt ? String(publishedAt).trim() : null,
      Number(id),
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await getPool().execute(
    `SELECT id, title, slug, excerpt, content_html AS contentHtml, image_url AS imageUrl, image_urls AS imageUrls, keywords, is_published AS published, published_at AS publishedAt, created_at AS createdAt, updated_at AS updatedAt
     FROM blogs
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );

  return rows[0] || null;
}

export async function deleteBlog(id) {
  await ensureBlogsTable();

  const [result] = await getPool().execute('DELETE FROM blogs WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

let featureSectionsTableReady = false;

async function ensureFeatureSectionsTable() {
  if (featureSectionsTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS feature_sections_content (
      id INT NOT NULL AUTO_INCREMENT,
      sections_json LONGTEXT NULL,
      title VARCHAR(255) NOT NULL,
      section_text TEXT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      alt_text VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL,
      is_reverse TINYINT(1) NOT NULL DEFAULT 0,
      cta VARCHAR(255) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_feature_sections_sort (sort_order, id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await ensureFeatureSectionsColumns();

  await migrateLegacyFeatureSectionsIfNeeded();

  featureSectionsTableReady = true;
}

async function hasColumn(tableName, columnName) {
  const [rows] = await getPool().execute(
    `SELECT COUNT(*) AS total
     FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    [tableName, columnName]
  );

  return Number(rows?.[0]?.total || 0) > 0;
}

async function ensureFeatureSectionsColumns() {
  const table = 'feature_sections_content';

  if (!(await hasColumn(table, 'title'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT '' AFTER sections_json`);
  }

  if (!(await hasColumn(table, 'section_text'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN section_text TEXT NOT NULL AFTER title`);
  }

  if (!(await hasColumn(table, 'image_url'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN image_url VARCHAR(500) NOT NULL DEFAULT '' AFTER section_text`);
  }

  if (!(await hasColumn(table, 'alt_text'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN alt_text VARCHAR(255) NOT NULL DEFAULT '' AFTER image_url`);
  }

  if (!(await hasColumn(table, 'url'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN url VARCHAR(500) NOT NULL DEFAULT '' AFTER alt_text`);
  }

  if (!(await hasColumn(table, 'is_reverse'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN is_reverse TINYINT(1) NOT NULL DEFAULT 0 AFTER url`);
  }

  if (!(await hasColumn(table, 'cta'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN cta VARCHAR(255) NOT NULL DEFAULT '' AFTER is_reverse`);
  }

  if (!(await hasColumn(table, 'sort_order'))) {
    await getPool().execute(`ALTER TABLE feature_sections_content ADD COLUMN sort_order INT NOT NULL DEFAULT 0 AFTER cta`);
  }
}

function parseFeatureSections(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

async function migrateLegacyFeatureSectionsIfNeeded() {
  const [fieldRows] = await getPool().execute(
    `SELECT COUNT(*) AS total
     FROM feature_sections_content
     WHERE title IS NOT NULL AND title <> ''`
  );

  const hasFieldRows = Number(fieldRows?.[0]?.total || 0) > 0;
  if (hasFieldRows) {
    return;
  }

  // Migrate from previously created row-based table if it exists.
  try {
    const [oldRows] = await getPool().execute(
      `SELECT title,
              section_text AS text,
              image_url AS image,
              alt_text AS alt,
              url,
              is_reverse AS reverse,
              cta,
              sort_order AS sortOrder
       FROM feature_sections_items
       ORDER BY sort_order ASC, id ASC`
    );

    if (Array.isArray(oldRows) && oldRows.length > 0) {
      const values = oldRows
        .map((_, index) => ` (?, ?, ?, ?, ?, ?, ?, ?, ?)${index < oldRows.length - 1 ? ',' : ''}`)
        .join('');

      const params = oldRows.flatMap((item, index) => [
        '[]',
        String(item?.title || '').trim(),
        String(item?.text || '').trim(),
        String(item?.image || '').trim(),
        String(item?.alt || '').trim(),
        String(item?.url || '').trim(),
        item?.reverse ? 1 : 0,
        String(item?.cta || '').trim(),
        Number(item?.sortOrder ?? index),
      ]);

      await getPool().execute(
        `INSERT INTO feature_sections_content (sections_json, title, section_text, image_url, alt_text, url, is_reverse, cta, sort_order)
         VALUES${values}`,
        params
      );

      return;
    }
  } catch {
    // Ignore if the old table does not exist.
  }

  let legacyRows = [];
  try {
    const [rows] = await getPool().execute(
      `SELECT sections_json AS sectionsJson
       FROM feature_sections_content
       ORDER BY id DESC
       LIMIT 1`
    );
    legacyRows = rows;
  } catch {
    return;
  }

  const legacy = legacyRows[0] || null;
  if (!legacy) {
    return;
  }

  const items = parseFeatureSections(legacy.sectionsJson);
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }

  const normalized = items.map((item) => ({
    title: String(item?.title || '').trim(),
    text: String(item?.text || '').trim(),
    image: String(item?.image || '').trim(),
    alt: String(item?.alt || '').trim(),
    url: String(item?.url || '').trim(),
    reverse: Boolean(item?.reverse),
    cta: String(item?.cta || '').trim(),
  }));

  const values = normalized
    .map((_, index) => ` (?, ?, ?, ?, ?, ?, ?, ?, ?)${index < normalized.length - 1 ? ',' : ''}`)
    .join('');

  const params = normalized.flatMap((item, index) => [
    '[]',
    item.title,
    item.text,
    item.image,
    item.alt,
    item.url,
    item.reverse ? 1 : 0,
    item.cta,
    index,
  ]);

  await getPool().execute(
    `INSERT INTO feature_sections_content (sections_json, title, section_text, image_url, alt_text, url, is_reverse, cta, sort_order)
     VALUES${values}`,
    params
  );
}

export async function getFeatureSectionsContent() {
  await ensureFeatureSectionsTable();

  const [rows] = await getPool().execute(
    `SELECT id,
            title,
            section_text AS text,
            image_url AS image,
            alt_text AS alt,
            url,
            is_reverse AS reverse,
            cta,
            sort_order AS sortOrder,
            created_at AS createdAt,
            updated_at AS updatedAt
      FROM feature_sections_content
      WHERE title IS NOT NULL AND title <> ''
     ORDER BY sort_order ASC, id ASC`
  );

  return rows.map((row) => ({
    ...row,
    reverse: Boolean(row.reverse),
  }));
}

export async function upsertFeatureSectionsContent(items) {
  await ensureFeatureSectionsTable();

  const normalized = Array.isArray(items)
    ? items.map((item) => ({
      title: String(item?.title || '').trim(),
      text: String(item?.text || '').trim(),
      image: String(item?.image || '').trim(),
      alt: String(item?.alt || '').trim(),
      url: String(item?.url || '').trim(),
      reverse: Boolean(item?.reverse),
      cta: String(item?.cta || '').trim(),
    }))
    : [];

  const connection = await getPool().getConnection();

  try {
    await connection.beginTransaction();
    await connection.execute(`DELETE FROM feature_sections_content WHERE title IS NOT NULL AND title <> ''`);

    if (normalized.length > 0) {
      const values = normalized
        .map((_, index) => ` (?, ?, ?, ?, ?, ?, ?, ?, ?)${index < normalized.length - 1 ? ',' : ''}`)
        .join('');

      const params = normalized.flatMap((item, index) => [
        '[]',
        item.title,
        item.text,
        item.image,
        item.alt,
        item.url,
        item.reverse ? 1 : 0,
        item.cta,
        index,
      ]);

      await connection.execute(
        `INSERT INTO feature_sections_content (sections_json, title, section_text, image_url, alt_text, url, is_reverse, cta, sort_order)
         VALUES${values}`,
        params
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return getFeatureSectionsContent();
}

let roomsTableReady = false;

async function ensureRoomsTable() {
  if (roomsTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(120) NOT NULL,
      short_description TEXT NOT NULL,
      description_text LONGTEXT NOT NULL,
      bed_size VARCHAR(120) NOT NULL,
      max_guests INT NOT NULL DEFAULT 2,
      bathrooms VARCHAR(80) NOT NULL,
      room_size_sqft INT NOT NULL DEFAULT 0,
      page_slug VARCHAR(255) NOT NULL DEFAULT '',
      price_usd DECIMAL(10, 2) DEFAULT NULL,
      price_lkr DECIMAL(12, 2) DEFAULT NULL,
      amenities_json LONGTEXT NOT NULL,
      images_json LONGTEXT NOT NULL,
      video_url VARCHAR(500) DEFAULT NULL,
      booking_url VARCHAR(500) DEFAULT NULL,
      is_enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_rooms_enabled_sort (is_enabled, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  if (!(await hasColumn('rooms', 'page_slug'))) {
    await getPool().execute(`ALTER TABLE rooms ADD COLUMN page_slug VARCHAR(255) NOT NULL DEFAULT '' AFTER room_size_sqft`);
  }

  if (!(await hasColumn('rooms', 'video_url'))) {
    await getPool().execute(`ALTER TABLE rooms ADD COLUMN video_url VARCHAR(500) DEFAULT NULL AFTER images_json`);
  }

  if (!(await hasColumn('rooms', 'booking_url'))) {
    await getPool().execute(`ALTER TABLE rooms ADD COLUMN booking_url VARCHAR(500) DEFAULT NULL AFTER video_url`);
  }

  roomsTableReady = true;
}

async function ensureUniqueRoomSlug(baseSlug, excludeId = null) {
  const seed = slugifyRoom(baseSlug) || 'room';
  let candidate = seed;
  let suffix = 2;

  while (true) {
    const params = [candidate];
    let sql = 'SELECT id FROM rooms WHERE page_slug = ?';
    if (Number.isInteger(Number(excludeId)) && Number(excludeId) > 0) {
      sql += ' AND id <> ?';
      params.push(Number(excludeId));
    }
    sql += ' LIMIT 1';

    const [rows] = await getPool().execute(sql, params);
    if (rows.length === 0) {
      return candidate;
    }

    candidate = `${seed}-${suffix}`;
    suffix += 1;
  }
}

function parseStringArray(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => String(item || '').trim())
      .filter((item) => item.length > 0);
  } catch {
    return [];
  }
}

function normalizeRooms(rows) {
  return rows.map((row) => ({
    ...row,
    maxGuests: Number(row.maxGuests || 0),
    roomSizeSqft: Number(row.roomSizeSqft || 0),
    priceUsd: row.priceUsd === null ? null : Number(row.priceUsd),
    priceLkr: row.priceLkr === null ? null : Number(row.priceLkr),
    isEnabled: Boolean(row.isEnabled),
    pageSlug: getRoomSlug(row.pageSlug, row.name, row.id ? `room-${row.id}` : 'room'),
    amenities: parseStringArray(row.amenitiesJson),
    images: parseStringArray(row.imagesJson),
    videoUrl: String(row.videoUrl || '').trim() || null,
    bookingUrl: String(row.bookingUrl || '').trim() || null,
  }));
}

function buildRoomPayload(payload = {}) {
  const amenities = Array.isArray(payload.amenities)
    ? payload.amenities.map((item) => String(item || '').trim()).filter((item) => item.length > 0)
    : [];

  const images = Array.isArray(payload.images)
    ? payload.images.map((item) => String(item || '').trim()).filter((item) => item.length > 0)
    : [];

  const normalizedPriceUsd = payload.priceUsd === '' || payload.priceUsd === null || payload.priceUsd === undefined
    ? null
    : Number(payload.priceUsd);

  const normalizedPriceLkr = payload.priceLkr === '' || payload.priceLkr === null || payload.priceLkr === undefined
    ? null
    : Number(payload.priceLkr);

  return {
    name: String(payload.name || '').trim(),
    category: String(payload.category || '').trim(),
    shortDescription: String(payload.shortDescription || '').trim(),
    descriptionText: String(payload.descriptionText || '').trim(),
    bedSize: String(payload.bedSize || '').trim(),
    maxGuests: Number(payload.maxGuests || 0),
    bathrooms: String(payload.bathrooms || '').trim(),
    roomSizeSqft: Number(payload.roomSizeSqft || 0),
    pageSlug: String(payload.pageSlug || '').trim(),
    priceUsd: Number.isFinite(normalizedPriceUsd) ? normalizedPriceUsd : null,
    priceLkr: Number.isFinite(normalizedPriceLkr) ? normalizedPriceLkr : null,
    amenitiesJson: JSON.stringify(amenities),
    imagesJson: JSON.stringify(images),
    videoUrl: String(payload.videoUrl || '').trim() || null,
    bookingUrl: String(payload.bookingUrl || '').trim() || null,
    isEnabled: payload.isEnabled ? 1 : 0,
    sortOrder: Number(payload.sortOrder || 0),
  };
}

export async function listRooms() {
  await ensureRoomsTable();

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
          page_slug AS pageSlug,
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, video_url AS videoUrl, booking_url AS bookingUrl, is_enabled AS isEnabled, sort_order AS sortOrder,
            created_at AS createdAt, updated_at AS updatedAt
     FROM rooms
     ORDER BY sort_order ASC, id DESC`
  );

  return normalizeRooms(rows);
}

export async function listEnabledRooms() {
  await ensureRoomsTable();

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
          page_slug AS pageSlug,
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, video_url AS videoUrl, booking_url AS bookingUrl, is_enabled AS isEnabled, sort_order AS sortOrder,
            created_at AS createdAt, updated_at AS updatedAt
     FROM rooms
     WHERE is_enabled = 1
     ORDER BY sort_order ASC, id DESC`
  );

  return normalizeRooms(rows);
}

export async function createRoom(payload) {
  await ensureRoomsTable();
  const room = buildRoomPayload(payload);
  const uniquePageSlug = await ensureUniqueRoomSlug(getRoomSlug(room.pageSlug, room.name));

  const [result] = await getPool().execute(
    `INSERT INTO rooms
      (name, category, short_description, description_text, bed_size, max_guests, bathrooms, room_size_sqft, page_slug,
       price_usd, price_lkr, amenities_json, images_json, video_url, booking_url, is_enabled, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      room.name,
      room.category,
      room.shortDescription,
      room.descriptionText,
      room.bedSize,
      room.maxGuests,
      room.bathrooms,
      room.roomSizeSqft,
      uniquePageSlug,
      room.priceUsd,
      room.priceLkr,
      room.amenitiesJson,
      room.imagesJson,
      room.videoUrl,
      room.bookingUrl,
      room.isEnabled,
      room.sortOrder,
    ]
  );

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
          page_slug AS pageSlug,
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, is_enabled AS isEnabled, sort_order AS sortOrder,
            created_at AS createdAt, updated_at AS updatedAt
     FROM rooms
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  return normalizeRooms(rows)[0] || null;
}

export async function updateRoom(id, payload) {
  await ensureRoomsTable();
  const room = buildRoomPayload(payload);
  const uniquePageSlug = await ensureUniqueRoomSlug(getRoomSlug(room.pageSlug, room.name), Number(id));

  const [result] = await getPool().execute(
    `UPDATE rooms
     SET name = ?, category = ?, short_description = ?, description_text = ?, bed_size = ?, max_guests = ?,
         bathrooms = ?, room_size_sqft = ?, page_slug = ?, price_usd = ?, price_lkr = ?, amenities_json = ?, images_json = ?,
         video_url = ?, booking_url = ?, is_enabled = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      room.name,
      room.category,
      room.shortDescription,
      room.descriptionText,
      room.bedSize,
      room.maxGuests,
      room.bathrooms,
      room.roomSizeSqft,
      uniquePageSlug,
      room.priceUsd,
      room.priceLkr,
      room.amenitiesJson,
      room.imagesJson,
      room.videoUrl,
      room.bookingUrl,
      room.isEnabled,
      room.sortOrder,
      Number(id),
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
          page_slug AS pageSlug,
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, is_enabled AS isEnabled, sort_order AS sortOrder,
            created_at AS createdAt, updated_at AS updatedAt
     FROM rooms
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );

  return normalizeRooms(rows)[0] || null;
}

export async function deleteRoom(id) {
  await ensureRoomsTable();

  const [result] = await getPool().execute('DELETE FROM rooms WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

let socialLinksTableReady = false;

async function ensureSocialLinksTable() {
  if (socialLinksTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS social_links (
      id INT NOT NULL AUTO_INCREMENT,
      label VARCHAR(120) NOT NULL,
      url VARCHAR(500) NOT NULL,
      icon_key VARCHAR(80) NOT NULL,
      is_enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_social_enabled_sort (is_enabled, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  socialLinksTableReady = true;
}

export async function listSocialLinks() {
  await ensureSocialLinksTable();

  const [rows] = await getPool().execute(
    `SELECT id, label, url, icon_key AS iconKey, is_enabled AS isEnabled, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM social_links
     ORDER BY sort_order ASC, id ASC`
  );

  return rows.map((row) => ({
    ...row,
    isEnabled: Boolean(row.isEnabled),
  }));
}

export async function listEnabledSocialLinks() {
  await ensureSocialLinksTable();

  const [rows] = await getPool().execute(
    `SELECT id, label, url, icon_key AS iconKey, is_enabled AS isEnabled, sort_order AS sortOrder
     FROM social_links
     WHERE is_enabled = 1
     ORDER BY sort_order ASC, id ASC`
  );

  return rows.map((row) => ({
    ...row,
    isEnabled: Boolean(row.isEnabled),
  }));
}

export async function createSocialLink({ label, url, iconKey, isEnabled, sortOrder }) {
  await ensureSocialLinksTable();

  const [result] = await getPool().execute(
    'INSERT INTO social_links (label, url, icon_key, is_enabled, sort_order) VALUES (?, ?, ?, ?, ?)',
    [
      String(label || '').trim(),
      String(url || '').trim(),
      String(iconKey || '').trim(),
      isEnabled ? 1 : 0,
      Number(sortOrder || 0),
    ]
  );

  const [rows] = await getPool().execute(
    `SELECT id, label, url, icon_key AS iconKey, is_enabled AS isEnabled, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM social_links
     WHERE id = ?
     LIMIT 1`,
    [result.insertId]
  );

  const item = rows[0] || null;
  return item ? { ...item, isEnabled: Boolean(item.isEnabled) } : null;
}

export async function updateSocialLink(id, { label, url, iconKey, isEnabled, sortOrder }) {
  await ensureSocialLinksTable();

  const [result] = await getPool().execute(
    `UPDATE social_links
     SET label = ?, url = ?, icon_key = ?, is_enabled = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [
      String(label || '').trim(),
      String(url || '').trim(),
      String(iconKey || '').trim(),
      isEnabled ? 1 : 0,
      Number(sortOrder || 0),
      Number(id),
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await getPool().execute(
    `SELECT id, label, url, icon_key AS iconKey, is_enabled AS isEnabled, sort_order AS sortOrder, created_at AS createdAt, updated_at AS updatedAt
     FROM social_links
     WHERE id = ?
     LIMIT 1`,
    [Number(id)]
  );

  const item = rows[0] || null;
  return item ? { ...item, isEnabled: Boolean(item.isEnabled) } : null;
}

export async function deleteSocialLink(id) {
  await ensureSocialLinksTable();

  const [result] = await getPool().execute('DELETE FROM social_links WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

let contactDetailsTableReady = false;

async function ensureContactDetailsTable() {
  if (contactDetailsTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS contact_details (
      id INT NOT NULL AUTO_INCREMENT,
      address_text TEXT NOT NULL,
      phone_numbers_json LONGTEXT NOT NULL,
      email VARCHAR(255) NOT NULL,
      map_iframe_html LONGTEXT NOT NULL,
      whatsapp_number VARCHAR(80) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  contactDetailsTableReady = true;
}

function parsePhoneNumbers(phoneNumbersJson) {
  try {
    const parsed = JSON.parse(phoneNumbersJson || '[]');
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((value) => String(value || '').trim())
      .filter((value) => value.length > 0);
  } catch {
    return [];
  }
}

export async function getContactDetails() {
  await ensureContactDetailsTable();

  const [rows] = await getPool().execute(
    `SELECT id, address_text AS addressText, phone_numbers_json AS phoneNumbersJson, email, map_iframe_html AS mapIframeHtml,
            whatsapp_number AS whatsappNumber, created_at AS createdAt, updated_at AS updatedAt
     FROM contact_details
     ORDER BY id DESC
     LIMIT 1`
  );

  const row = rows[0] || null;
  if (!row) {
    return null;
  }

  return {
    ...row,
    phoneNumbers: parsePhoneNumbers(row.phoneNumbersJson),
  };
}

export async function upsertContactDetails({ addressText, phoneNumbers, email, mapIframeHtml, whatsappNumber }) {
  await ensureContactDetailsTable();

  const normalizedPhoneNumbers = Array.isArray(phoneNumbers)
    ? phoneNumbers.map((value) => String(value || '').trim()).filter((value) => value.length > 0)
    : [];

  const payload = {
    addressText: String(addressText || '').trim(),
    phoneNumbersJson: JSON.stringify(normalizedPhoneNumbers),
    email: String(email || '').trim(),
    mapIframeHtml: String(mapIframeHtml || '').trim(),
    whatsappNumber: String(whatsappNumber || '').trim(),
  };

  const current = await getContactDetails();

  if (!current) {
    await getPool().execute(
      `INSERT INTO contact_details (address_text, phone_numbers_json, email, map_iframe_html, whatsapp_number)
       VALUES (?, ?, ?, ?, ?)`,
      [payload.addressText, payload.phoneNumbersJson, payload.email, payload.mapIframeHtml, payload.whatsappNumber]
    );
  } else {
    await getPool().execute(
      `UPDATE contact_details
       SET address_text = ?, phone_numbers_json = ?, email = ?, map_iframe_html = ?, whatsapp_number = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        payload.addressText,
        payload.phoneNumbersJson,
        payload.email,
        payload.mapIframeHtml,
        payload.whatsappNumber,
        Number(current.id),
      ]
    );
  }

  return getContactDetails();
}

let aboutContentTableReady = false;

async function ensureAboutContentTable() {
  if (aboutContentTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS about_content (
      id INT NOT NULL AUTO_INCREMENT,
      hero_title VARCHAR(255) NOT NULL,
      hero_subtitle TEXT NOT NULL,
      section_title VARCHAR(255) NOT NULL,
      body_html LONGTEXT NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  aboutContentTableReady = true;
}

export async function getAboutContent() {
  await ensureAboutContentTable();

  const [rows] = await getPool().execute(
    `SELECT id, hero_title AS heroTitle, hero_subtitle AS heroSubtitle, section_title AS sectionTitle,
            body_html AS bodyHtml, image_url AS imageUrl, created_at AS createdAt, updated_at AS updatedAt
     FROM about_content
     ORDER BY id DESC
     LIMIT 1`
  );

  return rows[0] || null;
}

export async function upsertAboutContent({ heroTitle, heroSubtitle, sectionTitle, bodyHtml, imageUrl }) {
  await ensureAboutContentTable();

  const payload = {
    heroTitle: String(heroTitle || '').trim(),
    heroSubtitle: String(heroSubtitle || '').trim(),
    sectionTitle: String(sectionTitle || '').trim(),
    bodyHtml: String(bodyHtml || '').trim(),
    imageUrl: String(imageUrl || '').trim(),
  };

  const current = await getAboutContent();

  if (!current) {
    await getPool().execute(
      `INSERT INTO about_content (hero_title, hero_subtitle, section_title, body_html, image_url)
       VALUES (?, ?, ?, ?, ?)`,
      [payload.heroTitle, payload.heroSubtitle, payload.sectionTitle, payload.bodyHtml, payload.imageUrl]
    );
  } else {
    await getPool().execute(
      `UPDATE about_content
       SET hero_title = ?, hero_subtitle = ?, section_title = ?, body_html = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [
        payload.heroTitle,
        payload.heroSubtitle,
        payload.sectionTitle,
        payload.bodyHtml,
        payload.imageUrl,
        Number(current.id),
      ]
    );
  }

  return getAboutContent();
}

let termsContentTableReady = false;

async function ensureTermsContentTable() {
  if (termsContentTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS terms_content (
      id INT NOT NULL AUTO_INCREMENT,
      section_title VARCHAR(255) NOT NULL,
      body_html LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  termsContentTableReady = true;
}

export async function getTermsContent() {
  await ensureTermsContentTable();

  const [rows] = await getPool().execute(
    `SELECT id, section_title AS sectionTitle, body_html AS bodyHtml, created_at AS createdAt, updated_at AS updatedAt
     FROM terms_content
     ORDER BY id DESC
     LIMIT 1`
  );

  return rows[0] || null;
}

export async function upsertTermsContent({ sectionTitle, bodyHtml }) {
  await ensureTermsContentTable();

  const payload = {
    sectionTitle: String(sectionTitle || '').trim(),
    bodyHtml: String(bodyHtml || '').trim(),
  };

  const current = await getTermsContent();

  if (!current) {
    await getPool().execute(
      `INSERT INTO terms_content (section_title, body_html)
       VALUES (?, ?)`,
      [payload.sectionTitle, payload.bodyHtml]
    );
  } else {
    await getPool().execute(
      `UPDATE terms_content
       SET section_title = ?, body_html = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [payload.sectionTitle, payload.bodyHtml, Number(current.id)]
    );
  }

  return getTermsContent();
}

let privacyContentTableReady = false;

async function ensurePrivacyContentTable() {
  if (privacyContentTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS privacy_content (
      id INT NOT NULL AUTO_INCREMENT,
      section_title VARCHAR(255) NOT NULL,
      body_html LONGTEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  privacyContentTableReady = true;
}

export async function getPrivacyContent() {
  await ensurePrivacyContentTable();

  const [rows] = await getPool().execute(
    `SELECT id, section_title AS sectionTitle, body_html AS bodyHtml, created_at AS createdAt, updated_at AS updatedAt
     FROM privacy_content
     ORDER BY id DESC
     LIMIT 1`
  );

  return rows[0] || null;
}

export async function upsertPrivacyContent({ sectionTitle, bodyHtml }) {
  await ensurePrivacyContentTable();

  const payload = {
    sectionTitle: String(sectionTitle || '').trim(),
    bodyHtml: String(bodyHtml || '').trim(),
  };

  const current = await getPrivacyContent();

  if (!current) {
    await getPool().execute(
      `INSERT INTO privacy_content (section_title, body_html)
       VALUES (?, ?)`,
      [payload.sectionTitle, payload.bodyHtml]
    );
  } else {
    await getPool().execute(
      `UPDATE privacy_content
       SET section_title = ?, body_html = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [payload.sectionTitle, payload.bodyHtml, Number(current.id)]
    );
  }

  return getPrivacyContent();
}

let pageHeroImagesTableReady = false;

async function ensurePageHeroImagesTable() {
  if (pageHeroImagesTableReady) {
    return;
  }

  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS page_hero_images (
      id INT NOT NULL AUTO_INCREMENT,
      page_key VARCHAR(120) NOT NULL,
      page_label VARCHAR(255) NOT NULL,
      image_url VARCHAR(500) NOT NULL,
      focal_x INT NOT NULL DEFAULT 50,
      focal_y INT NOT NULL DEFAULT 50,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY uq_page_key (page_key)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  if (!(await hasColumn('page_hero_images', 'focal_x'))) {
    await getPool().execute(`ALTER TABLE page_hero_images ADD COLUMN focal_x INT NOT NULL DEFAULT 50 AFTER image_url`);
  }

  if (!(await hasColumn('page_hero_images', 'focal_y'))) {
    await getPool().execute(`ALTER TABLE page_hero_images ADD COLUMN focal_y INT NOT NULL DEFAULT 50 AFTER focal_x`);
  }

  pageHeroImagesTableReady = true;
}

export async function listPageHeroImages() {
  await ensurePageHeroImagesTable();

  const [rows] = await getPool().execute(
    `SELECT id, page_key AS pageKey, page_label AS pageLabel, image_url AS imageUrl,
            focal_x AS focalX, focal_y AS focalY,
            created_at AS createdAt, updated_at AS updatedAt
     FROM page_hero_images
     ORDER BY page_label ASC, id ASC`
  );

  return rows;
}

export async function getPageHeroImage(pageKey) {
  await ensurePageHeroImagesTable();

  const key = String(pageKey || '').trim();
  if (!key) return null;

  const [rows] = await getPool().execute(
    `SELECT id, page_key AS pageKey, page_label AS pageLabel, image_url AS imageUrl,
            focal_x AS focalX, focal_y AS focalY,
            created_at AS createdAt, updated_at AS updatedAt
     FROM page_hero_images
     WHERE page_key = ?
     LIMIT 1`,
    [key]
  );

  return rows[0] || null;
}

export async function upsertPageHeroImages(items) {
  await ensurePageHeroImagesTable();

  const normalizedItems = Array.isArray(items) ? items : [];

  for (const item of normalizedItems) {
    const pageKey = String(item?.pageKey || '').trim();
    const pageLabel = String(item?.pageLabel || '').trim();
    const imageUrl = String(item?.imageUrl || '').trim();
    const focalX = Number.isFinite(Number(item?.focalX)) ? Number(item.focalX) : 50;
    const focalY = Number.isFinite(Number(item?.focalY)) ? Number(item.focalY) : 50;

    if (!pageKey || !pageLabel) {
      continue;
    }

    const existing = await getPageHeroImage(pageKey);

    if (!existing) {
      await getPool().execute(
        `INSERT INTO page_hero_images (page_key, page_label, image_url, focal_x, focal_y)
         VALUES (?, ?, ?, ?, ?)`,
        [pageKey, pageLabel, imageUrl, focalX, focalY]
      );
    } else {
      await getPool().execute(
        `UPDATE page_hero_images
         SET page_label = ?, image_url = ?, focal_x = ?, focal_y = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [pageLabel, imageUrl, focalX, focalY, Number(existing.id)]
      );
    }
  }

  return listPageHeroImages();
}
