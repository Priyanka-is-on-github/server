const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/auth-routes");
const upload_router =require('./routes/file-upload-routes')
const chapter_upload_router = require('./routes/chapter-upload-routes')
const video_upload_router = require('./routes/video-upload-routes')
const published_course_router = require('./routes/published-course-routes')
const checkout_router = require('./routes/checkout')
const webhookRouter = require('./routes/webhook');


const PORT = 3001;


// Middleware
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

//routes
app.use('/api/v1/fileupload', upload_router);

app.use("/api/v1/", router); 

app.use('/api/v1/courses',chapter_upload_router);

app.use('/api/v1/courses',checkout_router);

app.use('/api/v1/videoupload', video_upload_router);

app.use('/api/v1/getcourses', published_course_router)

app.use('/api/v1/webhook', webhookRouter);



app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

