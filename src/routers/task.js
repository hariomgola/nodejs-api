const chalk = require("chalk");
const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

// console printing functionality
const logs = require("../logs/devlogs");
const handler_log = logs.handlerLog;
const handler_error = logs.errorLog;
const handler_message = logs.messageLog;
// console printing functionality

router.post("/tasks", (request, response) => {
  handler_log("Task", "post");
  const task = new Task(request.body);
  task
    .save()
    .then((result) => {
      handler_message(result)
      response.status(201).send(result);
    })
    .catch((e) => {
      handler_error("Task", "post", e);
      response.status(400).send(error);
    });
});

router.get("/tasks", (request, response) => {
  handler_log("Task", "get");
  // Task.find({
  //   completed: true,
  // })
  Task.find()
    .then((task) => {
      response.status(200).send(task);
      handler_message(task);
    })
    .catch((e) => {
      handler_error("Task", "get", e);
      response.status(500).send();
    });
});

router.get("/tasks/:id", (request, response) => {
  handler_log("Single Task", "post");
  const _id = request.params.id;
  handler_message(`Requested Id - ${_id}`)

  Task.findById(_id)
    .then((task) => {
      if (!task) {
        handler_message(`Task Not found`)
        return request.status(404).send();
      }

      handler_message(`Task - ${task}`);
      response.status(200).send(task);
    })
    .catch((e) => {
      handler_error("Single Task", "post", e);
      response.status(500).send();
    });
});

router.patch("/tasks/:id", async (request, response) => {
  handler_log("Task", "patch (Update)");
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
    const user = await Task.findById(request.params.id);
    updates.forEach((update) => (user[update] = request.body[update]));
    await user.save();
    // const user = await Task.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return response.status(404).send();
    }
    response.status(202).send(user);
  } catch (e) {
    handler_error("Task", "patch (Update)", e);
    response.status(500).send();
  }
});

router.delete("/tasks/:id", async (request, response) => {
  handler_log("Task", "Delete");
  try {
    const task = await Task.findByIdAndDelete(request.params.id);
    if (!task) {
      return response.status(404).send({ error: "Task Not found" });
    }
    response.status(200).send(task);
  } catch (e) {
    handler_error("Task", "Delete", e);
    return response.status(500).send({ error: "Internal Server Error" });
  }
});

// exporting router functionality
module.exports = router;
