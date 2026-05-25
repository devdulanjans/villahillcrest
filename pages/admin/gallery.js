import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaBell,
  FaChartPie,
  FaFile,
  FaFolder,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTable,
  FaTrash,
  FaWpforms,
} from 'react-icons/fa';
import { IoMdApps } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import styles from '../../styles/GalleryAdmin.module.css';

const menuItems = [
  { icon: <MdSpaceDashboard />, label: 'Dashnoard', href: '/admin/dashboard' },
  { icon: <FaFile />, label: 'Home' },
  { icon: <FaFile />, label: 'About' },
  { icon: <FaWpforms />, label: 'Booking' },
  { icon: <FaTable />, label: 'Availability' },
  { icon: <FaChartPie />, label: 'Surf' },
  { icon: <FaFolder />, label: 'Gallery', href: '/admin/gallery' },
  { icon: <FaMoneyBillWave />, label: 'Offers' },
  { icon: <FaMapMarkerAlt />, label: 'Contact Us' },
  { icon: <FaBell />, label: 'Popup Message' },
  { icon: <IoMdApps />, label: 'Social Media' },
];

export default function GalleryAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [uploadForm, setUploadForm] = useState({ albumName: '', title: '', sortOrder: '' });
  const [albumUpdateForm, setAlbumUpdateForm] = useState({ oldAlbumName: '', newAlbumName: '' });
  const [appendForm, setAppendForm] = useState({ albumName: '', title: '' });
  const [files, setFiles] = useState([]);
  const [appendFiles, setAppendFiles] = useState([]);
  const [editForm, setEditForm] = useState({ id: null, albumName: '', title: '', imageUrl: '', sortOrder: 0 });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const loadGallery = async (album = '') => {
    setLoading(true);
    setError('');

    try {
      const query = album ? `?album=${encodeURIComponent(album)}` : '';
      const res = await fetch(`/api/admin/gallery${query}`);
      const data = await res.json();

      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!res.ok) {
        setError(data.message || 'Failed to load gallery data');
        return;
      }

      setItems(Array.isArray(data.items) ? data.items : []);
      setAlbums(Array.isArray(data.albums) ? data.albums : []);
    } catch {
      setError('Failed to load gallery data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const authRes = await fetch('/api/admin/me');
        const authData = await authRes.json();

        if (!isMounted) {
          return;
        }

        if (!authRes.ok || !authData.user) {
          router.push('/admin/login');
          return;
        }

        await loadGallery('');
      } catch {
        if (isMounted) {
          router.push('/admin/login');
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const album = item.albumName || 'Uncategorized';
      if (!acc[album]) {
        acc[album] = [];
      }
      acc[album].push(item);
      return acc;
    }, {});
  }, [items]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!uploadForm.albumName.trim()) {
      setError('Album name is required');
      return;
    }

    if (!files.length) {
      setError('Please select one or more images');
      return;
    }

    const formData = new FormData();
    formData.append('albumName', uploadForm.albumName.trim());
    formData.append('title', uploadForm.title.trim());
    if (String(uploadForm.sortOrder).trim() !== '') {
      formData.append('sortOrder', String(uploadForm.sortOrder));
    }

    files.forEach((file) => {
      formData.append('images', file);
    });

    setBusy(true);

    try {
      const res = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Upload failed');
        return;
      }

      setMessage('Images uploaded successfully');
      setFiles([]);
      setUploadForm({ albumName: '', title: '', sortOrder: '' });
      await loadGallery(selectedAlbum);
    } catch {
      setError('Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const handleAppendToAlbum = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!appendForm.albumName.trim()) {
      setError('Please select an existing album');
      return;
    }

    if (!appendFiles.length) {
      setError('Please select one or more images to add');
      return;
    }

    const formData = new FormData();
    formData.append('albumName', appendForm.albumName.trim());
    formData.append('title', appendForm.title.trim());

    appendFiles.forEach((file) => {
      formData.append('images', file);
    });

    setBusy(true);

    try {
      const res = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to add images to album');
        return;
      }

      setMessage('New images added to the selected album');
      setAppendFiles([]);
      setAppendForm({ albumName: '', title: '' });

      const nextSelected = selectedAlbum || appendForm.albumName.trim();
      setSelectedAlbum(nextSelected);
      await loadGallery(nextSelected);
    } catch {
      setError('Failed to add images to album');
    } finally {
      setBusy(false);
    }
  };

  const handleAlbumRename = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const oldAlbumName = albumUpdateForm.oldAlbumName.trim();
    const newAlbumName = albumUpdateForm.newAlbumName.trim();

    if (!oldAlbumName || !newAlbumName) {
      setError('Both current and new album names are required');
      return;
    }

    setBusy(true);

    try {
      const res = await fetch('/api/admin/gallery/album', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldAlbumName, newAlbumName }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to update album name');
        return;
      }

      setMessage('Album name updated successfully');

      const nextSelected = selectedAlbum === oldAlbumName ? newAlbumName : selectedAlbum;
      setSelectedAlbum(nextSelected);
      setAlbumUpdateForm({ oldAlbumName: '', newAlbumName: '' });
      await loadGallery(nextSelected);
    } catch {
      setError('Failed to update album name');
    } finally {
      setBusy(false);
    }
  };

  const beginEdit = (item) => {
    setEditForm({
      id: item.id,
      albumName: item.albumName || '',
      title: item.title || '',
      imageUrl: item.imageUrl || '',
      sortOrder: Number(item.sortOrder || 0),
    });
  };

  const cancelEdit = () => {
    setEditForm({ id: null, albumName: '', title: '', imageUrl: '', sortOrder: 0 });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!editForm.id) {
      return;
    }

    setBusy(true);

    try {
      const res = await fetch(`/api/admin/gallery/${editForm.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          albumName: editForm.albumName,
          title: editForm.title,
          imageUrl: editForm.imageUrl,
          sortOrder: Number(editForm.sortOrder || 0),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to update image');
        return;
      }

      setMessage('Image updated successfully');
      cancelEdit();
      await loadGallery(selectedAlbum);
    } catch {
      setError('Failed to update image');
    } finally {
      setBusy(false);
    }
  };

  const removeImage = async (id) => {
    setError('');
    setMessage('');
    setBusy(true);

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to delete image');
        return;
      }

      setMessage('Image deleted successfully');
      await loadGallery(selectedAlbum);
    } catch {
      setError('Failed to delete image');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Gallery Editor | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <aside className={styles.sidebar}>
          <h1 className={styles.brand}>Avlis</h1>
          <h2 className={styles.menuTitle}>Site Menu</h2>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li key={item.label} className={item.label === 'Gallery' ? styles.menuItemActive : styles.menuItem}>
                {item.href ? (
                  <Link href={item.href} className={styles.menuLink}>
                    <span className={styles.menuIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className={styles.menuStatic}>
                    <span className={styles.menuIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Gallery Album Manager</h2>
            <div className={styles.topBarActions}>
              <label>
                Filter Album
                <select
                  value={selectedAlbum}
                  onChange={async (e) => {
                    const value = e.target.value;
                    setSelectedAlbum(value);
                    await loadGallery(value);
                  }}
                >
                  <option value="">All Albums</option>
                  {albums.map((album) => (
                    <option key={album.albumName} value={album.albumName}>
                      {album.albumName} ({album.totalImages})
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </header>

          <section className={styles.panel}>
            <h3>Upload Images</h3>
            <p>Choose an album name and upload multiple images. Images are automatically resized before saving.</p>
            <form className={styles.uploadForm} onSubmit={handleUpload}>
              <input
                type="text"
                placeholder="Album name"
                value={uploadForm.albumName}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, albumName: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="Title (optional, used as base title)"
                value={uploadForm.title}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
              />
              <input
                type="number"
                min="0"
                placeholder="Sort order"
                value={uploadForm.sortOrder}
                onChange={(e) => setUploadForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                required
              />
              <button type="submit" disabled={busy}>{busy ? 'Uploading...' : 'Upload Images'}</button>
            </form>
          </section>

          <section className={styles.panel}>
            <h3>Add More Images to Existing Album</h3>
            <p>Select an album, choose new images, and they will be appended to that album.</p>
            <form className={styles.albumUpdateForm} onSubmit={handleAppendToAlbum}>
              <select
                value={appendForm.albumName}
                onChange={(e) => setAppendForm((prev) => ({ ...prev, albumName: e.target.value }))}
                required
              >
                <option value="">Select existing album</option>
                {albums.map((album) => (
                  <option key={album.albumName} value={album.albumName}>
                    {album.albumName} ({album.totalImages})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Title (optional)"
                value={appendForm.title}
                onChange={(e) => setAppendForm((prev) => ({ ...prev, title: e.target.value }))}
              />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setAppendFiles(Array.from(e.target.files || []))}
                required
              />
              <button type="submit" disabled={busy}>{busy ? 'Adding...' : 'Add Images'}</button>
            </form>
          </section>

          <section className={styles.panel}>
            <h3>Update Existing Album</h3>
            <p>Rename an album and keep all its images under the updated album name.</p>
            <form className={styles.albumUpdateForm} onSubmit={handleAlbumRename}>
              <select
                value={albumUpdateForm.oldAlbumName}
                onChange={(e) => setAlbumUpdateForm((prev) => ({ ...prev, oldAlbumName: e.target.value }))}
                required
              >
                <option value="">Select current album</option>
                {albums.map((album) => (
                  <option key={album.albumName} value={album.albumName}>
                    {album.albumName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="New album name"
                value={albumUpdateForm.newAlbumName}
                onChange={(e) => setAlbumUpdateForm((prev) => ({ ...prev, newAlbumName: e.target.value }))}
                required
              />
              <button type="submit" disabled={busy}>{busy ? 'Updating...' : 'Update Album'}</button>
            </form>
          </section>

          {editForm.id && (
            <section className={styles.panel}>
              <h3>Edit Image</h3>
              <form className={styles.editForm} onSubmit={saveEdit}>
                <input
                  type="text"
                  placeholder="Album name"
                  value={editForm.albumName}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, albumName: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Image title"
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  required
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Sort order"
                  value={editForm.sortOrder}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
                />
                <div className={styles.rowButtons}>
                  <button type="submit" disabled={busy}>Save Changes</button>
                  <button type="button" onClick={cancelEdit} className={styles.secondaryBtn}>Cancel</button>
                </div>
              </form>
            </section>
          )}

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}

          <section className={styles.panel}>
            <h3>Albums</h3>
            {loading ? (
              <p>Loading gallery...</p>
            ) : Object.keys(groupedItems).length === 0 ? (
              <p>No images found.</p>
            ) : (
              <div className={styles.albumGrid}>
                {Object.entries(groupedItems).map(([albumName, albumItems]) => (
                  <div key={albumName} className={styles.albumCard}>
                    <h4>{albumName}</h4>
                    <div className={styles.imageGrid}>
                      {albumItems.map((item) => (
                        <article key={item.id} className={styles.imageCard}>
                          <img src={item.imageUrl} alt={item.title || `Image ${item.id}`} />
                          <div className={styles.imageMeta}>
                            <strong>{item.title || 'Untitled'}</strong>
                            <span>Sort: {item.sortOrder}</span>
                          </div>
                          <div className={styles.imageActions}>
                            <button type="button" onClick={() => beginEdit(item)}>Edit</button>
                            <button type="button" className={styles.deleteBtn} onClick={() => removeImage(item.id)}>
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
