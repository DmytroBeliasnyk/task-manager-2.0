import type { TaskId } from '@shared/types/task';
import type { AppThunk } from '../../../redux';
import { taskActions } from '../taskSlice';

export const removeTask =
  (taskId: TaskId): AppThunk =>
    (dispatch, _, { api }) => {
      api.tasks
        .delete(taskId)
        .then(() => {
          dispatch(taskActions.removeTask({ taskId }));
        });
    };