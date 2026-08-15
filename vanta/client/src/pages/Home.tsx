import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TelemetryDisplay from '@/components/TelemetryDisplay';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const machineSectionRef = useRef<HTMLElement>(null);
  const performanceRef = useRef<HTMLElement>(null);
  const storytellingRef = useRef<HTMLElement>(null);
  const finalCtaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      const heroTl = gsap.timeline();
      heroTl.from('.hero-title .line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.5')
      .from('.hero-buttons button', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.3');

      // Machine section parallax
      gsap.to('.machine-image', {
        xPercent: -15,
        scrollTrigger: {
          trigger: machineSectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Performance counters
      const perfTl = gsap.timeline({
        scrollTrigger: {
          trigger: performanceRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
      });

      perfTl.from('.perf-stat', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Storytelling pin sequence
      gsap.to('.story-text', {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: storytellingRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true,
        },
      });

      // Final CTA reveal
      gsap.from(finalCtaRef.current?.querySelectorAll('.cta-element'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: finalCtaRef.current,
          start: 'top 70%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line">THE ROAD</span>
            <span className="line">WAS NEVER</span>
            <span className="line">ENOUGH.</span>
          </h1>
          <p className="hero-subtitle">
            AN INTELLIGENCE-DRIVEN MACHINE BUILT BEYOND THE EXPECTED.
          </p>
          <div className="hero-buttons">
            <Link to="/configure" className="btn-primary">ENTER THE MACHINE</Link>
            <Link to="/performance" className="btn-outline">EXPLORE PERFORMANCE</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* Machine Reveal Section */}
      <section ref={machineSectionRef} className="machine-reveal">
        <div className="machine-content">
          <div className="machine-image">
            <div className="vehicle-placeholder">
              <svg viewBox="0 0 800 400" className="vehicle-svg">
                <path d="M100,280 L150,250 L200,240 L300,230 L450,220 L550,230 L650,250 L700,280 L720,320 L80,320 Z" fill="#1a1a1a"/>
                <circle cx="200" cy="320" r="50" fill="#0a0a0a" stroke="#333" strokeWidth="3"/>
                <circle cx="600" cy="320" r="50" fill="#0a0a0a" stroke="#333" strokeWidth="3"/>
                <path d="M250,240 Q350,200 500,240" fill="none" stroke="#333" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <div className="machine-specs">
            <div className="spec-item">
              <span className="spec-value">800+</span>
              <span className="spec-label">HORSEPOWER</span>
            </div>
            <div className="spec-item">
              <span className="spec-value">2.8s</span>
              <span className="spec-label">0-100 KM/H</span>
            </div>
            <div className="spec-item">
              <span className="spec-value">350+</span>
              <span className="spec-label">TOP SPEED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section ref={performanceRef} className="performance-section">
        <div className="container">
          <p className="section-label">PERFORMANCE METRICS</p>
          <div className="perf-grid">
            <div className="perf-stat">
              <span className="perf-number">2.8</span>
              <span className="perf-unit">SEC</span>
              <span className="perf-desc">0—100 KM/H</span>
            </div>
            <div className="perf-stat">
              <span className="perf-number">350+</span>
              <span className="perf-unit">KM/H</span>
              <span className="perf-desc">TOP SPEED</span>
            </div>
            <div className="perf-stat">
              <span className="perf-number">800+</span>
              <span className="perf-unit">HP</span>
              <span className="perf-desc">POWER</span>
            </div>
            <div className="perf-stat">
              <span className="perf-number">700</span>
              <span className="perf-unit">NM</span>
              <span className="perf-desc">TORQUE</span>
            </div>
          </div>
          <TelemetryDisplay />
        </div>
      </section>

      {/* Storytelling Section */}
      <section ref={storytellingRef} className="storytelling-section">
        <div className="story-container">
          <div className="story-text">
            <h2>DESIGNED<br/>WITHOUT<br/>COMPROMISE.</h2>
          </div>
          <div className="story-text">
            <h2>ENGINEERED<br/>FOR ONE<br/>PURPOSE.</h2>
          </div>
          <div className="story-text">
            <h2>PURE<br/>PERFORMANCE.</h2>
          </div>
          <div className="story-text">
            <h2>NOT BUILT<br/>TO BLEND IN.</h2>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={finalCtaRef} className="final-cta">
        <div className="cta-content">
          <h2 className="cta-title cta-element">
            READY<br/>TO EXPERIENCE<br/>VANTA?
          </h2>
          <Link to="/configure" className="btn-primary cta-element">ENTER THE EXPERIENCE</Link>
        </div>
      </section>

      <style>{`
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%);
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.03;
        }
        .hero-content {
          text-align: center;
          z-index: 1;
          padding: 2rem;
        }
        .hero-title {
          font-size: clamp(3rem, 12vw, 10rem);
          line-height: 0.9;
          margin-bottom: 2rem;
          overflow: hidden;
        }
        .hero-title .line {
          display: block;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-size: clamp(0.75rem, 2vw, 1rem);
          letter-spacing: 0.2em;
          color: var(--color-text-muted);
          margin-bottom: 3rem;
          max-width: 600px;
        }
        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, #fff, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
        .scroll-indicator span {
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .machine-reveal {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
        }
        .machine-content {
          width: 100%;
          max-width: 1200px;
          padding: 4rem 2rem;
        }
        .machine-image {
          width: 100%;
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vehicle-placeholder {
          width: 100%;
          max-width: 800px;
        }
        .vehicle-svg {
          width: 100%;
          height: auto;
        }
        .machine-specs {
          display: flex;
          justify-content: space-around;
          margin-top: 4rem;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .spec-item {
          text-align: center;
        }
        .spec-value {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
        }
        .spec-label {
          display: block;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
        }
        .performance-section {
          padding: 8rem 2rem;
          background: #0f0f0f;
        }
        .perf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 4rem;
        }
        .perf-stat {
          text-align: center;
        }
        .perf-number {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          background: linear-gradient(135deg, #8b0000, #ff4500);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .perf-unit {
          display: block;
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-top: -0.5rem;
        }
        .perf-desc {
          display: block;
          font-size: 0.625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
        }
        .storytelling-section {
          height: 400vh;
          position: relative;
        }
        .story-container {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          overflow: hidden;
          background: #0a0a0a;
        }
        .story-text {
          min-width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
        }
        .story-text h2 {
          font-size: clamp(2rem, 8vw, 6rem);
          line-height: 1.1;
          text-align: center;
        }
        .final-cta {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%);
          padding: 4rem 2rem;
        }
        .cta-content {
          text-align: center;
        }
        .cta-title {
          font-size: clamp(2rem, 8vw, 6rem);
          line-height: 1;
          margin-bottom: 3rem;
        }
        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .machine-specs {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
