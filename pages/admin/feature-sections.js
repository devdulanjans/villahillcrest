import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { normalizeFeatureSections } from '../../lib/feature-sections-defaults';
import styles from '../../styles/AdminFeatureSections.module.css';

function createEmptyItem() {
  return {
    title: '',
    text: '',
    image: '',
    alt: '',
    url: '',
    reverse: false,
    cta: '',
  };
}

export default function AdminFeatureSectionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [imageUploadingIndex, setImageUploadingIndex] = useState(-1);
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

        const res = await fetch('/api/admin/feature-sections', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load feature sections');
          return;
        }

        setItems(normalizeFeatureSections(data.items));
      } catch {
        setError('Failed to load feature sections');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleChange = (index, field, value) => {
    setItems((prev) => prev.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      return { ...item, [field]: value };
    }));
  };

  const handleRemove = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleAdd = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
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

  const handleImageUpload = async (index, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageUploadingIndex(index);
    setError('');
    setMessage('');

    try {
      const imageUrl = await uploadImage(file);
      handleChange(index, 'image', imageUrl);
      setMessage(`Item ${index + 1} image uploaded successfully`);
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed');
    } finally {
      setImageUploadingIndex(-1);
      event.target.value = '';
    }
  };

  const validate = () => {
    if (!items.length) {
      return 'At least one feature section is required';
    }

    const invalidIndex = items.findIndex((item) => {
      return !item.title.trim()
        || !item.text.trim()
        || !item.image.trim()
        || !item.alt.trim()
        || !item.url.trim()
        || !item.cta.trim();
    });

    if (invalidIndex >= 0) {
      return `Please fill all fields for item ${invalidIndex + 1}`;
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/feature-sections', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: normalizeFeatureSections(items) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save feature sections');
        return;
      }

      setItems(normalizeFeatureSections(data.items));
      setMessage('Feature sections saved successfully');
    } catch {
      setError('Failed to save feature sections');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Feature Sections | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="FeatureSections" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Feature Sections Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{loading ? 'Loading...' : 'Edit Home Feature Sections'}</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                {items.map((item, index) => (
                  <article className={styles.card} key={`feature-item-${index}`}>
                    <div className={styles.cardHead}>
                      <strong>Item {index + 1}</strong>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemove(index)}
                        disabled={items.length <= 1}
                      >
                        Remove
                      </button>
                    </div>

                    <div className={styles.formRow}>
                      <input
                        type="text"
                        placeholder="Title"
                        value={item.title}
                        onChange={(event) => handleChange(index, 'title', event.target.value)}
                        required
                      />

                      <textarea
                        placeholder="Description text"
                        value={item.text}
                        onChange={(event) => handleChange(index, 'text', event.target.value)}
                        required
                      />

                      <div className={styles.twoCols}>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={item.image}
                          onChange={(event) => handleChange(index, 'image', event.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Image Alt"
                          value={item.alt}
                          onChange={(event) => handleChange(index, 'alt', event.target.value)}
                          required
                        />
                      </div>

                      <div className={styles.imageRow}>
                        <label className={styles.uploadBtn}>
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageUpload(index, event)}
                            disabled={imageUploadingIndex === index}
                          />
                        </label>
                        {imageUploadingIndex === index && <span className={styles.uploadLoader}>Uploading...</span>}
                      </div>

                      <div className={styles.twoCols}>
                        <input
                          type="text"
                          placeholder="Link URL"
                          value={item.url}
                          onChange={(event) => handleChange(index, 'url', event.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Button label"
                          value={item.cta}
                          onChange={(event) => handleChange(index, 'cta', event.target.value)}
                          required
                        />
                      </div>

                      <label className={styles.checkboxRow}>
                        <input
                          type="checkbox"
                          checked={Boolean(item.reverse)}
                          onChange={(event) => handleChange(index, 'reverse', event.target.checked)}
                        />
                        Reverse layout
                      </label>
                    </div>

                    {item.image && <img className={styles.previewImage} src={item.image} alt={item.alt || item.title || `Item ${index + 1}`} />}
                  </article>
                ))}
              </div>

              <div className={styles.cardActions}>
                <button type="button" className={styles.secondaryBtn} onClick={handleAdd}>Add New Item</button>
              </div>

              <div className={styles.formActions}>
                <button type="submit" disabled={busy || loading || imageUploadingIndex >= 0}>{busy ? 'Saving...' : 'Save Feature Sections'}</button>
              </div>
            </form>
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
        </main>
      </div>
    </>
  );
}
