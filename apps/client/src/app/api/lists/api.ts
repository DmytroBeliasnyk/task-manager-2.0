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

const listsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addList: builder.mutation<void, { title: string, description: string }>({
      query: ({ title, description }) => ({
        url: '/add_list',
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['lists'],
    }),
    getLists: builder.query<{ lists: List[] }, void>({
      query: () => '/lists',
      transformResponse: (res: unknown) => ListResponseSchema.parse(res),
      providesTags: ['lists'],
    }),
    editList: builder.mutation<void, { id: ListId, title: string, description: string }>({
      query: ({ id, title, description }) => ({
        url: '/update_list',
        method: 'POST',
        body: JSON.stringify({ id, title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['lists'],
    }),
    deleteList: builder.mutation<void, ListId>({
      query: (id) => ({
        url: '/list',
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['lists'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddListMutation,
  useGetListsQuery,
  useEditListMutation,
  useDeleteListMutation,
} = listsApi;