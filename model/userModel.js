const pool = require('../db');

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users(name, email, password, provider) VALUES($1, $2, $3, $4) RETURNING id, name, email',
    [name, email, hashedPassword, 'email']
  );
  return result.rows[0];
};
const updateUserPartial = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return null;

  const setClause = fields.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
  const query = `UPDATE users SET ${setClause} WHERE id = $${fields.length + 1} RETURNING id, name, email`;

  const result = await pool.query(query, [...values, id]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};


module.exports = {
  findUserByEmail,
  createUser,
  updateUserPartial,
  deleteUser,
  findUserById
};
