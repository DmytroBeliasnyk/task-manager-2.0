import { useEffect, useState } from 'react';

const STORAGE_KEY = 'itemsViewMode';

export const useItemsViewMode = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored as 'list' | 'grid';
    }
    return 'list';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, viewMode);
  }, [viewMode]);

  return { viewMode, setViewMode };
};
