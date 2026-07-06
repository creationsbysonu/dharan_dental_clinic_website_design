// Tooth SVG path (inline, no lucide dependency)
const ToothPath = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C9.5 2 7 3.5 6 5.5c-1 2-1 5 0 7 .7 1.4 1 3.1 1 5.5 0 2 .5 4 3 4s3-2 3-4c0-1 .5-2 1-2s1 1 1 2c0 2 .5 4 3 4s3-2 3-4c0-2.4.3-4.1 1-5.5 1-2 1-5 0-7C22 3.5 19.5 2 17 2c-1.5 0-3 .7-4 1.8C12.5 4.3 12.1 4.8 12 5.6c-.1-.8-.5-1.3-1-1.8C10 2.7 8.5 2 7 2z" />
  </svg>
);

const SvgFb = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function Footer() {
  const y = new Date().getFullYear();
  const SvgPhone = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.82 9.8 19.79 19.79 0 01.75 1.17 2 2 0 012.73 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
  );
  const SvgMail = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  );
  const SvgPin = () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  );

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <div className="footer-brand-logo">
              <div className="logo-mark"><ToothPath /></div>
              <div className="logo-text">Dharan<span>Dental</span></div>
            </div>
            <p className="footer-tagline">
              A complete dental solution serving communities across Province 1, Nepal since 2003. Compassionate care meets cutting-edge technology.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/dharandentalclinic/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <SvgFb />
              </a>
            </div>
          </div>

          {/* Services col */}
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              {['Crown & Bridge', 'Dental Implants', 'Braces & Invisalign', 'Cosmetic Dentistry', 'Digital Imaging', 'Root Canal', 'Removable Dentures'].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Branches col */}
          <div className="footer-col">
            <h5>Branches</h5>
            <ul>
              {['Dharan-9 HQ', 'Gaighat', 'Biratnagar', 'Itahari', 'Tarahara', 'Jhumka', 'Duhabi'].map(b => (
                <li key={b}><a href="#branches">{b}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="tel:025578729">
                  <SvgPhone /> 025-578729
                </a>
              </li>
              <li>
                <a href="tel:025575910">
                  <SvgPhone /> 025-575910
                </a>
              </li>
              <li>
                <a href="mailto:dharandental2003@gmail.com">
                  <SvgMail /> dharandental2003@gmail.com
                </a>
              </li>
              <li>
                <a href="#branches">
                  <SvgPin /> Dharan-9, Putali Line, Sunsari
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {y} Dharan Dental Clinic. All rights reserved.</span>
          <span>Designed with precision by <a href="#">Sonu</a></span>
        </div>
      </div>
    </footer>
  );
}
