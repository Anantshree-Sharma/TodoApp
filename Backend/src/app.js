//npm modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");

//local modules
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.route");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

const PORT = process.env.PORT || 3001;

dbConnect(() => {
  app.listen(PORT, () => {
    console.log(`Runnign on http://localhost:${PORT}`);
  });
});
