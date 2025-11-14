import type { AppThunk } from '../../../redux';
import { taskActions } from '../taskSlice';
import type { TaskId } from '@shared/types/task';

export const editTask =
  (id: TaskId, title: string, description: string): AppThunk =>
    (dispatch, _, { api }) => {
      api.tasks
        .edit(id, title, description)
        .then(() => {
          dispatch(taskActions.editTask({ id, title, description }));
        });
    };