import type { AuthErrors } from './auth';

export type ErrorResponse = {
  message: string;
  errors?: AuthErrors;
};
