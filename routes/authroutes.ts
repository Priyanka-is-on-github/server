const express = require("express");

const router = express.Router();
const pool = require("../db");

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
module.exports = router;
export {};
