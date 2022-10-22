const router = require('express').Router();
const  { userRouter }  = require('./users');
const  { cardRouter }  = require('./cards');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

module.exports = {
  router,
};
