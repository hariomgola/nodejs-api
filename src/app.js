/**
 * Create    -   POST/tasks
 * Read      -   GET/tasks/:id  or GET/tasks
 * Update    -   PATCH/tasks/:id
 * Delete    -   DELETE/tasks:id
 */

/** Request
  POST/tasks HTTP/1.1
  Accept: application/json
  Connection: Keep-Alive
  Authorization: Bearer eywgejwerefhjdshkfhskd....
  {"description" : "Order biryani"}
 */

/**
  HTTP/1.1 201 Created
  Date: Sun, 29 Sep 2021
  Server: Express
  Content-type:application/json
  {"_id":"5478454656784dfsf", description:"Order biryani", "Status":"Not completed"}

 */

const chalk = require("chalk");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
// connecting to db
require("./db/mongoose");

// Making global variable
const app = express();
const port = process.env.PORT || 3000;

// Paser incoming json to object
app.use(express.json());

/**                        --- Functionality ---                   */
const startServer = () => {
  app.listen(port, () => {
    console.log(
      chalk.yellow.italic(`  -> Server is up and running on localhost: ${port}`)
    );
  });
};

const Post_hanlder = () => {
  // Users handler
  app.post("/users", (request, response) => {
    console.log(
      chalk.yellow.italic.bgWhite(`  -> Users Post method is being called.`)
    );
    // console.log(chalk.yellow(`  -> ${JSON.stringify(request.body)}`));

    const user = new User(request.body);
    user
      .save()
      .then((result) => {
        console.log(chalk.green(`    -> ${result}`));
        response.status().send(result);
      })
      .catch((error) => {
        console.log(chalk.red(`     -> ${error}`));
        response.status(400).send(error);
        // response.send(error);
      });

    // response.send('testing!')
  });
  // Task handler
  app.post("/tasks", (request, response) => {
    console.log(
      chalk.yellow.italic.bgWhite(`  -> Users Post method is being called.`)
    );
    // console.log(chalk.yellow(`  -> ${JSON.stringify(request.body)}`));

    const task = new Task(request.body);
    task
      .save()
      .then((result) => {
        console.log(chalk.green(`    -> ${result}`));
        response.status(201).send(result);
      })
      .catch((error) => {
        console.log(chalk.red(`     -> ${error}`));
        response.status(400).send(error);
        // response.send(error);
      });

    // response.send('testing!')
  });
};

/**                        --- Functionality ---                   */

// functionality
startServer();
Post_hanlder();
