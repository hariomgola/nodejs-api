const chalk = require("chalk");
const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

router.post("/tasks", (request, response) => {
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

router.get("/tasks", (request, response) => {
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

router.get("/tasks/:id", (request, response) => {
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
      console.log(chalk.red(`  -> Error from Single Task Handler - ${error}`));
      response.status(500).send();
    });
});

router.patch("/tasks/:id", async (request, response) => {
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
    const user = await Task.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return response.status(404).send();
    }
    response.status(202).send(user);
  } catch (e) {
    console.log(chalk.red(`  -> Error in Patch task Handler`));
  }
});

router.delete("/tasks/:id", async (request, response) => {
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

// exporting router functionality
module.exports = router;
