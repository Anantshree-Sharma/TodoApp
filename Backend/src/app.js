//npm modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//local modules
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.route");

const app = express();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

const PORT = process.env.PORT || 3001;

dbConnect(() => {
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
});
