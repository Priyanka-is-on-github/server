const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/auth-routes");
const upload_router =require('./routes/file-upload-routes')
const chapter_upload_router = require('./routes/chapter-upload-routes')
const video_upload_router = require('./routes/video-upload-routes')
const published_course_router = require('./routes/published-course-routes')
const checkout_router = require('./routes/checkout')
const webhookRouter = require('./routes/webhook')
const get_purchase_router = require('./routes/get-purchase')
const get_progress_router = require('./routes/get-progress')
const get_analytics_router = require('./routes/get-analytics')
const table = require('./dbmigration');



const PORT = process.env.PORT || 3001;

// database creation

table()

// Middleware
app.use(cors());

app.use(
  "/api/v1/webhook/webhookRoute",
  express.raw({ type: "*/*" })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//routes
// app.use(authMiddleware);


app.use('/api/v1/fileupload', upload_router);

app.use("/api/v1/", router); 

app.use('/api/v1/courses',chapter_upload_router);

app.use('/api/v1/courses',checkout_router);

app.use('/api/v1/videoupload', video_upload_router);

app.use('/api/v1/getcourses', published_course_router)

app.use('/api/v1/getpurchase', get_purchase_router)

app.use('/api/v1/getprogress', get_progress_router)

app.use('/api/v1/getanalytics', get_analytics_router)

app.use('/api/v1/webhook', webhookRouter);

app.get("/health",async(req:any,res:any)=>{
  res.json("hi from priyanka");
})




app.listen(PORT, () => console.log(`Server running on ${PORT}, http://localhost:${PORT}`));
