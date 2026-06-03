import { useEffect, useState } from 'react';
import { normalizeFeatureSections } from '../lib/feature-sections-defaults';

export default function FeatureSections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadSections = async () => {
      try {
        const res = await fetch('/api/feature-sections', { cache: 'no-store' });
        const data = await res.json();

        if (!res.ok || !data?.success || !isMounted) {
          return;
        }

        console.log("SYNCING DATA: "+JSON.stringify(data));

        setSections(normalizeFeatureSections(data.items));
      } catch {
        if (!isMounted) {
          return;
        }
        setSections([]);
      }
    };

    loadSections();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {!sections.length && (
          <section className="feature-section fade-in visible" style={{ backgroundColor: '#ffffff' }}>
          <div className="container feature-grid">
            <div className="feature-content">
              <h3 className="feature-title">No Feature Sections Found</h3>
              <p className="feature-text">Please add Feature Sections from the admin dashboard.</p>
            </div>
          </div>
        </section>
      )}
      {sections.map((section, index) => (
          <section className="feature-section fade-in visible" key={`${section.title}-${index}`} style={{ backgroundColor: section.title === 'Sleep' ? '#f5f7f3' : '#ffffff' }}>
          <div className={`container feature-grid${section.reverse ? ' reverse' : ''}`}>
            <div className="feature-image">
              <img src={section.image} alt={section.alt} />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">{section.title}</h3>
              <p className="feature-text">{section.text}</p>
              <a href={section.url || '#'} className="feature-btn">{section.cta}</a>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
