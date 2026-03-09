import type { List } from '@shared/types/list';
import { useAppDispatch } from '@store/redux';
import { listActions } from '@store/slices/listSlice';
import { memo } from 'react';

export const ListCard = memo(({ list }: { list: List }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        onClick={() => dispatch(listActions.setSelectedList({ list }))}
        className="bg-highlite-bg flex cursor-pointer items-center justify-between rounded-md p-2 hover:shadow-sm"
      >
        <div className="flex max-w-3/4 flex-col">
          <h3 className="text-primary-text line-clamp-1 font-semibold break-all">{list.title}</h3>
          <span className="text-secondary-text line-clamp-2 text-sm break-all">
            {list.description}
          </span>
        </div>
      </div>
    </>
  );
});
