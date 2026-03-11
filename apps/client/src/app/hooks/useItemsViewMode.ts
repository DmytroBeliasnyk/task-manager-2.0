import { useEffect, useState } from 'react';

const STORAGE_KEY = 'itemsViewMode';

export const useItemsViewMode = (panel: 'lists' | 'tasks') => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${panel}`);
    if (stored) {
      return stored as 'list' | 'grid';
    }
    return 'list';
  });

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-${panel}`, viewMode);
  }, [viewMode]);

  return { viewMode, setViewMode };
};
