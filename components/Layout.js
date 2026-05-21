import SiteHeader from './SiteHeader'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  )
}
