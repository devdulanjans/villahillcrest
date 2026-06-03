import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { defaultPrivacyContent } from '../../lib/privacy-defaults';
import styles from '../../styles/AdminAbout.module.css';

const emptyForm = {
  sectionTitle: '',
  bodyHtml: '',
};

export default function AdminPrivacyPolicyPage() {
  const router = useRouter();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(emptyForm);

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

        const res = await fetch('/api/admin/privacy-policy');
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to load privacy policy content');
          return;
        }

        const item = data.item || defaultPrivacyContent;
        const nextForm = {
          sectionTitle: item.sectionTitle || defaultPrivacyContent.sectionTitle,
          bodyHtml: item.bodyHtml || defaultPrivacyContent.bodyHtml,
        };

        setForm(nextForm);

        if (editorRef.current) {
          editorRef.current.innerHTML = nextForm.bodyHtml;
        }
      } catch {
        setError('Failed to load privacy policy content');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');

    const bodyHtml = editorRef.current ? editorRef.current.innerHTML : form.bodyHtml;

    try {
      const res = await fetch('/api/admin/privacy-policy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionTitle: form.sectionTitle,
          bodyHtml,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to save privacy policy content');
        return;
      }

      setMessage('Privacy Policy saved successfully');
    } catch {
      setError('Failed to save privacy policy content');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Privacy Policy | Villa Hillcrest</title>
      </Head>

      <div className={styles.page}>
        <AdminSidebar activeLabel="Privacy Policy" />

        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Privacy Policy Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{loading ? 'Loading...' : 'Update Privacy Policy'}</h3>

            <form className={styles.form} onSubmit={handleSubmit}>
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
                <button type="button" onClick={() => applyFormat('insertOrderedList')}>Numbered</button>
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
                placeholder="HTML source (manual edit)"
                rows={10}
                value={form.bodyHtml}
                onChange={handleChange}
                required
              />
              <p className={styles.hint}>Use the editor above or paste full HTML in this text area.</p>

              <div className={styles.formActions}>
                <button type="submit" disabled={busy || loading}>{busy ? 'Saving...' : 'Save Privacy Policy'}</button>
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
