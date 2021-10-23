/*
                           fulfilled
                            /
 Promises --  Pending -->
                            \
                           rejected

*/
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

// Async Await concept / Async await function always return a promise
const doSomething = () => {};
console.log(doSomething());

const _doSomething = async () => {
  const sum = await add(1, 2);
  const sum2 = await add(sum, 3);
  return sum2;
};

_doSomething
  .then((result) => {
    console.log("Result---------->", result);
  })
  .catch((error) => {
    console.log("Error --------->", error);
  });
