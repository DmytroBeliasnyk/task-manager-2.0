import bcrypt from 'bcryptjs';
import { saveUserInDB, saveRefreshToken } from '../../repo/auth/auth';
import { generateJWT } from '../../utils/jwt';
import { getUserByEmail } from '../../repo/auth/auth';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';

export const saveUser = async (email: string, password: string, username?: string) => {
  if (!username) {
    username = email.split('@')[0];
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await saveUserInDB(email, hashedPassword, username);
  const { accessToken, refreshToken } = generateJWT(user.id);
  await saveRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
  if (!isPasswordValid) {
    throw new InvalidCredentialsError('Invalid password.');
  }

  const { accessToken, refreshToken } = generateJWT(user.id);
  await saveRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};
