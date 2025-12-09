import { memo } from 'react';

export const EmptyPanel = memo(({ children }: { children: React.ReactNode }) => {
  return <span className="inline-block w-3/4 text-4xl text-gray-400">{children}</span>;
});
