import type { List } from '@shared/types/list';
import type { Task } from '@shared/types/task';
import type { FC } from 'react';

type ItemCardProps = {
  item: List | Task;
  clickHandler: () => void;
};

export const ItemCard: FC<ItemCardProps> = ({ item, clickHandler }) => {
  return (
    <>
      <div
        onClick={clickHandler}
        className="flex justify-between items-center p-2 bg-gray-300 rounded-md cursor-pointer hover:border hover:border-gray-400"
      >
        <section className="flex flex-col">
          <h3 className="text-text-primary text-base font-semibold">{item.title}</h3>
          <p className="text-text-secondary text-sm font-medium">{item.description}</p>
        </section>
      </div>
    </>
  );
};
