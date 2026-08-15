import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function TelemetryDisplay() {
  const [telemetry, setTelemetry] = useState({
    rpm: 3500,
    boost: 1.2,
    temperature: 85,
    gForce: 1.0,
    throttle: 45,
    lapDelta: 0.0,
  });

  const rpmRef = useRef<HTMLDivElement>(null);
  const boostRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        rpm: Math.floor(3000 + Math.random() * 5000),
        boost: +(0.5 + Math.random() * 1.8).toFixed(2),
        temperature: +(75 + Math.random() * 35).toFixed(1),
        gForce: +(0.2 + Math.random() * 2.5).toFixed(2),
        throttle: +(20 + Math.random() * 80).toFixed(1),
        lapDelta: (+(-0.5 + Math.random() * 1.5).toFixed(3)),
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const bars = [rpmRef, boostRef, tempRef, gRef, throttleRef].map(r => r.current);
    bars.forEach((bar, i) => {
      if (bar) {
        gsap.to(bar, {
          height: `${20 + Math.random() * 60}%`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  }, [telemetry]);

  return (
    <div className="telemetry-display">
      <p className="section-label">LIVE TELEMETRY</p>
      <div className="telemetry-grid">
        <div className="telemetry-item">
          <span className="telemetry-label">RPM</span>
          <span className="telemetry-value">{telemetry.rpm.toLocaleString()}</span>
          <div className="telemetry-bar"><div ref={rpmRef} className="telemetry-fill" /></div>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">BOOST</span>
          <span className="telemetry-value">{telemetry.boost} bar</span>
          <div className="telemetry-bar"><div ref={boostRef} className="telemetry-fill" /></div>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">TEMP</span>
          <span className="telemetry-value">{telemetry.temperature}°C</span>
          <div className="telemetry-bar"><div ref={tempRef} className="telemetry-fill" /></div>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">G-FORCE</span>
          <span className="telemetry-value">{telemetry.gForce}g</span>
          <div className="telemetry-bar"><div ref={gRef} className="telemetry-fill" /></div>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-label">THROTTLE</span>
          <span className="telemetry-value">{telemetry.throttle}%</span>
          <div className="telemetry-bar"><div ref={throttleRef} className="telemetry-fill" /></div>
        </div>
      </div>
      <style>{`
        .telemetry-display {
          margin-top: 4rem;
          padding: 2rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .telemetry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .telemetry-item {
          text-align: center;
        }
        .telemetry-label {
          display: block;
          font-size: 0.625rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .telemetry-value {
          display: block;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        .telemetry-bar {
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .telemetry-fill {
          height: 50%;
          width: 100%;
          background: linear-gradient(90deg, #8b0000, #ff4500);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
