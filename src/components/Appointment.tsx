import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const SvgUser = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const SvgPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.82 9.8 19.79 19.79 0 01.75 1.17 2 2 0 012.73 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const SvgCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SvgSteth = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
    <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);
const SvgMap = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const SvgCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" style={{ width: 22, height: 22 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SvgClock = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" style={{ width: 15, height: 15 }}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const BRANCHES = [
  'Head Office — Dharan-9, Putali Line',
  'Gaighat Branch',
  'Biratnagar Branch',
  'Itahari, B.P. Chowk',
  'Tarahara, Bargachhi',
  'Jhumka Branch',
  'Duhabi Branch',
];
const SERVICES = [
  'General Consultation',
  'Scaling & Cleaning',
  'Root Canal Treatment',
  'Dental Implant',
  'Braces / Invisalign',
  'Crown / Bridge / Veneer',
  'Cosmetic Dentistry',
  'Teeth Whitening',
  'Tooth Extraction',
  'Emergency Care',
  'Other',
];

const CONTACTS = [
  { Icon: SvgMap,    label: 'Address',        value: 'Dharan-9, Putali Line\nSunsari, Nepal' },
  { Icon: SvgPhone,  label: 'Phone / WhatsApp', value: '025-578729 · 025-575910\n9824381202' },
  { Icon: SvgClock,  label: 'Open Daily',      value: '7:00 AM — 9:00 PM' },
];

export default function Appointment() {
  const [state, setState] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', branch: '' });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState('success');
    setTimeout(() => {
      setState('form');
      setForm({ name: '', phone: '', service: '', date: '', branch: '' });
    }, 7000);
  };

  return (
    <section className="appointment" id="appointment">
      <div className="wrap">
        <div className="apt-grid">

          {/* Left */}
          <div className="apt-left">
            <div className="section-eyebrow t-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Book a Visit</div>
            <h2>Smart Appointment Engine</h2>
            <p>Fill the form and our team confirms your slot within the hour — no waiting, no hassle.</p>

            <div className="apt-info-cards">
              {CONTACTS.map((c, i) => (
                <div key={i} className="apt-info-card">
                  <div className="apt-info-card-icon"><c.Icon /></div>
                  <div>
                    <div className="apt-info-card-label">{c.label}</div>
                    <div className="apt-info-card-value" style={{ whiteSpace: 'pre-line' }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form card */}
          <div className="apt-form-card">
            <AnimatePresence mode="wait">
              {state === 'form' ? (
                <motion.form key="form" onSubmit={submit}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }}>
                  <h3>Request an Appointment</h3>
                  <p>We will call to confirm your preferred slot.</p>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <div className="form-field-wrap">
                        <div className="form-field-icon"><SvgUser /></div>
                        <input required className="form-input" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <div className="form-field-wrap">
                        <div className="form-field-icon"><SvgPhone /></div>
                        <input required className="form-input" type="tel" placeholder="+977 98..." value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Service Required</label>
                      <div className="form-field-wrap">
                        <div className="form-field-icon"><SvgSteth /></div>
                        <select required className="form-select" value={form.service} onChange={set('service')}>
                          <option value="">Select service...</option>
                          {SERVICES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Date</label>
                      <div className="form-field-wrap">
                        <div className="form-field-icon"><SvgCalendar /></div>
                        <input required className="form-input" type="date" value={form.date} onChange={set('date')} min={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>
                  </div>

                  <div className="form-row single">
                    <div className="form-group">
                      <label className="form-label">Preferred Branch</label>
                      <div className="form-field-wrap">
                        <div className="form-field-icon"><SvgMap /></div>
                        <select className="form-select" value={form.branch} onChange={set('branch')}>
                          <option value="">Any branch (team will confirm)</option>
                          {BRANCHES.map(b => <option key={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="form-submit">
                    <SvgCalendar />
                    Confirm Appointment Request
                  </button>
                </motion.form>
              ) : (
                <motion.div key="success" className="apt-success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>
                  <motion.div className="apt-success-icon"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}>
                    <SvgCheck />
                  </motion.div>
                  <h3>Request Received, {form.name.split(' ')[0]}!</h3>
                  <p>Our team will call <strong>{form.phone}</strong> within the next hour to confirm your appointment. Thank you for choosing Dharan Dental Clinic.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
