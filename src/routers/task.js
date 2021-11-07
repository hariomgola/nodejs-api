const express = require("express");
const auth = require("../middleware/authentication");
const Task = require("../models/task");
const router = new express.Router();

// console printing functionality
const logs = require("../logs/devlogs");
const handler_log = logs.handlerLog;
const handler_error = logs.errorLog;
const handler_message = logs.messageLog;
// console printing functionality

router.post("/tasks", auth, async (request, response) => {
  handler_log("Task", "post");
  const task = new Task({
    ...request.body,
    owner: request.user._id,
  });
  try {
    await task.save();
    response.status(201).send(task);
  } catch (e) {
    response.status(400).send(e);
  }
});

router.get("/tasks", auth, async (request, response) => {
  handler_log("Task", "get");
  try {
    // const task = await Task.find({
    //   owner: request.user._id,
    // });
    // response.status(200).send(task);
    await request.user.populate("tasks");
    response.status(200).send(request.user.tasks);
  } catch (e) {
    handler_error("Task", "get", e);
    response.status(500).send();
  }
  // Task.find({
  //   completed: true,
  // })
  // Task.find()
  //   .then((task) => {
  //     response.status(200).send(task);
  //     handler_message(task);
  //   })
  //   .catch((e) => {
  //     handler_error("Task", "get", e);
  //     response.status(500).send();
  //   });
});

router.get("/tasks/:id", auth, async (request, response) => {
  handler_log("Single Task", "post");
  const _id = request.params.id;
  handler_message(`Requested Id - ${_id}`);

  try {
    const task = await Task.findOne({
      _id,
      owner: request.user._id,
    });
    if (!task) {
      handler_message(`Task Not found`);
      return response.status(404).send();
    }
    response.status(200).send(task);
  } catch (e) {
    handler_error("Single Task", "post", e);
    response.status(500).send();
  }
  // Task.findById(_id)
  //   .then((task) => {
  //     if (!task) {
  //       handler_message(`Task Not found`);
  //       return request.status(404).send();
  //     }

  //     handler_message(`Task - ${task}`);
  //     response.status(200).send(task);
  //   })
  //   .catch((e) => {
  //     handler_error("Single Task", "post", e);
  //     response.status(500).send();
  //   });
});

router.patch("/tasks/:id", auth, async (request, response) => {
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
    // const user = await Task.findById(request.params.id);
    // const user = await Task.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findOne({
      _id: request.params.id,
      owner: request.user._id,
    });
    if (!task) {
      return response.status(404).send();
    }
    updates.forEach((update) => (task[update] = request.body[update]));
    await task.save();
    response.status(202).send(task);
  } catch (e) {
    handler_error("Task", "patch (Update)", e);
    response.status(500).send();
  }
});

router.delete("/tasks/:id", auth, async (request, response) => {
  handler_log("Task", "Delete");
  try {
    // const task = await Task.findByIdAndDelete(request.params.id);
    const task = await Task.findOneAndDelete({
      _id: request.params.id,
      owner: request.user._id,
    });
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
