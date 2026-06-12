import { useEffect } from 'react';

const BASE = 'Impactum Agency';

// Динамічний <title> для SPA: usePageTitle('Послуги') → "Послуги — Impactum Agency"
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Гранти для вашого бізнесу та ОГС`;
    return () => { document.title = `${BASE} — Гранти для вашого бізнесу та ОГС`; };
  }, [title]);
};
