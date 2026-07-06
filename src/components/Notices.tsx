import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const notices = [
  {
    type: 'offer',
    label: 'Special Offer',
    title: 'Summer Braces & Invisalign Discount',
    body: 'Avail exclusive discounts on orthodontic treatment this season. Limited slots — call now before they fill up.',
    meta: 'All Branches · Limited Time',
  },
  {
    type: 'urgent',
    label: 'We\'re Hiring',
    title: 'Qualified Dental Practitioners Wanted',
    body: 'Dharan Dental Clinic is actively hiring experienced dentists for our expanding branches. Competitive salary & benefits.',
    meta: 'Head Office & Branches',
  },
  {
    type: 'update',
    label: 'New Branch',
    title: 'Duhabi Branch Now Fully Operational',
    body: 'Our newest clinic in Duhabi is open and ready to serve the eastern communities with complete dental care. Call 9709010739.',
    meta: 'Duhabi · 9709010739',
  },
  {
    type: 'info',
    label: 'Emergency',
    title: 'Emergency Dental Care — Available Now',
    body: 'Severe toothache or dental trauma? Our head office emergency line routes you to the nearest available specialist immediately.',
    meta: 'Call 025-578729',
  },
  {
    type: 'info',
    label: 'Service',
    title: 'Same-Day Crowns via Our Digital Lab',
    body: 'Our in-house digital dental lab allows single-visit crown fabrication. Precision CAD/CAM technology — no waiting a week.',
    meta: 'Dharan Head Office',
  },
  {
    type: 'offer',
    label: 'Service',
    title: 'Full General Dentistry — Walk In Welcome',
    body: 'Consultation, scaling, extraction, RCT, and dentures — available same-day at all branches. No appointment necessary.',
    meta: 'All 7 Branches',
  },
];

export default function Notices() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.notice-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.notices-grid', start: 'top 85%' } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="notices" id="notices">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--s12)', gap: 'var(--s8)', flexWrap: 'wrap' }}>
          <div>
            <div className="section-eyebrow t-label">Clinic Intelligence</div>
            <h2>Latest Updates<br />& Advisories</h2>
          </div>
          <p style={{ color: 'var(--text-2)', maxWidth: 320, fontSize: '0.88rem', lineHeight: 1.75 }}>
            Live announcements, special offers, and important medical notices from Dharan Dental Clinic and its branches.
          </p>
        </div>

        <div className="notices-grid">
          {notices.map((n, i) => (
            <article key={i} className="notice-card">
              <div className={`notice-pill ${n.type}`}>
                {n.label}
              </div>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
              <div className="notice-meta">{n.meta}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
