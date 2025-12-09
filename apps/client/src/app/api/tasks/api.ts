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
      invalidatesTags:(_,__,{listId})=>
        [{ type: 'tasks', id: listId }],
    }),
    getTasks: builder.query<Task[], ListId>({
      query: (listId) => `/tasks?list_id=${listId}`,
      providesTags: (_, __, listId) =>
        [{ type: 'tasks', id: listId }],
      transformResponse: (res: unknown) =>
        TaskResponseSchema.parse(res).tasks,
    }),
    editTask: builder.mutation<void, { id: TaskId, title: string, description: string, listId: ListId }>({
      query: ({ id, title, description }) => ({
        url: '/update_task',
        method: 'POST',
        body: JSON.stringify({ id, title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (_,__,{listId})=>
        [{ type: 'tasks', id: listId }],
    }),
    deleteTask: builder.mutation<void, {id: TaskId, listId: ListId }>({
      query: ({ id }) => ({
        url: '/task',
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: (_,__,{listId})=>
        [{ type: 'tasks', id: listId }],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useGetTasksQuery,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;