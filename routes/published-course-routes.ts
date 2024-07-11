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



  router.get('/publishedchapters/:id', async(req:any, res:any)=>{
    const {id}= req.params;
  
    

    try {
      const publishedChapters = await pool.query('SELECT * FROM chapters WHERE courseid=$1 AND ispublished=true ORDER BY position ASC',[id])
      if (publishedChapters.rows.length === 0) {
        return res.status(404).json({ error: 'No published chapters found' });
      }
  
      res.json(publishedChapters.rows);

    } catch (error) {
      console.error('Error fetching published chapters:', error);
    res.status(500).json({ error: 'An error occurred while fetching published chapters' });
    }
  })

  router.get('/coursetitle/:id', async(req:any, res:any)=>{
    const {id} = req.params;
  

    try {
      const title = await pool.query('SELECT title FROM course WHERE id=$1',[id])
     res.json(title.rows[0])
    } catch (error) {
      console.log(error)
    }
  })

  router.get('/chapter/:chapterId', async(req:any, res:any)=>{
    const {chapterId} = req.params;
    

    try {
      const chapter = await pool.query('SELECT * FROM chapters WHERE id=$1',[chapterId])
      res.json(chapter.rows[0])
    } catch (error) {
      console.log(error)
    }
  })

   module.exports=router;
   export {}
