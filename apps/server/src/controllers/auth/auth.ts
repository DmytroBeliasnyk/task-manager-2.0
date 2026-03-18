import ValidationError from 'src/errors/ValidationError';
import { asyncHandler } from 'src/middleware/asyncHandler';
import { RequestHandler } from 'express';
import { saveUser, loginUser } from '../../services/auth/auth';

export const registerController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const user = await saveUser(email, password, username);
  res.status(201).json({ user: user });
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
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ accessToken: accessToken });
});
