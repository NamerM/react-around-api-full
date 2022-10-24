const router = require('express').Router();
const { validateAuthentication, validateUserBody } = require('../middleware/validators');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const  { userRouter }  = require('./users');
const  { cardRouter }  = require('./cards');


router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

module.exports = {
  router,
};
//