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
  console.clear();
  app.listen(port, () => {
    console.log(
      chalk.yellow.italic(`  -> Server is up and running on localhost: ${port}`)
    );
  });
};

const Post_hanlder = () => {
  // Users handler
  app.post("/users", (request, response) => {
    console.clear();
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
    console.clear();
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

const Get_Handler = () => {
  /* - USER - */

  // Handler to get all users
  app.get("/users", (request, response) => {
    console.clear();
    console.log(chalk.cyan("    -> Users get handler is called"));

    User.find({
      name: "Hari",
    })
      .then((users) => {
        response.status(201).send(users);
        console.log(chalk.green(`Result from User  -> ${users}`));
      })
      .catch((error) => {
        console.log(chalk.red(`Error from User  -> ${JSON.stringify(error)}`));
        response.status(500).send("{ Error : Internal Server Error }");
      });
  });

  // Handler to get users by Id
  // Using route pramater express concept
  app.get("/users/:id", (request, response) => {
    console.clear();
    console.log(chalk.cyan("    -> Single Users get handler is called"));

    const _id = request.params.id;
    console.log(chalk.yellow(`   -> Request Id from Users/ - ${_id}`));

    User.findById(_id)
      .then((user) => {
        if (!user) {
          console.log(chalk.cyan("     -> User with particular Id not found"));
          return response.status(404).send();
        }
        console.log(
          chalk.green(`   -> Single User Data with Particular Id - ${user}`)
        );
        response.status(200).send(user);
      })
      .catch((error) => {
        console.log(chalk.red(`Error from User  -> ${JSON.stringify(error)}`));
        response.status(500).send();
      });
  });

  /* - TASK - */
  app.get("/tasks", (request, response) => {
    console.clear();
    console.log(chalk.cyan("   -> task get Handler is called"));

    // Task.find({
    //   completed: true,
    // })
    Task.find()
      .then((task) => {
        response.status(200).send(task);
        console.log(
          chalk.green(`   -> Response from Task get - ${JSON.stringify(task)}`)
        );
      })
      .catch((error) => {
        response.status(500).send();
        console.log(chalk.red(`    -> Error from Task get Handler - ${error}`));
      });
  });

  app.get("/tasks/:id", (request, response) => {
    console.clear();
    console.log(chalk.cyan("   -> task Single Handler is called"));

    const _id = request.params.id;
    console.log(chalk.cyan(`   -> requester id - ${_id}`));

    Task.findById(_id)
      .then((task) => {
        if (!task) {
          console.log(chalk.cyan("   -> Task with particular id not found"));
          return request.status(404).send();
        }

        console.log(
          chalk.green(
            ` Result from Single Task Handler - ${JSON.stringify(task)}`
          )
        );
        response.status(200).send(task);
      })
      .catch((error) => {
        console.log(
          chalk.red(`  -> Error from Single Task Handler - ${error}`)
        );
        response.status(500).send();
      });
  });
};

/**                        --- Functionality ---                   */

// functionality
startServer();
Post_hanlder();
Get_Handler();
