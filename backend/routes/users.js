const router = require('express').Router();
const {
  getAllUsers,
   getUser,
  //  createUser,
  //  login,
   updateAvatar,
   updateUser,
} = require('../controllers/users');

// router.post('/signup', createUser);
// router.post('/signin', login)

router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = {
  userRouter: router,
};
