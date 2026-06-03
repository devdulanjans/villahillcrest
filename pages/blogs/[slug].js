import Head from 'next/head';
import Layout from '../../components/Layout';
import BeSearchForm from '../../components/be-forms/BeSearchForm';
import PageHero from '../../components/PageHero';
import { findPublishedBlogBySlug } from '../../lib/mysql';

export async function getServerSideProps(context) {
  const slug = String(context.params?.slug || '').trim().toLowerCase();
  if (!slug) {
    return { notFound: true };
  }

  const blog = await findPublishedBlogBySlug(slug);
  if (!blog) {
    return { notFound: true };
  }

  // Convert Date objects to ISO strings for JSON serialization
  const serializedBlog = {
    ...blog,
    publishedAt: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : null,
    createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
  };

  return {
    props: { blog: serializedBlog },
  };
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function insertDetailImagesIntoContent(contentHtml, imageUrls, title) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    return contentHtml;
  }

  const inlineImagesHtml = `
    <div class="blog-detail-inline-images">
      ${imageUrls
        .map(
          (url, index) => `
        <figure>
          <img src="${url}" alt="${title} image ${index + 1}" />
        </figure>`
        )
        .join('')}
    </div>
  `;

  const lowerHtml = contentHtml.toLowerCase();
  const closingTag = '</p>';
  const paragraphPositions = [];
  let searchIndex = 0;

  while (true) {
    const foundIndex = lowerHtml.indexOf(closingTag, searchIndex);
    if (foundIndex === -1) break;
    paragraphPositions.push(foundIndex);
    searchIndex = foundIndex + closingTag.length;
  }

  if (paragraphPositions.length === 0) {
    return contentHtml + inlineImagesHtml;
  }

  const insertAfter = paragraphPositions[Math.floor(paragraphPositions.length / 2)] + closingTag.length;
  return contentHtml.slice(0, insertAfter) + inlineImagesHtml + contentHtml.slice(insertAfter);
}

export default function BlogDetailPage({ blog }) {
  const detailImages = Array.isArray(blog.imageUrls) ? blog.imageUrls.filter(Boolean) : [];
  const blogContentHtml = insertDetailImagesIntoContent(blog.contentHtml || '', detailImages, blog.title);

  return (
    <Layout>
      <Head>
        <title>{blog.title} | Villa Hillcrest</title>
        <meta name="description" content={blog.excerpt || 'Read more about Villa Hillcrest.'} />
      </Head>

      <PageHero title={blog.title} imageUrl={blog.imageUrl || '/images/blog-default.jpg'} />

      <main className="blog-detail-page container">
        <section className="blog-detail-meta">
          <p>{formatDate(blog.publishedAt || blog.createdAt)}</p>
          {blog.keywords && <p>Tags: {blog.keywords}</p>}
        </section>

        <section className="blog-detail-content">
          <div dangerouslySetInnerHTML={{ __html: blogContentHtml }} />
        </section>

        <section className="blog-search-footer">
          <BeSearchForm />
        </section>
      </main>
    </Layout>
  );
}
