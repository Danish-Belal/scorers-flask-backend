const pool = require('../db');

// Create or update profile (upsert)
const upsertProfile = async (userId, profileData) => {
  const existing = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);

  if (existing.rows.length > 0) {
    const fields = Object.keys(profileData);
    const values = Object.values(profileData);

    const setClause = fields.map((field, idx) => `${field} = $${idx + 2}`).join(', ');

    const query = `
      UPDATE profiles
      SET ${setClause}
      WHERE user_id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, ...values]);
    return result.rows[0];
  } else {
    const fields = Object.keys(profileData);
    const values = Object.values(profileData);
    const placeholders = fields.map((_, idx) => `$${idx + 2}`).join(', ');

    const query = `
      INSERT INTO profiles (user_id, ${fields.join(', ')})
      VALUES ($1, ${placeholders})
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, ...values]);
    return result.rows[0];
  }
};

const getProfileByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
  return result.rows[0];
};

const deleteProfile = async (userId) => {
  await pool.query('DELETE FROM profiles WHERE user_id = $1', [userId]);
};

module.exports = {
  upsertProfile,
  getProfileByUserId,
  deleteProfile,
};
