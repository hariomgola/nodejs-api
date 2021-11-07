const chalk = require("chalk");
const env = require("../env/enviournment.package.json");

const handlerLog = (handler_name, handler_method) => {
  console.log(
    chalk.cyan.underline(
      `|>_ ${handler_name} called with ${handler_method} functionality`
    )
  );
};

const errorLog = (handler_name, handler_method, _error) => {
  console.log(
    chalk.red(`|>_ Error in ${handler_name} called with ${handler_method}`)
  );
  if (env.serverErrorLog) {
    console.log(chalk.reset(`|>_ ${_error}`));
  }
};

const messageLog = (message) => {
  console.log(chalk.green(`|>_ Custom log - ${message}`));
};

const specialLog = (message) => {
  console.log(chalk.yellow(`|>_ ${message}`));
};

module.exports = {
  handlerLog,
  errorLog,
  messageLog,
  specialLog,
};
