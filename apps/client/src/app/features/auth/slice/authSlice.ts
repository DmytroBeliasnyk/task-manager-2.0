import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@shared/types/user';

type AuthState = {
  user: User | undefined;
  accessToken: string | undefined;
};

const initialState: AuthState = {
  user: undefined,
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    selectUser: (state) => state.user,
    selectToken: (state) => state.accessToken,
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = undefined;
      state.accessToken = undefined;
    },
  },
});

export const authSelectors = authSlice.selectors;
export const authActions = authSlice.actions;
