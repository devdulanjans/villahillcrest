import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminBlogs.module.css';

const initialForm = {
  id: null,
  title: '',
  slug: '',
  excerpt: '',
  contentHtml: '',
  imageUrl: '',
  imageUrls: [],
  keywords: '',
  published: false,
  publishedAt: '',
};

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const stripHtml = (html) =>
  html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const generateExcerpt = (html, maxLength = 200) => {
  const text = stripHtml(html);
  if (!text) return '';
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + '...';
};

const STOP_WORDS = new Set([
  'the','a','an','is','in','on','at','of','and','or','but','to','for','with',
  'by','from','as','this','that','it','be','are','was','were','have','has',
  'had','will','would','can','could','do','does','not','no','so','if','we',
  'i','you','he','she','they','our','your','his','her','their','its','my',
  'all','also','more','when','who','which','been','than','then','into','about',
]);

const generateKeywords = (html, max = 10) => {
  const text = stripHtml(html).toLowerCase();
  const words = text.match(/\b[a-z]{3,}\b/g) || [];
  const freq = {};
  for (const word of words) {
    if (!STOP_WORDS.has(word)) {
      freq[word] = (freq[word] || 0) + 1;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word)
    .join(', ');
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const editorRef = useRef(null);
  const slugManuallyEdited = useRef(false);
  const excerptManuallyEdited = useRef(false);
  const keywordsManuallyEdited = useRef(false);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(initialForm);

  const loadBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const authRes = await fetch('/api/admin/me', { credentials: 'same-origin' });
      const authData = await authRes.json();
      if (!authRes.ok || !authData.user) {
        router.push('/admin/login');
        return;
      }
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to load blogs');
        return;
      }
      setBlogs(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.contentHtml || '';
    }
  }, [form.id]);

  const resetForm = () => {
    slugManuallyEdited.current = false;
    excerptManuallyEdited.current = false;
    keywordsManuallyEdited.current = false;
    setForm(initialForm);
  };

  const uploadImage = async (file) => {
    const body = new FormData();
    body.append('image', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Image upload failed');
    return data.url;
  };

  const handleImageFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsImageUploading(true);
    setError('');
    setMessage('');
    try {
      const imageUrl = await uploadImage(file);
      setForm((prev) => ({ ...prev, imageUrl }));
      setMessage('Blog image uploaded successfully');
    } catch (uploadError) {
      setError(uploadError.message || 'Image upload failed');
    } finally {
      setIsImageUploading(false);
      event.target.value = '';
    }
  };

  const handleMultipleImageFiles = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setIsImageUploading(true);
    setError('');
    setMessage('');
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const imageUrl = await uploadImage(file);
        uploadedUrls.push(imageUrl);
      }
      setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...uploadedUrls] }));
      setMessage(`${uploadedUrls.length} detail image(s) uploaded successfully`);
    } catch (uploadError) {
      setError(uploadError.message || 'Detail image upload failed');
    } finally {
      setIsImageUploading(false);
      event.target.value = '';
    }
  };

  const removeImageUrl = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, index) => index !== indexToRemove),
    }));
  };

  const beginEdit = (blog) => {
    // Preserve existing saved values — don't auto-overwrite on edit
    slugManuallyEdited.current = true;
    excerptManuallyEdited.current = true;
    keywordsManuallyEdited.current = true;
    setForm({
      id: blog.id,
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      contentHtml: blog.contentHtml || '',
      imageUrl: blog.imageUrl || '',
      imageUrls: Array.isArray(blog.imageUrls) ? blog.imageUrls : [],
      keywords: blog.keywords || '',
      published: Boolean(blog.published),
      publishedAt: blog.publishedAt ? blog.publishedAt.slice(0, 16) : '',
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited.current ? prev.slug : slugify(title),
    }));
  };

  const handleEditorInput = () => {
    const html = editorRef.current ? editorRef.current.innerHTML : '';
    setForm((prev) => ({
      ...prev,
      contentHtml: html,
      excerpt: excerptManuallyEdited.current ? prev.excerpt : generateExcerpt(html),
      keywords: keywordsManuallyEdited.current ? prev.keywords : generateKeywords(html),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const contentHtml = editorRef.current ? editorRef.current.innerHTML : form.contentHtml;
    if (!form.title.trim()) {
      setError('Blog title is required');
      return;
    }
    if (!form.excerpt.trim()) {
      setError('Blog excerpt is required');
      return;
    }
    if (!contentHtml.trim()) {
      setError('Blog content is required');
      return;
    }
    if (!form.imageUrl.trim()) {
      setError('Blog image is required');
      return;
    }
    setBusy(true);
    try {
      const endpoint = form.id ? `/api/admin/blogs/${form.id}` : '/api/admin/blogs';
      const method = form.id ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          contentHtml,
          imageUrl: form.imageUrl,
          imageUrls: form.imageUrls,
          keywords: form.keywords,
          published: form.published,
          publishedAt: form.published ? form.publishedAt : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save blog');
        return;
      }
      setMessage(form.id ? 'Blog updated successfully' : 'Blog created successfully');
      resetForm();
      await loadBlogs();
    } catch {
      setError('Failed to save blog');
    } finally {
      setBusy(false);
    }
  };

  const removeBlog = async (id) => {
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to delete blog');
        return;
      }
      setMessage('Blog deleted successfully');
      if (form.id === id) resetForm();
      await loadBlogs();
    } catch {
      setError('Failed to delete blog');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Blogs | Villa Hillcrest</title>
      </Head>
      <div className={styles.page}>
        <AdminSidebar activeLabel="Blogs" />
        <main className={styles.main}>
          <header className={styles.topBar}>
            <h2>Blog Manager</h2>
          </header>

          <section className={styles.panel}>
            <h3>{form.id ? 'Edit Blog' : 'Add Blog'}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>

              {/* 1. Blog Title */}
              <label className={styles.fieldLabel}>Blog Title</label>
              <input
                type="text"
                placeholder="Enter blog title"
                value={form.title}
                onChange={handleTitleChange}
                required
              />

              {/* Auto-generated slug */}
              <label className={styles.fieldLabel}>
                Blog Slug <span className={styles.fieldHint}>(auto-generated from title, editable)</span>
              </label>
              <input
                type="text"
                placeholder="blog-url-slug"
                value={form.slug}
                onChange={(e) => {
                  slugManuallyEdited.current = true;
                  setForm((prev) => ({ ...prev, slug: e.target.value }));
                }}
              />

              {/* 2. Description / Rich Text Editor */}
              <label className={styles.fieldLabel}>Description</label>
              <div className={styles.richTextToolbar}>
                <button type="button" onClick={() => document.execCommand('bold', false, '')}><b>B</b></button>
                <button type="button" onClick={() => document.execCommand('italic', false, '')}><i>I</i></button>
                <button type="button" onClick={() => document.execCommand('underline', false, '')}><u>U</u></button>
                <button type="button" onClick={() => document.execCommand('insertUnorderedList', false, '')}>• List</button>
              </div>
              <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
              />

              {/* 3. Images */}
              <label className={styles.fieldLabel}>Featured Image</label>
              <input
                type="text"
                placeholder="Featured image URL"
                value={form.imageUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                required
              />
              <label className={styles.uploadBtn}>
                Upload Featured Image
                <input type="file" accept="image/*" onChange={handleImageFile} disabled={isImageUploading} />
              </label>

              <label className={styles.fieldLabel}>Detail Images</label>
              <label className={styles.uploadBtn}>
                Upload Detail Images
                <input type="file" accept="image/*" multiple onChange={handleMultipleImageFiles} disabled={isImageUploading} />
              </label>
              {form.imageUrls.length > 0 && (
                <div className={styles.detailImageList}>
                  {form.imageUrls.map((url, index) => (
                    <div key={`${url}-${index}`} className={styles.detailImageItem}>
                      <img src={url} alt={`Detail image ${index + 1}`} />
                      <button type="button" onClick={() => removeImageUrl(index)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
              {isImageUploading && <p className={styles.uploadLoader}>Uploading image...</p>}

              {/* 4. Blog Excerpt (auto from content) */}
              <label className={styles.fieldLabel}>
                Blog Excerpt <span className={styles.fieldHint}>(auto-generated from description, editable)</span>
              </label>
              <textarea
                placeholder="Short summary of the blog post"
                rows={3}
                value={form.excerpt}
                onChange={(e) => {
                  excerptManuallyEdited.current = true;
                  setForm((prev) => ({ ...prev, excerpt: e.target.value }));
                }}
                required
              />

              {/* 5. Blog Keywords (auto from content) */}
              <label className={styles.fieldLabel}>
                Blog Keywords <span className={styles.fieldHint}>(auto-generated from description, editable)</span>
              </label>
              <textarea
                placeholder="keyword1, keyword2, keyword3"
                rows={2}
                value={form.keywords}
                onChange={(e) => {
                  keywordsManuallyEdited.current = true;
                  setForm((prev) => ({ ...prev, keywords: e.target.value }));
                }}
              />

              {/* Publish settings */}
              <div className={styles.switchRow}>
                <label>
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                  />
                  Publish now
                </label>
                {form.published && (
                  <input
                    type="datetime-local"
                    value={form.publishedAt}
                    onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    aria-label="Published at"
                  />
                )}
              </div>

              <div className={styles.formActions}>
                <button type="submit" disabled={busy || isImageUploading}>
                  {busy ? 'Saving...' : form.id ? 'Update Blog' : 'Save Blog'}
                </button>
                {form.id && (
                  <button type="button" className={styles.secondary} onClick={resetForm}>Cancel Edit</button>
                )}
              </div>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.message}>{message}</p>}
          </section>

          <section className={styles.panel}>
            <h3>Existing Blogs</h3>
            {loading && <p>Loading blogs...</p>}
            {!loading && blogs.length === 0 && <p>No blogs yet.</p>}
            <ul className={styles.blogList}>
              {blogs.map((blog) => (
                <li key={blog.id} className={styles.blogListItem}>
                  <span className={styles.blogListTitle}>{blog.title}</span>
                  <span className={blog.published ? styles.badgePublished : styles.badgeDraft}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                  <div className={styles.blogListActions}>
                    <button type="button" onClick={() => beginEdit(blog)}>Edit</button>
                    <button type="button" className={styles.deleteBtn} onClick={() => removeBlog(blog.id)}>Delete</button>
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
