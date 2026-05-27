import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { defaultAboutContent } from '../../lib/about-defaults';
import styles from '../../styles/AdminAbout.module.css';

const emptyForm = {
  heroTitle: '',
  heroSubtitle: '',
  sectionTitle: '',
  bodyHtml: '',
  imageUrl: '',
};

export default function AdminAboutPage() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(emptyForm);

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

        const res = await fetch('/api/admin/about');
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load about content');
          return;
        }

        const item = data.item || defaultAboutContent;
        const nextForm = {
          heroTitle: item.heroTitle || defaultAboutContent.heroTitle,
          heroSubtitle: item.heroSubtitle || defaultAboutContent.heroSubtitle,
          sectionTitle: item.sectionTitle || defaultAboutContent.sectionTitle,
          bodyHtml: item.bodyHtml || defaultAboutContent.bodyHtml,
          imageUrl: item.imageUrl || defaultAboutContent.imageUrl,
        };
        setForm(nextForm);

        if (editorRef.current) {
          editorRef.current.innerHTML = nextForm.bodyHtml;
        }
      } catch {
        setError('Failed to load about content');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== form.bodyHtml) {
      editorRef.current.innerHTML = form.bodyHtml;
    }
  }, [form.bodyHtml]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const applyFormat = (command) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false);
    setForm((prev) => ({ ...prev, bodyHtml: editorRef.current.innerHTML }));
  };

  const handleEditorInput = () => {
    setForm((prev) => ({
      ...prev,
      bodyHtml: editorRef.current ? editorRef.current.innerHTML : prev.bodyHtml,
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsImageUploading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.message || 'Image upload failed');
        return;
      }

      setForm((prev) => ({ ...prev, imageUrl: data.url }));
      setMessage('Image uploaded successfully');
    } catch {
      setError('Image upload failed');
    } finally {
      setIsImageUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    const bodyHtml = editorRef.current ? editorRef.current.innerHTML : form.bodyHtml;

    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          bodyHtml,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save about content');
        return;
      }

      setMessage('About content saved successfully');
    } catch {
      setError('Failed to save about content');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin About | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="About" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>About Content Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{loading ? 'Loading...' : 'Update About Page Content'}</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name="heroTitle"
                placeholder="Hero title"
                value={form.heroTitle}
                onChange={handleChange}
                required
              />

              <textarea
                name="heroSubtitle"
                placeholder="Hero subtitle"
                rows={3}
                value={form.heroSubtitle}
                onChange={handleChange}
                required
              />

              <input
                name="sectionTitle"
                placeholder="Section title"
                value={form.sectionTitle}
                onChange={handleChange}
                required
              />

              <div className={styles.toolbar}>
                <button type="button" onClick={() => applyFormat('bold')}><b>B</b></button>
                <button type="button" onClick={() => applyFormat('italic')}><i>I</i></button>
                <button type="button" onClick={() => applyFormat('underline')}><u>U</u></button>
                <button type="button" onClick={() => applyFormat('insertUnorderedList')}>List</button>
              </div>

              <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
              />

              <textarea
                name="bodyHtml"
                placeholder="HTML source (optional manual edit)"
                rows={6}
                value={form.bodyHtml}
                onChange={handleChange}
                required
              />
              <p className={styles.hint}>Description is saved with HTML tags.</p>

              <div className={styles.imageRow}>
                <input
                  name="imageUrl"
                  placeholder="Hero image URL"
                  value={form.imageUrl}
                  onChange={handleChange}
                  required
                />

                <label className={styles.uploadBtn}>
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isImageUploading} />
                </label>
              </div>

              {isImageUploading && <p className={styles.uploadLoader}>Uploading image...</p>}

              <div className={styles.formActions}>
                <button type="submit" disabled={busy || loading}>{busy ? 'Saving...' : 'Save About Content'}</button>
              </div>
            </form>

            {form.imageUrl && (
              <article className={styles.previewCard}>
                <img src={form.imageUrl} alt="About preview" />
                <div className={styles.previewBody}>
                  <h4>{form.heroTitle || 'Preview title'}</h4>
                  <p>{form.heroSubtitle || 'Preview subtitle'}</p>
                </div>
              </article>
            )}
          </section>

          {error && <p className={styles.error}>{error}</p>}
          {message && <p className={styles.message}>{message}</p>}
        </main>
      </div>
    </>
  );
}
