import type { ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';
import { z } from 'zod';
import { apiSlice } from '../apiSlice';

const TaskSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    list_id: z.string(),
  })
  .transform((data) => ({
    id: data.id,
    title: data.title,
    description: data.description ?? '',
    listId: data.list_id,
  }));

const TaskResponseSchema = z.object({
  tasks: TaskSchema.array(),
});

export const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<void, { title: string; description: string; listId: ListId }>({
      query: (taskData) => ({
        url: '/task',
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: (_, __, { listId }) => [{ type: 'tasks', id: listId }],
    }),
    getTasks: builder.query<Task[], ListId>({
      query: (listId) => `/task?list_id=${listId}`,
      providesTags: (_, __, listId) => [{ type: 'tasks', id: listId }],
      transformResponse: (res: unknown) => TaskResponseSchema.parse(res).tasks,
    }),
    editTask: builder.mutation<
      void,
      { id: TaskId; title: string; description: string; listId: ListId }
    >({
      query: ({ id, title, description }) => ({
        url: `/task/${id}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: (_, __, { listId }) => [{ type: 'tasks', id: listId }],
    }),
    deleteTask: builder.mutation<void, { id: TaskId; listId: ListId }>({
      query: ({ id }) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { listId }) => [{ type: 'tasks', id: listId }],
    }),
  }),
});
