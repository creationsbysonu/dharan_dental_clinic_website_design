import { useRef, useState, useCallback } from 'react';

const CASES = [
  {
    before: '/images/drastic_before_1783268306058.png',
    after: '/images/drastic_after_1783268334478.png',
    label: 'Veneers & Whitening'
  },
  {
    before: '/images/smile_case2_before_1783268544741.png',
    after: '/images/smile_case2_after_1783268592075.png',
    label: 'Orthodontics'
  },
  {
    before: '/images/smile_case3_before_1783268554074.png',
    after: '/images/smile_case3_after_1783268603170.png',
    label: 'Ceramic Restorations'
  }
];

const SvgArrows = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="#1B7F79">
    <polyline points="15 18 21 12 15 6" /><polyline points="9 18 3 12 9 6" />
  </svg>
);
const SvgCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="#1B7F79" style={{ width: 15, height: 15 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SmileSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pos, setPos] = useState(52);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const activeCase = CASES[activeIdx];

  return (
    <section className="smile-section" id="smile">
      <div className="wrap">
        <div className="smile-wrap">
          {/* Info */}
          <div className="smile-info">
            <div className="section-eyebrow t-label">Real Results</div>
            <h2>Transformations<br />That Speak for Themselves.</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
              Drag the divider to compare real treatment outcomes. Every smile you see reflects the precision craftsmanship of our Dharan Dental team.
            </p>

            <div className="smile-list">
              {[
                'Porcelain Veneers & Smile Design',
                'Professional Teeth Whitening',
                'Full Orthodontic Treatment',
                'Composite Bonding & Restoration',
                'Dental Implants & Crowns',
              ].map((item, i) => (
                <div key={i} className="smile-list-item">
                  <SvgCheck />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a href="#appointment" className="btn btn-ink" style={{ marginTop: '0.5rem' }}
              onClick={e => { e.preventDefault(); document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Start Your Transformation →
            </a>
          </div>

          {/* Comparison Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <div
              ref={boxRef}
              className="compare-box"
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
              onMouseMove={e => { if (dragging) update(e.clientX); }}
              onTouchStart={() => setDragging(true)}
              onTouchEnd={() => setDragging(false)}
              onTouchMove={e => update(e.touches[0].clientX)}
            >
              {/* After (color) */}
              <div className="compare-after">
                <img src={activeCase.after} alt="Patient smile after dental treatment" loading="lazy" />
              </div>

              {/* Before */}
              <div className="compare-before" style={{ width: `${pos}%` }}>
                <img src={activeCase.before} alt="Patient before dental treatment" loading="lazy" />
              </div>

              {/* Labels */}
              <div className="compare-label left">Before</div>
              <div className="compare-label right" style={{ zIndex: 20 }}>After</div>

              {/* Divider */}
              <div className="compare-handle" style={{ left: `${pos}%` }}>
                <div className="compare-handle-knob">
                  <SvgArrows />
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {CASES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setPos(52); }}
                  style={{
                    padding: '0.5rem 1.2rem',
                    borderRadius: '30px',
                    border: '1px solid var(--border)',
                    background: activeIdx === i ? 'var(--ink)' : 'transparent',
                    color: activeIdx === i ? '#ffffff' : 'var(--ink)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all var(--t2)'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
