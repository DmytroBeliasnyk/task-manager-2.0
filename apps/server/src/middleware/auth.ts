import { NextFunction, Request, Response } from 'express';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';
import { verifyAccessToken } from '../utils/jwt';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader?.startsWith('Bearer ')) {
    throw new InvalidCredentialsError('Unauthorized.');
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const { userId } = verifyAccessToken(token);
    res.locals.userId = userId;
  } catch (err) {
    console.error('Error verifying access token: ', err);
    throw new InvalidCredentialsError('Unauthorized.');
  }

  next();
};
