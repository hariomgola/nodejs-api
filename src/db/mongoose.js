// importing mongoose library
const mongoose = require("mongoose");
const chalk = require("chalk");

// connecting mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-db", {
    useNewUrlParser: true,
    // useCreateindex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log(chalk.green(`  -> connecting to database complete`));
  })
  .catch(() => {
    console.log(chalk.red(`  -> connection to database is unsuccessfull`));
  });
