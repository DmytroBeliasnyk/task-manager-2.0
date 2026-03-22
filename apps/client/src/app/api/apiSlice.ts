import { authSlice } from '@features/authPage/slice/authSlice';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '@shared/types/user';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

type RootState = {
  auth: ReturnType<typeof authSlice.getInitialState>;
};

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = authSlice.selectors.selectToken(getState() as RootState);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let res = await baseQuery(args, api, extraOptions);
  if (res?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshRes = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshRes?.data) {
          const { user, accessToken } = refreshRes.data as { user: User; accessToken: string };
          api.dispatch(authSlice.actions.setCredentials({ user, accessToken }));

          res = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(authSlice.actions.logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      res = await baseQuery(args, api, extraOptions);
    }
  }

  return res;
};

export const apiSlice = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['lists', 'tasks'],
  endpoints: () => ({}),
});
