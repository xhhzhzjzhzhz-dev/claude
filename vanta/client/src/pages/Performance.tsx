import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TelemetryDisplay from '@/components/TelemetryDisplay';

export default function Performance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.perf-hero h1', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' });
      gsap.from('.perf-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.perf-grid', start: 'top 70%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="performance-page">
      <section className="perf-hero">
        <h1>PERFORMANCE</h1>
        <p>NUMBERS THAT DEFINE EXCELLENCE</p>
      </section>
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="perf-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div className="perf-card" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, background: 'linear-gradient(135deg, #8b0000, #ff4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2.8</span>
            <span style={{ display: 'block', color: '#666', marginTop: '0.5rem' }}>0-100 KM/H (SEC)</span>
          </div>
          <div className="perf-card" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, background: 'linear-gradient(135deg, #8b0000, #ff4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>350+</span>
            <span style={{ display: 'block', color: '#666', marginTop: '0.5rem' }}>TOP SPEED (KM/H)</span>
          </div>
          <div className="perf-card" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, background: 'linear-gradient(135deg, #8b0000, #ff4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>800</span>
            <span style={{ display: 'block', color: '#666', marginTop: '0.5rem' }}>HORSEPOWER</span>
          </div>
          <div className="perf-card" style={{ textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, background: 'linear-gradient(135deg, #8b0000, #ff4500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>700</span>
            <span style={{ display: 'block', color: '#666', marginTop: '0.5rem' }}>TORQUE (NM)</span>
          </div>
        </div>
        <TelemetryDisplay />
      </section>
      <style>{`.performance-page{padding-top:80px}.perf-hero{min-height:50vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;background:radial-gradient(ellipse at center,#1a1a1a 0%,#0a0a0a 100%)}.perf-hero h1{font-size:clamp(3rem,10vw,6rem);margin-bottom:1rem}.perf-hero p{font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-text-muted)}`}</style>
    </main>
  );
}
