import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hotspots } from '@/utils/constants';

export default function Machine() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.machine-hero h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.utils.toArray('.hotspot-btn').forEach((btn: any, i) => {
        gsap.from(btn, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: btn,
            start: 'top 80%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="machine-page">
      <section className="machine-hero">
        <h1>THE MACHINE</h1>
        <p>EVERY ELEMENT ENGINEERED FOR PERFECTION</p>
      </section>

      <section className="hotspots-section">
        <div className="vehicle-map">
          <svg viewBox="0 0 800 400" className="vehicle-outline">
            <path d="M100,280 L150,250 L200,240 L300,230 L450,220 L550,230 L650,250 L700,280 L720,320 L80,320 Z" fill="none" stroke="#333" strokeWidth="2"/>
          </svg>
          
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              className={`hotspot-btn ${activeHotspot === spot.id ? 'active' : ''}`}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              aria-label={spot.label}
            >
              <span className="hotspot-dot" />
              <span className="hotspot-label">{spot.label}</span>
              
              {activeHotspot === spot.id && (
                <div className="hotspot-info">
                  <h3>{spot.title}</h3>
                  <p>{spot.description}</p>
                  {spot.stats && (
                    <div className="hotspot-stats">
                      {Object.entries(spot.stats).map(([key, value]) => (
                        <div key={key} className="stat">
                          <span className="stat-value">{value}</span>
                          <span className="stat-key">{key}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <style>{`
        .machine-page {
          padding-top: 80px;
        }
        .machine-hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 4rem 2rem;
          background: radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%);
        }
        .machine-hero h1 {
          font-size: clamp(3rem, 10vw, 8rem);
          margin-bottom: 1rem;
        }
        .machine-hero p {
          font-size: 0.875rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .hotspots-section {
          padding: 6rem 2rem;
        }
        .vehicle-map {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          aspect-ratio: 2/1;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        .vehicle-outline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .hotspot-btn {
          position: absolute;
          transform: translate(-50%, -50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 1rem;
          z-index: 10;
        }
        .hotspot-dot {
          display: block;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #8b0000, #ff4500);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .hotspot-label {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.625rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          color: var(--color-text-muted);
        }
        .hotspot-info {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          padding: 1.5rem;
          background: #121212;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 20;
        }
        .hotspot-info h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .hotspot-info p {
          font-size: 0.75rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }
        .hotspot-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .stat {
          text-align: center;
          padding: 0.5rem;
          background: rgba(255,255,255,0.03);
        }
        .stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
        }
        .stat-key {
          display: block;
          font-size: 0.625rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
      `}</style>
    </main>
  );
}

import { useState } from 'react';
