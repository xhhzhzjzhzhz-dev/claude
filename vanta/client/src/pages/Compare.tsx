import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface Config { name: string; power: number; torque: number; weight: number; zeroToHundred: number; topSpeed: number; price: number; }

export default function Compare() {
  const [config1] = useState<Config>({ name: 'VANTA ONE - Standard', power: 800, torque: 700, weight: 1450, zeroToHundred: 2.8, topSpeed: 350, price: 285000 });
  const [config2] = useState<Config>({ name: 'VANTA ONE - Track', power: 820, torque: 720, weight: 1420, zeroToHundred: 2.6, topSpeed: 355, price: 320000 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.compare-hero h1', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' });
      gsap.from('.compare-row', { x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.compare-table', start: 'top 70%' } });
    });
    return () => ctx.revert();
  }, []);

  const specs = [
    { key: 'power', label: 'POWER', unit: 'HP', better: 'higher' },
    { key: 'torque', label: 'TORQUE', unit: 'NM', better: 'higher' },
    { key: 'weight', label: 'WEIGHT', unit: 'KG', better: 'lower' },
    { key: 'zeroToHundred', label: '0-100 KM/H', unit: 'SEC', better: 'lower' },
    { key: 'topSpeed', label: 'TOP SPEED', unit: 'KM/H', better: 'higher' },
    { key: 'price', label: 'PRICE', unit: '', better: 'lower', prefix: '$' },
  ];

  return (
    <main className="compare-page">
      <section className="compare-hero">
        <h1>COMPARISON</h1>
        <p>EVALUATE YOUR OPTIONS</p>
      </section>
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="compare-table" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="compare-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span></span>
            <span style={{ textAlign: 'center', color: '#ff4500' }}>{config1.name}</span>
            <span style={{ textAlign: 'center', color: '#ff4500' }}>{config2.name}</span>
          </div>
          {specs.map((spec) => {
            const v1 = config1[spec.key as keyof Config] as number;
            const v2 = config2[spec.key as keyof Config] as number;
            const highlight1 = spec.better === 'higher' ? v1 > v2 : v1 < v2;
            const highlight2 = spec.better === 'higher' ? v2 > v1 : v2 < v1;
            return (
              <div key={spec.key} className="compare-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', padding: '1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666' }}>{spec.label}</span>
                <span style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, color: highlight1 ? '#fff' : '#888' }}>{spec.prefix}{v1}{spec.unit}</span>
                <span style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, color: highlight2 ? '#fff' : '#888' }}>{spec.prefix}{v2}{spec.unit}</span>
              </div>
            );
          })}
        </div>
      </section>
      <style>{`.compare-page{padding-top:80px}.compare-hero{min-height:40vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;background:radial-gradient(ellipse at center,#1a1a1a 0%,#0a0a0a 100%)}.compare-hero h1{font-size:clamp(3rem,10vw,6rem);margin-bottom:1rem}.compare-hero p{font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-text-muted)}`}</style>
    </main>
  );
}
