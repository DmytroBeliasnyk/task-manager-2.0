import { UserId } from '@shared/types/user';
import { db } from '../../db/db';
import InvalidCredentialsError from 'src/errors/InvalidCredentialsError';

export const saveUserInDB = async (email: string, hashedPassword: string, username: string) => {
  const query = `
    INSERT INTO users (email, hashed_password, username)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const res = await db.query(query, [email, hashedPassword, username]);
    if (!res.rowCount) {
      throw new Error('Failed to save user');
    }
    return res.rows[0];
  } catch (err) {
    console.error('DB error while saving new user: ', err);
    throw err;
  }
};

export const getUserByEmail = async (email: string) => {
  const query = 'SELECT * FROM users WHERE email=$1';

  try {
    const res = await db.query(query, [email]);
    if (!res.rowCount) {
      throw new InvalidCredentialsError('Invalid email.');
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

export const getUserIdByRefreshToken = async (token: string) => {
  const query = 'SELECT user_id FROM tokens WHERE token=$1';
  try {
    const res = await db.query(query, [token]);
    if (!res.rowCount) {
      throw new InvalidCredentialsError('Invalid refresh token.');
    }
    return res.rows[0].user_id as UserId;
  } catch (err) {
    console.error('DB error while fetching user id by refresh token: ', err);
    throw err;
  }
};
