import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const REASONS = [
  {
    num: '01',
    title: 'In-House Digital Lab',
    headline: 'Fabricated Here,\nFitted Today.',
    body: 'Our own CAD/CAM dental lab means crowns, veneers, and bridges are milled in-clinic — no week-long waits, no outsourcing, perfect fit guaranteed.',
  },
  {
    num: '02',
    title: 'Digital 3D Imaging',
    headline: 'See What Others\nCan\'t.',
    body: 'Full 3D cone-beam imaging available in-house. Precise, radiation-efficient diagnostics — the same technology used at top dental hospitals worldwide.',
  },
  {
    num: '03',
    title: 'NMC Registered',
    headline: 'Experts You\nCan Trust.',
    body: 'Every practitioner at Dharan Dental Clinic is registered with the Nepal Medical Council — fully qualified, continuously trained, and deeply experienced.',
  },
  {
    num: '04',
    title: 'ISO Sterilisation',
    headline: 'Your Safety Is\nOur Priority.',
    body: 'Every instrument is sterilised to hospital-grade standards using Class-B autoclaves and single-use disposable barriers. Infection risk: zero.',
  },
  {
    num: '05',
    title: '5,400+ Patients',
    headline: 'Serving\nEvery Smile.',
    body: 'Over 5,400 patients across our branches trust us with their dental health. From children\'s first checkup to senior full-mouth rehabilitation.',
  },
  {
    num: '06',
    title: 'Open 7AM–9PM',
    headline: 'Always Here\nWhen You Need Us.',
    body: 'Dental emergencies don\'t keep office hours — neither do we. Walk in any day across all branches. Our team is ready from 7 in the morning.',
  },
];

function FlipCard({ item, index }: { item: typeof REASONS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="flip-card-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="flip-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="flip-card-front editorial-card">
          <div className="editorial-card-top">
            <span className="editorial-card-num">{item.num}</span>
            <h4 className="editorial-card-title">{item.title}</h4>
          </div>
          <div className="editorial-card-main" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
            <h3 className="editorial-card-headline">{item.headline}</h3>
            <p className="editorial-card-body" style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--teal)' }}>Hover to read more →</p>
          </div>
        </div>
        
        {/* Back */}
        <div className="flip-card-back editorial-card">
          <div className="editorial-card-top" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
            <span className="editorial-card-num" style={{ color: '#fff' }}>{item.num}</span>
            <h4 className="editorial-card-title" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.title}</h4>
          </div>
          <div className="editorial-card-main" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <p className="editorial-card-body" style={{ color: '#fff', fontSize: '1.05rem', lineHeight: 1.6 }}>{item.body}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FlipCards() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="editorial-section" id="why-us">
      <div className="wrap">
        <div ref={titleRef} className="editorial-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <div className="editorial-eyebrow">Why Choose Us</div>
            <h2 className="editorial-heading">
              Six reasons patients trust<br />
              <em>Dharan Dental.</em>
            </h2>
          </motion.div>
        </div>

        <div className="editorial-grid">
          {REASONS.map((item, i) => (
            <FlipCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
