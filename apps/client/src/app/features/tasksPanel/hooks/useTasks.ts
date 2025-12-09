import { skipToken } from '@reduxjs/toolkit/query';
import { tasksApi } from '@api/tasks/api';
import type { ListId } from '@shared/types/list';

export const useTasks = (listId: ListId | undefined) => {
  const { data: tasks = [] } = tasksApi.useGetTasksQuery(listId ?? skipToken);
  return tasks;
};
