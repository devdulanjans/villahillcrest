import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminSurfBreaks.module.css';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const emptyBreak = () => ({ name: '', level: 'Beginner', note: '' });
const emptyPhoto = () => ({ src: '', alt: '', label: '', level: 'Beginner' });

const initialForm = {
  id: null,
  name: '',
  tagline: '',
  sortOrder: 0,
  enabled: true,
  breaks: [emptyBreak()],
  photos: [emptyPhoto()],
};

export default function AdminSurfBreaksPage() {
  const router = useRouter();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(initialForm);

  const loadLocations = async () => {
    setLoading(true);
    setError('');
    try {
      const authRes = await fetch('/api/admin/me', { credentials: 'same-origin' });
      const authData = await authRes.json();
      if (!authRes.ok || !authData.user) {
        router.push('/admin/login');
        return;
      }
      const res = await fetch('/api/admin/surf-breaks');
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to load surf breaks');
        return;
      }
      setLocations(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Failed to load surf breaks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => setForm(initialForm);

  const beginEdit = (loc) => {
    setForm({
      id: loc.id,
      name: loc.name || '',
      tagline: loc.tagline || '',
      sortOrder: loc.sortOrder ?? 0,
      enabled: loc.enabled !== 0 && loc.enabled !== false,
      breaks: Array.isArray(loc.breaks) && loc.breaks.length > 0
        ? loc.breaks.map(b => ({ name: b.name || '', level: b.level || 'Beginner', note: b.note || '' }))
        : [emptyBreak()],
      photos: Array.isArray(loc.photos) && loc.photos.length > 0
        ? loc.photos.map(p => ({ src: p.src || '', alt: p.alt || '', label: p.label || '', level: p.level || 'Beginner' }))
        : [emptyPhoto()],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Break rows ──────────────────────────────────────────────────────────────

  const addBreak = () =>
    setForm(prev => ({ ...prev, breaks: [...prev.breaks, emptyBreak()] }));

  const removeBreak = (index) =>
    setForm(prev => ({ ...prev, breaks: prev.breaks.filter((_, i) => i !== index) }));

  const updateBreak = (index, field, value) =>
    setForm(prev => {
      const next = [...prev.breaks];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, breaks: next };
    });

  // ── Photo rows ──────────────────────────────────────────────────────────────

  const addPhoto = () =>
    setForm(prev => ({ ...prev, photos: [...prev.photos, emptyPhoto()] }));

  const removePhoto = (index) =>
    setForm(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));

  const updatePhoto = (index, field, value) =>
    setForm(prev => {
      const next = [...prev.photos];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, photos: next };
    });

  const handlePhotoUpload = async (index, file) => {
    if (!file) return;
    setUploadingIndex(index);
    setError('');
    try {
      const body = new FormData();
      body.append('image', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      updatePhoto(index, 'src', data.url);
      if (!form.photos[index].label) {
        updatePhoto(index, 'label', file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
      }
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploadingIndex(null);
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!form.name.trim()) {
      setError('Location name is required');
      return;
    }

    const cleanBreaks = form.breaks
      .filter(b => b.name.trim())
      .map(b => ({ name: b.name.trim(), level: b.level, note: b.note.trim() }));

    const cleanPhotos = form.photos
      .filter(p => p.src.trim())
      .map(p => ({ src: p.src.trim(), alt: p.alt.trim(), label: p.label.trim(), level: p.level }));

    setBusy(true);
    try {
      const endpoint = form.id ? `/api/admin/surf-breaks/${form.id}` : '/api/admin/surf-breaks';
      const method = form.id ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          tagline: form.tagline.trim(),
          breaks: cleanBreaks,
          photos: cleanPhotos,
          sortOrder: Number(form.sortOrder) || 0,
          enabled: form.enabled,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save');
        return;
      }
      setMessage(form.id ? 'Location updated successfully' : 'Location created successfully');
      resetForm();
      await loadLocations();
    } catch {
      setError('Failed to save surf break location');
    } finally {
      setBusy(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────────────────

  const seedDefaultData = async () => {
    if (!window.confirm('This will insert 5 default surf break locations (Weligama, Midigama, Ahangama, Mirissa, Madiha). Continue?')) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/admin/surf-breaks/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Seed failed');
        return;
      }
      setMessage(`${data.count} default locations loaded successfully`);
      await loadLocations();
    } catch {
      setError('Seed request failed');
    } finally {
      setBusy(false);
    }
  };

  const removeLocation = async (id) => {
    if (!window.confirm('Delete this surf break location?')) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/admin/surf-breaks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to delete');
        return;
      }
      setMessage('Location deleted');
      if (form.id === id) resetForm();
      await loadLocations();
    } catch {
      setError('Failed to delete location');
    } finally {
      setBusy(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Admin Surf Breaks | Villa Hillcrest</title>
      </Head>
      <div className={styles.page}>
        <AdminSidebar activeLabel="Surf Breaks" />
        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Surf Break Locations</h2>
          </header>

          {/* ── Form panel ── */}
          <section className={styles.panel}>
            <h3>{form.id ? 'Edit Location' : 'Add Location'}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>

              {/* Name + Sort Order */}
              <div className={styles.row2}>
                <div>
                  <label className={styles.fieldLabel}>Location Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Weligama"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>Sort Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.sortOrder}
                    onChange={e => setForm(p => ({ ...p, sortOrder: e.target.value }))}
                  />
                </div>
              </div>

              {/* Tagline */}
              <label className={styles.fieldLabel}>Tagline</label>
              <input
                type="text"
                placeholder="e.g. The Perfect Place To Start"
                value={form.tagline}
                onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))}
              />

              {/* Enabled */}
              <label className={styles.switchRow}>
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={e => setForm(p => ({ ...p, enabled: e.target.checked }))}
                />
                Enabled (visible on surf retreat page)
              </label>

              {/* ── Breaks sub-list ── */}
              <div className={styles.subSection}>
                <div className={styles.subSectionHeader}>
                  <h4>Surf Breaks at this Location</h4>
                  <button type="button" className={styles.addRowBtn} onClick={addBreak}>
                    + Add Break
                  </button>
                </div>
                {form.breaks.map((b, i) => (
                  <div key={i} className={`${styles.subRow} ${styles.breakRow}`}>
                    <div>
                      <p className={styles.subRowLabel}>Break Name</p>
                      <input
                        type="text"
                        placeholder="e.g. Weligama Beach"
                        value={b.name}
                        onChange={e => updateBreak(i, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <p className={styles.subRowLabel}>Difficulty Level</p>
                      <select value={b.level} onChange={e => updateBreak(i, 'level', e.target.value)}>
                        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <p className={styles.subRowLabel}>Note (optional)</p>
                      <input
                        type="text"
                        placeholder="e.g. 8 min from Villa Hillcrest"
                        value={b.note}
                        onChange={e => updateBreak(i, 'note', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removeBreak(i)}
                      aria-label="Remove break"
                      disabled={form.breaks.length === 1}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* ── Photos sub-list ── */}
              <div className={styles.subSection}>
                <div className={styles.subSectionHeader}>
                  <h4>Photos for this Location</h4>
                  <button type="button" className={styles.addRowBtn} onClick={addPhoto}>
                    + Add Photo
                  </button>
                </div>
                {form.photos.map((p, i) => (
                  <div key={i} className={`${styles.subRow} ${styles.photoRow}`}>

                    {/* Image preview + URL + Upload */}
                    <div className={styles.photoSrcCol}>
                      {p.src && (
                        <img
                          src={p.src}
                          alt={p.alt || 'preview'}
                          className={styles.photoPreview}
                        />
                      )}
                      <span className={styles.subRowLabel}>Image URL</span>
                      <input
                        type="text"
                        placeholder="https://... or upload below"
                        value={p.src}
                        onChange={e => updatePhoto(i, 'src', e.target.value)}
                      />
                      <label className={`${styles.uploadBtn} ${uploadingIndex === i ? styles.uploadBtnBusy : ''}`}>
                        {uploadingIndex === i ? 'Uploading…' : '↑ Upload Image'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingIndex !== null}
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoUpload(i, file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <span className={styles.subRowLabel}>Label</span>
                      <input
                        type="text"
                        placeholder="e.g. Weligama Beach"
                        value={p.label}
                        onChange={e => updatePhoto(i, 'label', e.target.value)}
                      />
                    </div>
                    <div>
                      <span className={styles.subRowLabel}>Alt Text</span>
                      <input
                        type="text"
                        placeholder="Describe the image"
                        value={p.alt}
                        onChange={e => updatePhoto(i, 'alt', e.target.value)}
                      />
                    </div>
                    <div>
                      <span className={styles.subRowLabel}>Level</span>
                      <select value={p.level} onChange={e => updatePhoto(i, 'level', e.target.value)}>
                        {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removePhoto(i)}
                      aria-label="Remove photo"
                      disabled={form.photos.length === 1}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.formActions}>
                <button type="submit" disabled={busy}>
                  {busy ? 'Saving...' : form.id ? 'Update Location' : 'Save Location'}
                </button>
                {form.id && (
                  <button type="button" className={styles.secondary} onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}
          </section>

          {/* ── Locations list panel ── */}
          <section className={styles.panel}>
            <h3>Saved Locations</h3>
            {loading && <p>Loading...</p>}
            {!loading && locations.length === 0 && (
              <div className={styles.emptyState}>
                <p>No surf break locations yet.</p>
                <button
                  type="button"
                  className={styles.seedBtn}
                  onClick={seedDefaultData}
                  disabled={busy}
                >
                  {busy ? 'Loading…' : '⬇ Load Default Data (Weligama · Midigama · Ahangama · Mirissa · Madiha)'}
                </button>
              </div>
            )}
            <ul className={styles.locationList}>
              {locations.map(loc => (
                <li key={loc.id} className={styles.locationItem}>
                  <div className={styles.locationItemBody}>
                    <div className={styles.locationItemName}>{loc.name}</div>
                    {loc.tagline && (
                      <div className={styles.locationItemTagline}>{loc.tagline}</div>
                    )}
                    <div className={styles.locationItemMeta}>
                      {loc.breaks?.length || 0} break{loc.breaks?.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                      {loc.photos?.length || 0} photo{loc.photos?.length !== 1 ? 's' : ''} &nbsp;·&nbsp;
                      Order: {loc.sortOrder}
                    </div>
                  </div>
                  <span className={loc.enabled ? styles.badgeEnabled : styles.badgeDisabled}>
                    {loc.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <div className={styles.locationActions}>
                    <button type="button" onClick={() => beginEdit(loc)}>Edit</button>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => removeLocation(loc.id)}
                      disabled={busy}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}
