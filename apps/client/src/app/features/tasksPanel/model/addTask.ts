import type { AppThunk } from '../../../redux';
import { taskActions } from '../taskSlice';
import type { Task } from '@shared/types/task';
import type { ListId } from '@shared/types/list';

export const addTask =
  (title: string, description: string, listId: ListId): AppThunk =>
    (dispatch, _, { api }) => {
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
    };