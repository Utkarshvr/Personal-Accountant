const jwt = require("jsonwebtoken");

function createJwt(name, data, options) {
  return jwt.sign(name, data, options);
}

module.exports = createJwt;
