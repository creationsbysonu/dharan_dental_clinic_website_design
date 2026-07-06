import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';

// High-quality Unsplash images for dental/smile
const HERO_IMG = '/images/hero_clinic_1783267679077.png';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to('.hero-eyebrow',     { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-heading',     { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.5')
        .to('.hero-subtext',     { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .to('.hero-actions',     { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to('.hero-stats-row',   { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.hero-card-1',      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
        .to('.hero-card-2',      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to('.hero-scroll',      { opacity: 1, duration: 0.5 }, '-=0.2');
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero">

      {/* ── Left dark panel ── */}
      <div className="hero-panel-left">

        <div className="hero-eyebrow">
          <span>Dharan-9, Putali Line · Sunsari, Nepal</span>
        </div>

        <h1 className="hero-heading">
          Where <em>Brilliant</em><br />
          Smiles Are<br />
          <span className="teal-word">Crafted.</span>
        </h1>

        <p className="hero-subtext">
          Dharan Dental Clinic combines 20+ years of expertise with cutting‑edge digital technology — from Invisalign & Implants to our own in‑house Digital Lab. Your most confident smile starts here.
        </p>

        <div className="hero-actions">
          <a href="#appointment" className="btn btn-teal"
            onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Book Appointment
          </a>
          <a href="#services" className="btn btn-ghost-white"
            onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Explore Services
          </a>
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat">
            <strong>5.4K+</strong>
            <span>Happy Patients</span>
          </div>
          <div className="hero-stat">
            <strong>7</strong>
            <span>Clinic Branches</span>
          </div>
          <div className="hero-stat">
            <strong>20+</strong>
            <span>Dental Specialties</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </div>

      {/* ── Right image panel ── */}
      <div className="hero-panel-right" style={{ overflow: 'hidden' }}>
        <motion.img
          src={HERO_IMG}
          alt="Professional dentist working with patient at Dharan Dental Clinic"
          className={`hero-img-main ${imgLoaded ? 'loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          loading="eager"
          decoding="async"
          style={{ y: yBackground, scale: scaleBackground, opacity: opacityBackground }}
        />

        {/* Authentic Glass Cards */}
        <motion.div
          className="hero-card hero-card-1"
          animate={{ y: [-6, 6, -6] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        >
          <div>
            <div className="hero-card-title">4.9 / 5.0</div>
            <div className="hero-card-label">Patient Satisfaction</div>
          </div>
        </motion.div>

        <motion.div
          className="hero-card hero-card-2"
          animate={{ y: [6, -6, 6] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.8 }}
        >
          <div>
            <div className="hero-card-title">Open Daily</div>
            <div className="hero-card-label">7:00 AM — 9:00 PM</div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
