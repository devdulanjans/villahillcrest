import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { listPublishedBlogs, getPageHeroImage } from '../lib/mysql';
import { normalizePageHeroItems } from '../lib/page-hero-images-defaults';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function getServerSideProps(context) {
  const page = Number(context.query.page || 1);
  const q = String(context.query.q || '').trim();

  const [result, heroRecord] = await Promise.all([
    listPublishedBlogs({ search: q, page, pageSize: 6 }),
    getPageHeroImage('/blogs'),
  ]);

  const normalized = normalizePageHeroItems(heroRecord ? [heroRecord] : []);
  const hero = normalized.find((e) => e.pageKey === '/blogs') || null;

  const items = (result.items || []).map(item => ({
    ...item,
    publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString() : null,
    createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
    updatedAt: item.updatedAt ? new Date(item.updatedAt).toISOString() : null,
  }));

  return {
    props: {
      hero,
      initialData: {
        items,
        page: result.page || 1,
        pageSize: result.pageSize || 6,
        totalItems: result.totalItems || 0,
        totalPages: result.totalPages || 0,
        search: q,
      },
    },
  };
}

export default function BlogsPage({ initialData, hero }) {
  const router = useRouter();
  const [items, setItems] = useState(initialData.items);
  const [search, setSearch] = useState(initialData.search);
  const [page, setPage] = useState(initialData.page);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const pageSize = initialData.pageSize;

  const loadBlogs = async (query, pageNumber) => {
    setLoading(true);
    setMessage('');

    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      params.set('page', String(pageNumber));
      params.set('pageSize', String(pageSize));

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Could not load blogs');
        return;
      }

      setItems(Array.isArray(data.items) ? data.items : []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 0);
      if (data.items.length === 0) {
        setMessage('No blogs match your search.');
      }
    } catch (err) {
      setMessage('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems(initialData.items);
    setPage(initialData.page);
    setTotalPages(initialData.totalPages);
    setSearch(initialData.search);
  }, [initialData]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const nextPage = 1;
    router.push({ pathname: '/blogs', query: { q: search, page: nextPage } }, undefined, { shallow: true });
    await loadBlogs(search, nextPage);
  };

  const goToPage = async (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    router.push({ pathname: '/blogs', query: { q: search, page: pageNumber } }, undefined, { shallow: true });
    await loadBlogs(search, pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <nav className="blog-pagination" aria-label="Blog pages">
        <button type="button" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => goToPage(page + 1)}>
          Next
        </button>
      </nav>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Blogs | Villa Hillcrest</title>
        <meta name="description" content="Read the latest news, stories and travel tips from Villa Hillcrest." />
      </Head>

      <PageHero
        title="Our Blog"
        imageUrl={hero?.imageUrl || '/images/blog-hero.jpg'}
        focalX={hero?.focalX ?? 50}
        focalY={hero?.focalY ?? 50}
      />

      <main className="blog-list-page">
        <section className="container blog-search-section">
          <form className="blog-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search by keyword, title or date"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search blogs"
            />
            <button  type="submit">Search</button>
          </form>
        </section>

        <section className="container blog-list-section">
          {loading && <p>Loading blogs...</p>}
          {message && !loading && <p className="blog-message">{message}</p>}

          <div className="blog-card-grid">
            {items.map((blog) => (
              <article key={blog.id} className="blog-card">
                <Link href={`/blogs/${blog.slug}`} className="blog-card-link">
                    <div className="blog-card-image" style={{ backgroundImage: `url('${blog.imageUrl || '/images/blog-default.jpg'}')` }} />
                    <div className="blog-card-content">
                      <p className="blog-card-date">{formatDate(blog.publishedAt || blog.createdAt)}</p>
                      <h2>{blog.title}</h2>
                      <p>{blog.excerpt}</p>
                    </div>
                </Link>
              </article>
            ))}
          </div>

          {renderPagination()}
        </section>
      </main>
    </Layout>
  );
}
