import { ErrorResponse } from '@shared/types/response';
import { NextFunction, Request, Response } from 'express';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import NonExistentIDError from '../errors/NonExistentIDError';
import ValidationError from '../errors/ValidationError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  let status = 500;
  let message = 'Internal server error';
  let errors: unknown = undefined;

  if (err instanceof NonExistentIDError) {
    status = 400;
    message = err.message;
  } else if (err instanceof ValidationError) {
    status = 400;
    message = err.message;
  } else if (err instanceof InvalidCredentialsError) {
    status = err.status;
    message = err.message;
    errors = err.data;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  const response: ErrorResponse = { message };
  if (errors) response.errors = errors;

  res.status(status).json(response);
};
