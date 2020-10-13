const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`
const getUserByEmail = `SELECT * FROM users WHERE username = $1`;

module.exports = {createUser, getUserByEmail};
