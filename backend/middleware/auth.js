const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
require('dotenv').config();

const errorAuth = (res) => {
  res.status(401).send({ message: 'Authorization Required'});
}

const auth = (req, res, next) => {
  const { authorization } = req.headers;

if (!authorization || !authorization.startsWith('Bearer ')) {
  return errorAuth(res);
}

const token = authorization.replace('Bearer ', '');
let payload;

try {
  payload = jwt.verify(token, JWT_SECRET );
} catch (err) {
  return errorAuth(res);
}

req.user = payload;
next();
}

module.exports = auth;