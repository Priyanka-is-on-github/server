const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/coursePurchase", async (req: any, res: any) => {
  const { courseId } = req.query;

  if (!courseId) {
    return res.status(400).json({ error: "courseId is required" });
  }

  try {
    const get_purchase = await pool.query(
      "SELECT courseid FROM purchase WHERE courseid = $1",
      [courseId]
    );

    if (get_purchase.rowCount > 0) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (error) {
    console.error("Error fetching course purchase:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getpurchased", async (req: any, res: any) => {
  const { userid } = req.headers;
  try {
    const purchasedCourses = await pool.query(
      "SELECT courseid FROM purchase WHERE userid=$1",
      [userid]
    );

    const courses = purchasedCourses.rows.map(
      (purchasedCourse: { courseid: number }) => {
        return purchasedCourse.courseid;
      }
    );

    if (courses.length === 0) {
      return res.status(200).json([]);
    }

    const allPurchasedCourse = await pool.query(
      "SELECT * From course WHERE id= ANY($1::int[])",
      [courses]
    );

    const publishedChapters = await Promise.all(
      courses.map(async (courseId: number) => {
        const result = await pool.query(
          "SELECT COUNT(id) as chapter_count FROM chapters WHERE ispublished = true AND courseid=$1",
          [courseId]
        );
        return result.rows[0].chapter_count;
      })
    );

    const validCompleteChapter = await Promise.all(
      courses.map(async (courseId: number) => {
        const result = await pool.query(
          "SELECT COUNT(isCompleted) as chapter FROM userprogress WHERE courseid=$1 and isCompleted=true",
          [courseId]
        );
        return result.rows[0].chapter;
      })
    );

    const percentages = validCompleteChapter.map((value, index) => {
      let total = publishedChapters[index];
      let percentage = (value / total) * 100;
      return percentage;
    });

    const CompletedCourse = percentages.filter((percentage: number) => {
      return percentage === 100;
    });

    const inProgress = percentages.filter((percentage: number) => {
      return percentage !== 100;
    });

    res
      .status(200)
      .json({
        courses: allPurchasedCourse.rows,
        completedCount: CompletedCourse.length,
        progress: inProgress.length,
      });
  } catch (error) {
    console.log(error);
    res.status(401).send("unauthorized");
  }
});

module.exports = router;
export {};
