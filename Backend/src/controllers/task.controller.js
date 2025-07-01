const {
  createTask,
  deleteTask,
  findTaskById,
  findTasksByUserId,
} = require("../services/task.service");
const AppError = require("../utils/AppError");

exports.addTask = async (req, res) => {
  try {
    const user = req.user;
    const task = req.body;
    if (!task.title) {
      throw new AppError("Title is required", 400);
    }
    const createdTask = await createTask(user._id, task);
    if (!createdTask) {
      throw new AppError("Something went wrong", 500);
    }

    const { title, description, status, category, date, _id } = createdTask;
    res.status(201).json({ title, description, status, category, date, _id });
  } catch (err) {
    const error =
      err instanceof AppError ? err.message : "Something went wrong";
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    console.log(err);
    res.status(statusCode).json({ error });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const user = req.user;
    const tasks = await findTasksByUserId(user._id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.updateTask = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const { title, description, status, category } = req.body;
  try {
    const task = await findTaskById(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    if (!task.userId.equals(user._id)) {
      throw new AppError("unauthorized", 401);
    }
    if (!title || !description || !status || !category) {
      throw new AppError("Missing or invalid input", 400);
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.category = category;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    console.log(err.name);
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    } else if (err.name === "ValidationError") {
      return res.status(400).json({ error: "Missing or invalid input" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.removeTask = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const task = await findTaskById(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    if (!task.userId.equals(user._id)) {
      throw new AppError("Unauthorized", 400);
    }
    await deleteTask(id);
    res.status(204).json({ msg: "deleted" });
  } catch (err) {
    const error =
      err instanceof AppError ? err.message : "something went wrong";
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    res.status(statusCode).json({ error });
  }
};
