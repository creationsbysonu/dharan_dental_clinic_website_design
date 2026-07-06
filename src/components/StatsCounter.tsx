import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 5400, suffix: '+', label: 'Patients Treated', desc: 'Across all 7 branches' },
  { value: 20,   suffix: '+', label: 'Years of Practice', desc: 'Established in 2003' },
  { value: 7,    suffix: '',  label: 'Clinic Branches',  desc: 'Province 1, Nepal' },
  { value: 98,   suffix: '%', label: 'Satisfaction Rate', desc: 'Based on patient surveys' },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elScope = sectionRef.current;
    if (!elScope) return;

    const ctx = gsap.context(() => {
      // Parallax teal orb
      gsap.to('.stats-orb', {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: elScope, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Number counters
      STATS.forEach((stat, i) => {
        const el = document.querySelector(`.stat-num-${i}`) as HTMLElement;
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + stat.suffix;
          },
        });
      });

      // Stagger the cards in
      gsap.fromTo('.stat-card',
        { opacity: 0, y: 36, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' } }
      );
    }, elScope);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      {/* Background orb */}
      <div className="stats-orb" />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--s12)' }}>
          <div className="section-eyebrow t-label" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.45)' }}>
            By The Numbers
          </div>
          <h2 style={{ color: '#fff', fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>
            Trusted. Proven. <em style={{ fontStyle: 'italic', color: 'var(--teal-light)' }}>Measured.</em>
          </h2>
        </div>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-num stat-num-${i}`}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
