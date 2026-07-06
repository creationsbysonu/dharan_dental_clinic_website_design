import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// About section with two real Unsplash images stacked
const IMG_MAIN = '/images/about_tech_1783267689646.png';
const IMG_ACCENT = '/images/about_consultation_1783267700251.png';

const CHECKS = [
  'Over 20 years serving communities across Province 1, Nepal',
  'Own in-house Digital Dental Lab for same-day restorations',
  'Digital imaging: OPG, RVG, and CBCT technology in-house',
  'NMC-registered specialists across all branches',
];

const SvgCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-img-main',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 80%' } }
      );
      gsap.fromTo('.about-img-accent',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.25, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-grid', start: 'top 80%' } }
      );
      gsap.fromTo('.about-content > *',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-content', start: 'top 82%' } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="about" id="about">
      <div className="wrap">
        <div className="about-grid">

          {/* Image stack */}
          <div className="about-img-stack">
            <div className="about-badge">
              <div className="about-badge-num">20+</div>
              <div className="about-badge-label">Years of Excellence</div>
            </div>
            <img
              src={IMG_MAIN}
              alt="Professional dental team at Dharan Dental Clinic"
              className="about-img-main"
              loading="lazy"
            />
            <img
              src={IMG_ACCENT}
              alt="Modern dental clinic interior"
              className="about-img-accent"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="about-content">
            <div className="section-eyebrow t-label">Our Story</div>
            <h2>Nepal's Most Trusted<br />Complete Dental Solution</h2>
            <p className="t-body-lg" style={{ color: 'var(--text-2)' }}>
              Founded in Dharan-9, Putali Line, we have grown into a network of 7 clinics across Sunsari and Morang — each equipped with the same high standards, the same trained specialists, and the same unwavering commitment to your smile.
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              What sets us apart is our own in-house Digital Dental Lab, enabling same-day crowns, bridges, and prosthetics with unmatched precision — a rarity in all of Nepal.
            </p>

            <div className="about-checks">
              {CHECKS.map((item, i) => (
                <div key={i} className="about-check-item">
                  <div className="about-check-icon"><SvgCheck /></div>
                  <span className="about-check-text">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#appointment"
              className="btn btn-ink"
              onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Book a Consultation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
