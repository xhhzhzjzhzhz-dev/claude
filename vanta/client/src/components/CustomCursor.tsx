import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      gsap.set(cursor, { x: cursorX, y: cursorY });
      requestAnimationFrame(animate);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) {
        cursor.classList.add('button');
        cursor.classList.remove('hover');
      } else if (target.closest('.interactive')) {
        cursor.classList.add('hover');
        cursor.classList.remove('button');
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove('button', 'hover');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom_cursor" />;
}
