const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes");
const {
  validateAuthentication,
  validateUserCreation,
} = require("./middlewares/validation");
const { signup, login } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const app = express();

/*
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));
*/
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log("DB error", e));

app.use(express.json());

// Security headers
app.use(helmet());

app.set('trust proxy', 1);

// Rate limit to all requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000",
    "https://se-project-react.vercel.app/"],
  }),
);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger);
app.post("/signin", validateAuthentication, login);
app.post("/signup", validateUserCreation, signup);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
