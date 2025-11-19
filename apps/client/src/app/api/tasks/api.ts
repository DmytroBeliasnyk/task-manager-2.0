import { baseApi } from '../baseApi';
import type { Task, TaskId } from '@shared/types/task';
import type { ListId } from '@shared/types/list';
import { z } from 'zod';

const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  list_id: z.string(),
}).transform(data => ({
  id: data.id,
  title: data.title,
  description: data.description ?? '',
  listId: data.list_id,
}));

const TaskResponseSchema = z.object({
  tasks: TaskSchema.array(),
});

const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addTask: builder.mutation<void, { title: string, description: string, listId: ListId }>({
      query: ({ title, description, listId }) => ({
        url: '/add_task',
        method: 'POST',
        body: JSON.stringify({ title, description, listId }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['tasks'],
    }),
    getTasks: builder.query<{ tasks: Task[] }, void>({
      query: () => '/tasks',
      providesTags: ['tasks'],
      transformResponse: (res: unknown) =>
        TaskResponseSchema.parse(res),
    }),
    editTask: builder.mutation<void, { id: TaskId, title: string, description: string }>({
      query: ({ id, title, description }) => ({
        url: '/update_task',
        method: 'POST',
        body: JSON.stringify({ id, title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['tasks'],
    }),
    deleteTask: builder.mutation<void, TaskId>({
      query: (id) => ({
        url: '/task',
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['tasks'],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;