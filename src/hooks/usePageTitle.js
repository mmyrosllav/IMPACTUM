import { useEffect } from 'react';

const BASE = 'Impactum Agency';

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Гранти для вашого бізнесу та ОГС`;
    return () => { document.title = `${BASE} — Гранти для вашого бізнесу та ОГС`; };
  }, [title]);
};
