import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserId } from '@shared/types/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new InvalidCredentialsError('Unauthorized.');
  }

  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessSecret) {
    throw new Error('Missing JWT secrets: ACCESS_TOKEN_SECRET');
  }

  const token = authorizationHeader.split(' ')[1];
  jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }

    res.locals.userId = (decoded as JwtPayload).userId as UserId;
    next();
  });
};
