import styles from '../../styles/NewIndex.module.css'

export default function IntroSectionWidget() {
  return (
    <section className={styles.introSection}>
      <h1>NATURE’S SECRET SANCTUARY</h1>
      <p>
        Villa Hill Crest is a contemporary boutique retreat on the edge of tropical greenery,
        designed to immerse guests in stillness, comfort, and meaningful experiences.
      </p>
      <a href="/about-us">About Villa Hill Crest</a>
    </section>
  )
}
