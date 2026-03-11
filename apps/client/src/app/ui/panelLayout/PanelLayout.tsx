import { Button } from '@ui/button/Button';
import { IoGrid, IoList } from 'react-icons/io5';

export const PanelLayout = ({
  title,
  setViewMode,
  buttonBack,
  children,
}: {
  title: string;
  setViewMode: (viewMode: 'list' | 'grid') => void;
  buttonBack?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
      <header className="border-border flex items-center justify-between gap-4 border-b pb-2 text-2xl font-semibold">
        <div className="flex max-w-3/4 items-center gap-4">
          {buttonBack}
          <h2 className="line-clamp-1 break-all">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            intent="ghost"
            className="size-fit text-lg transition-colors duration-300"
            onClick={() => setViewMode('grid')}
          >
            <IoGrid />
          </Button>
          <Button
            size="icon"
            intent="ghost"
            className="size-fit text-2xl transition-colors duration-300"
            onClick={() => setViewMode('list')}
          >
            <IoList />
          </Button>
        </div>
      </header>
      {children}
    </section>
  );
};
