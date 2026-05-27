import Link from 'next/link';
import {
  FaBell,
  FaBed,
  FaChartPie,
  FaFile,
  FaFolder,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTable,
  FaWpforms,
} from 'react-icons/fa';
import { IoMdApps } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import styles from '../../styles/AdminSidebar.module.css';

const menuItems = [
  { icon: <MdSpaceDashboard />, label: 'Dashnoard', href: '/admin/dashboard' },
  { icon: <FaFile />, label: 'Home' },
  { icon: <FaFile />, label: 'About' },
  { icon: <FaWpforms />, label: 'Booking' },
  { icon: <FaTable />, label: 'Availability' },
  { icon: <FaChartPie />, label: 'Surf' },
  { icon: <FaFolder />, label: 'Gallery', href: '/admin/gallery' },
  { icon: <FaMoneyBillWave />, label: 'Offers', href: '/admin/offers' },
  { icon: <FaBed />, label: 'Add Room', href: '/admin/rooms' },
  { icon: <FaFile />, label: 'Sliders', href: '/admin/sliders' },
  { icon: <FaMapMarkerAlt />, label: 'Contact Details', href: '/admin/contact-details' },
  { icon: <FaBell />, label: 'Popup Message' },
  { icon: <IoMdApps />, label: 'Social Media', href: '/admin/social-links' },
];

export default function AdminSidebar({ activeLabel }) {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>Avlis</h1>
      <h2 className={styles.menuTitle}>Site Menu</h2>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={activeLabel === item.label ? styles.menuItemActive : styles.menuItem}
          >
            {item.href ? (
              <Link href={item.href} className={styles.menuLink}>
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
    </aside>
  );
}
