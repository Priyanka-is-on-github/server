const express = require("express");
const router = express.Router();
const pool = require("../db");

router.put("/courseprogress", async (req: any, res: any) => {
  const { chapterId } = req.query;

  const { isCompleted } = req.body;

  const { userid } = req.headers;

  if (!userid) {
    res.json("Unauthorized", { status: 401 });
  }

  try {
    const response = await pool.query(
      "UPDATE  userprogress  SET iscompleted=$1 WHERE chapterid=$2 AND userid=$3",
      [isCompleted, chapterId, userid]
    );

    
    res.status(201).json({ msg: "userprogress updated" });
  } catch (error) {
    console.error("Chapter Id Progress:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/progressPercentage", async (req: any, res: any) => {

  const { courseId , userId} = req.query;

  
  try {
    const publishedChapter = await pool.query(
      "select id from chapters where ispublished = true and courseid=$1",
      [courseId]
    );

    const publishedChapterIds = publishedChapter.rows.map((row: any) => {
      return row.id;
    });

    const validCompeltedChapters = await pool.query(
      "SELECT iscompleted FROM userprogress WHERE courseid=$1 AND userid=$2 AND iscompleted=true",
      [courseId, userId]
    );

    const validCompeltedChapters_count = validCompeltedChapters.rowCount;

    

    const progressPercentage = Math.floor((validCompeltedChapters_count / publishedChapterIds.length) * 100);



    await pool.query('UPDATE course SET progress_percentage=$1 WHERE id=$2 ', [progressPercentage,courseId])

   
    res.json({ progressPercentage });
  } catch (error) {
    console.log(error);
  }
});

router.get("/chapterCompleted", async (req: any, res: any) => {
  const { chapterId, userId } = req.query;

  // console.log(req.query);

  try {
    const isCompleted = await pool.query(
      "SELECT iscompleted FROM userprogress WHERE userid=$1 and chapterid=$2",
      [userId, chapterId]
    );

    // console.log(isCompleted.rows[0])
    res.json(isCompleted.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
export {};
