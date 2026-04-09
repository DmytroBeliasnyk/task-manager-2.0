import { UserId } from '@shared/types/user';
import { saveUpdatedUser } from '../../repo/api/user';

export const updateUser = async (id: UserId, username: string, email: string) => {
  return await saveUpdatedUser(id, username ?? null, email ?? null);
};

export const updatePassword = () => {};
