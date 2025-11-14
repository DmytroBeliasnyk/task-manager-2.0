import type { AppThunk } from '../../../redux';
import { taskActions, taskSelectors } from '../taskSlice';
import type { Task } from '@shared/types/task';

export const fetchTasks =
  (): AppThunk<Promise<Task[] | void>> =>
  async (dispatch, getState, { api }) => {
    if (!taskSelectors.selectIsFetchTasksIdle(getState())) return;

    dispatch(taskActions.fetchTasksPending());
    try {
      const tasks = await api.tasks.getAll();
      dispatch(taskActions.fetchTasksSuccess({ tasks }));

      return tasks
    } catch {
      dispatch(taskActions.fetchTasksFailed());
    }
  };