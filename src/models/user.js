// importing required libraries
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function (next) {
  const user = this;
  // console.log('  -> Before Saving User');
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // next tell us that the function will end
  next();
});

// User model
const User = mongoose.model("User", userSchema);

// exporting model to use in other files
module.exports = User;
