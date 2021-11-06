const chalk = require("chalk");

const handlerLog = (handler_name, handler_method) => {
  console.log(
    chalk.cyan.underline(
      `|> ${handler_name} called with ${handler_method} functionality`
    )
  );
};

module.exports = {
  handlerLog,
};
