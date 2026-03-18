import jwt from 'jsonwebtoken';

export const generateJWT = (username: string): { accessToken: string; refreshToken: string } => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error('Missing JWT secrets: ACCESS_TOKEN_SECRET and/or REFRESH_TOKEN_SECRET');
  }

  const accessToken = jwt.sign({ username }, accessSecret, { expiresIn: '30s' });
  const refreshToken = jwt.sign({ username }, refreshSecret, { expiresIn: '1d' });

  return { accessToken, refreshToken };
};
