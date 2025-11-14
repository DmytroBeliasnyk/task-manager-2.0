import type { AppThunk } from '../../../redux';
import { taskActions } from '../taskSlice';
import type { Task } from '@shared/types/task';
import type { ListId } from '@shared/types/list';
import { listActions } from '../../listsPanel/listSlice';

export const addTask =
  (title: string, description: string, listId: ListId): AppThunk =>
    (dispatch, _, { api }) => {
      api.tasks
        .add(title, description, listId)
        .then(taskId => {
          let task: Task = {
            id: taskId,
            title: title,
            description: description,
            listId: listId,
          };
          dispatch(taskActions.addTask({ task }));
          dispatch(listActions.addTaskId({ listId, taskId }));
        });
    };