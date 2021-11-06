const Task = require("../models/task");
const User = require("../models/user");

const taskRelation = async () => {
  const task = await Task.findById("618677b887e68475aa0a0078");
  await task.populate("owner");
  console.log(task.owner);
};
const userRelation = async () => {
  const user = await User.findById("6186779a87e68475aa0a0070");
  await user.populate("tasks");
  console.log(user.tasks);
};

taskRelation();
userRelation();
