import { db } from '../../db/db';

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
