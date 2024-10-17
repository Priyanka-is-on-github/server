const express = require('express');
const pool = require("../db");

const router = express.Router();

router.get('/sales', async(req:any, res:any)=>{
const {teacherid} = req.query; 

try {
    const sales = await pool.query(' SELECT c.teacherid,  COUNT(p.id) AS total_sales, SUM(c.price) AS total_revenue FROM  course c JOIN  purchase p ON c.id = p.id WHERE  c.teacherid =  $1 GROUP BY  c.teacherid',[teacherid])  

    const data = await pool.query('SELECT title, price FROM course WHERE teacherid=$1 and ispublished=true',[teacherid])
  

 res.json({total :sales.rows, data:data.rows}) 
  
    
} catch (error) {
   console.log(error) 
}
})

module.exports = router;
export{}
   

 

  




  

