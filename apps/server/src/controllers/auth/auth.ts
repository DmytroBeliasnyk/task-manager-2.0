import ValidationError from 'src/errors/ValidationError';
import { asyncHandler } from 'src/middleware/asyncHandler';
import { RequestHandler } from 'express';
import {
  saveUser,
  loginUser,
  refreshAccessToken,
  deleteRefreshToken,
} from '../../services/auth/auth';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';

export const registerController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const { user, accessToken, refreshToken } = await saveUser(email, password, username);
  res
    .status(201)
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ user: user, accessToken: accessToken });
});

export const loginController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const { accessToken, refreshToken } = await loginUser(email, password);

  res
    .status(200)
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ accessToken: accessToken });
});

export const refreshTokenController: RequestHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new InvalidCredentialsError('Unauthorized.');
  }

  const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);

  res
    .status(200)
    .cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ accessToken: accessToken });
});

export const logoutController: RequestHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(204).send();
  }

  await deleteRefreshToken(refreshToken);
  res.clearCookie('refreshToken', { httpOnly: true });
  res.status(204).send();
});
