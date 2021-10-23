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
// Importing Routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

// connecting to db
require("./db/mongoose");

// Making global variable
const app = express();
const port = process.env.PORT || 3000;

// Paser incoming json to object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Starting Server
const startServer = () => {
  console.clear();
  app.listen(port, () => {
    console.log(
      chalk.yellow.italic(`  -> Server is up and running on localhost: ${port}`)
    );
  });
};

startServer();
