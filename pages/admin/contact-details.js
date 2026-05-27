import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminContactDetails.module.css';

const emptyForm = {
  addressText: '',
  phoneNumbersText: '',
  email: '',
  mapIframeHtml: '',
  whatsappNumber: '',
};

function normalizePhones(phoneNumbers) {
  if (!Array.isArray(phoneNumbers)) {
    return '';
  }

  return phoneNumbers.map((item) => String(item || '').trim()).filter(Boolean).join('\n');
}

function extractMapSrc(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw;
  }

  const srcMatch = raw.match(/src=["']([^"']+)["']/i);
  return srcMatch ? srcMatch[1] : '';
}

export default function AdminContactDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(emptyForm);

  const mapPreviewSrc = useMemo(() => extractMapSrc(form.mapIframeHtml), [form.mapIframeHtml]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const authRes = await fetch('/api/admin/me');
        const authData = await authRes.json();

        if (!authRes.ok || !authData.user) {
          router.push('/admin/login');
          return;
        }

        const res = await fetch('/api/admin/contact-details');
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load contact details');
          return;
        }

        const item = data.item;
        if (!item) {
          setForm(emptyForm);
          return;
        }

        setForm({
          addressText: item.addressText || '',
          phoneNumbersText: normalizePhones(item.phoneNumbers),
          email: item.email || '',
          mapIframeHtml: item.mapIframeHtml || '',
          whatsappNumber: item.whatsappNumber || '',
        });
      } catch {
        setError('Failed to load contact details');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    const phoneNumbers = form.phoneNumbersText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/admin/contact-details', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addressText: form.addressText,
          phoneNumbers,
          email: form.email,
          mapIframeHtml: form.mapIframeHtml,
          whatsappNumber: form.whatsappNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save contact details');
        return;
      }

      setMessage('Contact details saved successfully');
    } catch {
      setError('Failed to save contact details');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Contact Details | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Contact Details" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Contact Details Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{loading ? 'Loading...' : 'Update Contact Details'}</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <textarea
                name="addressText"
                placeholder="Address (multi-line)"
                value={form.addressText}
                onChange={handleChange}
                required
              />

              <textarea
                name="phoneNumbersText"
                placeholder="Contact numbers (one per line)"
                value={form.phoneNumbersText}
                onChange={handleChange}
                required
              />
              <p className={styles.hint}>Enter one contact number per line.</p>

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="mapIframeHtml"
                placeholder="Google Map iframe HTML or embed URL"
                value={form.mapIframeHtml}
                onChange={handleChange}
                required
              />
              <p className={styles.hint}>Paste the full iframe code from Google Maps, or just the embed URL.</p>

              <input
                type="text"
                name="whatsappNumber"
                placeholder="WhatsApp number (with country code)"
                value={form.whatsappNumber}
                onChange={handleChange}
                required
              />

              <div className={styles.formActions}>
                <button type="submit" disabled={busy || loading}>{busy ? 'Saving...' : 'Save Contact Details'}</button>
              </div>
            </form>

            {mapPreviewSrc && (
              <div className={styles.preview}>
                <iframe
                  title="Google Map Preview"
                  src={mapPreviewSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            )}
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
        </main>
      </div>
    </>
  );
}
