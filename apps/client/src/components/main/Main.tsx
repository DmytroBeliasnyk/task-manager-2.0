import { type FC, useState } from 'react';
import { ListManagementSection } from './sections/ListManagementSection';
import { ListsSection } from './sections/ListsSection';
import type { List } from '@shared/types/list';

export const Main: FC = () => {
  const [selectedList, setSelectedList] = useState<List | null>(null);

  return (
    <main className="flex gap-4 h-full overflow-hidden">
      <ListsSection selectList={setSelectedList} />
      <ListManagementSection selectedList={selectedList} />
    </main>
  );
};
