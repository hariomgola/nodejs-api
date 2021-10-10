const chalk = require("chalk");

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 3000);
  });
};

// simple method and complex as using nested promise
add(2, 2)
  .then((sum) => {
    console.log(chalk.cyan(`   -> ${sum}`));
    add(sum, 5)
      .then((sum2) => {
        console.log(chalk.cyan(`   -> ${sum2}`));
      })
      .catch((error2) => {
        console.log(chalk.red(`    -> Error - ${error2}`));
      });
  })
  .catch((error) => {
    console.log(chalk.red(`    -> Error - ${error}`));
  });

// promise chaining concepts
add(2, 2)
  .then((sum) => {
    console.log(chalk.cyan(`   -> ${sum}`));
    return add(sum, 4);
  })
  .then((sum2) => {
    console.log(chalk.cyan(`   -> ${sum2}`));
  })
  .catch((error) => {
    console.log(chalk.red(`   -> ${error}`));
  });
