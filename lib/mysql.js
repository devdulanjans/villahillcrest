import mysql from 'mysql2/promise';

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
      price_usd DECIMAL(10, 2) DEFAULT NULL,
      price_lkr DECIMAL(12, 2) DEFAULT NULL,
      amenities_json LONGTEXT NOT NULL,
      images_json LONGTEXT NOT NULL,
      is_enabled TINYINT(1) NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX idx_rooms_enabled_sort (is_enabled, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  roomsTableReady = true;
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
    amenities: parseStringArray(row.amenitiesJson),
    images: parseStringArray(row.imagesJson),
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
    priceUsd: Number.isFinite(normalizedPriceUsd) ? normalizedPriceUsd : null,
    priceLkr: Number.isFinite(normalizedPriceLkr) ? normalizedPriceLkr : null,
    amenitiesJson: JSON.stringify(amenities),
    imagesJson: JSON.stringify(images),
    isEnabled: payload.isEnabled ? 1 : 0,
    sortOrder: Number(payload.sortOrder || 0),
  };
}

export async function listRooms() {
  await ensureRoomsTable();

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, is_enabled AS isEnabled, sort_order AS sortOrder,
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
            price_usd AS priceUsd, price_lkr AS priceLkr, amenities_json AS amenitiesJson,
            images_json AS imagesJson, is_enabled AS isEnabled, sort_order AS sortOrder,
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

  const [result] = await getPool().execute(
    `INSERT INTO rooms
      (name, category, short_description, description_text, bed_size, max_guests, bathrooms, room_size_sqft,
       price_usd, price_lkr, amenities_json, images_json, is_enabled, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      room.name,
      room.category,
      room.shortDescription,
      room.descriptionText,
      room.bedSize,
      room.maxGuests,
      room.bathrooms,
      room.roomSizeSqft,
      room.priceUsd,
      room.priceLkr,
      room.amenitiesJson,
      room.imagesJson,
      room.isEnabled,
      room.sortOrder,
    ]
  );

  const [rows] = await getPool().execute(
    `SELECT id, name, category, short_description AS shortDescription, description_text AS descriptionText,
            bed_size AS bedSize, max_guests AS maxGuests, bathrooms, room_size_sqft AS roomSizeSqft,
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

  const [result] = await getPool().execute(
    `UPDATE rooms
     SET name = ?, category = ?, short_description = ?, description_text = ?, bed_size = ?, max_guests = ?,
         bathrooms = ?, room_size_sqft = ?, price_usd = ?, price_lkr = ?, amenities_json = ?, images_json = ?,
         is_enabled = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
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
      room.priceUsd,
      room.priceLkr,
      room.amenitiesJson,
      room.imagesJson,
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
