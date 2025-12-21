import { Request, Response, NextFunction } from 'express';
import NonExistentIDError from '../utils/errors/NonExistentIDError';
import ValidationError from '../utils/errors/ValidationError';

export interface ErrorResponse {
  message: string;
  status?: number;
}

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

  if (err instanceof NonExistentIDError) {
    status = 400;
    message = err.message;
  } else if (err instanceof ValidationError) {
    status = 400;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  res.status(status).json({ message });
};
