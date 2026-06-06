import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  FaBars,
  FaTimes,
  FaBed,
  FaFile,
  FaFolder,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { IoMdApps } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import styles from '../../styles/AdminSidebar.module.css';

export const adminMenuItems = [
  { icon: <MdSpaceDashboard />, label: 'Dashnoard', href: '/admin/dashboard' },
  { icon: <IoMdApps />, label: 'FeatureSections', href: '/admin/feature-sections' },
  { icon: <FaFile />, label: 'About', href: '/admin/about' },
  { icon: <FaFile />, label: 'Page Hero Images', href: '/admin/page-hero-images' },
  { icon: <FaFile />, label: 'Terms & Conditions', href: '/admin/terms-and-conditions' },
  { icon: <FaFile />, label: 'Privacy Policy', href: '/admin/privacy-policy' },
  { icon: <FaFolder />, label: 'Gallery', href: '/admin/gallery' },
  { icon: <FaMoneyBillWave />, label: 'Offers', href: '/admin/offers' },
  { icon: <FaFile />, label: 'Blogs', href: '/admin/blogs' },
  { icon: <FaMapMarkerAlt />, label: 'Surf Breaks', href: '/admin/surf-breaks' },
  { icon: <FaBed />, label: 'Add Room', href: '/admin/rooms' },
  { icon: <FaFile />, label: 'Sliders', href: '/admin/sliders' },
  { icon: <FaMapMarkerAlt />, label: 'Contact Details', href: '/admin/contact-details' },
  { icon: <IoMdApps />, label: 'Social Media', href: '/admin/social-links' },
];

function MenuItems({ activeLabel, onClose }) {
  return (
    <>
      <div className={styles.sidebarTop}>
        <h1 className={styles.brand}>Avlis</h1>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <FaTimes />
          </button>
        )}
      </div>
      <h2 className={styles.menuTitle}>Site Menu</h2>
      <ul className={styles.menuList}>
        {adminMenuItems.map((item) => (
          <li
            key={item.label}
            className={activeLabel === item.label ? styles.menuItemActive : styles.menuItem}
          >
            {item.href ? (
              <Link href={item.href} className={styles.menuLink} onClick={onClose || undefined}>
                <span className={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className={styles.menuStatic}>
                <span className={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function AdminSidebar({ activeLabel }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only run portal logic after hydration (document.body is available)
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Desktop sidebar — stays in the grid layout */}
      <aside className={styles.sidebar}>
        <MenuItems activeLabel={activeLabel} onClose={null} />
      </aside>

      {/* Mobile: hamburger + drawer portal (rendered after hydration) */}
      {mounted && (
        <>
          <button
            className={styles.hamburger}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          {open && createPortal(
            <>
              <div className={styles.overlay} onClick={close} aria-hidden="true" />
              <aside className={styles.mobileSidebar}>
                <MenuItems activeLabel={activeLabel} onClose={close} />
              </aside>
            </>,
            document.body
          )}
        </>
      )}
    </>
  );
}
