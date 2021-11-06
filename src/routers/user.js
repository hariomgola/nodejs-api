const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/authentication");
const router = new express.Router();

// console printing functionality
const logs = require("../logs/devlogs");
const handler_log = logs.handlerLog;
const handler_error = logs.errorLog;
const handler_message = logs.messageLog;
// console printing functionality 

/**
 * Admin fnctionality for admin Access only
 */ /*
router.get("/users",auth, (request, response) => {
  handler_log('users','get');
  User.find()
    .then((users) => {
      response.status(201).send(users);
      handler_message(` All Data from DB - ${JSON.stringify(user)}`);
    })
    .catch((error) => {
      handler_log('users','get');
      response.status(500).send("{ Error : Internal Server Error }");
    });
});*/

/**
 * Create User Router
 */
router.post("/users", async (request, response) => {
  handler_log("users", "post");
  // console.log(chalk.yellow(`  -> ${JSON.stringify(request.body)}`));
  const user = new User(request.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    response.status(201).send({ user, token });
  } catch (e) {
    handler_error("users", "post");
    response.status(400).send(error);
  }
});
/**
 * Read Own Profile Router
 */
router.get("/users/me", auth, async (request, response) => {
  handler_log("Users ME", "get");
  try {
    response.send(request.user);
  } catch (e) {
    handler_error("Users ME", "get", e);
    response.status(500).send();
  }
});
/**
 * Login User Router
 */
router.post("/users/login", async (request, response) => {
  handler_log("Login-users", "post");
  try {
    const user = await User.findByCredentials(
      request.body.email,
      request.body.password
    );
    const token = await user.generateAuthToken();

    response.status(200).send({ user, token });
  } catch (e) {
    handler_error("users", "post", e);
    response.status(400).send({ error: "Authentication failed" });
  }
});
/**
 * Single device logout functionality
 */
router.post("/users/logout", auth, async (request, response) => {
  handler_log("logout", "post");
  try {
    // Kepping rest of token and deleting other tokens
    request.user.tokens = request.user.tokens.filter((token) => {
      return token.token !== request.token;
    });

    await request.user.save();
    response.status(200).send("Successfully logout");
  } catch (e) {
    handler_error("users", "post", e);
    response.status(500).send();
  }
});
/**
 * All Device logout functionality
 */
router.post("/users/logoutAll", auth, async (request, response) => {
  handler_log("logout All", "post");
  try {
    handler_message(` Tokens before request - ${request.user.tokens}`);
    request.user.tokens = [];
    handler_message(` Tokens After request - ${request.user.tokens}`);
    await request.user.save();
    response.status(200).send("Successfully logout");
  } catch (e) {
    handler_error("users", "post", e);
    response.status(500).send();
  }
});
/**
 * Find User profile by Id functionality
 */
router.get("/users/:id", (request, response) => {
  handler_log("users", "get");
  const _id = request.params.id;
  handler_message(`Request id ${_id}`);

  User.findById(_id)
    .then((user) => {
      if (!user) {
        handler_message(`User Not found`);
        return response.status(404).send();
      }
      handler_message(`User Data - ${user}`);
      response.status(200).send(user);
    })
    .catch((e) => {
      handler_error("users", "post", e);
      response.status(500).send();
    });
});
/**
 * Update User profile functionality
 */
router.patch("/users/:id", async (request, response) => {
  handler_log("users", "patch(update)");
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
    handler_error("users", "post", e);
    response.status(400).send(e);
  }
});
/**
 * Delete User profile functionality
 */
router.delete("/users/:id", async (request, response) => {
  handler_log("users", "delete");
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).send({ error: "User Not found" });
    }

    response.status(200).send(user);
  } catch (e) {
    handler_error("users", "post", e);
    return response.status(500).send({ error: "Internal Server Error" });
  }
});

// exporting router functionality
module.exports = router;
