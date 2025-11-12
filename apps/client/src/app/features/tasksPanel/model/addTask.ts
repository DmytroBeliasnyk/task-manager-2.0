import type { AppDispatch } from '../../../redux';
import { taskActions } from '../taskSlice';
import { api } from '@api/api';
import type { Task } from '@shared/types/task';
import type { ListId } from '@shared/types/list';

export function addTask(title: string, description: string, listId: ListId, dispatch: AppDispatch) {
  api.tasks
    .add(title, description, listId)
    .then(id => {
      let task: Task = {
        id: id,
        title: title,
        description: description,
        listId: listId,
      };
      dispatch(taskActions.addTask({ task }));
    });
}