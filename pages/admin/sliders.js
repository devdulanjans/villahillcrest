import Head from 'next/head';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminOffers.module.css';

export default function AdminSlidersPage() {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState({ imageUrl: '', wording: '', sortOrder: 0, enabled: 1 });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/sliders')
      .then(r => r.json())
      .then(data => setSliders(data.sliders || []));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/admin/sliders/${editingId}` : '/api/admin/sliders';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save');
      const data = editingId ? await res.json() : await res.json();
      setForm({ imageUrl: '', wording: '', sortOrder: 0, enabled: 1 });
      setEditingId(null);
      // Refresh list
      const slidersRes = await fetch('/api/admin/sliders');
      setSliders((await slidersRes.json()).sliders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = slider => {
    setForm({
      imageUrl: slider.imageUrl,
      wording: slider.wording,
      sortOrder: slider.sortOrder,
      enabled: slider.enabled,
    });
    setEditingId(slider.id);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this slider?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setSliders(sliders.filter(s => s.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({ imageUrl: '', wording: '', sortOrder: 0, enabled: 1 });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler for sliders (uses /api/admin/upload)
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setIsImageUploading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.message || 'Upload failed');
      setForm(f => ({ ...f, imageUrl: data.url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Sliders | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Sliders" />
        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Root Page Sliders</h2>
          </header>
          <section className={styles.panel}>
            <h3>{editingId ? 'Edit Slider' : 'Add Slider'}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Wording"
                name="wording"
                value={form.wording}
                onChange={handleChange}
                required
              />
              <div className={styles.imageRow}>
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  required
                />
                <label className={styles.uploadBtn}>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isImageUploading} />
                </label>
                {isImageUploading && <span className={styles.uploadLoader}>Uploading image...</span>}
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="slider preview"
                    style={{
                      width: 120,
                      height: 70,
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: 6,
                      marginLeft: 8,
                      border: '1px solid #d2d8ea',
                    }}
                  />
                )}
              </div>
              <input
                type="number"
                placeholder="Sort Order"
                name="sortOrder"
                value={form.sortOrder}
                onChange={handleChange}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input name="enabled" type="checkbox" checked={!!form.enabled} onChange={handleChange} /> Enabled
              </label>
              <div className={styles.formActions}>
                <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Create'} Slider</button>
                {editingId && <button type="button" className={styles.secondary} onClick={() => { setEditingId(null); setForm({ imageUrl: '', wording: '', sortOrder: 0, enabled: 1 }); }}>Cancel</button>}
              </div>
              {error && <div className={styles.error}>{error}</div>}
            </form>
          </section>
          <section className={styles.panel}>
            <h3>Saved Sliders</h3>
            {sliders.length === 0 ? (
              <p>No sliders available yet.</p>
            ) : (
              <div className={styles.offerGrid}>
                {sliders.map(slider => (
                  <article key={slider.id} className={styles.offerCard}>
                    {slider.imageUrl && (
                      <img
                        src={slider.imageUrl}
                        alt={slider.wording || 'slider'}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    )}
                    <h4>{slider.wording}</h4>
                    <div>Sort: {slider.sortOrder}</div>
                    <div>Enabled: {slider.enabled ? 'Yes' : 'No'}</div>
                    <div className={styles.offerActions}>
                      <button type="button" onClick={() => handleEdit(slider)}>Edit</button>
                      <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(slider.id)}>Delete</button>
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
