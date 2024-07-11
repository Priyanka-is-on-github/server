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

// Update course

router.post("/courses/:id", async (req: any, res: any) => { 
  const { id } = req.params;
  const {
    title,
    description,
    imageurl,
    price,
    ispublished,
    categoryid,
    createdat,
    updatedat,
  } = req.body;

  try {
    const courseValues = await pool.query("SELECT * FROM course WHERE id=$1", [
      id,
    ]);

    const updatedcourse = {
      title: title != null ? title : courseValues.rows[0].title,
      description:
        description != null ? description : courseValues.rows[0].description,
      imageurl: imageurl != null ? imageurl : courseValues.rows[0].imageurl,
      price: price != null ? price : courseValues.rows[0].price,
      ispublished:
        ispublished != null ? ispublished : courseValues.rows[0].ispublished,
      categoryid:
        categoryid != null ? categoryid : courseValues.rows[0].categoryid,
      createdat: createdat != null ? createdat : courseValues.rows[0].createdat,
      updatedat: updatedat != null ? updatedat : courseValues.rows[0].updatedat,
    };

    const updatedCourse = await pool.query(
      "UPDATE course SET title = $1, description=$2, imageurl=$3, price=$4, ispublished=$5, categoryid=$6, createdat=$7, updatedat=$8 WHERE id = $9 RETURNING *",
      [
        updatedcourse.title,
        updatedcourse.description,
        updatedcourse.imageurl,
        updatedcourse.price,
        updatedcourse.ispublished,
        updatedcourse.categoryid,
        updatedcourse.createdat,
        updatedcourse.updatedat,
        id,
      ]
    );

    console.log(updatedCourse.rows[0]);
    res.json(updatedCourse.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/category", async (req: any, res: any) => {
  try {
    const allCategory = await pool.query(
      " SELECT * FROM  category ORDER BY name ASC"
    );
    res.json(allCategory.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/courses", async (req: any, res: any) => {
  try {
    const courses = await pool.query(
      "SELECT title,price,ispublished,id FROM course ORDER BY createdat DESC"
    );

    res.json(courses.rows);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/courses/:id", async (req: any, res: any) => {
  const { id } = req.params;

  await pool.query("DELETE FROM course WHERE id=$1 RETURNING *", [id]);
  await pool.query("DELETE FROM chapters WHERE courseid=$1 RETURNING *", [id]);
  res.json({ msg: "Course Deleted" });
});

router.put("/courses", async (req: any, res: any) => {
  const { Id, ispublish } = req.query;

  try {
    const response = await pool.query(
      "UPDATE course SET ispublished=$1 WHERE id=$2 RETURNING *",
      [ispublish, Id]
    );
    res.json({ mesg: "course publish" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
export {};
