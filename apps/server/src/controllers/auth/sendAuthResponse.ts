import { User } from '@shared/types/user';
import { Response } from 'express';

type authResponseData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const sendAuthResponse = (
  res: Response,
  statusCode: number,
  { user, accessToken, refreshToken }: authResponseData,
) => {
  res
    .status(statusCode)
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ user, accessToken });
};
