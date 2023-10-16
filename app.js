const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// const router = require("./routes");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));

app.use(express.json());

// Security headers
app.use(helmet());

// Rate limit to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// app.use((req, res, next) => {
// req.user = {
//   _id: "651f98501f2952157b09cd18",
// };
// next();
// });

// app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
