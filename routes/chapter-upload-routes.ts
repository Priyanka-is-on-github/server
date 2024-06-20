const express = require('express');

const router = express.Router();
const pool = require('../db')

router.post('/chapter/:id', async(req:any, res:any)=>{
const {id} = req.params;
const {title} = req.body;

try {
    await pool.query('INSERT INTO chapters(title, courseid) VALUES($1,$2) RETURNING *',[title, id])
    const chapter = await pool.query('SELECT * FROM chapters WHERE courseid=$1',[id])
   
res.json(chapter.rows)
} catch (error) {
    console.log(error)
}

})


router.get('/chapter/:id', async(req:any, res:any)=>{
const {id} =req.params;
const chapter = await pool.query('SELECT * FROM chapters WHERE courseid=$1 ',[id])
res.json(chapter.rows)

})

router.get('/chapterdetail/:chapterid',  async(req:any, res:any)=>{
   
    const {chapterid} = req.params;

    try {
        const chapterDetail = await pool.query('SELECT * FROM chapters WHERE id=$1', [chapterid]);
        res.json(chapterDetail.rows[0])
    } catch (error) {
        console.log(error)
    }
   

})


router.post('/chapterdetail/:chapterid', async (req:any, res:any)=>{
    const {chapterid} = req.params;
    const {title} = req.body;
    try {
        const updatedTitle = await pool.query('UPDATE chapters SET title=$1 WHERE id=$2 RETURNING *',[title, chapterid])
        res.json(updatedTitle.rows[0])
    } catch (error) {
        console.log(error)
    }
   

})




module.exports = router;
export {};


