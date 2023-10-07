const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const router = require("./routes");

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
