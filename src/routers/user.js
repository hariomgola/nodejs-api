const chalk = require("chalk");
const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", (request, response) => {
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
      response.status(200).send(result);
    })
    .catch((error) => {
      console.log(chalk.red(`     -> ${error}`));
      response.status(400).send(error);
      // response.send(error);
    });

  // response.send('testing!')
});

router.get("/users", (request, response) => {
  console.clear();
  console.log(chalk.cyan("    -> Users get handler is called"));

  User.find()
    .then((users) => {
      response.status(201).send(users);
      console.log(chalk.green(`Result from User  -> ${users}`));
    })
    .catch((error) => {
      console.log(chalk.red(`Error from User  -> ${JSON.stringify(error)}`));
      response.status(500).send("{ Error : Internal Server Error }");
    });
});

router.get("/users/:id", (request, response) => {
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

router.patch("/users/:id", async (request, response) => {
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
    const user = await User.findById(request.params.id);
    updates.forEach((update) => (user[update] = request.body[update]));
    await user.save();
    // const user = await User.findByIdAndUpdate(request.params.id, request.body, {
    //   new: true,
    //   runValidators: true,
    // });
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

router.delete("/users/:id", async (request, response) => {
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

// exporting router functionality
module.exports = router;
