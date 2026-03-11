import { cva } from 'class-variance-authority';

const viewModeVariants = cva('min-h-full w-full', {
  variants: {
    viewMode: {
      list: 'flex flex-col gap-2',
      grid: 'grid auto-rows-[calc((100%-2*1rem)/3)] grid-cols-1 grid-rows-[repeat(3,calc((100%-2*1rem)/3))] gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    },
  },
  defaultVariants: {
    viewMode: 'list',
  },
});

export const ScrollableList = <T,>({
  viewMode,
  items,
  renderItem,
  button,
}: {
  viewMode: 'list' | 'grid';
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  button?: React.ReactNode;
}) => {
  return (
    <div className="scrollbar-thin scrollbar-theme size-full min-h-0 overflow-y-auto overscroll-contain pr-2">
      <div className={viewModeVariants({ viewMode })}>
        {items.map((item) => renderItem(item))}
        {button}
      </div>
    </div>
  );
};
