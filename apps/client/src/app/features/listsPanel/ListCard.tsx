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
        <div className="flex flex-col">
          <h3 className="text-primary-text font-semibold">{list.title}</h3>
          <span className="text-secondary-text text-sm">{list.description}</span>
        </div>
      </div>
    </>
  );
});
