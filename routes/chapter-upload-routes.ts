const express = require('express');

const router = express.Router();
const pool = require('../db')

router.post('/chapter/:id', async(req:any, res:any)=>{
const {id} = req.params;
const {title, count} = req.body;

try {
    await pool.query('INSERT INTO chapters(title, position, courseid) VALUES($1,$2,$3) RETURNING *',[title,count, id])
    const chapter = await pool.query('SELECT * FROM chapters WHERE courseid=$1',[id])
   
res.json(chapter.rows)
} catch (error) {
    console.log(error)
}

})


router.get('/chapter/:id', async(req:any, res:any)=>{
const {id} =req.params;
const chapter = await pool.query('SELECT * FROM chapters WHERE courseid=$1 ORDER BY position ASC',[id])
res.json(chapter.rows)

})

router.get('/chapterdetail/:chapterid',  async(req:any, res:any)=>{
   
    let {chapterid} = req.params;
    chapterid = parseInt(chapterid)
    try {
        const chapterDetail = await pool.query('SELECT title, description, videourl, isfree, ispublished FROM chapters WHERE id=$1', [chapterid]);
       
        res.json(chapterDetail.rows[0])
    } catch (error) {
        console.log(error)
    }
   

})


router.post('/chapterdetail/:chapterid', async (req:any, res:any)=>{
    let {chapterid} = req.params;
    const {title, description, videourl, isfree} = req.body;
    chapterid = parseInt(chapterid)
 
   
    try {
        const prevChapterDetail = await pool.query('SELECT title, description, videourl, isfree FROM chapters WHERE id=$1',[chapterid])

        const updatedDetail = {title: (title!=null?title:prevChapterDetail.rows[0].title) , description:(description!=null?description: prevChapterDetail.rows[0].description), videourl:(videourl!=null?videourl:prevChapterDetail.rows[0].videourl), isfree:(isfree!=null?isfree:prevChapterDetail.rows[0].isfree) }


        const updatedChapterDetail = await pool.query('UPDATE chapters SET title=$1, description=$2, videourl=$3, isfree=$4 WHERE id=$5 RETURNING *',[updatedDetail.title, updatedDetail.description, updatedDetail.videourl, updatedDetail.isfree, chapterid])



        res.json(updatedChapterDetail.rows[0])
    } catch (error) {
        console.log(error)
    }
   

})



router.delete('/chapterdelete/:chapterid', async (req:any, res:any)=>{ 
  const {chapterid} = req.params;
const {courseid} = req.body;

  try {
  await pool.query('DELETE FROM chapters WHERE id=$1 RETURNING *',[chapterid]);
   const publishedChapters= await pool.query("SELECT ispublished FROM chapters WHERE courseid=$1", [courseid]) 
   const hasPublishedChapters = publishedChapters.rows.some((chapter: { ispublished: boolean }) => chapter.ispublished);


   if (!hasPublishedChapters) {
    await pool.query('UPDATE course SET ispublished = false WHERE id = $1', [courseid]);
  }

  res.status(200).json({ message: 'Chapter deleted successfully' });
} catch (error) {
  
  res.status(500).json({ message: 'Internal server error' });
}
   
})




router.put('/chapterdetail', async(req:any, res:any)=>{ 
  
    const {chapterId, ispublish, courseId} = req.query; 
   
   
    try {

      await pool.query('UPDATE chapters SET ispublished=$1 WHERE id=$2 RETURNING *',[ispublish,chapterId]) 

      const publishedChapters= await pool.query("SELECT ispublished FROM chapters WHERE courseid=$1", [courseId]) 
      const hasPublishedChapters = publishedChapters.rows.some((chapter: { ispublished: boolean }) => chapter.ispublished);

      
   if (!hasPublishedChapters) {
    await pool.query('UPDATE course SET ispublished = false WHERE id = $1', [courseId]);
  }



  res.status(200).json({ message: 'Chapter updated successfully' });

  

    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      
    }
    
    
})


router.put('/chapters/reorder', async (req:any, res:any) => {
    const reorderedChapters = req.body;
   
    try {
      const updatePromises = reorderedChapters.map((reorderedChapter:{id:string,position:string}) => {
        return pool.query(
          'UPDATE chapters SET position=$1 WHERE id=$2',
          [reorderedChapter.position, reorderedChapter.id]
        );
      });
  
      // Wait for all update queries to complete
      await Promise.all(updatePromises);
  
      res.json({ message: 'Chapters reordered' });
    } catch (error:any) {
      console.error('Error reordering chapters:', error);
      res.status(500).json({ message: 'Error reordering chapters', error: error.message });
    }
  });




module.exports = router;
export {};


