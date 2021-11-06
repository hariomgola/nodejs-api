const chalk = require("chalk");

const handlerLog = (handler_name, handler_method) => {
  console.log(
    chalk.cyan.underline(
      `|> ${handler_name} called with ${handler_method} functionality`
    )
  );
};

const errorLog = (handler_name, handler_method, _error) => {
  console.log(
    chalk.red(`|> Error in ${handler_name} called with ${handler_method}`)
  );
};

const messageLog = (message) => {
  console.log(chalk.green(`|> Custom log - ${message}`));
};

module.exports = {
  handlerLog,
  errorLog,
  messageLog
};
