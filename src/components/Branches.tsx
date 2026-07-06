import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SvgPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.82 9.8 19.79 19.79 0 01.75 1.17 2 2 0 012.73 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const SvgPin = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const SvgClock = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const BRANCHES = [
  {
    type: 'Head Office',
    name: 'Dharan-9, Putali Line',
    address: 'Sunsari, Nepal',
    phones: ['025-578729', '025-575910', '9824381202'],
    hours: '7:00 AM — 9:00 PM',
    hq: true,
  },
  { type: 'Branch', name: 'Gaighat Branch',         address: 'Gaighat, Province 1',       phones: ['9709010501'],                hours: '7 AM — 6 PM' },
  { type: 'Branch', name: 'Biratnagar Branch',      address: 'Biratnagar, Morang',         phones: ['9762511172'],                hours: '7 AM — 8 PM' },
  { type: 'Branch', name: 'Itahari, B.P. Chowk',   address: 'Itahari, Sunsari',           phones: ['9709010738'],                hours: '7 AM — 8 PM' },
  { type: 'Branch', name: 'Tarahara, Bargachhi',    address: 'Tarahara, Sunsari',          phones: ['025-475120', '9810476581'], hours: '7 AM — 7 PM' },
  { type: 'Branch', name: 'Jhumka Branch',          address: 'Jhumka, Province 1',         phones: ['9825921135'],                hours: '7 AM — 7 PM' },
  { type: 'Branch', name: 'Duhabi Branch',          address: 'Duhabi, Province 1',         phones: ['9709010739'],                hours: 'Call for timings' },
];

export default function Branches() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.branch-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.branches-grid', start: 'top 85%' } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="branches" id="branches">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--s12)', gap: 'var(--s8)', flexWrap: 'wrap' }}>
          <div>
            <div className="section-eyebrow t-label">Find Us</div>
            <h2>7 Clinics Across<br />Province 1, Nepal</h2>
          </div>
          <p style={{ color: 'var(--text-2)', maxWidth: 320, fontSize: '0.88rem', lineHeight: 1.75 }}>
            Walk in at any branch — no appointment needed for emergencies. Our specialists are ready to help.
          </p>
        </div>

        <div className="branches-grid">
          {BRANCHES.map((b, i) => (
            <div key={i} className={`branch-card ${b.hq ? 'hq' : ''}`}>
              <div className="branch-type">{b.type}</div>
              <div className="branch-name">{b.name}</div>
              <div className="branch-addr">
                <SvgPin />
                <span>{b.address}</span>
              </div>
              {b.phones.map((ph, j) => (
                <a key={j} href={`tel:${ph.replace(/[-\s]/g, '')}`} className="branch-phone-link">
                  <SvgPhone />
                  {ph}
                </a>
              ))}
              <div className="branch-hours">
                <SvgClock />
                {b.hours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
