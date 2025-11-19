import type { List } from '@shared/types/list';
import { useAppDispatch } from '../../redux';
import { listActions } from './listSlice';

export const ListCard = ({ list }: { list: List }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        onClick={() => dispatch(listActions.setSelectedList({ list }))}
        className="flex justify-between items-center p-2 bg-gray-300 rounded-md cursor-pointer hover:border hover:border-gray-400"
      >
        <section className="flex flex-col">
          <h3 className="text-text-primary text-base font-semibold">{list.title}</h3>
          <p className="text-text-secondary text-sm font-medium">{list.description}</p>
        </section>
      </div>
    </>
  );
};