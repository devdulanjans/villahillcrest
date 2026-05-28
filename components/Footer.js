import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiBookingdotcom,
  SiAirbnb,
  SiTripadvisor
} from 'react-icons/si'
import { FaHotel, FaRoute } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const iconMap = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  youtube: SiYoutube,
  booking: SiBookingdotcom,
  airbnb: SiAirbnb,
  agoda: FaHotel,
  tripadvisor: SiTripadvisor,
  viator: FaRoute
}

export default function Footer() {
  const router = useRouter();
  const pathname = router.pathname;
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const loadSocialLinks = async () => {
      try {
        const response = await fetch('/api/social-links');
        if (!response.ok) return;

        const data = await response.json();
        const items = Array.isArray(data?.items) ? data.items : [];

        const normalized = items
          .map((item) => {
            const iconKey = String(item?.iconKey || '').toLowerCase();
            const Icon = iconMap[iconKey];
            if (!Icon) return null;

            return {
              label: String(item?.label || iconKey || 'Social').trim(),
              href: String(item?.url || '').trim(),
              Icon,
            };
          })
          .filter((item) => item && item.href);

        if (!cancelled) {
          setSocialLinks(normalized);
        }
      } catch {
        if (!cancelled) {
          setSocialLinks([]);
        }
      }
    };

    loadSocialLinks();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <h2 className="footer-title">
          Villa Hillcrest <br />
          Sri Lanka
        </h2>

        {pathname !== '/booking' && socialLinks.length > 0 &&
        <div className="socials">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon aria-hidden="true" focusable="false" />
            </a>
          ))}
        </div>}

        <div className="footer-links">
          <a href="/#philosophy">Our Philosophy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <p className="copyright">Copyright © 2026 Villa Hillcrest. All rights reserved. </p>
        <p>Design and Developed By <a href="https://orangehil.com/" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold', color: '#f38d21' }}>OrangeHill</span></a></p>
      </div>
    </footer>
  )
}
