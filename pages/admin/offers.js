import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminOffers.module.css';

export default function AdminOffersPage() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ id: null, title: '', imageUrl: '', descriptionHtml: '' });

  const loadOffers = async () => {
    setLoading(true);
    setError('');

    try {
      const authRes = await fetch('/api/admin/me');
      const authData = await authRes.json();
      if (!authRes.ok || !authData.user) {
        router.push('/admin/login');
        return;
      }

      const res = await fetch('/api/admin/offers');
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to load offers');
        return;
      }

      setOffers(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFormat = (command) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false);
    setForm((prev) => ({ ...prev, descriptionHtml: editorRef.current.innerHTML }));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('/api/admin/offers/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Image upload failed');
    }

    return data.imageUrl;
  };

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBusy(true);
    setError('');
    setMessage('');

    try {
      const imageUrl = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl }));
      setMessage('Image uploaded successfully');
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed');
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  const resetForm = () => {
    setForm({ id: null, title: '', imageUrl: '', descriptionHtml: '' });
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
  };

  const beginEdit = (offer) => {
    setForm({
      id: offer.id,
      title: offer.title || '',
      imageUrl: offer.imageUrl || '',
      descriptionHtml: offer.descriptionHtml || '',
    });

    if (editorRef.current) {
      editorRef.current.innerHTML = offer.descriptionHtml || '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const descriptionHtml = editorRef.current ? editorRef.current.innerHTML : form.descriptionHtml;
    if (!form.title.trim()) {
      setError('Offer title is required');
      return;
    }

    if (!form.imageUrl.trim()) {
      setError('Offer image is required');
      return;
    }

    if (!descriptionHtml || !descriptionHtml.trim()) {
      setError('Offer description is required');
      return;
    }

    setBusy(true);

    try {
      const endpoint = form.id ? `/api/admin/offers/${form.id}` : '/api/admin/offers';
      const method = form.id ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          imageUrl: form.imageUrl,
          descriptionHtml,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save offer');
        return;
      }

      setMessage(form.id ? 'Offer updated successfully' : 'Offer created successfully');
      resetForm();
      await loadOffers();
    } catch {
      setError('Failed to save offer');
    } finally {
      setBusy(false);
    }
  };

  const removeOffer = async (id) => {
    setBusy(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to delete offer');
        return;
      }

      setMessage('Offer deleted successfully');
      if (form.id === id) {
        resetForm();
      }
      await loadOffers();
    } catch {
      setError('Failed to delete offer');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Offers | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Offers" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Offers Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{form.id ? 'Edit Offer' : 'Add Offer'}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Offer title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />

              <div className={styles.imageRow}>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  required
                />
                <label className={styles.uploadBtn}>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageFile} />
                </label>
              </div>

              <div className={styles.toolbar}>
                <button type="button" onClick={() => applyFormat('bold')}><b>B</b></button>
                <button type="button" onClick={() => applyFormat('italic')}><i>I</i></button>
                <button type="button" onClick={() => applyFormat('underline')}><u>U</u></button>
                <button type="button" onClick={() => applyFormat('insertUnorderedList')}>• List</button>
              </div>

              <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                suppressContentEditableWarning
                onInput={() => setForm((prev) => ({
                  ...prev,
                  descriptionHtml: editorRef.current ? editorRef.current.innerHTML : '',
                }))}
              />

              <div className={styles.formActions}>
                <button type="submit" disabled={busy}>{busy ? 'Saving...' : form.id ? 'Update Offer' : 'Save Offer'}</button>
                {form.id && (
                  <button type="button" className={styles.secondary} onClick={resetForm}>Cancel Edit</button>
                )}
              </div>
            </form>
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}

          <section className={styles.panel}>
            <h3>Saved Offers</h3>
            {loading ? (
              <p>Loading offers...</p>
            ) : offers.length === 0 ? (
              <p>No offers available yet.</p>
            ) : (
              <div className={styles.offerGrid}>
                {offers.map((offer) => (
                  <article key={offer.id} className={styles.offerCard}>
                    <img src={offer.imageUrl} alt={offer.title} />
                    <h4>{offer.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: offer.descriptionHtml }} />
                    <div className={styles.offerActions}>
                      <button type="button" onClick={() => beginEdit(offer)}>Edit</button>
                      <button type="button" className={styles.deleteBtn} onClick={() => removeOffer(offer.id)}>
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
