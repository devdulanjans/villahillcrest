import mysql from 'mysql2/promise';

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
