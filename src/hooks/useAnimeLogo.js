import { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';

export function useAnimeLogo() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('.draw-path');
    const dots = svg.querySelectorAll('.draw-dot');

    if (!paths.length) return;

    // Measure and stash lengths
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      // Start transparent for the fill fade-in
      p.style.opacity = 1;
    });

    dots.forEach((d) => {
      d.style.opacity = 0;
      d.style.transform = 'scale(0)';
    });

    // Timeline: draw → glow → dots
    const tl = createTimeline({
      easing: 'easeInOutCubic',
      loop: false,
    });

    // 1. Draw all paths
    tl.add(paths, {
      strokeDashoffset: 0,
      duration: (el, i) => 1200 + i * 180,
      delay: (el, i) => 300 + i * 100,
    }, 0);

    // 2. Soft fill glow after paths complete (target all paths within the circuit cluster)
    tl.add(paths, {
      opacity: [0.85, 1],
      duration: 800,
      delay: 200,
    }, '-=400');

    // 3. Pop in dots
    tl.add(dots, {
      opacity: 1,
      scale: [0, 1],
      duration: 500,
      delay: (el, i) => i * 180,
      easing: 'easeOutBack',
    }, '-=600');

    return () => tl.pause();
  }, []);

  return svgRef;
}
