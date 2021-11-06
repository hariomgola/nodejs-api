// importing required libraries
const mongoose = require("mongoose");
const validator = require("validator");

// creating Task model
const Task = mongoose.model("Task", {
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
});

module.exports = Task;
