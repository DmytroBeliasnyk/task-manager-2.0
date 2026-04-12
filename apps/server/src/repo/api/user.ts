import { User, UserId } from '@shared/types/user';
import { DatabaseError } from 'pg';
import { db } from '../../db/db';
import NonExistentIDError from '../../errors/NonExistentIDError';
import ValidationError from '../../errors/ValidationError';

export const saveUpdatedUser = async (id: UserId, username: string, email: string) => {
  const query = `UPDATE users SET username=COALESCE($1, username), email=COALESCE($2, email) WHERE id=$3 RETURNING id, username, email`;

  try {
    const res = await db.query<User>(query, [username, email, id]);
    if (!res.rowCount) {
      throw new NonExistentIDError(`Error update user: non-existent id: ${id}`);
    }

    return res.rows[0];
  } catch (err) {
    if (err instanceof DatabaseError && err.code === '23505') {
      const constraint = err.constraint || '';
      if (constraint === 'users_username_key') {
        throw new ValidationError('Username already exist.');
      }

      if (constraint === 'users_email_key') {
        throw new ValidationError('Email already exist.');
      }
    }

    throw err;
  }
};

export const saveUpdatedPassword = async (id: UserId, hashedPassword: string) => {
  const query = `UPDATE users SET hashed_password=$1 WHERE id=$2`;

  try {
    const res = await db.query(query, [hashedPassword, id]);
    if (res.rowCount === 0) {
      throw new NonExistentIDError(`Failed to update password: user with id ${id} not found`);
    }
  } catch (err) {
    console.error('DB error: ', err);
    throw err;
  }
};
