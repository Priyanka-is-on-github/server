// import dotenv from 'dotenv/config';
require('dotenv').config();






const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: "localhost",
//   port:5432,
//   database: "edujourney_db",
// });

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: "ep-white-river-a1boy580.ap-southeast-1.aws.neon.tech",
  database: "Edu-journey-db",
  port: parseInt('5432'), // Neon typically uses 5432
    ssl: {
        rejectUnauthorized: false,  // Required for Neon DB SSL connection
    }
});




module.exports = pool;
export {};
