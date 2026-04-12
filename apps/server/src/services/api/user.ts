import { UserId } from '@shared/types/user';
import bcrypt from 'bcryptjs';
import { saveUpdatedPassword, saveUpdatedUser } from '../../repo/api/user';

export const updateUser = async (id: UserId, username: string, email: string) => {
  return await saveUpdatedUser(id, username ?? null, email ?? null);
};

export const updatePassword = async (id: UserId, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  await saveUpdatedPassword(id, hashedPassword);
};
