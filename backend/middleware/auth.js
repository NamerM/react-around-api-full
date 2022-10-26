require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// const { JWT_SECRET ='4f69cb2460f1788cead4a48228074076321547fc8a29f12da7e7dd8087be6422' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError')

// const errorAuth = (res) => {
//   res.status(401).send({ message: 'Authorization Required'});
// }

const auth = (req, res, next) => {
  const { authorization } = req.headers;

if (!authorization || !authorization.startsWith('Bearer ')) {
  return next(new UnauthorizedError('You need authorization to proceed'));
}

const token = authorization.replace('Bearer ', '');
let payload;

try {
  payload = jwt.verify(token, JWT_SECRET );
} catch (err) {
  return next(new UnauthorizedError('You need authorization to proceed'));
}

req.user = payload;
return next();
}

module.exports = auth;
//com