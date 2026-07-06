import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconAward = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
const IconActivity = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const BAR_ITEMS = [
  'NMC Registered Practitioners',
  'Digital OPG / RVG / CBCT',
  'In-House Digital Dental Lab',
  'ISO Sterilisation Protocol',
  '7 Branches — Province 1',
  'Open 7 AM — 9 PM Daily',
];
// Duplicate for seamless loop
const MARQUEE = [...BAR_ITEMS, ...BAR_ITEMS];

const CREDS = [
  { Icon: IconAward,    title: 'NMC Registered',    sub: 'Certified Practitioners' },
  { Icon: IconShield,   title: 'ISO Sterilisation',  sub: 'Class-B Autoclave' },
  { Icon: IconActivity, title: 'Digital Imaging',    sub: 'OPG / RVG / CBCT' },
  { Icon: IconCheck,    title: 'Own Digital Lab',    sub: 'In-House Fabrication' },
];

export default function TrustBar() {
  const credsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Use ref.current directly as the trigger — no string-based scoping
    const el = credsRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cred-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    }, el); // ← pass explicitly DOM element 'el', NOT the react ref object

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Marquee bar */}
      <div className="brand-bar" aria-hidden="true">
        <div className="brand-bar-track">
          {MARQUEE.map((text, i) => (
            <div key={i} className="brand-bar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#1B7F79" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {text}
              {i < MARQUEE.length - 1 && <span className="brand-bar-sep">·</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Credentials row */}
      <section ref={credsRef} className="creds" id="credentials">
        <div className="wrap">
          <div className="creds-row">
            {CREDS.map((c, i) => (
              // ← key on the outer real element, not a fragment
              <div key={i} style={{ display: 'contents' }}>
                <div className="cred-item">
                  <div className="cred-icon"><c.Icon /></div>
                  <div className="cred-text">
                    <strong>{c.title}</strong>
                    <span>{c.sub}</span>
                  </div>
                </div>
                {i < CREDS.length - 1 && <div className="cred-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
