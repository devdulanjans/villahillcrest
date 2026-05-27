import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminSocialLinks.module.css';

const iconOptions = [
  'facebook',
  'instagram',
  'tiktok',
  'youtube',
  'booking',
  'airbnb',
  'agoda',
  'tripadvisor',
  'viator',
];

export default function AdminSocialLinksPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    id: null,
    label: '',
    url: '',
    iconKey: 'facebook',
    isEnabled: true,
    sortOrder: 0,
  });

  const loadItems = async () => {
    setLoading(true);
    setError('');

    try {
      const authRes = await fetch('/api/admin/me');
      const authData = await authRes.json();
      if (!authRes.ok || !authData.user) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/social-links');
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to load social links');
        return;
      }

      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Failed to load social links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm({ id: null, label: '', url: '', iconKey: 'facebook', isEnabled: true, sortOrder: 0 });
  };

  const beginEdit = (item) => {
    setForm({
      id: item.id,
      label: item.label || '',
      url: item.url || '',
      iconKey: item.iconKey || 'facebook',
      isEnabled: Boolean(item.isEnabled),
      sortOrder: Number(item.sortOrder || 0),
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const endpoint = form.id ? `/api/admin/social-links/${form.id}` : '/api/admin/social-links';
      const method = form.id ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: form.label,
          url: form.url,
          iconKey: form.iconKey,
          isEnabled: form.isEnabled,
          sortOrder: Number(form.sortOrder || 0),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save social link');
        return;
      }

      setMessage(form.id ? 'Social link updated successfully' : 'Social link created successfully');
      resetForm();
      await loadItems();
    } catch {
      setError('Failed to save social link');
    } finally {
      setBusy(false);
    }
  };

  const removeItem = async (id) => {
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/social-links/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to delete social link');
        return;
      }

      setMessage('Social link deleted successfully');
      if (form.id === id) {
        resetForm();
      }
      await loadItems();
    } catch {
      setError('Failed to delete social link');
    } finally {
      setBusy(false);
    }
  };

  const toggleItem = async (item) => {
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/social-links/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: item.label,
          url: item.url,
          iconKey: item.iconKey,
          isEnabled: !item.isEnabled,
          sortOrder: Number(item.sortOrder || 0),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update status');
        return;
      }

      setMessage('Social link status updated');
      await loadItems();
    } catch {
      setError('Failed to update status');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Social Links | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Social Media" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Social Links Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{form.id ? 'Edit Social Link' : 'Add Social Link'}</h3>
            <form className={styles.form} onSubmit={submitForm}>
              <input
                type="text"
                placeholder="Label (e.g. Facebook)"
                value={form.label}
                onChange={(e) => setForm((prev) => ({ ...prev, label: e.target.value }))}
                required
              />
              <input
                type="url"
                placeholder="https://..."
                value={form.url}
                onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                required
              />
              <select
                value={form.iconKey}
                onChange={(e) => setForm((prev) => ({ ...prev, iconKey: e.target.value }))}
              >
                {iconOptions.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                placeholder="Sort order"
                value={form.sortOrder}
                onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
              />
              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={form.isEnabled}
                  onChange={(e) => setForm((prev) => ({ ...prev, isEnabled: e.target.checked }))}
                />
                Enabled
              </label>
              <div className={styles.formActions}>
                <button type="submit" disabled={busy}>{busy ? 'Saving...' : form.id ? 'Update Link' : 'Add Link'}</button>
                {form.id && (
                  <button type="button" className={styles.secondary} onClick={resetForm}>Cancel Edit</button>
                )}
              </div>
            </form>
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}

          <section className={styles.panel}>
            <h3>Saved Social Links</h3>
            {loading ? (
              <p>Loading social links...</p>
            ) : items.length === 0 ? (
              <p>No social links found.</p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>URL</th>
                      <th>Icon</th>
                      <th>Status</th>
                      <th>Order</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.label}</td>
                        <td className={styles.urlCell}>{item.url}</td>
                        <td>{item.iconKey}</td>
                        <td>
                          <button
                            type="button"
                            className={item.isEnabled ? styles.enabled : styles.disabled}
                            onClick={() => toggleItem(item)}
                            disabled={busy}
                          >
                            {item.isEnabled ? 'Enabled' : 'Disabled'}
                          </button>
                        </td>
                        <td>{item.sortOrder}</td>
                        <td className={styles.actions}>
                          <button type="button" onClick={() => beginEdit(item)}>Edit</button>
                          <button type="button" className={styles.deleteBtn} onClick={() => removeItem(item.id)}>
                            <FaTrash /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
