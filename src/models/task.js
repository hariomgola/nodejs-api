// importing required libraries
const mongoose = require("mongoose");
const validator = require("validator");

// creating Task Schema
const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // provide schema name
    },
  },
  {
    timestamps: true,
  }
);

// creating Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
