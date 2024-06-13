const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/authroutes");
const  { uploadRouter } = require( "./uploadthing");
const{ createRouteHandler } = require("uploadthing/express");
const UPLOADTHING_ID = process.env.uploadthingid;
const UPLOADTHING_SECRET = process.env.uploadthingsecret;

const PORT = 3000;


// Middleware
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/", router);

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: { callbackUrl: "http:localhost:3000", uploadthingId: UPLOADTHING_ID,   uploadthingSecret: UPLOADTHING_SECRET },
  }),
);

app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

