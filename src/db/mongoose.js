// importing mongoose library
const mongoose = require("mongoose");
const chalk = require("chalk");

// connecting mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/nodeApi", {
    useNewUrlParser: true,
    // useCreateindex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log(chalk.green(`|>_ Connection to DB Completed`));
  })
  .catch(() => {
    console.log(chalk.red(`|>_ Error in Connecting to DB`));
  });
