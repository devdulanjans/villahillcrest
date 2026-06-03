import Head from 'next/head'
import Layout from '../components/Layout'
import PageHero from '../components/PageHero'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import PhilosophyWidget from '../components/home/PhilosophyWidget'
import useHomeReveal from '../components/home/useHomeReveal'

export default function OurPhilosophyPage() {
  useHomeReveal()

  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Our Philosophy</title>
        <meta
          name="description"
          content="Discover the philosophy behind Villa Hillcrest, from conscious hospitality and nature-led design to wellness and local community values."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/our-philosophy" />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="philosophy-page">
        <PageHero
          title="Our Philosophy"
          imageUrl="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1800&auto=format&fit=crop"
          ariaLabel="Our philosophy hero"
        />

        <BeSearchForm />

        <section className="intro" aria-labelledby="philosophy-intro-heading">
          <div className="container">
            <h2 id="philosophy-intro-heading">Thoughtful stays shaped by place</h2>
            <p>
              At Villa Hillcrest, our philosophy is simple: create meaningful travel experiences that feel calm,
              personal, and deeply connected to Sri Lanka. Every detail, from spaces and service to food and activities,
              is designed to help guests slow down and reconnect.
            </p>
          </div>
        </section>

        <PhilosophyWidget />
      </main>
    </Layout>
  )
}
