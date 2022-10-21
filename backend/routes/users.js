const router = require('express').Router();
const auth = require('../middleware/auth');

const {
  login,
  createUser,
  getAllUsers,
  getUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login)
router.get('/users', auth, getAllUsers);
router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateAvatar);
router.get('/users/:userId', auth, getUser);

module.exports = {
  userRouter: router,
};
