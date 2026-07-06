import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const TABS = {
  'General': {
    head: 'General Dentistry',
    sub: 'Consultation, preventive care & restoration',
    rows: [
      { name: 'Complete Dental Consultation',    price: 'Rs. 500' },
      { name: 'Digital X-Ray (Per Film)',         price: 'Rs. 300' },
      { name: 'Ultrasonic Scaling & Polishing',   price: 'Rs. 1,500' },
      { name: 'Simple Tooth Extraction',          price: 'Rs. 1,200' },
      { name: 'Root Canal Treatment (RCT)',       price: 'Rs. 4,500' },
      { name: 'Full Removable Denture',           price: 'Rs. 12,000' },
    ],
  },
  'Cosmetic': {
    head: 'Cosmetic & Aesthetic',
    sub: 'Smile designing, whitening & veneers',
    rows: [
      { name: 'Teeth Whitening (Laser)',            price: 'Rs. 8,000' },
      { name: 'Composite Bonding (Per Tooth)',      price: 'Rs. 3,500' },
      { name: 'Porcelain Veneer (Per Tooth)',       price: 'Rs. 14,000' },
      { name: 'Smile Designing (Full Makeover)',    price: 'Rs. 30,000+' },
      { name: 'Inlay / Onlay — Ceramic',            price: 'Rs. 7,000' },
      { name: 'Full Zirconia Crown',                price: 'Rs. 12,000' },
    ],
  },
  'Surgical': {
    head: 'Surgical & Orthodontic',
    sub: 'Implants, braces, Invisalign & surgery',
    rows: [
      { name: 'Dental Implant (Titanium)',           price: 'Rs. 45,000' },
      { name: 'Surgical Wisdom Tooth Removal',      price: 'Rs. 6,500' },
      { name: 'Bone Grafting',                       price: 'Rs. 18,000' },
      { name: 'Gum Flap Surgery',                   price: 'Rs. 8,000' },
      { name: 'Full Orthodontic Braces',            price: 'Rs. 40,000' },
      { name: 'Invisalign Clear Aligners',          price: 'Rs. 80,000' },
    ],
  },
} as const;

type TabKey = keyof typeof TABS;

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const icons: Record<TabKey, React.ReactNode> = {
  'General': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  'Cosmetic': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  'Surgical': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

export default function Pricing() {
  const [tab, setTab] = useState<TabKey>('General');
  const active = TABS[tab];

  return (
    <section className="pricing-modern" id="pricing">
      {/* Decorative Orbs behind the glass */}
      <div className="pricing-orb pricing-orb-1" />
      <div className="pricing-orb pricing-orb-2" />

      <div className="wrap pricing-modern-wrap">
        
        {/* Centered Header */}
        <div className="pricing-modern-header">
          <div className="section-eyebrow t-label">Treatment Fees</div>
          <h2>Transparent, Honest Pricing.</h2>
          <p>No hidden fees. We believe you deserve to know costs before you decide. All prices are indicative — final estimates after consultation.</p>
        </div>

        {/* Horizontal Pill Tabs */}
        <div className="pricing-modern-tabs">
          {(Object.keys(TABS) as TabKey[]).map(k => (
            <button
              key={k}
              className={`price-tab-pill ${tab === k ? 'active' : ''}`}
              onClick={() => setTab(k)}
            >
              {icons[k]}
              {k} Dentistry
            </button>
          ))}
        </div>

        {/* Glassmorphism Menu Card */}
        <div className="pricing-modern-card-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              className="pricing-modern-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="pricing-table-header">
                <h3>{active.head}</h3>
                <p>{active.sub}</p>
              </div>
              <div className="pricing-table-body">
                {active.rows.map((row, i) => (
                  <motion.div
                    key={row.name}
                    className="price-modern-row"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.4, ease }}
                  >
                    <div className="price-row-left">
                      <span className="price-row-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                      <span className="price-row-name">{row.name}</span>
                    </div>
                    <div className="price-row-right">
                      <div className="price-row-line"></div>
                      <span className="price-row-amount">{row.price}</span>
                      <span className="price-row-arrow">→</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pricing-modern-footnote">
          <InfoIcon />
          <span>Prices may vary. Call <strong>025-578729</strong> for an exact estimate at your nearest branch.</span>
        </div>

      </div>
    </section>
  );
}
