const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  console.log("  -> Authentication middle ware is called");
  try {
    // taking value from the header from request
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(` -> Token from the Request->${token}`);
    // decoding the value using jwt library
    const decoded = jsonwebtoken.verify(token, "secret code");
    console.log(decoded);
    // Checking wheather the user passed token is present in db or not
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      console.log("User ->");
      throw new Error();
    }

    // passing token with user to help logout functiuonality - Start
    req.token = token;
    // passing token with user to help logout functiuonality - End
    req.user = user;
    next();
  } catch (e) {
    console.log("Error in Authentication middleware", e);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
