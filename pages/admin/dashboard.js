import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import AdminSidebar, { adminMenuItems } from '../../components/admin/AdminSidebar';
import styles from '../../styles/AdminDashboard.module.css';

const defaultCounts = {
  offers: 0,
  rooms: 0,
  galleryImages: 0,
  sliders: 0,
  socialLinks: 0,
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [counts, setCounts] = useState(defaultCounts);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const safeJson = async (response) => {
      try {
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      } catch {
        return {};
      }
    };

    const loadCounts = async () => {
      try {
        const [offersRes, roomsRes, galleryRes, slidersRes, socialRes] = await Promise.all([
          fetch('/api/admin/offers'),
          fetch('/api/admin/rooms'),
          fetch('/api/admin/gallery'),
          fetch('/api/admin/sliders'),
          fetch('/api/admin/social-links'),
        ]);

        const [offersData, roomsData, galleryData, slidersData, socialData] = await Promise.all([
          safeJson(offersRes),
          safeJson(roomsRes),
          safeJson(galleryRes),
          safeJson(slidersRes),
          safeJson(socialRes),
        ]);

        if (!isMounted) return;

        setCounts({
          offers: Array.isArray(offersData?.items) ? offersData.items.length : 0,
          rooms: Array.isArray(roomsData?.items) ? roomsData.items.length : 0,
          galleryImages: Array.isArray(galleryData?.items) ? galleryData.items.length : 0,
          sliders: Array.isArray(slidersData?.sliders) ? slidersData.sliders.length : 0,
          socialLinks: Array.isArray(socialData?.items) ? socialData.items.length : 0,
        });
      } catch {
        if (!isMounted) return;
        setCounts(defaultCounts);
      }
    };

    const loadUser = async () => {
      try {
        const res = await fetch('/api/admin/me');
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        if (!isMounted) return;

        if (!res.ok || !data.user) {
          router.push('/admin/login');
          return;
        }

        setUser(data.user);
        await loadCounts();
        setLoading(false);
      } catch {
        if (!isMounted) return;
        router.push('/admin/login');
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return <div>Loading...</div>;

  const displayName = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : 'Admin User';

  const summaryCards = [
    { label: 'Offers', value: counts.offers },
    { label: 'Rooms', value: counts.rooms },
    { label: 'Gallery Images', value: counts.galleryImages },
    { label: 'Sliders', value: counts.sliders },
    { label: 'Social Links', value: counts.socialLinks },
  ];

  const widgetItems = adminMenuItems.filter((item) => item.label !== 'Dashnoard');

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch {
      // noop
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Villa Hillcrest</title>
      </Head>
      <div className={styles.dashboardPage}>
        <AdminSidebar activeLabel="Dashnoard" />

        <main className={styles.mainContent}>
          <header className={styles.topBar}>
            <div className={styles.searchBox}>
              <FaSearch />
              <input type="text" placeholder="Search admin widgets..." aria-label="Search dashboard" />
            </div>
            <div className={styles.topActions}>
              <div className={styles.avatar}>{displayName.slice(0, 2).toUpperCase()}</div>
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </header>

          <section className={styles.adminSummarySection}>
            <h2>Content Overview</h2>
            <p>Quick totals for website content managed from admin.</p>
            <div className={styles.adminSummaryGrid}>
              {summaryCards.map((card) => (
                <article key={card.label} className={styles.adminSummaryCard}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.adminWidgetsSection}>
            <h3>Site Menu Widgets</h3>
            <div className={styles.adminWidgetGrid}>
              {widgetItems.map((item) => (
                <article key={item.label} className={styles.adminWidgetCard}>
                  <span className={styles.adminWidgetIcon}>{item.icon}</span>
                  <div>
                    <h4>{item.label}</h4>
                    <p>{item.href ? 'Manage content' : 'Widget coming soon'}</p>
                  </div>
                  {item.href ? (
                    <a href={item.href} className={styles.adminWidgetLink}>Open</a>
                  ) : (
                    <span className={styles.adminWidgetDisabled}>No page</span>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className={styles.adminWelcomeNote}>
            <strong>Signed in as:</strong> {displayName}
          </section>
        </main>
      </div>
    </>
  );
}
