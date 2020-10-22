const { Pool } = require("pg");
//connect database to our server
const devConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
}

const proConfig = {
  connectString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production"? proConfig : devConfig);

function run(q, values, callback){
    return pool.query(q, values, callback);
};

module.exports = { run };