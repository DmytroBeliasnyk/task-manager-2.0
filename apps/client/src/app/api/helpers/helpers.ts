import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { AuthErrors } from '@shared/types/auth';
import type { ErrorResponse } from '@shared/types/response';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isAuthErrors(
  error: FetchBaseQueryError,
): error is FetchBaseQueryError & { data: ErrorResponse & { errors: AuthErrors } } {
  const data = error.data as ErrorResponse;

  return typeof data === 'object' && data !== null && 'errors' in data && data.errors !== undefined;
}
