const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "651f98501f2952157b09cd18",
  };
  next();
});

const router = require("./routes");
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
