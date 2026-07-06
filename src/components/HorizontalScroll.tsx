import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real dental Unsplash images
const SLIDES = [
  {
    num: '01',
    tag: 'Implantology',
    title: 'Dental Implants',
    body: 'Titanium roots bonded to the jaw — permanent, indistinguishable from natural teeth. The gold standard for tooth replacement.',
    img: '/images/svc_implant_1783267709624.png',
    accent: '#1B7F79',
  },
  {
    num: '02',
    tag: 'Orthodontics',
    title: 'Braces & Invisalign',
    body: 'Modern clear aligners or precision braces crafted to straighten your smile — discreetly, comfortably, and on schedule.',
    img: '/images/svc_ortho_1783267730906.png',
    accent: '#C9943A',
  },
  {
    num: '03',
    tag: 'Restoration',
    title: 'Crown, Bridge & Veneers',
    body: 'Precision-milled ceramic restorations from our own digital lab — same-day crowns, lifelike veneers, invisible bridges.',
    img: '/images/svc_resto_1783267740932.png',
    accent: '#0C2340',
  },
  {
    num: '04',
    tag: 'Aesthetic',
    title: 'Smile Designing',
    body: 'A bespoke makeover mapped to your face, bite, and personality. Whitening, bonding, and veneers — sculpted as art.',
    img: '/images/svc_aesthetic_1783267750272.png',
    accent: '#1B7F79',
  },
  {
    num: '05',
    tag: 'Diagnostics',
    title: 'Digital OPG / CBCT',
    body: '3D scanning technology that renders your entire jaw in milliseconds — used by the world\'s leading dental centres.',
    img: '/images/about_tech_1783267689646.png',
    accent: '#C9943A',
  },
  {
    num: '06',
    tag: 'Surgery',
    title: 'Oral Surgery',
    body: 'From wisdom tooth removal to gum surgery — performed under local anaesthesia by experienced oral surgeons.',
    img: '/images/svc_surgery_1783267761027.png',
    accent: '#0C2340',
  },
];

export default function HorizontalScroll() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;

      // Slide-in the section heading
      gsap.from('.hscroll-intro > *', {
        opacity: 0,
        y: 32,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.hscroll-intro', start: 'top 85%' },
      });

      // Pin + horizontal drag
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 120),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger card entrances when section enters viewport
      gsap.from('.hc-inner', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 80%',
        },
      });

      // Progress bar
      gsap.to('.hscroll-progress-fill', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Intro line before the pin */}
      <div className="hscroll-intro">
        <div className="wrap" style={{ paddingBlock: 'var(--s16)' }}>
          <div className="section-eyebrow t-label">Treatment Catalogue</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--s8)', flexWrap: 'wrap' }}>
            <h2 className="t-display t-display-lg" style={{ color: 'var(--ink)', maxWidth: 560 }}>
              Scroll through<br /><em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>our full spectrum</em><br />of treatments.
            </h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 300, fontSize: '0.9rem', lineHeight: 1.75 }}>
              Drag or scroll to explore every treatment we offer — from routine cleanings to full-mouth rehabilitation.
            </p>
          </div>
        </div>
      </div>

      {/* Pinned horizontal scroll container */}
      <div ref={wrapRef} className="hscroll-outer" id="services">
        {/* Progress line */}
        <div className="hscroll-progress">
          <div className="hscroll-progress-fill" />
        </div>

        {/* Scroll hint */}
        <div className="hscroll-hint">
          <span>Scroll to explore</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>

        {/* Track */}
        <div ref={trackRef} className="hscroll-track">
          {/* Leading spacer */}
          <div className="hscroll-spacer" />

          {SLIDES.map((slide, i) => (
            <div key={i} className="hscroll-card">
              <div className="hc-inner">
                {/* Image */}
                <div className="hc-img-wrap">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="hc-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="hc-img-overlay" style={{ '--accent': slide.accent } as React.CSSProperties} />
                  <div className="hc-num">{slide.num}</div>
                </div>
                {/* Body */}
                <div className="hc-body">
                  <div className="hc-tag">{slide.tag}</div>
                  <h3 className="hc-title">{slide.title}</h3>
                  <p className="hc-desc">{slide.body}</p>
                  <a
                    href="#appointment"
                    className="hc-link"
                    onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    Book this treatment
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Trailing CTA card */}
          <div className="hscroll-cta-card">
            <div className="hc-cta-inner">
              <p className="hc-cta-label">Ready?</p>
              <h3>Book Your<br />Appointment Today.</h3>
              <a
                href="#appointment"
                className="btn btn-teal"
                style={{ marginTop: 'var(--s6)' }}
                onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Get Started →
              </a>
            </div>
          </div>

          {/* Trailing spacer */}
          <div className="hscroll-spacer" />
        </div>
      </div>
    </>
  );
}
