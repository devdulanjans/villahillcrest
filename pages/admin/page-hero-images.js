import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { normalizePageHeroItems } from '../../lib/page-hero-images-defaults';
import styles from '../../styles/AdminFeatureSections.module.css';

export default function AdminPageHeroImagesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [imageUploadingKey, setImageUploadingKey] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const authRes = await fetch('/api/admin/me', { credentials: 'same-origin' });
        const authData = await authRes.json();

        if (!authRes.ok || !authData.user) {
          router.push('/admin/login');
          return;
        }

        const res = await fetch('/api/admin/page-hero-images', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load page hero images');
          return;
        }

        setItems(normalizePageHeroItems(data.items));
      } catch {
        setError('Failed to load page hero images');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.pageLabel.localeCompare(b.pageLabel)),
    [items]
  );

  const handleChange = (pageKey, value) => {
    setItems((prev) => prev.map((item) => {
      if (item.pageKey !== pageKey) return item;
      return { ...item, imageUrl: value };
    }));
  };

  const handleFocalChange = (pageKey, field, value) => {
    const numeric = Number(value);
    const nextValue = Number.isFinite(numeric) ? Math.max(0, Math.min(100, numeric)) : 50;

    setItems((prev) => prev.map((item) => {
      if (item.pageKey !== pageKey) return item;
      return { ...item, [field]: nextValue };
    }));
  };

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append('image', file);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body,
    });

    const data = await res.json();
    if (!res.ok || !data?.url) {
      throw new Error(data.message || 'Image upload failed');
    }

    return data.url;
  };

  const handleImageUpload = async (pageKey, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageUploadingKey(pageKey);
    setError('');
    setMessage('');

    try {
      const imageUrl = await uploadImage(file);
      handleChange(pageKey, imageUrl);
      setMessage('Hero image uploaded successfully');
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed');
    } finally {
      setImageUploadingKey('');
      event.target.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/page-hero-images', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save page hero images');
        return;
      }

      setItems(normalizePageHeroItems(data.items));
      setMessage('Page hero images saved successfully');
    } catch {
      setError('Failed to save page hero images');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Page Hero Images | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Page Hero Images" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Page Hero Images Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{loading ? 'Loading...' : 'Set Hero Image For Each Page'}</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                {sortedItems.map((item) => (
                  <article className={styles.card} key={item.pageKey}>
                    <div className={styles.cardHead}>
                      <strong>{item.pageLabel}</strong>
                      <span>{item.pageKey}</span>
                    </div>

                    <div className={styles.formRow}>
                      <input
                        type="text"
                        placeholder="Hero image URL"
                        value={item.imageUrl}
                        onChange={(event) => handleChange(item.pageKey, event.target.value)}
                      />

                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>
                          Horizontal focus: {Math.round(Number(item.focalX || 50))}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={Number(item.focalX || 50)}
                          onChange={(event) => handleFocalChange(item.pageKey, 'focalX', event.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>
                          Vertical focus: {Math.round(Number(item.focalY || 50))}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={Number(item.focalY || 50)}
                          onChange={(event) => handleFocalChange(item.pageKey, 'focalY', event.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div className={styles.imageRow}>
                        <label className={styles.uploadBtn}>
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageUpload(item.pageKey, event)}
                            disabled={imageUploadingKey === item.pageKey}
                          />
                        </label>
                        {imageUploadingKey === item.pageKey && <span className={styles.uploadLoader}>Uploading...</span>}
                      </div>

                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={`${item.pageLabel} hero preview`}
                          style={{
                            width: '100%',
                            maxHeight: 140,
                            objectFit: 'cover',
                            objectPosition: `${Number(item.focalX || 50)}% ${Number(item.focalY || 50)}%`,
                            borderRadius: 8,
                          }}
                        />
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.actions}>
                <button type="submit" disabled={busy || loading || Boolean(imageUploadingKey)}>
                  {imageUploadingKey ? 'Uploading image...' : busy ? 'Saving...' : 'Save Hero Images'}
                </button>
              </div>
            </form>
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.success}>{message}</p>}
        </main>
      </div>
    </>
  );
}
