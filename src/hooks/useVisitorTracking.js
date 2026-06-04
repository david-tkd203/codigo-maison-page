import { useEffect, useRef } from 'react';

const API_URL = import.meta.env.DEV
  ? 'http://localhost:8000/api'
  : '/api';

export default function useVisitorTracking(consentGiven, page = '/') {
  const tracked = useRef(false);

  useEffect(() => {
    if (!consentGiven || tracked.current) return;

    const data = {
      page,
      referrer: document.referrer || '',
      consent_given: true,
    };

    fetch(`${API_URL}/track/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {
      // Silencio — el tracking no debe interferir con la experiencia
    });

    tracked.current = true;
  }, [consentGiven, page]);
}
