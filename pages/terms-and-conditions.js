import Head from 'next/head'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import { getTermsContent } from '../lib/mysql'
import { normalizeTermsContent } from '../lib/terms-defaults'

export default function TermsAndConditionsPage({ termsContent }) {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Terms & Conditions</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for bookings, payments, cancellations, and stays at Villa Hillcrest."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/terms-and-conditions" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main>
        <PageHero
          title="Terms & Conditions"
          imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop"
          ariaLabel="Terms and conditions hero"
        />

        <BeSearchForm />

        <section className="intro" aria-labelledby="terms-heading">
          <div className="container">
            <h2 id="terms-heading">{termsContent.sectionTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: termsContent.bodyHtml }} />
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const item = await getTermsContent()
    return {
      props: {
        termsContent: normalizeTermsContent(item),
      },
    }
  } catch {
    return {
      props: {
        termsContent: normalizeTermsContent(null),
      },
    }
  }
}
