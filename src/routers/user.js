const chalk = require("chalk");
const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/authentication");
const router = new express.Router();

router.post("/users", async (request, response) => {
  console.clear();
  console.log(
    chalk.yellow.italic.bgWhite(`  -> Users Post method is being called.`)
  );
  // console.log(chalk.yellow(`  -> ${JSON.stringify(request.body)}`));
  const user = new User(request.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    response.status(201).send({ user, token });
  } catch (error) {
    console.log(chalk.red(`     -> ${error}`));
    response.status(400).send(error);
  }
});

router.post("/users/login", async (request, response) => {
  console.clear();
  console.log(chalk.cyan(`   -> Login Hanlder is called`));
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();

    response.status(200).send({ user, token });
  } catch (e) {
    console.log(chalk.red(`   -> Error in Login Handler - ${e}`));
    response.status(400).send({ error: "Authentication failed" });
  }
});

// logout with single token
router.post("/users/logout", auth, async (request, response) => {
  console.log(`  -> Logout user handler is called`);
  try {
    // Kepping rest of token and deleting other tokens
    request.user.tokens = request.user.tokens.filter((token) => {
      return token.token !== request.token;
    });

    await request.user.save();
    response.status(200).send("Successfully logout");
  } catch (e) {
    console.log(" -> Error in Logout Handler ", e);
    response.status(500).send();
  }
});

// logout for all tokens
router.post("/users/logoutAll", auth, async (request, response) => {
  console.log(`  -> Logout All user handler is called`);
  try {
    console.log(request.user);
    request.user.tokens = [];
    console.log(request.user);
    await request.user.save();
    response.status(200).send("Successfully logout");
  } catch (e) {
    console.log(" -> Error in Logout All Handler ", e);
    response.status(500).send();
  }
});

/*// Admin Only 
router.get("/users",auth, (request, response) => {
  // console.clear();
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
});*/

router.get("/users/me", auth, async (request, response) => {
  response.send(request.user);
});

// User logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.token = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    console.log("----->", e);
    res.status(500).send();
  }
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
