const { Pool } = require("pg");
//connect database to our server

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432
  });

function run(q, values, callback){
    return pool.query(q, values, callback);
};

module.exports = { run };