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
// console printing functionality 
const specialLog = require('./logs/devlogs').specialLog;
// console printing functionality 


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

/*// express middle ware function to use
app.use((req, res, next) => {
  console.log(` Method -> ${req.method}  path -> ${req.path}`);
  if (req.method === "GET") {
    res.send({ error: "Get Request is disabled" });
  } else {
    next();
  }
});

// Site maintainance message
app.use((req, res, next) => {
  console.log(`  -> Maintaince middle ware method is called`);
  res
    .status(503)
    .send({ error: "Site is under maintainance please try back soon" });
});
*/

// Paser incoming json to object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Starting Server
const startServer = () => {
  console.clear();
  app.listen(port, () => {
    specialLog(`Server is up and running at ${port}`)
  });
};

startServer();
