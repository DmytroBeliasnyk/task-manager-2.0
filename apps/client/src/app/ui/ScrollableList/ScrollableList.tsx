import clsx from 'clsx/lite';

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
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-theme'
      : 'justify-center items-center text-center',
  );

  return (
    <section className={itemsSectionClassName}>
      {items.length ? (
        items.map((item) => renderItem(item))
      ) : (
        <span className="text-muted-text inline-block w-3/4 text-4xl">{emptyState}</span>
      )}
    </section>
  );
};
