import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { ErrorResponse } from '@shared/types/response';
import type { UserDataErrors } from '@shared/types/userdata';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isUserDataErrors(
  error: FetchBaseQueryError,
): error is FetchBaseQueryError & { data: ErrorResponse & { errors: UserDataErrors } } {
  const data = error.data as ErrorResponse;

  return typeof data === 'object' && data !== null && 'errors' in data && data.errors !== undefined;
}
