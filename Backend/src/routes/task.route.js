const express = require("express");
const authentication = require("../middlewares/auth.js");
const {
  addTask,
  removeTask,
  getAllTasks,
  updateTask,
} = require("../controllers/task.controller.js");

const taskRouter = express.Router();

taskRouter.use(authentication);

taskRouter.post("/task/add", addTask);
taskRouter.get("/task/all", getAllTasks);
taskRouter.patch("/task/edit/:id", updateTask);
taskRouter.delete("/task/delete/:id", removeTask);

module.exports = taskRouter;
