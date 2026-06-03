import Head from 'next/head'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import { getPrivacyContent } from '../lib/mysql'
import { normalizePrivacyContent } from '../lib/privacy-defaults'

export default function PrivacyPolicyPage({ privacyContent }) {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Privacy Policy</title>
        <meta
          name="description"
          content="Read the Privacy Policy for Villa Hillcrest, including how we collect, use, and protect personal data."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/privacy-policy" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main>
        <PageHero
          title="Privacy Policy"
          imageUrl="https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1800&auto=format&fit=crop"
          ariaLabel="Privacy policy hero"
        />

        <BeSearchForm />

        <section className="intro" aria-labelledby="privacy-heading">
          <div className="container">
            <h2 id="privacy-heading">{privacyContent.sectionTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: privacyContent.bodyHtml }} />
          </div>
        </section>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    const item = await getPrivacyContent()
    return {
      props: {
        privacyContent: normalizePrivacyContent(item),
      },
    }
  } catch {
    return {
      props: {
        privacyContent: normalizePrivacyContent(null),
      },
    }
  }
}
