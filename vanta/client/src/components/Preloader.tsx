import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      // Initial state
      gsap.set(progressRef.current, { width: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      // Animate in text
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate progress bar
      tl.to(progressRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      }, '-=0.5');

      // Fade out preloader
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      }, '+=0.3');

      tl.set(containerRef.current, { display: 'none' });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader">
      <div className="preloader-content">
        <h1 ref={textRef} className="preloader-title">VANTA</h1>
        <div className="preloader-progress">
          <div ref={progressRef} className="preloader-bar" />
        </div>
        <p className="preloader-label">AUTOMOTIVE INTELLIGENCE</p>
      </div>
      <style>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .preloader-content {
          text-align: center;
        }
        .preloader-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #fff;
          margin-bottom: 2rem;
        }
        .preloader-progress {
          width: 200px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 auto 1rem;
          overflow: hidden;
        }
        .preloader-bar {
          height: 100%;
          background: linear-gradient(90deg, #8b0000, #ff4500);
          width: 0;
        }
        .preloader-label {
          font-size: 0.625rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #666;
        }
      `}</style>
    </div>
  );
}
