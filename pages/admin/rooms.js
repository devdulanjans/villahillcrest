import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminRooms.module.css';

const defaultForm = {
  id: null,
  name: '',
  category: 'Deluxe',
  shortDescription: '',
  descriptionText: '',
  bedSize: '',
  maxGuests: 2,
  bathrooms: '1',
  roomSizeSqft: 300,
  priceUsd: '',
  priceLkr: '',
  amenitiesText: '',
  images: [],
  isEnabled: true,
  sortOrder: 0,
};

const categoryOptions = ['Deluxe', 'Suite', 'Family', 'Premium', 'Villa', 'Economy'];

function toAmenityText(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return '';
  }

  return list.join(', ');
}

export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(defaultForm);

  const parsedAmenities = useMemo(
    () => form.amenitiesText.split(',').map((item) => item.trim()).filter((item) => item.length > 0),
    [form.amenitiesText]
  );

  const loadRooms = async () => {
    setLoading(true);
    setError('');

    try {
      const authRes = await fetch('/api/admin/me');
      const authData = await authRes.json();
      if (!authRes.ok || !authData.user) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/rooms');
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to load rooms');
        return;
      }

      setRooms(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(defaultForm);
  };

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append('image', file);

    const res = await fetch('/api/admin/rooms/upload', {
      method: 'POST',
      body,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Image upload failed');
    }

    return data.imageUrl;
  };

  const handleImageFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    setBusy(true);
    setError('');
    setMessage('');

    try {
      const uploadedUrls = [];
      for (const file of files) {
        // Upload one by one to keep API and memory usage stable.
        const imageUrl = await uploadImage(file);
        uploadedUrls.push(imageUrl);
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      setMessage(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  };

  const removeImage = (imageUrl) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imageUrl),
    }));
  };

  const beginEdit = (room) => {
    setForm({
      id: room.id,
      name: room.name || '',
      category: room.category || 'Deluxe',
      shortDescription: room.shortDescription || '',
      descriptionText: room.descriptionText || '',
      bedSize: room.bedSize || '',
      maxGuests: room.maxGuests || 2,
      bathrooms: room.bathrooms || '1',
      roomSizeSqft: room.roomSizeSqft || 300,
      priceUsd: room.priceUsd ?? '',
      priceLkr: room.priceLkr ?? '',
      amenitiesText: toAmenityText(room.amenities),
      images: Array.isArray(room.images) ? room.images : [],
      isEnabled: Boolean(room.isEnabled),
      sortOrder: room.sortOrder || 0,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Room name is required';
    if (!form.category.trim()) return 'Category is required';
    if (!form.shortDescription.trim()) return 'Short description is required';
    if (!form.bedSize.trim()) return 'Bed size is required';
    if (!Number(form.maxGuests) || Number(form.maxGuests) <= 0) return 'Max guests must be greater than 0';
    if (!form.bathrooms.trim()) return 'Bathrooms detail is required';
    if (!Number(form.roomSizeSqft) || Number(form.roomSizeSqft) <= 0) return 'Room size must be greater than 0';
    if (!Array.isArray(form.images) || form.images.length === 0) return 'Please upload at least one room image';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const formError = validateForm();
    if (formError) {
      setError(formError);
      return;
    }

    setBusy(true);

    try {
      const endpoint = form.id ? `/api/admin/rooms/${form.id}` : '/api/admin/rooms';
      const method = form.id ? 'PUT' : 'POST';

      const payload = {
        name: form.name,
        category: form.category,
        shortDescription: form.shortDescription,
        descriptionText: form.descriptionText,
        bedSize: form.bedSize,
        maxGuests: Number(form.maxGuests),
        bathrooms: form.bathrooms,
        roomSizeSqft: Number(form.roomSizeSqft),
        priceUsd: form.priceUsd,
        priceLkr: form.priceLkr,
        amenities: parsedAmenities,
        images: form.images,
        isEnabled: form.isEnabled,
        sortOrder: Number(form.sortOrder || 0),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save room');
        return;
      }

      setMessage(form.id ? 'Room updated successfully' : 'Room created successfully');
      resetForm();
      await loadRooms();
    } catch {
      setError('Failed to save room');
    } finally {
      setBusy(false);
    }
  };

  const removeRoom = async (id) => {
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/rooms/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to delete room');
        return;
      }

      setMessage('Room deleted successfully');
      if (form.id === id) {
        resetForm();
      }
      await loadRooms();
    } catch {
      setError('Failed to delete room');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Rooms | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Add Room" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Rooms Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{form.id ? 'Edit Room' : 'Add Room'}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.rowTwo}>
                <input
                  type="text"
                  placeholder="Room name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
                <select
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Small description"
                value={form.shortDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value }))}
                rows={3}
                required
              />

              <textarea
                placeholder="Full details (optional but recommended)"
                value={form.descriptionText}
                onChange={(e) => setForm((prev) => ({ ...prev, descriptionText: e.target.value }))}
                rows={4}
              />

              <div className={styles.rowFour}>
                <input
                  type="text"
                  placeholder="Bed size (e.g., King)"
                  value={form.bedSize}
                  onChange={(e) => setForm((prev) => ({ ...prev, bedSize: e.target.value }))}
                  required
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Max guests"
                  value={form.maxGuests}
                  onChange={(e) => setForm((prev) => ({ ...prev, maxGuests: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Bathrooms (e.g., 1, 1.5)"
                  value={form.bathrooms}
                  onChange={(e) => setForm((prev) => ({ ...prev, bathrooms: e.target.value }))}
                  required
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Room size (sqft)"
                  value={form.roomSizeSqft}
                  onChange={(e) => setForm((prev) => ({ ...prev, roomSizeSqft: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.rowThree}>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price USD"
                  value={form.priceUsd}
                  onChange={(e) => setForm((prev) => ({ ...prev, priceUsd: e.target.value }))}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price LKR"
                  value={form.priceLkr}
                  onChange={(e) => setForm((prev) => ({ ...prev, priceLkr: e.target.value }))}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Sort order"
                  value={form.sortOrder}
                  onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
                />
              </div>

              <textarea
                placeholder="Amenities (comma separated: WiFi, AC, Balcony, Smart TV)"
                value={form.amenitiesText}
                onChange={(e) => setForm((prev) => ({ ...prev, amenitiesText: e.target.value }))}
                rows={3}
              />

              <div className={styles.uploadRow}>
                <label className={styles.uploadBtn}>
                  Upload Multiple Images
                  <input type="file" accept="image/*" multiple onChange={handleImageFiles} />
                </label>

                <label className={styles.toggleWrap}>
                  <input
                    type="checkbox"
                    checked={form.isEnabled}
                    onChange={(e) => setForm((prev) => ({ ...prev, isEnabled: e.target.checked }))}
                  />
                  <span>Show this room on home page</span>
                </label>
              </div>

              {form.images.length > 0 && (
                <div className={styles.imageGrid}>
                  {form.images.map((imageUrl) => (
                    <div className={styles.imageCard} key={imageUrl}>
                      <img src={imageUrl} alt="Room" />
                      <button type="button" onClick={() => removeImage(imageUrl)}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.amenityChips}>
                {parsedAmenities.map((amenity) => (
                  <span key={amenity}>{amenity}</span>
                ))}
              </div>

              <div className={styles.formActions}>
                <button type="submit" disabled={busy}>
                  {busy ? 'Saving...' : form.id ? 'Update Room' : 'Save Room'}
                </button>
                {form.id && (
                  <button type="button" className={styles.secondary} onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}

          <section className={styles.panel}>
            <h3>Saved Rooms</h3>
            {loading ? (
              <p>Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p>No rooms available yet.</p>
            ) : (
              <div className={styles.roomGrid}>
                {rooms.map((room) => (
                  <article className={styles.roomCard} key={room.id}>
                    <img
                      src={Array.isArray(room.images) && room.images.length > 0 ? room.images[0] : '/images/logo.png'}
                      alt={room.name}
                    />
                    <h4>{room.name}</h4>
                    <p>{room.category}</p>
                    <p>{room.shortDescription}</p>
                    <p>{room.maxGuests} guests • {room.bedSize} • {room.bathrooms} bath</p>
                    <div className={styles.roomActions}>
                      <button type="button" onClick={() => beginEdit(room)}>Edit</button>
                      <button type="button" className={styles.deleteBtn} onClick={() => removeRoom(room.id)}>
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
