const jsonwebtoken = require("jsonwebtoken");

const Jsontoken = async () => {
  const token = jsonwebtoken.sign({ _id: "abc123" }, "Random character", {
    expiresIn: "1 second",
  });
  console.log(` - Generated Token  - ${token}`);

  const verificationdata = jsonwebtoken.verify(token, "Random character");
  console.log(` - verification data - ${JSON.stringify(verificationdata)}`);
};

Jsontoken();

/**
 Base 64 encoded Json String  - hve
 Payload/Body Base 64 encoded Json string - contains data we provided :id
 Signature to verify the token
 */
