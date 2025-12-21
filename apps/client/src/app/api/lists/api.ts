import type { List, ListId } from '@shared/types/list';
import { baseApi } from '../baseApi';
import { z } from 'zod';

const ListSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string() ?? '',
});

const ListResponseSchema = z.object({
  lists: ListSchema.array(),
});

export const listsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addList: builder.mutation<void, { title: string; description: string }>({
      query: ({ title, description }) => ({
        url: '/list',
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['lists'],
    }),
    getLists: builder.query<{ lists: List[] }, void>({
      query: () => '/list',
      transformResponse: (res: unknown) => ListResponseSchema.parse(res),
      providesTags: ['lists'],
    }),
    editList: builder.mutation<void, { id: ListId; title: string; description: string }>({
      query: ({ id, title, description }) => ({
        url: `/list/${id}`,
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['lists'],
    }),
    deleteList: builder.mutation<void, ListId>({
      query: (id) => ({
        url: `/list/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['lists'],
    }),
  }),
  overrideExisting: true,
});
