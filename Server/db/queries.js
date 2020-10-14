const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`
const getUserByEmailOrUsername = `SELECT * FROM users WHERE email = $1 OR username = $2`;
//queries for RESTful routes
const getFoodInfoByName = `SELECT total_emissions, total_water FROM foods WHERE foodname = $1`

module.exports = {createUser, getUserByEmailOrUsername, getFoodInfoByName};
