import ValidationError from 'src/errors/ValidationError';
import { asyncHandler } from 'src/middleware/asyncHandler';
import { RequestHandler } from 'express';
import { saveUser } from '../../services/auth/auth';

export const registerController: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    throw new ValidationError('parameter "email" and "password" are required');
  }

  const user = await saveUser(email, password, username);
  res.status(201).json({ user: user });
});
