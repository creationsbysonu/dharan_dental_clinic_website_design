import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Real Unsplash dental images
const SERVICES = [
  {
    tag: 'Restorative',
    title: 'Crown, Bridge & Veneers',
    desc: 'Precision-crafted ceramic crowns, bridges, inlays, onlays, and porcelain veneers — all fabricated in our own digital lab.',
    img: '/images/svc_resto_1783267740932.png',
    featured: false,
  },
  {
    tag: 'Surgical',
    title: 'Dental Implants',
    desc: 'Titanium implants that look, feel, and function like natural teeth. Permanent and life-changing.',
    img: '/images/svc_implant_1783267709624.png',
    featured: true,
    wide: true,
  },
  {
    tag: 'Orthodontics',
    title: 'Braces & Invisalign',
    desc: 'Straighten and align your smile discreetly with modern clear aligners or traditional braces. Special offers available.',
    img: '/images/svc_ortho_1783267730906.png',
    featured: false,
    tall: true,
  },
  {
    tag: 'Cosmetic',
    title: 'Smile Designing & Whitening',
    desc: 'Complete aesthetic transformations — composite bonding, whitening, and bespoke smile makeovers.',
    img: '/images/svc_aesthetic_1783267750272.png',
    featured: false,
  },
  {
    tag: 'Diagnostics',
    title: 'Digital OPG / CBCT',
    desc: 'State-of-the-art 3D digital imaging for precise, faster diagnosis — the same technology used in leading global clinics.',
    img: '/images/about_tech_1783267689646.png',
    featured: false,
  },
  {
    tag: 'Prosthetics',
    title: 'Removable Dentures',
    desc: 'Custom-fitted removable and implant-supported dentures crafted to look completely natural.',
    img: '/images/svc_surgery_1783267761027.png',
    featured: false,
  },
];

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`svc-card ${s.featured ? 'featured' : ''} ${s.wide ? 'wide' : ''} ${s.tall ? 'tall' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img
        src={s.img}
        alt={s.title}
        className="svc-card-img"
        loading="lazy"
        decoding="async"
      />
      <div className="svc-card-overlay" style={{ transform: "translateZ(10px)" }} />
      <div className="svc-card-body" style={{ transform: "translateZ(30px)" }}>
        <div className="svc-card-tag">{s.tag}</div>
        <div className="svc-card-title">{s.title}</div>
        <div className="svc-card-desc">{s.desc}</div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 82%' } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services" id="services">
      <div className="wrap">
        <div className="services-header">
          <div>
            <div className="section-eyebrow" style={{ borderBottom: 'none' }}>
              <span className="t-label" style={{ color: 'rgba(255,255,255,0.4)' }}>What We Offer</span>
            </div>
            <h2>Complete Dental Care,<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>Under One Roof.</em></h2>
          </div>
          <p>From routine checkups to full-mouth rehabilitation, our expert team and cutting-edge equipment deliver exceptional outcomes every single visit.</p>
        </div>

        <div className="services-grid" style={{ perspective: 2000 }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
