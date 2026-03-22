import type { UserDTO } from '@shared/types/user';
import { apiSlice } from '../apiSlice';

const auth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { user: UserDTO; accessToken: string },
      { email: string; password: string; username: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation<
      { user: UserDTO; accessToken: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useRegisterMutation, useLoginMutation, useLogOutMutation } = auth;
