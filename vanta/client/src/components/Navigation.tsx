import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { navItems } from '@/utils/constants';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.nav-link',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav ref={navRef} className={`navigation ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">VANTA</Link>
          
          <ul className="nav-menu desktop">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.href} 
                  className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button 
            className="nav-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger" />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item, i) => (
            <li key={item.label} style={{ '--delay': i } as React.CSSProperties}>
              <Link to={item.href} className="mobile-nav-link">{item.label}</Link>
            </li>
          ))}
          <li style={{ '--delay': navItems.length } as React.CSSProperties}>
            <Link to="/login" className="mobile-nav-link">LOGIN</Link>
          </li>
        </ul>
      </div>

      <style>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 2rem;
          transition: all 0.4s var(--easing-power);
        }
        .navigation.scrolled {
          padding: 1rem 2rem;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(10px);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1440px;
          margin: 0 auto;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #fff;
        }
        .nav-menu.desktop {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        .nav-link {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
          transition: color 0.3s ease;
          position: relative;
        }
        .nav-link:hover,
        .nav-link.active {
          color: #fff;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #8b0000, #ff4500);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-toggle {
          display: none;
          width: 40px;
          height: 40px;
          position: relative;
        }
        .hamburger {
          display: block;
          width: 20px;
          height: 2px;
          background: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background: #fff;
          left: 0;
          transition: all 0.3s ease;
        }
        .hamburger::before {
          top: -6px;
        }
        .hamburger::after {
          bottom: -6px;
        }
        .nav-toggle[aria-expanded="true"] .hamburger {
          background: transparent;
        }
        .nav-toggle[aria-expanded="true"] .hamburger::before {
          transform: rotate(45deg);
          top: 0;
        }
        .nav-toggle[aria-expanded="true"] .hamburger::after {
          transform: rotate(-45deg);
          bottom: 0;
        }
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(100%);
          transition: transform 0.5s var(--easing-power);
          z-index: 999;
        }
        .mobile-menu.open {
          transform: translateX(0);
        }
        .mobile-nav-list {
          list-style: none;
          text-align: center;
        }
        .mobile-nav-list li {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.5s var(--easing-power) forwards;
          animation-delay: calc(var(--delay) * 0.1s);
        }
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #fff;
          display: block;
          padding: 0.5rem 0;
        }
        @media (max-width: 1024px) {
          .nav-menu.desktop {
            display: none;
          }
          .nav-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
