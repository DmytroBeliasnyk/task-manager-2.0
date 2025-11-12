import type { AppDispatch } from '../../../redux';
import { taskActions } from '../taskSlice';
import type { TaskId } from '@shared/types/task';
import { api } from '@api/api';

export function editTask(id: TaskId, title: string, description: string, dispatch: AppDispatch) {
  api.tasks
    .edit(id, title, description)
    .then(() => {
      dispatch(taskActions.editTask({ id, title, description }));
    });
}