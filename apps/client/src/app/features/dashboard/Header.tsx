import { listActions } from '@features/listsPanel/slice/listSlice';
import type { List } from '@shared/types/list';
import { useAppDispatch } from '@store/redux';
import { Button } from '@ui/button/Button';
import { memo } from 'react';
import { IoGrid, IoList } from 'react-icons/io5';
import { TiArrowBack } from 'react-icons/ti';

export const Header = memo(
  ({
    selectedList,
    setViewMode,
  }: {
    selectedList: List | undefined;
    setViewMode: (view: 'list' | 'grid') => void;
  }) => {
    const dispatch = useAppDispatch();

    return (
      <>
        <div className="flex max-w-3/4 items-center gap-4">
          {selectedList ? (
            <Button
              size="icon"
              intent="ghost"
              className="size-fit transition-colors duration-300"
              onClick={() => dispatch(listActions.removeSelectedList())}
            >
              <TiArrowBack />
            </Button>
          ) : null}
          <h2 className="line-clamp-1 break-all">
            {selectedList ? selectedList.title : 'My Lists'}
          </h2>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
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
      </>
    );
  },
);
