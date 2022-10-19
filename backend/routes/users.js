const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  getAllUsers,
   getUser,
   createUser,
   login,
   updateAvatar,
   updateUser,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login)

router.get('/users', auth, getAllUsers);
router.get('/users/:userId', auth, getUser);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateAvatar);

module.exports = {
  userRouter: router,
};
