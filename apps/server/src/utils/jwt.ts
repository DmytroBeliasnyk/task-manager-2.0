import { UserId } from '@shared/types/user';
import jwt from 'jsonwebtoken';
import InvalidCredentialsError from '../errors/InvalidCredentialsError';

export const generateAccessToken = (userId: UserId): string => {
  const secret = getAccessTokenSecret();
  return jwt.sign({ userId }, secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: UserId): string => {
  const secret = getRefreshTokenSecret();
  return jwt.sign({ userId }, secret, { expiresIn: '1d' });
};

export const verifyAccessToken = (token: string) => {
  return verifyToken(token, getAccessTokenSecret());
};

export const verifyRefreshToken = (token: string) => {
  return verifyToken(token, getRefreshTokenSecret());
};

function verifyToken(token: string, secret: string) {
  const decoded = jwt.verify(token, secret);
  if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
    return decoded as { userId: UserId };
  }
  throw new InvalidCredentialsError('Unauthorized.');
}

function getAccessTokenSecret(): string {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error('Missing JWT secrets: ACCESS_TOKEN_SECRET');
  }
  return secret;
}

function getRefreshTokenSecret(): string {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error('Missing JWT secrets: REFRESH_TOKEN_SECRET');
  }
  return secret;
}
