import { ERROR } from '@shared/constants/userdata';
import bcrypt from 'bcryptjs';
import InvalidCredentialsError from '../../errors/InvalidCredentialsError';
import {
  deleteRefreshTokenFromDB,
  getUserByEmail,
  getUserById,
  saveRefreshToken,
  saveUserInDB,
} from '../../repo/auth/auth';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';

export const saveUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await saveUserInDB(email, hashedPassword, username);
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const res = await getUserByEmail(email);
  if (!res) {
    throw new InvalidCredentialsError(ERROR.INVALID_CREDENTIALS, { email: ERROR.INVALID_EMAIL });
  }

  const { user, hashedPassword } = res;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError(ERROR.INVALID_CREDENTIALS, {
      password: ERROR.INVALID_PASSWORD,
    });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  await saveRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const { userId } = verifyRefreshToken(refreshToken);
    const user = await getUserById(userId);

    if (!user) {
      throw new InvalidCredentialsError('Unauthorized.');
    }

    const accessToken = generateAccessToken(userId);
    const newRefreshToken = generateRefreshToken(userId);
    await saveRefreshToken(userId, newRefreshToken);

    return { user, accessToken, refreshToken: newRefreshToken };
  } catch (err) {
    console.error('Error verifying refresh token: ', err);
    throw new InvalidCredentialsError('Unauthorized.');
  }
};

export const deleteRefreshToken = async (token: string) => {
  await deleteRefreshTokenFromDB(token);
};
