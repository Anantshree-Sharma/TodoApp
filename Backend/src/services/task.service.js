const Task = require("../models/task.model.js");

exports.createTask = async (userId, task) => {
  return await Task.create({ ...task, userId });
};

exports.deleteTask = async (deleteId) => {
  return await Task.findByIdAndDelete(deleteId);
};

exports.findTaskById = async (id) => {
  return await Task.findById(id);
};

exports.findTasksByUserId = async (userId) => {
  return await Task.find({ userId });
};
