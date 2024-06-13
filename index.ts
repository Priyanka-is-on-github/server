const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/authroutes");
const  { uploadRouter } = require( "./uploadthing");
const{ createRouteHandler } = require("uploadthing/express");

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
    config: { callbackUrl: "http:localhost:3000", uploadthingId: 'm722ipa70e',   uploadthingSecret: 'sk_live_e5c78e806c180f42eeb408896a44321a1fe8e2bec34488bbff5919e23a2bb890' },
  }),
);

app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});

