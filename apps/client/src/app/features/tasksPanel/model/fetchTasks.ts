import type { AppDispatch, AppState } from '../../../redux';
import { taskActions, taskSelectors } from '../taskSlice';
import { api } from '@api/api';

export function fetchTasks(dispatch: AppDispatch, getState: () => AppState) {
  if (!taskSelectors.selectIsFetchTasksIdle(getState())) return;

  dispatch(taskActions.fetchTasksPending());
  api.tasks
    .getAll()
    .then(tasks => {
      dispatch(taskActions.fetchTasksSuccess({ tasks }));
    })
    .catch(() => {
      dispatch(taskActions.fetchTasksFailed());
    });
}