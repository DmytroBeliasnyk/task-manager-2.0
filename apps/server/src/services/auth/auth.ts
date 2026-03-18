import { saveUserInDB } from '../../repo/auth/auth';
import bcrypt from 'bcryptjs';

export const saveUser = async (email: string, password: string, username?: string) => {
  if (!username) {
    username = email.split('@')[0];
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await saveUserInDB(email, hashedPassword, username);
  return user;
};
