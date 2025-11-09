import type { AppDispatch, AppState } from '../../../redux';
import { taskActions, taskSelectors } from '../taskSlice';
import { tasksApi } from '@api/tasks';

export function fetchTasks(dispatch: AppDispatch, getState: () => AppState) {
  if (!taskSelectors.selectIsFetchTasksIdle(getState())) return;

  dispatch(taskActions.fetchTasksPending());
  tasksApi
    .getAll()
    .then(tasks => {
      dispatch(taskActions.fetchTasksSuccess({ tasks }));
    })
    .catch(() => {
      dispatch(taskActions.fetchTasksFailed());
    });
}