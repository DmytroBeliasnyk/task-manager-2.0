import clsx from 'clsx/lite';
import { EmptyPanel } from '../Panels/EmptyPanel';

export const ScrollableList = <T,>({
  items,
  renderItem,
  emptyState,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyState: string;
}) => {
  const itemsSectionClassName = clsx(
    'flex flex-col flex-1',
    items.length
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
      : 'justify-center items-center text-center',
  );

  return (
    <section className={itemsSectionClassName}>
      {items.length ? items.map((item) => renderItem(item)) : <EmptyPanel>{emptyState}</EmptyPanel>}
    </section>
  );
};
