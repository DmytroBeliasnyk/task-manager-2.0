import { authActions } from '@features/auth/slice/authSlice';
import type { User } from '@shared/types/user';
import { apiSlice } from '../apiSlice';

const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { user: User; accessToken: string },
      { username: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setCredentials(data));
        } catch (err) {
          console.error('Register failed', err);
        }
      },
    }),
    login: builder.mutation<
      { user: User; accessToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setCredentials(data));
        } catch (err) {
          console.error('Login failed', err);
        }
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authActions.logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.error('Login failed', err);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation } = auth;
