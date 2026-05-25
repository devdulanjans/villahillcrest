import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FaBars,
  FaBell,
  FaChartPie,
  FaFacebookF,
  FaFile,
  FaFolder,
  FaInstagram,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPinterestP,
  FaPuzzlePiece,
  FaSearch,
  FaStar,
  FaTable,
  FaTwitter,
  FaWpforms,
  FaYoutube,
} from 'react-icons/fa';
import { IoMdApps } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import Head from 'next/head';
import styles from '../../styles/AdminDashboard.module.css';

const sidebarGroups = [
  {
    title: 'Site Menu',
    items: [
      { icon: <MdSpaceDashboard />, label: 'Dashnoard', active: true, href: '/admin/dashboard' },
      { icon: <FaFile />, label: 'Home' },
      { icon: <FaFile />, label: 'About' },
      { icon: <FaWpforms />, label: 'Booking' },
      { icon: <FaTable />, label: 'Availability' },
      { icon: <FaChartPie />, label: 'Surf' },
      { icon: <FaFolder />, label: 'Gallery', href: '/admin/gallery' },
      { icon: <FaMoneyBillWave />, label: 'Offers', href: '/admin/offers' },
      { icon: <FaMapMarkerAlt />, label: 'Contact Us' },
      { icon: <FaBell />, label: 'Popup Message' },
      { icon: <IoMdApps />, label: 'Social Media' },
    ],
  },
];

const statCards = [
  { label: 'Total Views', value: '1,028,056', icon: <FaSearch />, tone: 'cyan' },
  { label: 'Total Followers', value: '24,763', icon: <MdSpaceDashboard />, tone: 'indigo' },
  { label: 'Partnerships', value: '14', icon: <FaBell />, tone: 'pink' },
  { label: 'Total Earned', value: '$149.00', icon: <FaMoneyBillWave />, tone: 'gold' },
];

const ageFollowers = [
  { label: '15 - 20', value: 46 },
  { label: '20 - 25', value: 58 },
  { label: '25 - 30', value: 69 },
  { label: '30 - 35', value: 37 },
  { label: '35 - 40', value: 22 },
];

const locationFollowers = [
  { label: 'US', value: 22 },
  { label: 'Brazil', value: 88 },
  { label: 'Canada', value: 66 },
  { label: 'UK', value: 58 },
  { label: 'Australia', value: 47 },
  { label: 'India', value: 33 },
  { label: 'China', value: 24 },
];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

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

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Villa Hillcrest</title>
      </Head>
      <div className={styles.dashboardPage}>
        <aside className={styles.sidebar}>
          <h1 className={styles.brand}>Avlis</h1>
          {sidebarGroups.map((group) => (
            <section key={group.title} className={styles.menuSection}>
              <h2 className={styles.menuTitle}>{group.title}</h2>
              <ul className={styles.menuList}>
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className={item.active ? styles.menuItemActive : styles.menuItem}
                    onClick={() => {
                      if (item.href) {
                        router.push(item.href);
                      }
                    }}
                    role={item.href ? 'button' : undefined}
                    tabIndex={item.href ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (item.href && (e.key === 'Enter' || e.key === ' ')) {
                        router.push(item.href);
                      }
                    }}
                  >
                    <span className={styles.menuIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </aside>

        <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.searchBox}>
            <FaSearch />
            <input type="text" placeholder="Search..." aria-label="Search dashboard" />
          </div>
          <div className={styles.topActions}>
            <button type="button" className={styles.iconBtn} aria-label="Notifications">
              <FaBell />
              <span className={styles.dot} />
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Apps menu">
              <IoMdApps />
            </button>
            <div className={styles.avatar}>{displayName.slice(0, 2).toUpperCase()}</div>
            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </header>

        <section className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>{displayName.charAt(0)}</div>
            <div className={styles.profileMeta}>
              <h3>{displayName}</h3>
              <p className={styles.metaLine}>
                <FaMapMarkerAlt /> 4045 Denver Avenue, Los Angeles, CA 90017
              </p>
              <p className={styles.metaSub}>Joined date: 23 June, 2018 | Male | 29 Year Old</p>
              <div className={styles.tags}>
                <span>Fitness</span>
                <span>Life Style</span>
                <span>Gym</span>
              </div>
            </div>
            <div className={styles.ratingRow}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span>14 Reviews</span>
            </div>
          </div>

          <div className={styles.socialStrip}>
            <div><FaTwitter /> 13,291</div>
            <div><FaPinterestP /> 84,019</div>
            <div><FaInstagram /> 12,300</div>
            <div><FaFacebookF /> 92,920</div>
            <div><FaYoutube /> 1,291</div>
          </div>
        </section>

        <section className={styles.statGrid}>
          {statCards.map((card) => (
            <article key={card.label} className={styles.statCard}>
              <div>
                <p>{card.label}</p>
                <h4>{card.value}</h4>
              </div>
              <span className={`${styles.cardIcon} ${styles[card.tone]}`}>{card.icon}</span>
            </article>
          ))}
        </section>

        <section className={styles.bottomGrid}>
          <article className={styles.widgetCard}>
            <h5>Followers by Gender</h5>
            <div className={styles.genderDonut}>
              <div>
                <strong>Female</strong>
                <span>60%</span>
              </div>
            </div>
          </article>

          <article className={styles.widgetCard}>
            <h5>Followers by Age</h5>
            <div className={styles.progressList}>
              {ageFollowers.map((item) => (
                <div key={item.label} className={styles.progressRow}>
                  <span>{item.label}</span>
                  <div className={styles.progressTrack}>
                    <div style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.widgetCard}>
            <h5>Top Followers by Locations</h5>
            <div className={styles.locationBars}>
              {locationFollowers.map((item) => (
                <div key={item.label} className={styles.locationRow}>
                  <span>{item.label}</span>
                  <div className={styles.locationTrack}>
                    <div style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
        </main>
      </div>
    </>
  );
}
