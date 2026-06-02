import { useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export function useTextScramble(ref, finalText, { delay = 0, duration = 2000 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finalText) return;

    const len = finalText.length;

    let interval;
    const timeout = setTimeout(() => {
      const frames = 30;
      let frame = 0;
      interval = setInterval(() => {
        let result = '';
        const progress = frame / frames;
        const revealCount = Math.floor(progress * len);

        for (let i = 0; i < len; i++) {
          if (i < revealCount) {
            result += finalText[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        el.textContent = result;
        frame++;

        if (frame > frames) {
          clearInterval(interval);
          el.textContent = finalText;
        }
      }, duration / frames);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [ref, finalText, delay, duration]);
}
