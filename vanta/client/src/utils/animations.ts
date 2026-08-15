import { gsap } from 'gsap';

export const createRevealAnimation = (elements: NodeListOf<Element>, stagger: number = 0.1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger,
    ease: 'power3.out',
  });
};

export const createTextSplitAnimation = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const text = element.textContent || '';
  element.innerHTML = '';
  
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);
  });
  
  return gsap.to(element.querySelectorAll('span'), {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.02,
    ease: 'power2.out',
  });
};

export const createParallaxLayer = (element: Element, speed: number = 0.5) => {
  gsap.to(element, {
    y: `+=${100 * speed}`,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const createCounterAnimation = (element: HTMLElement, end: number, duration: number = 2) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

export const checkReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
