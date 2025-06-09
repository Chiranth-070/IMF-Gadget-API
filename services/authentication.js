const JWT = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createToken, validateToken };
