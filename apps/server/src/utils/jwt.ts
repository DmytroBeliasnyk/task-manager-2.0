import { UserId } from '@shared/types/user';
import jwt from 'jsonwebtoken';

export const generateJWT = (userId: UserId): { accessToken: string; refreshToken: string } => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error('Missing JWT secrets: ACCESS_TOKEN_SECRET and/or REFRESH_TOKEN_SECRET');
  }

  const accessToken = jwt.sign({ userId }, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: '1d' });

  return { accessToken, refreshToken };
};
