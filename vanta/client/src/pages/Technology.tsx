import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const features = [
  { title: 'ACTIVE AERODYNAMICS', desc: 'Adaptive surfaces adjust 100 times per second for optimal downforce.' },
  { title: 'CARBON MONOCOQUE', desc: 'Single-piece tub weighing just 68kg with exceptional rigidity.' },
  { title: 'ADAPTIVE SUSPENSION', desc: 'Real-time damping adjustment for any road condition.' },
  { title: 'TORQUE VECTORING', desc: 'Intelligent power distribution for maximum traction.' },
  { title: 'PREDICTIVE TELEMETRY', desc: 'AI-driven performance optimization and diagnostics.' },
  { title: 'INTELLIGENT DRIVE CONTROL', desc: 'Multiple modes adapting to driver preference and conditions.' },
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-hero h1', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' });
      gsap.utils.toArray('.tech-card').forEach((card: any, i) => {
        gsap.from(card, {
          x: -50,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="technology-page">
      <section className="tech-hero">
        <h1>TECHNOLOGY</h1>
        <p>INNOVATION WITHOUT COMPROMISE</p>
      </section>
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="tech-grid" style={{ display: 'grid', gap: '1px', background: 'rgba(255,255,255,0.1)' }}>
          {features.map((f, i) => (
            <div key={i} className="tech-card" style={{ padding: '2rem', background: '#0a0a0a', minHeight: '150px' }}>
              <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: '#ff4500' }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#888' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <style>{`.technology-page{padding-top:80px}.tech-hero{min-height:50vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;background:radial-gradient(ellipse at center,#1a1a1a 0%,#0a0a0a 100%)}.tech-hero h1{font-size:clamp(3rem,10vw,6rem);margin-bottom:1rem}.tech-hero p{font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-text-muted)}.tech-grid{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}`}</style>
    </main>
  );
}
