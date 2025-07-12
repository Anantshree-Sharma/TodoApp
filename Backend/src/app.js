//npm modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//local modules
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");

const app = express();

const origin =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : "http://localhost:5173";

//middlewares
app.use(
  cors({
    origin,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3001;

dbConnect(() => {
  app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });
});
