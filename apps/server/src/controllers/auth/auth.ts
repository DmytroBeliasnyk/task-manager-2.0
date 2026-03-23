import { RequestHandler } from 'express';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';
import ValidationError from 'src/errors/ValidationError';
import { asyncHandler } from 'src/middleware/asyncHandler';
import {
  deleteRefreshToken,
  loginUser,
  refreshAccessToken,
  saveUser,
} from '../../services/auth/auth';
import { sendAuthResponse } from './sendAuthResponse';

export const registerController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const result = await saveUser(email, password);
  sendAuthResponse(res, 201, result);
});

export const loginController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const result = await loginUser(email, password);
  sendAuthResponse(res, 200, result);
});

export const refreshTokenController: RequestHandler = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new InvalidCredentialsError('Unauthorized.');
  }

  const result = await refreshAccessToken(refreshToken);
  sendAuthResponse(res, 200, result);
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
