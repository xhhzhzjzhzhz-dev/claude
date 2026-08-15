import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { colors, wheels, interiors, trims, aeroPackages } from '@/utils/constants';

export default function Configure() {
  const [config, setConfig] = useState({ color: '#0a0a0a', wheels: 'standard', interior: 'standard', trim: 'standard', aeroPackage: 'standard' });
  const [basePrice] = useState(285000);
  const [saved, setSaved] = useState(false);

  const optionPrices: Record<string, number> = { standard: 0, sport: 5000, carbon: 15000, forged: 8000, premium: 12000, track: 10000 };
  const totalPrice = basePrice + optionPrices[config.wheels] + optionPrices[config.interior] + optionPrices[config.trim] + optionPrices[config.aeroPackage];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.config-hero h1', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' });
      gsap.from('.config-option', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.config-options', start: 'top 70%' } });
    });
    return () => ctx.revert();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('vanta_token');
      if (!token) { alert('Please login to save configurations'); return; }
      await fetch('/api/vehicles/configurations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ vehicleId: 'vehicle-id', ...config }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { alert('Failed to save configuration'); }
  };

  return (
    <main className="configure-page">
      <section className="config-hero">
        <h1>CONFIGURATOR</h1>
        <p>BUILD YOUR VANTA ONE</p>
      </section>
      <section className="container" style={{ padding: '4rem 2rem' }}>
        <div className="config-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
          <div className="config-visual" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 400 200" style={{ width: '100%', maxWidth: '400px' }}>
              <path d="M50,140 L75,125 L100,120 L150,115 L225,110 L275,115 L325,125 L350,140 L360,160 L40,160 Z" fill={config.color} stroke="#333" strokeWidth="2"/>
              <circle cx="100" cy="160" r="25" fill="#0a0a0a" stroke="#333" strokeWidth="2"/>
              <circle cx="300" cy="160" r="25" fill="#0a0a0a" stroke="#333" strokeWidth="2"/>
            </svg>
          </div>
          <div className="config-options">
            <div className="config-option" style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>COLOR</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {colors.map((c) => (
                  <button key={c.value} onClick={() => setConfig({ ...config, color: c.value })} style={{ width: '40px', height: '40px', background: c.value, border: config.color === c.value ? '2px solid #ff4500' : '1px solid #333', borderRadius: '50%', cursor: 'pointer' }} aria-label={c.name} />
                ))}
              </div>
            </div>
            <div className="config-option" style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>WHEELS</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {wheels.map((w) => (
                  <button key={w.value} onClick={() => setConfig({ ...config, wheels: w.value })} className={`btn-outline ${config.wheels === w.value ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', border: config.wheels === w.value ? '1px solid #ff4500' : '1px solid #333' }}>{w.name} (+${w.price.toLocaleString()})</button>
                ))}
              </div>
            </div>
            <div className="config-option" style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>INTERIOR</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {interiors.map((i) => (
                  <button key={i.value} onClick={() => setConfig({ ...config, interior: i.value })} className={`btn-outline ${config.interior === i.value ? 'active' : ''}`} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', border: config.interior === i.value ? '1px solid #ff4500' : '1px solid #333' }}>{i.name} (+${i.price.toLocaleString()})</button>
                ))}
              </div>
            </div>
            <div className="config-summary" style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#666' }}>Base Price</span>
                <span>${basePrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: '#666' }}>Options</span>
                <span>+${(totalPrice - basePrice).toLocaleString()}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: '#ff4500' }}>${totalPrice.toLocaleString()}</span>
              </div>
              <button onClick={handleSave} className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>{saved ? 'SAVED!' : 'SAVE CONFIGURATION'}</button>
            </div>
          </div>
        </div>
      </section>
      <style>{`.configure-page{padding-top:80px}.config-hero{min-height:40vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:4rem 2rem;background:radial-gradient(ellipse at center,#1a1a1a 0%,#0a0a0a 100%)}.config-hero h1{font-size:clamp(3rem,10vw,6rem);margin-bottom:1rem}.config-hero p{font-size:0.875rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-text-muted)}.btn-outline.active{border-color:#ff4500!important}`}</style>
    </main>
  );
}
