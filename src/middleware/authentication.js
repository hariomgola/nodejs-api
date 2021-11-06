const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

// console printing functionality
const logs = require("../logs/devlogs");
const handler_log = logs.handlerLog;
const handler_error = logs.errorLog;
const handler_message = logs.messageLog;
// console printing functionality

/**
 * Authentication functionality working as express middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const auth = async (req, res, next) => {
  handler_log("Authentication", "Middleware");
  try {
    // taking value from the header from request
    const token = req.header("Authorization").replace("Bearer ", "");
    handler_message(`Token - ${token}`)
    // decoding the value using jwt library
    const decoded = jsonwebtoken.verify(token, "secret code");
    handler_message(`Decoded - ${decoded}`)
    // Checking wheather the user passed token is present in db or not
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      handler_message(` User Not found throwing error to cancel Request`)
      throw new Error();
    }

    // passing token with user to help logout functiuonality - Start
    req.token = token;
    // passing token with user to help logout functiuonality - End
    req.user = user;
    next();
  } catch (e) {
    handler_error("Authentication", "Middleware", e);
    res.status(401).send({ error: "Please Authenticate" });
  }
};

module.exports = auth;
