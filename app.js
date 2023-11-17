const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));

app.use(express.json());

// Security headers
app.use(helmet());

// Rate limit to all requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  }),
);

app.use(errors());
app.use(requestLogger);
app.use(router);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
