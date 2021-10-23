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

/** Commenting code to change things to router */

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

  /*   // changing above function as a async
    app.get("/users/:id", async (request, response) => {
      const _id = request.params.id;
      try {
        const user = await User.findById(_id);
        if (!user) 
          return response.status(400).send("User Not Found");
        response.status(200).send(user);
      } catch (e) {
        response.status(500).send(e);
      }
    });
    */

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

const Patch_Handler = () => {
  app.patch("/users/:id", async (request, response) => {
    console.clear();
    console.log(chalk.cyan(`   ->  User Patch handler is called.`));
    /*      Error handling      */
    const allowedUpdate = ["name", "email", "password", "age"];
    const updates = Object.keys(request.body);
    // checking all field request are valid and using short hand operator
    const isValidOpertion = updates.every((update) =>
      allowedUpdate.includes(update)
    );
    // const isValidOpertion = updates.every((update) => {
    //   return allowedUpdate.includes(update);
    // });
    if (!isValidOpertion) {
      return response.status(400).send({ error: "Invalid Updates" });
    }
    /*     Error handling End      */
    try {
      const user = await User.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true, runValidators: true }
      );
      // 3 condition / Update badly / Update go good / There is not user with that id to update
      if (!user) {
        return response.status(404).send();
      }

      response.status(202).send(user);
    } catch (e) {
      console.log(chalk.red(`   -> Error in Patch User Handler `));
      response.status(400).send(e);
    }
  });

  app.patch("/tasks/:id", async (request, response) => {
    console.clear();
    console.log(chalk.cyan(`   -> Task Patch handler is called`));
    /* Error handling start */
    const allowedUpdate = ["description", "completed"];
    const updates = Object.keys(request.body);
    // checking all field request are valid and using short hand operator
    const isValidOpertion = updates.every((update) =>
      allowedUpdate.includes(update)
    );
    if (!isValidOpertion) {
      return response.status(400).send({ error: "Invalid Updates" });
    }
    /* Error Handling End */
    try {
      const user = await Task.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) {
        return response.status(404).send();
      }
      response.status(202).send(user);
    } catch (e) {
      console.log(chalk.red(`  -> Error in Patch task Handler`));
    }
  });
};

const Delete_Handler = () => {
  app.delete("/users/:id", async (request, response) => {
    console.clear();
    console.log(chalk.cyan("   -> User Delete Handler is called"));
    try {
      const user = await User.findByIdAndDelete(request.params.id);
      if (!user) {
        return response.status(404).send({ error: "User Not found" });
      }

      response.status(200).send(user);
    } catch (e) {
      console.log(chalk.red("  -> Error in Delete User Handler"));
      return response.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.delete("/tasks/:id", async (request, response) => {
    console.clear();
    console.log(chalk.cyan("   -> Task Delete Handler is called"));
    try {
      const task = await Task.findByIdAndDelete(request.params.id);
      if (!task) {
        return response.status(404).send({ error: "Task Not found" });
      }
      response.status(200).send(task);
    } catch (e) {
      console.log(chalk.red("  -> Error in Delete Task Handler"));
      return response.status(500).send({ error: "Internal Server Error" });
    }
  });
};

/**                        --- Functionality ---                   */

// functionality
startServer(); // starting server
Post_hanlder(); // Create Data
Get_Handler(); // Read Data
Patch_Handler(); // Update Data
Delete_Handler(); // Delete Data

/** This is the code using express
 * later we have changes code on based of express routes
 * So Kepting this code as a backup
 */
