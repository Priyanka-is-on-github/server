const express = require("express");

const router = express.Router();
const pool = require("../db");

// insert initial title of the course

router.post("/courses", async (req: any, res: any) => {
  try {
    const { title } = req.body;

    const newCourse = await pool.query(
      "INSERT INTO course(title) VALUES($1) RETURNING *",
      [title]
    );

    res.json(newCourse.rows[0]);
  } catch (error) {
    console.log(error);
  }
});
// Fetching all data of one row using row id

router.get("/courses/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const newCourseFields = await pool.query(
      "SELECT * FROM course WHERE id=$1",
      [id]
    );

    res.json(newCourseFields.rows[0]);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update course title

router.post("/courses/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedCourse = await pool.query(
      "UPDATE course SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );

    res.json(updatedCourse.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
export {};
