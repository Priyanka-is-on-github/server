const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/authroutes");

const PORT = 3000;

// Middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v1/", router);

app.listen(PORT, () => {
  console.log("server is running at port:", PORT);
});
