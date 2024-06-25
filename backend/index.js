const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routers/authRouters");
const mongoose = require("mongoose");
app.use(express.json());

app.use("/", router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
