const router = require('express').Router();
const  userRouter  = require('./users');
const  cardRouter  = require('./cards');
const auth = require('../middleware/auth');
// const { createUser, login } = require('../routes/users');
                                            //const { validateUserBody, validateAuthentication } = require('../middleware/validations);

// router.post('/signup', createUser);  //validateUserBody
// router.post('/signin', login); //validateAuthentication
// router.use(auth);
router.use('/', userRouter);
router.use('/', cardRouter);

router.use(req, res, next => {
  next(new NotFoundError('Page not found at the specified route'));
});

module.exports = {
  router,
};
