const bcrypt = require("bcryptjs");

const hashPasswordGeneration = async () => {
  const password = "Hari1234!";
  const hashPassword = await bcrypt.hash(password, 8); // 8 no of hashing round take place

  console.log(` Password  ->  ${password} `);
  console.log(` Hash Password  ->  ${hashPassword}`);

  const isMatch = await bcrypt.compare('Hari1234!',hashPassword);
  console.log(` Checking Password  ->  ${isMatch} `)
};

hashPasswordGeneration();
