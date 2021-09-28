// importing required libraries
const mongoose = require("mongoose");
const validator = require("validator");

// User model
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    default: 1,
    validate(value) {
      // console.log(chalk.magenta(`  -> Age : ${value}`))
      if (value <= 0) {
        throw new Error("  -> Please provide a valid age");
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`  -> Please provide a valid email address`);
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(`  -> Please don't use "password" as password`);
      }
    },
  },
});

// exporting model to use in other files
module.exports = User;
