const USER = process.env.user;
const PASSWORD = process.env.password;

const Pool = require("pg").Pool;
const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: "localhost",
  port: 5432,
  database: "edujourney_db",
});
module.exports = pool;
export {};
