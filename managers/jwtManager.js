const jwt = require("jsonwebtoken");
const jwtManager = (user) => {
  const accessToken = jwt.sign(
    { _id: user.id, name: user.name },
    process.env.jwt_salt
  );
  return accessToken;
};
module.exports = jwtManager;
