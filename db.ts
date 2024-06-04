const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "priyanka@8886",
  host: "localhost",
  port: 5432,
  database: "edujourney_db",
});
module.exports = pool;
export {};
