const express = require("express")
const router = express.Router();
const pool =  require('../db');



router.get('/publishedcourses', async(req:any, res:any)=>{
    try {
      const courses = await pool.query('SELECT * FROM course WHERE ispublished=true ORDER BY createdat DESC')
      res.json( courses.rows)

    } catch (error) {
      console.log(error)
    }
  })


   module.exports=router;
   export {}
