const router = require('express').Router();
// const auth = require('../middleware/auth');

const {
  // login,
  // createUser,
  getAllUsers,
  getUser,
  getUserById,
  updateAvatar,
  updateUser,
} = require('../controllers/users');


router.get('/users', getAllUsers);
router.get('/users/me', getUser);
router.get('/users/:id', getUserById);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = {
  userRouter: router,
};
