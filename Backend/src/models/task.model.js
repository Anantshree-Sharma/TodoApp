const mongoose = require("mongoose");
const dayjs = require("dayjs");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    category: {
      type: String,
      enum: [
        "study",
        "professional",
        "personal",
        "home",
        "heath",
        "shopping",
        "social ",
        "others",
      ],
      default: "others",
    },
    date: {
      type: String,
      required: true,
      default: dayjs().format("DD-MM-YYYY"),
    },

    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
