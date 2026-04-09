import { UserId } from '@shared/types/user';
import { RequestHandler } from 'express';
import ValidationError from '../../errors/ValidationError';
import { asyncHandler } from '../../middleware/asyncHandler';
import { updateUser } from '../../services/api/user';

export const updateUserData: RequestHandler = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username && !email) {
    throw new ValidationError('body is empty');
  }

  const userId = res.locals.userId as UserId;
  const user = await updateUser(userId, username, email);

  res.status(200).json({ user: user });
});

export const updateUserPassword: RequestHandler = asyncHandler(async (req, res) => {});
