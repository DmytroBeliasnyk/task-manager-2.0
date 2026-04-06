import { ERROR } from '@shared/constants/auth';
import { User, UserId } from '@shared/types/user';
import { DatabaseError } from 'pg';
import { db } from '../../db/db';
import InvalidCredentialsError from '../../errors/InvalidCredentialsError';

export const saveUserInDB = async (email: string, hashedPassword: string, username: string) => {
  const query = `
    INSERT INTO users (email, hashed_password, username)
    VALUES ($1, $2, $3)
    RETURNING id, email, username
  `;

  try {
    const res = await db.query<User>(query, [email, hashedPassword, username]);

    return res.rows[0];
  } catch (err) {
    if (err instanceof DatabaseError && err.code === '23505') {
      const constraint = err.constraint || '';
      if (constraint === 'users_username_key') {
        throw new InvalidCredentialsError(ERROR.NO_UNIQUE_DATA, {
          username: ERROR.NO_UNIQUE_USERNAME,
        });
      }

      if (constraint === 'users_email_key') {
        throw new InvalidCredentialsError(ERROR.NO_UNIQUE_DATA, { email: ERROR.NO_UNIQUE_EMAIL });
      }
    }

    throw err;
  }
};

export const getUserByEmail = async (
  email: string,
): Promise<{ user: User; hashedPassword: string } | null> => {
  const query = 'SELECT * FROM users WHERE email=$1';

  try {
    const res = await db.query<{
      id: UserId;
      email: string;
      hashed_password: string;
      username: string;
    }>(query, [email]);

    const row = res.rows[0];
    if (!row) return null;

    const { hashed_password: hashedPassword, ...user } = row;
    return { user, hashedPassword };
  } catch (err) {
    console.error('DB error while fetching user by email: ', err);
    throw err;
  }
};

export const getUserById = async (id: UserId) => {
  const query = 'SELECT id, email, username FROM users WHERE id=$1';

  try {
    const res = await db.query<User>(query, [id]);
    if (!res.rowCount) {
      throw new InvalidCredentialsError('Invalid user id.');
    }
    return res.rows[0];
  } catch (err) {
    console.error('DB error while fetching user by email: ', err);
    throw err;
  }
};

export const saveRefreshToken = async (userId: UserId, token: string) => {
  const query =
    'INSERT INTO tokens (user_id, token) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET token = $2';

  try {
    await db.query(query, [userId, token]);
  } catch (err) {
    console.error('DB error while saving refresh token: ', err);
    throw err;
  }
};

export const deleteRefreshTokenFromDB = async (token: string) => {
  const query = 'DELETE FROM tokens WHERE token=$1';

  try {
    await db.query(query, [token]);
  } catch (err) {
    console.error('DB error while deleting refresh token: ', err);
    throw err;
  }
};
