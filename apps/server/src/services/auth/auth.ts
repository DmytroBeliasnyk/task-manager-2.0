import bcrypt from 'bcryptjs';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';
import { verifyRefreshToken } from 'src/utils/jwt';
import {
  deleteRefreshTokenFromDB,
  getUserByEmail,
  getUserById,
  saveRefreshToken,
  saveUserInDB,
} from '../../repo/auth/auth';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export const saveUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await saveUserInDB(email, hashedPassword, username);
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const { user, hashedPassword } = await getUserByEmail(email);
  console.log(user);
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError('Invalid password.');
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
