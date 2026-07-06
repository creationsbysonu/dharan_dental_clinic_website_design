import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { scrollTo: (id: string) => void; }

const LINKS = [
  { label: 'Services',    id: '#services'     },
  { label: 'About',       id: '#about'        },
  { label: 'Pricing',     id: '#pricing'      },
  { label: 'Results',     id: '#smile'        },
  { label: 'Branches',    id: '#branches'     },
  { label: 'Book',        id: '#appointment'  },
];

export default function Navbar({ scrollTo }: Props) {
  const [solid, setSolid]   = useState(false);
  const [open, setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); setOpen(false); scrollTo(id);
  };

  return (
    <>
      <nav className={`nav ${solid ? 'solid' : ''}`}>
        <div className="wrap nav-inner">
          {/* Logo */}
          <a href="/" className="nav-logo" aria-label="Dharan Dental Clinic">
            <div className="nav-logo-mark">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C9.5 2 7 3.5 6 5.5c-1 2-1 5 0 7 .7 1.4 1 3.1 1 5.5 0 2 .5 4 3 4s3-2 3-4c0-1 .5-2 1-2s1 1 1 2c0 2 .5 4 3 4s3-2 3-4c0-2.4.3-4.1 1-5.5 1-2 1-5 0-7C22 3.5 19.5 2 17 2c-1.5 0-3 .7-4 1.8-.5.5-.9 1-1 1.8-.1-.8-.5-1.3-1-1.8C10 2.7 8.5 2 7 2z" />
              </svg>
            </div>
            <div>
              <div className="nav-logo-text">Dharan<span>Dental</span></div>
              <div className="nav-logo-sub">A Complete Dental Solution</div>
            </div>
          </a>

          {/* Links */}
          <ul className="nav-links" role="navigation">
            {LINKS.map(l => (
              <li key={l.id}>
                <a href={l.id} onClick={e => go(e, l.id)}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="nav-actions">
            <a href="tel:025578729" className="nav-phone" aria-label="Call 025-578729">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.82 9.8 19.79 19.79 0 01.75 1.17 2 2 0 012.73 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="1.5" stroke="currentColor" fill="none"/></svg>
              <span>025-578729</span>
            </a>
            <a href="#appointment" onClick={e => go(e, '#appointment')} className="btn btn-teal">Book Appointment</a>
            <button
              className="nav-burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <div className="nav-burger-lines">
                <span /><span /><span />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button className="mobile-overlay-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
            {LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={l.id}
                onClick={e => go(e, l.id)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
