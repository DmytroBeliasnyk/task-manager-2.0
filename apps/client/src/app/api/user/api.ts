import { authActions } from '@features/auth/slice/authSlice';
import type { User } from '@shared/types/user';
import { apiSlice } from '../apiSlice';

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.mutation<{ user: User }, { email: string; username: string }>({
      query: (userData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.updateUser(data));
        } catch (err) {
          console.error('Update data failed', err);
        }
      },
    }),
    password: builder.mutation<void, { password: string }>({
      query: (password) => ({
        url: '/user/password',
        method: 'PUT',
        body: password,
      }),
    }),
  }),
});

export const { useProfileMutation, usePasswordMutation } = userApi;
